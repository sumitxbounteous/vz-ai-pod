import { useState } from 'react'

interface Props {
  contractData: Record<number, {
    id: string
    proposed_draft: string
    ai_suggestion: string
  }>
  onApply: (id: number) => void
  onDecline: (id: number) => void
  onUpdate: (id: number, text: string) => void
}

const cardConfig = [
  { 
    id: 1, 
    section: 'SLA Trigger', 
    sectionNum: 'Section 2', 
    risk: 'high' as const,
    original: '14 consecutive hours.'
  },
  { 
    id: 3, 
    section: 'Payment Terms', 
    sectionNum: 'Section 3', 
    risk: 'low' as const,
    original: 'Net 30 days from invoice date'
  },
  { 
    id: 2, 
    section: 'Liability Cap', 
    sectionNum: 'Section 4', 
    risk: 'medium' as const,
    original: 'Capped for data breaches'
  },
  { 
    id: 4, 
    section: 'Exit Fees', 
    sectionNum: 'Section 6', 
    risk: 'medium' as const,
    original: '$45,000 exit fee'
  },
  { 
    id: 5, 
    section: 'Data Protection', 
    sectionNum: 'Section 5', 
    risk: 'low' as const,
    original: 'No GDPR specific clause'
  },
  { 
    id: 6, 
    section: 'Confidentiality', 
    sectionNum: 'Section 5', 
    risk: 'low' as const,
    original: 'maintain confidentiality for 4 year post-agreement'
  },
]

export function RedlineContent({ contractData, onApply, onDecline, onUpdate }: Props) {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')
  const [resolvedCards, setResolvedCards] = useState<Set<number>>(new Set())

  const handleEdit = (id: number) => {
    setEditingId(id)
    setEditText(contractData[id].ai_suggestion)
  }

  const handleSave = (id: number) => {
    onUpdate(id, editText)
    setEditingId(null)
  }

  const handleApply = (id: number) => {
    onApply(id)
    setResolvedCards(prev => new Set(prev).add(id))
  }

  const handleDecline = (id: number) => {
    onDecline(id)
    setResolvedCards(prev => new Set(prev).add(id))
  }

  const getRiskStyles = (risk: string) => {
    const colors = {
      high: { bg: '#FFFBFB', border: '#FECACA', badge: '#FEE2E2' },
      medium: { bg: '#FFFEF0', border: '#FCD34D', badge: '#FEF3C7' },
      low: { bg: '#F0FDF4', border: '#86EFAC', badge: '#DCFCE7' }  // Changed to green
    }
    return colors[risk as keyof typeof colors] || colors.low
  }

  const getRiskBadgeText = (risk: string) => {
    switch (risk) {
      case 'high': return 'High risk'
      case 'medium': return 'Medium risk'
      case 'low': return 'Low risk'
      default: return ''
    }
  }

  return (
    <>
      {cardConfig.map(card => {
        const data = contractData[card.id]
        if (!data) return null
        
        const isResolved = resolvedCards.has(card.id)
        const riskStyles = getRiskStyles(card.risk)
        const riskBadgeColor = {
          high: { bg: '#FEE2E2', color: '#991B1B' },
          medium: { bg: '#FEF3C7', color: '#92400E' },
          low: { bg: '#DCFCE7', color: '#166534' }  // Changed to green
        }[card.risk]

        return (
          <div
            key={card.id}
            id={`card-${card.id}`}
            className={`verizon-card p-4 transition-all duration-300 ${isResolved ? 'card-resolved' : ''}`}
            style={{
              borderColor: riskStyles.border,
              backgroundColor: riskStyles.bg,
              border: `2px solid ${riskStyles.border}`
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase">{card.sectionNum}</span>
                <span className="text-xs font-bold text-gray-900">{card.section}</span>
              </div>
              <span 
                className="risk-badge"
                style={{ 
                  backgroundColor: riskBadgeColor.bg,
                  color: riskBadgeColor.color,
                  padding: '0.375rem 0.75rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}
              >
                {getRiskBadgeText(card.risk)}
              </span>
            </div>

            {/* Original Contract */}
            <div 
              className="mb-3 p-3 rounded border"
              style={{ 
                backgroundColor: card.risk === 'high' ? '#FEF2F2' : card.risk === 'medium' ? '#FEF3F2' : '#F0FDF4',
                borderColor: card.risk === 'high' ? '#FECACA' : card.risk === 'medium' ? '#FCD34D' : '#86EFAC'
              }}
            >
              <div className="text-[10px] font-bold text-gray-400 mb-1 uppercase">Original Contract</div>
              <p className="text-xs text-gray-500 strikethrough-red">{card.original}</p>
            </div>

            {/* Proposed Draft */}
            <div className="mb-3 p-3 rounded border bg-gray-50 border-gray-200">
              <div className="text-[10px] font-bold text-gray-400 mb-1 uppercase">Proposed Draft</div>
              <p className="text-xs text-gray-900 font-medium">{data.proposed_draft}</p>
            </div>

            {/* AI Recommendation Box */}
            <div className="rounded border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 bg-gray-700 rounded-full flex items-center justify-center text-white text-[8px]">✨</div>
                  <span className="text-[10px] font-bold text-gray-900 uppercase">AI Recommendation</span>
                </div>
                <button 
                  onClick={() => handleEdit(card.id)}
                  className="text-[10px] font-bold text-gray-600 hover:text-gray-900 underline"
                >
                  Edit
                </button>
              </div>

              {editingId === card.id ? (
                <div className="mb-3">
                  <textarea
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    className="w-full text-xs p-2 border border-gray-300 rounded outline-none mb-2"
                    rows={2}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-[10px] font-bold text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave(card.id)}
                      className="px-2 py-1 text-[10px] font-bold bg-gray-900 text-white rounded hover:bg-gray-800"
                    >
                      Update
                    </button>
                  </div>
                </div>
              ) : (
                <div id={`ai-text-display-${card.id}`} className="text-xs text-gray-700 italic mb-3">
                  "{data.ai_suggestion}"
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 border-t border-gray-200 pt-3">
                <button
                  onClick={() => handleDecline(card.id)}
                  className="flex-1 px-3 py-1.5 border border-gray-300 text-gray-700 text-[10px] font-bold rounded hover:bg-gray-100"
                >
                  Decline
                </button>
                <button
                  onClick={() => handleApply(card.id)}
                  className="flex-1 px-3 py-1.5 bg-gray-900 text-white text-[10px] font-bold rounded hover:bg-gray-800"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
