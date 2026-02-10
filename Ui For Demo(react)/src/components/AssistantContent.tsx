import { useState, useRef, useEffect } from 'react'

interface Message {
  type: 'user' | 'ai'
  text: string
  timestamp?: Date
}

export function AssistantContent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'ai',
      text: "Hello! I'm your AI contract assistant for the Hyundai 2026 Master Service Agreement review. I can help you understand contract changes, suggest negotiation strategies, analyze risk levels, or answer questions about specific clauses. How can I assist you today?",
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const aiResponses: Record<string, string> = {
    'high-risk': '🔴 **High-Risk Items Identified:**\n\n1. **Liability Cap for Data Breaches** (Section 4)\n   - Currently: Uncapped liability\n   - Risk: Unlimited financial exposure\n   - Recommendation: Negotiate to cap at 3x annual fees\n\n2. **Early Termination Fees** (Section 6)\n   - Current: $50,000 exit fee\n   - Risk: Costly to exit if needs change\n   - Recommendation: Consider tiered fees (100% Yr1, 75% Yr2, 50% Yr3)\n\n3. **Service Availability** (Section 2)\n   - Current: 24 hour interruption threshold\n   - Risk: Long outages before compensation\n   - Recommendation: Reduce to 4 hours with escalation',

    'strategy': '💡 **Negotiation Strategy Recommendations:**\n\n**Phase 1 - Assessment (Days 1-2)**\n- Identify your most critical requirements\n- Benchmark against industry standards\n- Prioritize negotiation points\n\n**Phase 2 - Negotiation (Days 3-5)**\n- Start with high-risk items\n- Propose counteroffers with data\n- Bundle requests for better outcomes\n\n**Phase 3 - Finalization (Days 6-7)**\n- Document all agreed changes\n- Ensure clear enforcement mechanisms\n- Schedule follow-up reviews\n\n**Key Negotiation Points:**\n- Payment terms: Push for Net 30 instead of 60\n- SLA requirements: Aim for 99.9% uptime\n- Data security: Add GDPR/CCPA compliance\n- Exit flexibility: Implement tiered exit fees',

    'accept': '✅ **Decision Framework:**\n\n**ACCEPT if:**\n- Payment terms are favorable (Net 30-45)\n- Service levels match your needs (99%+ uptime)\n- Exit fees are tiered or capped\n- Data protection is comprehensive\n- Dispute resolution is reasonable\n\n**NEGOTIATE if:**\n- Any item shows high risk\n- Terms are worse than industry standard\n- Penalties are too severe\n- Flexibility is limited\n\n**REJECT if:**\n- Multiple high-risk items unaddressed\n- Liability is completely uncapped\n- Terms heavily favor provider\n- Critical requirements are missing\n\n**Current Status:** This contract has 3 medium/high risk items requiring negotiation before acceptance.',

    'section 2': '📄 **Section 2: Service Level Agreement Details**\n\n**Current Provisions:**\n- Service credits for interruptions > 24 hours\n- 99.5% uptime commitment\n- Monthly measurement period\n\n**AI Recommendations:**\n1. **Reduce Interruption Threshold**\n   - Current: 24 hours\n   - Proposed: 4 hours with escalation\n   - Benefit: Earlier compensation triggers\n\n2. **Increase Uptime Guarantee**\n   - Current: 99.5%\n   - Proposed: 99.9%\n   - Benefit: More reliable service\n\n3. **Add Escalation Path**\n   - Tier 1: 4-8 hours = 5% credit\n   - Tier 2: 8-24 hours = 15% credit\n   - Tier 3: >24 hours = 25% credit\n\n**Industry Benchmark:** Major carriers typically offer 99.8-99.99% with 4-8 hour thresholds.',

    'default': '📋 **I can help with:**\n\n• **Risk Analysis** - Identify problematic clauses\n• **Negotiation Strategies** - Win-win approaches\n• **Section Reviews** - Detailed clause analysis\n• **Industry Benchmarks** - Compare to standards\n• **Decision Support** - Accept/Reject guidance\n• **Glossary** - Define technical terms\n\n**Popular Questions:**\n• "What are the high-risk items?"\n• "What negotiation strategy do you recommend?"\n• "Should I accept these changes?"\n• "Explain Section 2 changes"\n\nFeel free to ask any contract-related question!'
  }

  const suggestedQuestions = [
    { text: '🔴 High-risk items?', key: 'high-risk' },
    { text: '💡 Strategy advice?', key: 'strategy' },
    { text: '✅ Should I accept?', key: 'accept' },
    { text: '📄 Section 2 details', key: 'section 2' }
  ]

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    for (const [key, response] of Object.entries(aiResponses)) {
      if (lowerQuery.includes(key)) {
        return response
      }
    }

    return aiResponses['default']
  }

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    const userMessage: Message = { type: 'user', text: inputText, timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateResponse(inputText)
      const aiMessage: Message = { type: 'ai', text: aiResponse, timestamp: new Date() }
      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
    }, 800)
  }

  const handleSuggestedQuestion = (key: string) => {
    const question = suggestedQuestions.find(q => q.key === key)?.text || ''
    setInputText(question.replace(/[🔴💡✅📄]/g, '').trim())
    
    const userMessage: Message = { type: 'user', text: question, timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    setTimeout(() => {
      const aiResponse = aiResponses[key] || aiResponses['default']
      const aiMessage: Message = { type: 'ai', text: aiResponse, timestamp: new Date() }
      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
    }, 800)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.type === 'ai' && (
              <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs mr-3 flex-shrink-0 mt-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2L2 7l8 5 8-5-8-5z"/>
                </svg>
              </div>
            )}
            <div
              className={`max-w-[85%] px-4 py-3 rounded-lg ${
                msg.type === 'user'
                  ? 'bg-gray-900 text-white rounded-tr-none'
                  : 'bg-white border border-gray-200 shadow-sm text-gray-900 rounded-tl-none'
              }`}
            >
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                {msg.text.split('\n').map((line, i) => (
                  <div key={i}>
                    {line.split(/(\*\*.*?\*\*)/g).map((part, j) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return (
                          <strong key={j} className="font-semibold">
                            {part.slice(2, -2)}
                          </strong>
                        )
                      }
                      return part
                    })}
                  </div>
                ))}
              </div>
              {msg.timestamp && (
                <div className="text-xs mt-2 opacity-60">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              )}
            </div>
            {msg.type === 'user' && (
              <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs ml-3 flex-shrink-0 mt-1">
                U
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs mr-3 flex-shrink-0 mt-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2L2 7l8 5 8-5-8-5z"/>
              </svg>
            </div>
            <div className="bg-white border border-gray-200 shadow-sm px-4 py-3 rounded-lg rounded-tl-none flex gap-1 items-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-1"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-2"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-3"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && !isLoading && (
        <div className="px-6 py-4 bg-gray-100 border-t border-gray-200">
          <div className="text-xs font-bold text-gray-700 mb-3">Quick questions:</div>
          <div className="grid grid-cols-2 gap-2">
            {suggestedQuestions.map((q) => (
              <button
                key={q.key}
                onClick={() => handleSuggestedQuestion(q.key)}
                className="px-3 py-2 bg-white border border-gray-300 text-xs text-gray-700 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors text-left font-medium"
              >
                {q.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-gray-200 flex-shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask me anything about this contract..."
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm disabled:bg-gray-100"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputText.trim()}
            className="px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
