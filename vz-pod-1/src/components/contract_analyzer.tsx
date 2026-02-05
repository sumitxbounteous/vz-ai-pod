// @ts-nocheck

import React, { useState, useRef, useEffect } from 'react';
import { FilePlus, FileText, Upload, Users, DollarSign, Scale, AlertCircle, CheckCircle, XCircle, Download, Loader2, ChevronDown, ChevronRight, Zap, MessageSquare, Send, Sparkles, Copy, RefreshCw } from 'lucide-react';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { prompts } from '../prompts/contract_prompts';
import * as mmth from "mammoth";
import * as geminiAI from '../lib/GeminiAI';
// import * as claudeAI from '../lib/aithropicAI';
import * as marked from 'marked';
// import { AIProviders } from './AIProviders';
import { AIAnalysisButton } from './AIAnalysisButton';

export const ContractAnalyzer = ({ chatResponses, data }) => {
  const [activeTab, setActiveTab] = useState('doc_original');
  const [selectedRoles, setSelectedRoles] = useState<string[]>(['redline']);
  const [analysisType, setAnalysisType] = useState('comparison');
  const [files, setFiles] = useState({ doc1: null, doc2: null });
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [expandedSections, setExpandedSections] = useState<{ [key: number]: string }>({});
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [selectedResultForChat, setSelectedResultForChat] = useState<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [fileContents, setFileContents] = useState({ doc1: '', doc2: '' });
  const [selectedAIPOption, setSelectedAIPOption] = useState('Gemini'); // Initial selection
  const pdfRef = useRef<HTMLDivElement>(null);
  const [diffFile, setDiffFile] = useState("");
  const [originalFile, setOriginalFile] = useState("");
  const [revisedFile, setRevisedFile] = useState("");

  const roles = [
    // { id: 'sales-rep', name: 'Sales Representative', icon: Users, color: 'red', description: 'Focus on deal closing and key terms' },
    // { id: 'sales-mgr', name: 'Sales Manager', icon: DollarSign, color: 'red', description: 'Strategic and profitability analysis' },
    // { id: 'legal', name: 'Legal/Contracts Admin', icon: Scale, color: 'red', description: 'Comprehensive legal review' },
    // { id: 'finance', name: 'Finance/RevOps', icon: DollarSign, color: 'red', description: 'Revenue and financial analysis' },
    // { id: 'technical', name: 'Technical Specialist', icon: Zap, color: 'red', description: 'Technical feasibility assessment' },
    { id: 'redline', name: 'Redlining', icon: AlertCircle, color: 'red', description: 'Track changes, risks and amendments', isSelected: true },
    { id: 'comparison', name: 'Contract Comparison', icon: FileText, color: 'red', description: 'Side-by-side document comparison and analysis', isSelected: false },
    // { id: 'executive', name: 'Executive Summary', icon: CheckCircle, color: 'red', description: 'C-level briefing format' },
  ];

  const rolesNotForComparison = roles.filter(r => r.id !== 'comparison' && r.id !== 'redline');

  useEffect(() => {
  chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  // ✅ GUARD: backend data not loaded yet
  if (!data) return;

  setDiffFile(data.diff_html || "");
  setOriginalFile(data.doc1_html || "");
  setRevisedFile(data.doc2_html || "");
}, [chatMessages, data]);


  useEffect(() => {
    if (chatResponses == null) return;
    const analysisResults = [];
    const parsedResult = parseAnalysisResults(chatResponses, "redline");
    analysisResults.push(parsedResult);
    setResults([...analysisResults]);
    setActiveTab('results');
  }, [chatResponses]);

  const toggleRoleSelection = (roleId: string) => {
    setSelectedRoles(prev => {
      if (prev.includes(roleId)) {
        return prev.filter(id => id !== roleId);
      } else {
        return [...prev, roleId];
      }
    });
  };

  const handleFileUpload = async (docNum: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files ? e.target.files[0] : null;
    if (file) {
      setFiles(prev => ({ ...prev, [`doc${docNum}`]: file }));
      const content = await readFileAsText(file);
      setFileContents(prev => ({ ...prev, [`doc${docNum}`]: content }));
    }
  };

  const readFileAsText = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const arrayBuffer = e.target?.result!
        const fHtml = await mmth.convertToHtml({ arrayBuffer });
        resolve(fHtml.value);
      };
      reader.onerror = (e) => reject(e);
      reader.readAsArrayBuffer(file);
    });
  };


  const exportToPDF = () => {
    const output_pdf = document.getElementById('output_pdf');

    if (!output_pdf.innerHTML.trim() || output_pdf.innerHTML.includes('will appear here')) {
      alert('Please render some content before exporting.');
      return;
    }

    const opt = {
      margin: 10,
      filename: 'contract_analysis_' + Date.now() + '.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    let exportText = `Contract Analysis Report - Multi-Role Analysis\n`;
    exportText += `Generated: ${new Date().toLocaleString()}\n`;
    exportText += `${'='.repeat(80)}\n\n`;

    results.forEach((result, idx) => {
      exportText += `\n${'#'.repeat(80)}\n`;
      exportText += `ANALYSIS ${idx + 1}: ${result.role}\n`;
      exportText += `${'#'.repeat(80)}\n\n`;

      result.sections.forEach(section => {
        exportText += `${section.title}\n`;
        exportText += `${'-'.repeat(section.title.length)}\n`;
        exportText += `${section.content}\n\n`;
      });
    });

    const md = Markdown()
    md.

      html2pdf().from(content).save();
    console.log('📥 PDF export initiated');
  }

  const analyzeContracts = async () => {
    // if (selectedRoles.length === 0 || !files.doc1) {
    //   alert('Please select at least one role and upload at least one contract document');
    //   return;
    // }

    setAnalyzing(true);
    setActiveTab('results');
    setResults([]);

    const analysisResults = [];

    for (const roleId of selectedRoles) {
      try {
        let fullPrompt = prompts[roleId];

        if (analysisType === 'comparison' && originalFile && revisedFile) {
          fullPrompt += `\n\nVersion_1 (Primary Contract):\n${originalFile}\n\nVersion_2 (Comparison Contract):\n${revisedFile}`;
        } else {
          fullPrompt += `\n\nContract Document:\n${revisedFile}`;
        }

        const response = await geminiAI.getAIResponse(fullPrompt);
        const analysisText = response.text;
        console.log(analysisText)
        // const response = await claudeAI.getAIResponse([{ role: "user", content: fullPrompt }]);

        // const analysisText = response.content
        //   .filter(item => item.type === 'text')
        //   .map(item => item.text)
        //   .join('\n');

        // const parsedResult = parseAnalysisResults(analysisText, roleId);
        analysisResults.push(analysisText);
        setResults([...analysisResults]);

      } catch (error) {
        console.error(`Analysis error for ${roleId}:`, error);
        analysisResults.push({
          roleId,
          role: roles.find(r => r.id === roleId)?.name,
          error: true,
          message: 'An error occurred during analysis.',
          details: error.message,
          timestamp: new Date().toLocaleString(),
        });
        setResults([...analysisResults]);
      }
    }

    setAnalyzing(false);
  };

  const parseAnalysisResults = (text: string, roleId: string) => {
    console.log(text)
    const sections = [];
    const lines = text.split('\n');
    let currentSection: string | null = null;
    let currentContent: string[] = [];

    lines.forEach(line => {
      const trimmed = line.trim();

      if (/^#+\s/.test(trimmed) || /^\d+\.\s\*\*/.test(trimmed) || /^\*\*\d+\./.test(trimmed)) {
        if (currentSection) {
          sections.push({
            title: currentSection,
            content: currentContent.join('\n').trim()
          });
        }

        currentSection = trimmed.replace(/^#+\s/, '').replace(/^\d+\.\s/, '').replace(/\*\*/g, '');
        currentContent = [];
      } else if (trimmed && currentSection) {
        currentContent.push(trimmed);
      } else if (trimmed && !currentSection) {
        if (sections.length === 0) {
          sections.push({
            title: 'Overview',
            content: trimmed
          });
        }
      }
    });

    if (currentSection) {
      sections.push({
        title: currentSection,
        content: currentContent.join('\n').trim()
      });
    }

    return {
      roleId,
      role: roles.find(r => r.id === roleId)?.name,
      roleColor: roles.find(r => r.id === roleId)?.color,
      timestamp: new Date().toLocaleString(),
      fullText: text,
      sections: sections.length > 0 ?
        sections :
        [{ title: 'Analysis Results', content: text }]
    };
  };

  const toggleSection = (resultIndex: number, sectionIndex: number) => {
    const key = `${resultIndex}-${sectionIndex}`;
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const exportResults = () => {
    if (results.length === 0) return;
    let exportText = `Contract Analysis Report - Multi-Role Analysis\n`;
    exportText += `Generated: ${new Date().toLocaleString()}\n`;
    exportText += `${'='.repeat(80)}\n\n`;

    results.forEach((result, idx) => {
      exportText += `\n${'#'.repeat(80)}\n`;
      exportText += `ANALYSIS ${idx + 1}: ${result.role}\n`;
      exportText += `${'#'.repeat(80)}\n\n`;

      result.sections.forEach(section => {
        exportText += `${section.title}\n`;
        exportText += `${'-'.repeat(section.title.length)}\n`;
        exportText += `${section.content}\n\n`;
      });
    });

    const blob = new Blob([exportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contract-analysis-multi-role-${Date.now()}.txt`;
    a.click();
  };

  const startChat = (resultIndex) => {
    console.log(results)
    setSelectedResultForChat(resultIndex);
    setChatMessages([{
      role: 'assistant',
      content: `Hello! I'm your AI assistant for the ${results[resultIndex].role} analysis. I have reviewed the contract documents and can answer any questions you have about the analysis. What would you like to know?`
    }]);
    setActiveTab('chat');
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim() || chatLoading) return;

    const userMessage = chatInput.trim();
    setChatInput('');

    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatLoading(true);

    try {
      const selectedResult = results[selectedResultForChat];
      const conversationHistory = chatMessages.map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      }));

      const contextPrompt = `You are an AI assistant helping analyze a contract. You have previously provided this analysis as a ${selectedResult.role}:

${selectedResult.fullText}

The contract documents analyzed were:
${fileContents.doc1}
${analysisType === 'comparison' && fileContents.doc2 ? `\n\nComparison document:\n${fileContents.doc2}` : ''}

Now the user has a follow-up question. Provide helpful, accurate answers based on the analysis and the original contract documents. Be conversational and helpful.`;


      // prepare the history as per Gemini
      const messages = conversationHistory.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const chat = await geminiAI.getChat(messages);
      const response = await chat.sendMessage({ message: contextPrompt + "\n\n" + userMessage });
      const assistantMessage = response.text
      // const messages = [
      //   ...conversationHistory,
      //   { role: 'user', content: userMessage }
      // ]
      // const response = await claudeAI.getChatResponse(messages);
      // const assistantMessage = response.content
      //   .filter(item => item.type === 'text')
      //   .map(item => item.text)
      //   .join('\n');

      setChatMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error('Chat error:', error);
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setChatLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const regenerateAnalysis = async (resultIndex) => {
    const roleId = results[resultIndex].roleId;
    setAnalyzing(true);
    setChatLoading(true);

    try {
      let fullPrompt = prompts[roleId];

      if (analysisType === 'comparison' && fileContents.doc2) {
        fullPrompt += `\n\nDocument A (Primary Contract):\n${fileContents.doc1}\n\nDocument B (Comparison Contract):\n${fileContents.doc2}`;
      } else {
        fullPrompt += `\n\nContract Document:\n${fileContents.doc1}`;
      }

      const response = await geminiAI.getAIResponse(fullPrompt);
      const analysisText = response.text;
      // const response = await claudeAI.getAIResponse([{ role: "user", content: fullPrompt }]);

      // const analysisText = response.content
      //   .filter(item => item.type === 'text')
      //   .map(item => item.text)
      //   .join('\n');

      const parsedResult = parseAnalysisResults(analysisText, roleId);

      setResults(prev => {
        const newResults = [...prev];
        newResults[resultIndex] = parsedResult;
        return newResults;
      });

    } catch (error) {
      console.error('Regeneration error:', error);
    } finally {
      setChatLoading(false);

      setAnalyzing(false);
    }
  };

  // RoleCard and UploadArea are extracted into separate components

  return (
    // <div className="min-h-screen max-w-6xl bg-linear-to-br from-slate-50 to-red-50 items-center justify-center mx-auto py-4 px-4 sm:px-6 lg:px-8">
    <div className="min-h-screen max-w-6xl shadow-xl rounded-xl  items-center justify-center mx-auto py-4 px-4 sm:px-6 lg:px-8 border border-red-200 bg-red/50">
      {/* Header */}
      <div className="bg-white shadow-xl rounded-xl mb-1 border-red-400 border-b-2 ">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-600 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Contract Redlining</h1>
                <p className="text-sm text-gray-600">AI powered contract workflow assistant</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('doc_original')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'doc_original'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                Original Doc
              </button>
              <button
                onClick={() => setActiveTab('doc_new')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'doc_new'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                New Doc
              </button>
              <button
                onClick={() => setActiveTab('doc_diff_view')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'doc_diff_view'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                Doc Diff View
              </button>
              <button
                onClick={() => setActiveTab('results')}
                disabled={results.length === 0}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'results'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
              >
                AI Analysis Results
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                disabled={results.length === 0}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${activeTab === 'chat'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
              >
                <MessageSquare className="w-4 h-4" />
                AI Chat
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-1">
        {activeTab === 'doc_original' && (
          <div className="space-y-8">

            <div className="bg-white rounded-xl shadow-xl p-6 mt-2">
              {originalFile ? (<div dangerouslySetInnerHTML={{ __html: originalFile }} />) : null}
            </div>
            <AIAnalysisButton analyzing={analyzing} analyzeContracts={analyzeContracts} />
          </div>
        )}
        {activeTab === 'doc_new' && (
          <div className="space-y-8">

            <div className="bg-white rounded-xl shadow-xl p-6 mt-2">
              {revisedFile ? (<div dangerouslySetInnerHTML={{ __html: revisedFile }} />) : null}
            </div>
            <AIAnalysisButton analyzing={analyzing} analyzeContracts={analyzeContracts} />
          </div>
        )}
        {activeTab === 'doc_diff_view' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-xl p-6 mt-2">
              {diffFile ? (<div dangerouslySetInnerHTML={{ __html: diffFile }} />) : null}
            </div>
            <AIAnalysisButton analyzing={analyzing} analyzeContracts={analyzeContracts} />
          </div>
        )}

        {activeTab === 'results' && (
          <div className="space-y-4">
            {analyzing && results.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <Loader2 className="w-16 h-16 text-red-600 animate-spin mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Your Contracts</h3>
                <p className="text-gray-600">AI is reviewing the documents from multiple perspectives...</p>
              </div>
            ) : results.length > 0 ? (
              <>
                {/* Results Header */}
                <div className="bg-white rounded-xl shadow-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Contract Analysis Results</h2>
                      <p className="text-sm text-gray-600 mt-1">{results.length} {results.length <= 1 ? 'analysis' : 'analyses'} completed</p>
                    </div>
                    <button
                      onClick={exportResults}

                      className="flex items-center gap-2 px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Export All Reports
                    </button>
                  </div>
                </div>

                {/* Results Content */}
                {results.map((result, resultIndex) => (
                  <div key={resultIndex} className="bg-white rounded-xl shadow-xl overflow-hidden">
                    <div className={`bg-linear-to-r from-${result.roleColor}-50 to-${result.roleColor}-100 p-6 `}>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => startChat(resultIndex)}
                            className="flex gap-2 px-3 py-2 bg-red-400 text-white rounded-lg hover:bg-red-600 transition-colors"
                          >
                            <MessageSquare className="w-4 h-4" />
                            Chat About This
                          </button>
                        </div>
                      </div>
                    </div>

                    {result.error ? (
                      <div className="p-6">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                          <div className="flex items-start gap-3">
                            <XCircle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                            <div>
                              <h4 className="font-semibold text-red-900">{result.message}</h4>
                              {result.details && (
                                <p className="text-sm text-red-700 mt-2">{result.details}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 space-y-4" id="output_pdf" ref={pdfRef}>
                        <div className="p-4 border-t bg-white">
                          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: result }}>
                            {/* <Markdown remarkPlugins={[remarkGfm]}></Markdown> */}
                            {/* <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                                      {section.content}
                                    </pre> */}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Analysis Yet</h3>
                <p className="text-gray-600 mb-6">Upload documents and select roles to get started</p>
                <button
                  onClick={() => setActiveTab('upload')}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Go to Upload
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="h-[calc(100vh-140px)] flex flex-col">
            {selectedResultForChat !== null ? (
              <>
                {/* Chat Header */}
                <div className="bg-white rounded-lg shadow-2xl p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-linear-to-r from-red-400 to-red-600 rounded-lg">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">AI Assistant - {results[selectedResultForChat].role}</h3>
                      <p className="text-sm text-gray-600">Ask questions about the contract analysis</p>
                    </div>
                    <select
                      title='assistant'
                      value={selectedResultForChat}
                      onChange={(e) => {
                        setSelectedResultForChat(Number(e.target.value));
                        setChatMessages([{
                          role: 'assistant',
                          content: `Hello! I'm your AI assistant for the ${results[Number(e.target.value)].role} analysis. I have reviewed the contract documents and can answer any questions you have about the analysis. What would you like to know?`
                        }]);
                      }}
                      className="px-3 py-2 border border-red-500 rounded-lg text-sm"
                    >
                      {results.map((result, idx) => (
                        <option key={idx} value={idx}>{result.role}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 bg-white rounded-lg shadow-2xl overflow-y-auto m-1 p-6 space-y-2">
                  {chatMessages.map((message, idx) => (
                    <div key={idx} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-3xl ${message.role === 'user' ? 'bg-gray-300 text-black' : 'bg-gray-100 text-gray-900'} rounded-lg p-4`}>
                        <div className="flex items-start gap-3">
                          {message.role === 'assistant' && (
                            <Sparkles className="w-5 h-5 text-red-600 shrink-0 mt-1" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm whitespace-pre-wrap">
                              <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {chatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-4">
                        <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Chat Input */}
                <div className="bg-white rounded-lg shadow-2xl p-4">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendChatMessage()}
                      placeholder="Ask a question about the contract analysis..."
                      className="flex-1 px-4 py-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                      disabled={chatLoading}
                    />
                    <button
                      onClick={sendChatMessage}
                      disabled={!chatInput.trim() || chatLoading}
                      className="px-6 py-3 bg-red-400 text-white rounded-lg hover:bg-red-600 disabled:bg-red-100 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Press Enter to send, Shift+Enter for new line</p>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border p-12 text-center h-full flex items-center justify-center">
                <div>
                  <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Analysis Selected</h3>
                  <p className="text-gray-600 mb-6">Complete an analysis first to start chatting with AI</p>
                  <button
                    onClick={() => setActiveTab('results')}
                    className="px-6 py-3 bg-red-400 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    View Results
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractAnalyzer;