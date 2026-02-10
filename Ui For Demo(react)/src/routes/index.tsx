import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef } from 'react'
import { ContractDocument } from '../components/ContractDocument'
import { AIStudioPanel } from '../components/AIStudioPanel'
import '../styles/app.css'

export const Route = createFileRoute('/')({
  component: IndexPage,
})

function IndexPage() {
  const [sidebarHidden, setSidebarHidden] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState<'redline' | 'assistant'>('redline')
  const [counts, setCounts] = useState({ pending: 6, accepted: 0, rejected: 0 })

  // EXACT DATA STRUCTURE - MATCHES YOUR HTML
  const [contractData, setContractData] = useState({
    1: {
      id: "doc-change-1",
      proposed_draft: "24 consecutive hours.",
      ai_suggestion: "4 consecutive hours with automated escalation."
    },
    2: {
      id: "doc-change-2",
      proposed_draft: "Uncapped for data breaches",
      ai_suggestion: "Cap liability at 3x Annual Fees (approx $1.4M)."
    },
    3: {
      id: "doc-change-3",
      proposed_draft: "Net 60 days from invoice date",
      ai_suggestion: "Net 30 days from invoice date."
    },
    4: {
      id: "doc-change-4",
      proposed_draft: "$50,000 exit fee",
      ai_suggestion: "Tiered exit fee: 100% Yr1, 75% Yr2, 50% Yr3."
    },
    5: {
      id: "doc-change-5",
      proposed_draft: "No specific data protection clause included.",
      ai_suggestion: "Provider shall comply with GDPR, CCPA, and equivalent data protection regulations."
    },
    6: {
      id: "doc-change-6",
      proposed_draft: "maintain confidentiality for 1 year post-agreement",
      ai_suggestion: "maintain confidentiality for 3 years post-agreement"
    }
  })

  // Tracks which elements have been accepted/declined
  const [elementStates, setElementStates] = useState<Record<string, string>>({})
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')
  const [showToast, setShowToast] = useState(false)
  
  const redlineRef = useRef<HTMLDivElement>(null)

  const showToastMessage = (msg: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(msg)
    setToastType(type)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  // ACCEPT - Changes document text to AI suggestion
  const applySuggestion = (id: number) => {
    const data = contractData[id as keyof typeof contractData]
    setElementStates(prev => ({
      ...prev,
      [data.id]: data.ai_suggestion
    }))
    setCounts(prev => ({
      ...prev,
      pending: prev.pending - 1,
      accepted: prev.accepted + 1
    }))
    showToastMessage("AI Change Accepted", "success")
    
    // Highlight the wrapper section
    const wrapperMap: Record<number, string> = {
      1: 'doc-wrapper-1',
      2: 'doc-wrapper-2',
      3: 'doc-wrapper-payment',
      4: 'doc-wrapper-term',
      5: 'doc-wrapper-conf',
      6: 'doc-wrapper-conf'
    }
    const wrapperId = wrapperMap[id]
    if (wrapperId) {
      const element = document.getElementById(wrapperId)
      if (element) {
        element.classList.add('editing-highlight')
        setTimeout(() => element.classList.remove('editing-highlight'), 1000)
      }
    }
  }

  // DECLINE - Keeps proposed draft
  const declineSuggestion = (id: number) => {
    const data = contractData[id as keyof typeof contractData]
    setElementStates(prev => ({
      ...prev,
      [data.id]: data.proposed_draft
    }))
    setCounts(prev => ({
      ...prev,
      pending: prev.pending - 1,
      rejected: prev.rejected + 1
    }))
    showToastMessage("AI Change Declined - Draft Kept", "error")
    
    // Highlight the wrapper section
    const wrapperMap: Record<number, string> = {
      1: 'doc-wrapper-1',
      2: 'doc-wrapper-2',
      3: 'doc-wrapper-payment',
      4: 'doc-wrapper-term',
      5: 'doc-wrapper-conf',
      6: 'doc-wrapper-conf'
    }
    const wrapperId = wrapperMap[id]
    if (wrapperId) {
      const element = document.getElementById(wrapperId)
      if (element) {
        element.classList.add('editing-highlight')
        setTimeout(() => element.classList.remove('editing-highlight'), 1000)
      }
    }
  }

  const updateAISuggestion = (id: number, newText: string) => {
    setContractData(prev => ({
      ...prev,
      [id]: { ...prev[id as keyof typeof prev], ai_suggestion: newText }
    }))
    showToastMessage("AI Recommendation Updated", "success")
  }

  // Scroll to card and highlight it
  const scrollToCard = (id: number) => {
    setActiveTab('redline')
    setTimeout(() => {
      const card = document.getElementById(`card-${id}`)
      if (card && redlineRef.current) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' })
        card.classList.add('editing-highlight')
        setTimeout(() => card.classList.remove('editing-highlight'), 1500)
      }
    }, 100)
  }

  return (
    <div 
      id="main-grid" 
      className={sidebarHidden ? 'sidebar-hidden' : ''}
      style={{
        display: 'grid',
        height: '100vh',
        gridTemplateColumns: sidebarHidden ? '1fr 0px' : '1fr 450px',
        transition: 'grid-template-columns 0.3s ease',
      }}
    >
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-3">
          <div className={`rounded-full p-1 ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
            {toastType === 'success' ? (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
              </svg>
            ) : (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            )}
          </div>
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Contract Document Panel */}
      <ContractDocument
        isEditing={isEditing}
        onToggleEdit={() => setIsEditing(!isEditing)}
        onToggleSidebar={() => setSidebarHidden(!sidebarHidden)}
        elementStates={elementStates}
        contractData={contractData}
        onScrollToCard={scrollToCard}
      />

      {/* AI Studio Panel */}
      <AIStudioPanel
        hidden={sidebarHidden}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onToggleSidebar={() => setSidebarHidden(!sidebarHidden)}
        counts={counts}
        contractData={contractData}
        onApplySuggestion={applySuggestion}
        onDeclineSuggestion={declineSuggestion}
        onUpdateSuggestion={updateAISuggestion}
        redlineRef={redlineRef}
      />
    </div>
  )
}
