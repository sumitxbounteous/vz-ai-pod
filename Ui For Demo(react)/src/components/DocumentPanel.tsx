import { useState } from 'react'

interface DocumentPanelProps {
  isEditing: boolean
  onToggleEdit: () => void
  onToggleSidebar: () => void
}

export function DocumentPanel({ isEditing, onToggleEdit, onToggleSidebar }: DocumentPanelProps) {
  const [documentContent, setDocumentContent] = useState<string>('')

  const handleDocumentChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    setDocumentContent(e.currentTarget.innerHTML)
  }

  return (
    <div className="flex flex-col overflow-hidden border-r-2 border-gray-200 bg-white">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-200 px-6 py-3 shadow-sm z-20 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                Hyundai Motor America
              </div>
              <h1 className="text-xl font-bold text-red-600 leading-none">
                2026 Master Service Agreement
                <span className="px-1 py-0.6 bg-gray-200 border border-gray-400 rounded-md text-xs font-semibold text-gray-700 ml-2">
                  Draft
                </span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-5 py-2 bg-gray-900 text-white text-xs font-bold rounded hover:bg-gray-800 transition-colors">
              Submit
            </button>
            <button
              onClick={onToggleSidebar}
              className="p-2 hover:bg-gray-100 rounded border border-gray-200"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16M4 20h16M16 12l4-4m0 0l-4-4m4 4H8" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Document Panel */}
      <div id="document-panel" className="flex-1 overflow-y-auto">
        {/* Document Controls */}
        <div className="sticky top-0 bg-white/95 backdrop-blur z-10 px-8 py-3 border-b border-gray-200 flex items-center justify-between">
          <span className="text-xs font-bold text-gray-900 tracking-tight">
            Version 2.0 (January 2026)
          </span>
          <button
            onClick={onToggleEdit}
            className="text-xs font-bold text-red-600 hover:bg-red-50 px-3 py-1.5 rounded transition-all"
          >
            {isEditing ? 'Save Changes' : 'Edit Document'}
          </button>
        </div>

        {/* Document Content */}
        <div
          id="contract-content"
          className="px-12 py-10 max-w-4xl mx-auto"
          contentEditable={isEditing}
          onInput={handleDocumentChange}
          suppressContentEditableWarning
          style={{
            outline: isEditing ? '2px dashed #ED1C24' : 'none',
            outlineOffset: isEditing ? '10px' : '0',
            backgroundColor: isEditing ? '#fffbf7' : 'transparent',
          }}
        >
          {/* Introduction Section */}
          <section id="doc-wrapper-intro" className="pb-10 mb-10 border-b border-gray-200 p-4 transition-all duration-300">
            <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-tight">
              1. Parties & Effective Date
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-2">
              This Master Service Agreement ("Agreement") is effective as of January 1, 2026 ("Effective Date"), and is entered into by and between:
            </p>
            <ul className="text-sm text-gray-600 space-y-2 ml-4">
              <li>
                <strong>Provider:</strong> Hyundai Motor America, Inc., with principal offices at 10550 Sorrento Valley Road, San Diego, CA 92121
              </li>
              <li>
                <strong>Customer:</strong> Premium Fleet Solutions Inc., with principal offices at 1200 Enterprise Drive, Charlotte, NC 28205
              </li>
            </ul>
          </section>

          {/* Service Level Agreement Section */}
          <section id="doc-wrapper-1" className="pb-10 mb-10 border-b border-gray-200 p-4 transition-all duration-300">
            <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-tight">
              2. Service Level Agreement (SLA)
            </h2>
            <div className="space-y-3">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs font-bold text-blue-700 mb-1">SERVICE AVAILABILITY TARGET:</p>
                <p id="doc-section-2-content" className="text-sm text-gray-700">
                  Service credits shall be issued for interruptions exceeding 4 consecutive hours. Provider commits to 99.5% uptime for all critical services, measured monthly.
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-600">CREDIT SCHEDULE:</p>
                <table className="w-full text-xs text-gray-600 border border-gray-300">
                  <tbody>
                    <tr className="bg-gray-50 border-b border-gray-300">
                      <td className="p-2 font-bold">Uptime %</td>
                      <td className="p-2 font-bold">Credit %</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="p-2">99.0% - 99.4%</td>
                      <td className="p-2">10% of Monthly Fee</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="p-2">95.0% - 98.9%</td>
                      <td className="p-2">25% of Monthly Fee</td>
                    </tr>
                    <tr>
                      <td className="p-2">Below 95.0%</td>
                      <td className="p-2">50% of Monthly Fee</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Payment Terms Section */}
          <section id="doc-wrapper-payment" className="pb-10 mb-10 border-b border-gray-200 p-4 transition-all duration-300">
            <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-tight">
              3. Payment Terms & Fees
            </h2>
            <div className="space-y-3">
              <div id="doc-section-3-content" className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-xs font-bold text-green-700 mb-1">MONTHLY FEES:</p>
                <p className="text-sm text-gray-700">Base Service Fee: $15,000/month (billed in advance)</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-600">PAYMENT METHOD & SCHEDULE:</p>
                <ul className="text-sm text-gray-600 ml-4 space-y-1 list-disc">
                  <li>Payment due within 30 days of invoice date</li>
                  <li>Wire transfer to Provider's designated account</li>
                  <li>Late payments subject to 1.5% monthly interest</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Term & Termination Section */}
          <section id="doc-wrapper-term" className="pb-10 mb-10 border-b border-gray-200 p-4 transition-all duration-300">
            <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-tight">
              4. Term & Termination
            </h2>
            <div className="space-y-3">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="text-xs font-bold text-orange-700 mb-1">INITIAL TERM:</p>
                <p id="doc-section-6-content" className="text-sm text-gray-700">
                  Three (3) years from the Effective Date, unless terminated earlier in accordance with this Agreement.
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-600">RENEWAL & TERMINATION:</p>
                <ul className="text-sm text-gray-600 ml-4 space-y-1 list-disc">
                  <li>Either party may terminate with 90 days' written notice</li>
                  <li>Automatic renewal for one (1) year periods unless non-renewal notice given</li>
                  <li>Termination for convenience allowed with penalty if within initial term</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Confidentiality Section */}
          <section id="doc-wrapper-conf" className="pb-10 mb-10 border-b border-gray-200 p-4 transition-all duration-300">
            <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-tight">
              5. Confidentiality & Data Security
            </h2>
            <div className="space-y-3">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <p className="text-xs font-bold text-purple-700 mb-1">DATA PROTECTION:</p>
                <p id="doc-section-5-content" className="text-sm text-gray-700">
                  Provider shall maintain industry-standard security measures and comply with all applicable data protection laws.
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-600">CONFIDENTIAL INFORMATION:</p>
                <ul className="text-sm text-gray-600 ml-4 space-y-1 list-disc">
                  <li>All customer data is confidential and proprietary</li>
                  <li>Access restricted to authorized personnel only</li>
                  <li>Obligations survive termination of this Agreement</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
