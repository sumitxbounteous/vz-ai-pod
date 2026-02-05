import React, { useState } from 'react';
import { ChevronDown, Volume2, MoreVertical, Maximize2 } from 'lucide-react';
import AISummary from './AISummary';


// Mock data for sections
const contractSections = [
  {
    id: 1,
    title: 'Definitions',
    content: {
      heading: 'Customer Agreement for Verizon Wireless Internet Data Services (Hyundai) Customer Agreement for Verizon Wireless Internet Data Service (Hyundai)',
      text: `Thank you for choosing Verizon Wireless. In this Customer Agreement ("Agreement"), you'll find important information about your Verizon Wireless Internet Data service (the "Service"), offered to you through Hyundai Motor America ("HMA") Wi-Fi + Streaming which are more fully described in the Connected Services Agreement Terms and Conditions (available at https://owners.hyundaiusa.com/us/en/terms-and-conditions). The information contained in this Agreement addresses, :`,
      bullets: [
        'Our ability to make changes to your Service or this Agreement\'s terms.',
        'Our liability if things don\'t work as planned and how any disputes between us must be resolved in arbitration or small claims court.'
      ]
    }
  },
  {
    id: 2,
    title: 'Service level agreement',
    content: {
      heading: 'Here is an overview of the key solutions we propose',
      sections: [
        {
          title: '1. Mobile Solutions: Comprehensive Device & Service Management',
          link: 'Equip your teams with the latest technology and ensure seamless communication across all levels of your organization.',
          description: 'We propose providing additional smartphones and tablets for your growing workforce, alongside upgrading existing mobile lines to leverage the full capabilities of Verizon\'s network. *',
          benefits: {
            title: 'Benefits',
            items: [
              'Enhanced Mobility: Empower employees with cutting-edge devices for on-the-go productivity and customer interaction.',
              'Grentin foraliine: Access 20/S astest emerspes forcial usines til ations al personnel,'
            ]
          }
        },
        {
          title: '2. Fixed Wireless Access (FWA) & Business Internet Solutions',
          description: 'Leverage the power of Verizon\'s 5G network for versatile and reliable internet connectivity. We propose Business Internet for 5GBI (Gigabit Business Internet) to bring high-speed, low-latency internet to your key locations. Additionally, FWA can provide flexible Jobsite Connectivity for temporary setups or pop-up stores, robust internet for Kiosks to enhance in-store digital experiences, and serve as a reliable Backup internet solution for your primary connections, ensuring business continuity.'
        }
      ]
    }
  },
  {
    id: 3,
    title: 'Service level agreement',
    content: {
      heading: 'Here is an overview of the key solutions we propose',
      sections: [
        {
          title: '1. Mobile Solutions: Comprehensive Device & Service Management',
          link: 'Equip your teams with the latest technology and ensure seamless communication across all levels of your organization.',
          description: 'We propose providing additional smartphones and tablets for your growing workforce, alongside upgrading existing mobile lines to leverage the full capabilities of Verizon\'s network.'
        }
      ]
    }
  }
];

// Mock data for AI suggestions
const suggestions = [
  {
    id: 1,
    section: 'Section 2',
    title: 'Service Level Agreements',
    riskLevel: 'High risk',
    original: 'Service credits shall be issued for interruptions exceeding 24 consecutive hours.',
    proposed: 'Service credits shall be issued for interruptions exceeding 4 consecutive hours.',
    aiRecommended: true,
    aiReasoning: 'Service credits shall be issued only for interruptions exceeding 12 consecutive hours',
    status: 'pending'
  },
  {
    id: 2,
    section: 'Section 3',
    title: 'Service Modifications',
    riskLevel: 'Medium risk',
    original: 'Lorem ipsum nibh sem eleifend hendrerit et duis velit lectus sit ipsum nibh sem eleifend hendrerit et duis velit lectus.',
    proposed: 'Lorem ipsum nibh sem eleifend hendrerit et duis velit lectus sit ipsum nibh sem eleifend hendrerit et duis velit lectus.',
    aiRecommended: true,
    aiReasoning: 'Lorem ipsum nibh sem eleifend hendrerit et duis velit lectus sit ipsum nibh sem eleifend hendrerit et duis velit lectus.',
    status: 'pending'
  }
];

