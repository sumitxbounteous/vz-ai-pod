import { RefObject } from 'react'
import { RedlineContent } from './RedlineContent'
import { AssistantContent } from './AssistantContent'

interface Props {
  hidden: boolean
  activeTab: 'redline' | 'assistant'
  onTabChange: (tab: 'redline' | 'assistant') => void
  onToggleSidebar: () => void
  counts: { pending: number; accepted: number; rejected: number }
  contractData: Record<number, { id: string; proposed_draft: string; ai_suggestion: string }>
  onApplySuggestion: (id: number) => void
  onDeclineSuggestion: (id: number) => void
  onUpdateSuggestion: (id: number, text: string) => void
  redlineRef: RefObject<HTMLDivElement>
}

export function AIStudioPanel({
  hidden,
  activeTab,
  onTabChange,
  onToggleSidebar,
  counts,
  contractData,
  onApplySuggestion,
  onDeclineSuggestion,
  onUpdateSuggestion,
  redlineRef
}: Props) {
  return (
    <div
      id="ai-studio-panel"
      className={`flex flex-col overflow-hidden bg-white border-l border-gray-200 ${hidden ? 'hidden' : ''}`}
      style={{ display: hidden ? 'none' : 'flex' }}
    >
      {/* Panel Header */}
      <div className="p-5 flex-shrink-0 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-bold text-red-600">AI Studio</h2>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex gap-1 p-1 bg-gray-100 rounded-lg mb-4">
          <button
            onClick={() => onTabChange('redline')}
            id="redlineTab"
            className={`flex-1 px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
              activeTab === 'redline'
                ? 'bg-white shadow-sm text-gray-900'
                : 'text-red-600'
            }`}
          >
            Redline review (6)
          </button>
          <button
            onClick={() => onTabChange('assistant')}
            id="assistantTab"
            className={`flex-1 px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'assistant'
                ? 'bg-white shadow-sm text-gray-900'
                : 'text-red-600'
            }`}
          >
            Ask AI Assistant
          </button>
        </div>

        {/* Beautiful Status Badges */}
        {activeTab === 'redline' && (
          <div id="status-container" className="flex gap-2 mb-0 transition-opacity duration-300">
            {/* Pending Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-md">
              <span className="text-xs font-bold text-gray-900">{counts.pending} Pending</span>
            </div>
            
            {/* Accepted Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-400 to-green-500 shadow-md">
              <span className="text-xs font-bold text-white">{counts.accepted} Accepted</span>
            </div>
            
            {/* Rejected Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 shadow-md">
              <span className="text-xs font-bold text-white">{counts.rejected} Rejected</span>
            </div>
          </div>
        )}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50/50">
        {activeTab === 'redline' && (
          <div ref={redlineRef} id="redlineContent" className="space-y-4 p-4">
            <RedlineContent
              contractData={contractData}
              onApply={onApplySuggestion}
              onDecline={onDeclineSuggestion}
              onUpdate={onUpdateSuggestion}
            />
          </div>
        )}

        {activeTab === 'assistant' && (
          <div id="assistantContent">
            <AssistantContent />
          </div>
        )}
      </div>
    </div>
  )
}