const ContractReview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'contract' | 'ai-summary'>('contract');
  const [aiSuggestionsTab, setAiSuggestionsTab] = useState<'redline' | 'assistant'>('redline');
  const [showRedlines, setShowRedlines] = useState(true);
  
  const pendingCount = suggestions.filter(s => s.status === 'pending').length;
  const acceptedCount = suggestions.filter(s => s.status === 'accepted').length;
  const rejectedCount = suggestions.filter(s => s.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <div className="text-white font-bold text-sm">H</div>
            </div>
            
            {/* Title */}
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-gray-900">
                Hyundai<br />
                <span className="text-red-600">2026 Master Service Agreement</span>
              </h1>
              <span className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-medium text-gray-700">
                Draft
              </span>
              <button className="p-1 hover:bg-gray-100 rounded">
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('contract')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'contract' 
                  ? 'border-red-600 text-gray-900' 
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Contract review
            </button>
            <button 
              onClick={() => setActiveTab('ai-summary')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'ai-summary' 
                  ? 'border-red-600 text-gray-900' 
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              AI summary
            </button>
            <button className="px-6 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
              Submit
            </button>
            <button className="p-2 hover:bg-gray-100 rounded">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded">
              <Maximize2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Content Area */}
      {activeTab === 'ai-summary' ? (
        <AISummary />
      ) : (
        <div className="flex flex-1">
          {/* Left Panel - Contract View */}
          <div className="flex-1 bg-white border-r border-gray-200 overflow-y-auto">
            {/* Version Info */}
            <div className="px-8 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900">Version 2.0</span>
                <span className="text-sm text-gray-500">(Jan 20, 2026)</span>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setShowRedlines(!showRedlines)}
                  className="text-sm text-gray-700 hover:text-gray-900 underline"
                >
                  {showRedlines ? 'Hide redlines' : 'Show redlines'}
                </button>
                <button className="text-sm text-gray-700 hover:text-gray-900 underline">
                  Edit
                </button>
              </div>
            </div>

            {/* Contract Content */}
            <div className="px-8 py-6">
              {contractSections.map((section) => (
                <div key={section.id} className="mb-8">
                  {/* Section Header */}
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-1">Section {section.id}</div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Volume2 className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Section Content */}
                  <div className="space-y-4">
                    <p className="text-sm font-semibold text-gray-900 leading-relaxed">
                      {section.content.heading}
                    </p>
                    
                    {section.content.text && (
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {section.content.text}
                      </p>
                    )}

                    {section.content.bullets && (
                      <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 ml-4">
                        {section.content.bullets.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    )}

                    {section.content.sections && section.content.sections.map((subsection, idx) => (
                      <div key={idx} className="space-y-3">
                        <p className="text-sm font-semibold text-gray-900">
                          {subsection.title}
                        </p>
                        {subsection.link && (
                          <p className="text-sm text-blue-600 underline cursor-pointer hover:text-blue-700">
                            {subsection.link} →
                          </p>
                        )}
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {subsection.description}
                        </p>
                        {subsection.description && (
                          <div>
                            <p className="text-sm font-semibold text-gray-900 mb-2">
                              {subsection.description.title}
                            </p>
                            {subsection.description.items.map((item, i) => (
                              <p key={i} className="text-sm text-gray-700 leading-relaxed mb-1">
                                {item}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  {section.id < contractSections.length && (
                    <hr className="mt-8 border-gray-200" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - AI Suggestions */}
          <div className="w-120 bg-gray-50 overflow-y-auto">
            {/* AI Suggestions Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-6 z-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">AI suggestions</h2>
              
              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setAiSuggestionsTab('redline')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    aiSuggestionsTab === 'redline'
                      ? 'bg-red-100 text-red-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Redline review ({pendingCount})
                </button>
                <button
                  onClick={() => setAiSuggestionsTab('assistant')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    aiSuggestionsTab === 'assistant'
                      ? 'bg-red-100 text-red-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Ask AI assistant
                </button>
              </div>

              {/* Status Badges */}
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-md">
                  {pendingCount} Pending
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-md">
                  {acceptedCount} Accepted
                </span>
                <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-md">
                  {rejectedCount} Rejected
                </span>
              </div>
            </div>

            {/* Suggestions List */}
            <div className="p-6 space-y-4">
              {suggestions.map((suggestion) => (
                <div 
                  key={suggestion.id}
                  className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">{suggestion.section}</div>
                      <h3 className="text-base font-semibold text-gray-900">{suggestion.title}</h3>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${
                      suggestion.riskLevel === 'High risk' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {suggestion.riskLevel}
                    </span>
                  </div>

                  {/* Original Text */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-gray-700 mb-2">Original</div>
                    <p className="text-sm text-gray-700 line-through decoration-red-500">
                      {suggestion.original}
                    </p>
                  </div>

                  {/* Proposed Text */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-gray-700 mb-2">Proposed</div>
                    <p className="text-sm text-gray-900">
                      {suggestion.proposed}
                    </p>
                  </div>

                  {/* AI Recommendation */}
                  {suggestion.aiRecommended && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/>
                        </svg>
                        <span className="text-xs font-semibold text-gray-900">AI Recommended</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        {suggestion.aiReasoning}
                      </p>
                      <button className="mt-2 text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1">
                        AI reasoning and suggestion
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* Edit Link */}
                  <button className="text-sm text-gray-700 hover:text-gray-900 underline mb-4">
                    Edit
                  </button>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
                      Decline
                    </button>
                    <button className="flex-1 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
                      Accept
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractReview;
