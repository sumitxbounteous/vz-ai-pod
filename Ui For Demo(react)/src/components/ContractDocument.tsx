interface Props {
  isEditing: boolean
  onToggleEdit: () => void
  onToggleSidebar: () => void
  elementStates: Record<string, string>
  contractData: Record<number, { id: string; proposed_draft: string; ai_suggestion: string }>
  onScrollToCard: (id: number) => void
}

export function ContractDocument({ 
  isEditing, 
  onToggleEdit, 
  onToggleSidebar,
  elementStates,
  contractData,
  onScrollToCard
}: Props) {

  const getElementText = (docChangeId: string, proposedText: string) => {
    return elementStates[docChangeId] || proposedText
  }

  const getElementClass = (docChangeId: string, hasBeenUpdated: boolean) => {
    if (!hasBeenUpdated) return 'review-needed'
    const state = elementStates[docChangeId]
    if (state === contractData[1]?.ai_suggestion || 
        state === contractData[2]?.ai_suggestion ||
        state === contractData[3]?.ai_suggestion ||
        state === contractData[4]?.ai_suggestion ||
        state === contractData[5]?.ai_suggestion ||
        state === contractData[6]?.ai_suggestion) {
      return 'ai-accepted'
    }
    return 'ai-declined'
  }

  const hasBeenUpdated = (docChangeId: string) => docChangeId in elementStates

  return (
    <div className="flex flex-col overflow-hidden border-r-2 border-gray-200 bg-white">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-200 px-6 py-3 shadow-sm z-20 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16M4 20h16M16 12l4-4m0 0l-4-4m4 4H8"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Document Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="sticky top-0 bg-white/95 backdrop-blur z-10 px-8 py-3 border-b border-gray-200 flex items-center justify-between">
          <span className="text-xs font-bold text-gray-900 tracking-tight">Version 2.0 (January 2026)</span>
          <button
            onClick={onToggleEdit}
            id="global-edit-btn"
            className="text-xs font-bold text-red-600 hover:bg-red-50 px-3 py-1.5 rounded transition-all"
          >
            {isEditing ? 'Save Changes' : 'Edit Document'}
          </button>
        </div>

        <div
          id="contract-content"
          className="px-12 py-10 max-w-4xl mx-auto"
          contentEditable={isEditing}
          suppressContentEditableWarning
          style={{
            outline: isEditing ? '2px dashed #ED1C24' : 'none',
            outlineOffset: isEditing ? '10px' : '0',
            backgroundColor: isEditing ? '#fffbf7' : 'transparent',
          }}
        >
          {/* Section 1 - Definitions */}
          <section id="doc-wrapper-1" className="pb-10 mb-10 border-b border-gray-200 p-4 transition-all duration-300">
            <div className="text-xs text-gray-500 mb-1.5 uppercase font-bold">Section 1</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Definitions</h2>
            <div className="space-y-4">
              <p className="text-base font-semibold text-gray-900 leading-relaxed">
                Customer Agreement for Verizon Wireless Internet Data Services
              </p>
              <p className="text-base text-gray-700 leading-relaxed">
                Thank you for choosing Verizon Wireless. In this Customer Agreement, you'll find important information about your Verizon Wireless Internet Data service offered through Hyundai Motor America.
              </p>
              <ul className="list-disc list-inside space-y-2 text-base text-gray-700 ml-4">
                <li>Our ability to make changes to your Service or this Agreement's terms.</li>
                <li>Our liability if things don't work as planned and how disputes must be resolved.</li>
                <li>Your rights and responsibilities as a customer.</li>
              </ul>
            </div>
          </section>

          {/* Section 2 - Service Level Agreement */}
          <section id="doc-wrapper-2" className="pb-10 mb-10 border-b border-gray-200 p-4 transition-all duration-300">
            <div className="text-xs text-gray-500 mb-1.5 uppercase font-bold">Section 2</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-5">Service Level Agreement</h2>
            
            <div className="space-y-5">
              <div>
                <p className="text-base font-semibold text-gray-900 mb-3">1. Mobile Solutions</p>
                <p className="text-base text-blue-600 hover:text-blue-700 underline cursor-pointer mb-3"
                   onClick={() => onScrollToCard(1)}>
                  Service credits shall be issued for interruptions exceeding{' '}
                  <span
                    id="doc-change-1"
                    className={getElementClass('doc-change-1', hasBeenUpdated('doc-change-1'))}
                  >
                    {getElementText('doc-change-1', contractData[1].proposed_draft)}
                  </span>
                </p>
                <p className="text-base text-gray-700 leading-relaxed">
                  We propose providing additional smartphones and tablets for your growing workforce, alongside upgrading existing mobile lines to leverage the full capabilities of Verizon's network.
                </p>
              </div>

              <div>
                <p className="text-base font-semibold text-gray-900 mb-2">Benefits:</p>
                <p className="text-base text-gray-700 leading-relaxed">
                  Enhanced Mobility: Empower employees with cutting-edge devices for on-the-go productivity and customer interaction. Cost Optimization: Leverage enterprise-grade pricing for maximum ROI. Network Quality: Access Verizon's most reliable nationwide 4G LTE coverage.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 - Payment Terms */}
          <section id="doc-wrapper-3" className="pb-10 mb-10 border-b border-gray-200 p-4 transition-all duration-300">
            <div className="text-xs text-gray-500 mb-1.5 uppercase font-bold">Section 3</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-5">Payment Terms & Billing</h2>
            
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-base font-semibold text-gray-900 mb-3">Invoicing Schedule</p>
                <p className="text-base text-gray-700 mb-3">
                  Invoices are due within{' '}
                  <span
                    id="doc-change-3"
                    className={getElementClass('doc-change-3', hasBeenUpdated('doc-change-3'))}
                    onClick={() => onScrollToCard(3)}
                    style={{ cursor: 'pointer' }}
                  >
                    {getElementText('doc-change-3', contractData[3].proposed_draft)}
                  </span>
                </p>
                <p className="text-base text-gray-700">
                  Payment should be made via ACH transfer or wire transfer to the designated account. Late payments may be subject to a 1.5% monthly interest charge.The Maine Broadband Internet Access Service Customer Privacy Act, effective on July 1, 2020, gives you additional privacy rights when we are your broadband Internet access service provider. The Maine law gives you the right to control certain ways that we use or share information we have about you and requires that we provide you with a notice of your rights and our obligations under this law. We do this in this section.The Maine law also requires us to take reasonable measures to protect your customer personal information. We describe this in our privacy policy.We will not use, disclose, sell, or permit access to your broadband customer personal information except for purposes allowed under the Maine law or with your affirmative consent. We may ask you for this consent when we interact with you. For example, we may ask to use your broadband customer personal information to market additional services to you when you call us or come into our stores.The Maine law also provides you with a right to opt-out of any use or sharing of data that is not customer personal information under the law. At this time, we do not collect information about you as a broadband customer that is not customer personal information. If we begin collecting such information in the future, we will give you the right to opt out of its use and sharing.We will not refuse to provide you with broadband service, charge you a penalty, or offer you a discount based on whether you agree that we can use or share your broadband customer personal information.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 - Liability & Data Security */}
          <section id="doc-wrapper-4" className="pb-10 mb-10 border-b border-gray-200 p-4 transition-all duration-300">
            <div className="text-xs text-gray-500 mb-1.5 uppercase font-bold">Section 4</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-5">Liability & Data Security</h2>
            
            <div className="space-y-5">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-base font-semibold text-gray-900 mb-3">Liability Cap for Data Breaches</p>
                <p className="text-base text-gray-700">
                  Provider liability for data breaches shall be{' '}
                  <span
                    id="doc-change-2"
                    className={getElementClass('doc-change-2', hasBeenUpdated('doc-change-2'))}
                    onClick={() => onScrollToCard(2)}
                    style={{ cursor: 'pointer' }}
                  >
                    {getElementText('doc-change-2', contractData[2].proposed_draft)}
                  </span>
                </p>
              </div>

              <div>
                <p className="text-base font-semibold text-gray-900 mb-2">Security Measures</p>
                <p className="text-base text-gray-700 leading-relaxed">
                  Verizon implements enterprise-grade security protocols including 256-bit encryption, multi-factor authentication, and continuous monitoring to protect your data and network infrastructure.Indirect, incidental, punitive, or consequential damages are excluded entirely.Wireless devices, including in-vehicle hotspots, use radio transmissions, so unfortunately you can't get Service if your device isn't in range of a transmission signal. And please be aware that even within your Coverage Area, many things can affect the availability and quality of your Service, including network capacity, your device, terrain, buildings, foliage and weather.If you lose Service in your Coverage Area for more than 24 hours in a row and we're at fault, call us within 180 days and we'll give you a credit for the time lost. Please be aware that these are your only rights for dropped calls or interrupted Service.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 - Confidentiality */}
          <section id="doc-wrapper-5" className="pb-10 mb-10 border-b border-gray-200 p-4 transition-all duration-300">
            <div className="text-xs text-gray-500 mb-1.5 uppercase font-bold">Section 5</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-5">Data Protection & Confidentiality</h2>
            
            <div className="space-y-5">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-base font-semibold text-gray-900 mb-2">Data Protection Compliance</p>
                <p className="text-base text-gray-700">
                  <span
                    id="doc-change-5"
                    className={getElementClass('doc-change-5', hasBeenUpdated('doc-change-5'))}
                    onClick={() => onScrollToCard(5)}
                    style={{ cursor: 'pointer' }}
                  >
                    {getElementText('doc-change-5', contractData[5].proposed_draft)}
                  </span>
                </p>
              </div>

              <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                <p className="text-base font-semibold text-gray-900 mb-2">Confidentiality Duration</p>
                <p className="text-base text-gray-700">
                  All obligations concerning confidentiality shall continue to{' '}
                  <span
                    id="doc-change-6"
                    className={getElementClass('doc-change-6', hasBeenUpdated('doc-change-6'))}
                    onClick={() => onScrollToCard(6)}
                    style={{ cursor: 'pointer' }}
                  >
                    {getElementText('doc-change-6', contractData[6].proposed_draft)}
                  </span>{' '}
                  post-termination of this agreement.Subprocessors require written approval.As described in the HMA Connected Services Agreement Terms and Conditions, available at: https://owners.hyundaiusa.com/us/en/terms-and-conditions, all billing and payment will be conducted by HMA as part of your subscription and data plan purchased through HMA.We can, without notice, limit, suspend or end your Service or any agreement with you for any good cause, including, but not limited to: (1) if you: (a) breach this agreement or violate our prohibited usage policies; (b) resell your Service; (c) use your Service for any illegal purpose, including use that violates trade and economic sanctions and prohibitions promulgated by any US governmental agency; (d) install, deploy or use any regeneration equipment or similar mechanism (for example, a repeater) to originate, amplify, enhance, retransmit or regenerate an RF signal without our permission; (e) steal from or lie to us; or (2) if you, or any user of your device or any line of service on your account, or any account manager on your account: (a) threaten, harass, or use vulgar and/or inappropriate language toward our representatives; (b) interfere with our operations; (c) "spam," or engage in other abusive messaging or calling; (d) modify your device from its manufacturer’s specifications; or (e) use your Service in a way that negatively affects our network or other customers. We can also temporarily limit your Service for any operational or governmental reason.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 - Term & Termination */}
          <section id="doc-wrapper-6" className="pb-10 mb-10 p-4 transition-all duration-300">
            <div className="text-xs text-gray-500 mb-1.5 uppercase font-bold">Section 6</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-5">Term & Termination</h2>
            
            <div className="space-y-4">
              <p className="text-base text-gray-600"><strong>Initial Term:</strong> 3 years from the Effective Date</p>
              <p className="text-base text-gray-600"><strong>Renewal:</strong> Automatically renews for successive 1-year terms unless either party provides 90 days' written notice of non-renewal</p>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-4">
                <p className="text-base font-semibold text-gray-900 mb-3">Early Termination</p>
                <p className="text-base text-gray-700">
                  Either party may terminate for material breach if not cured within 30 days of written notice. Customer may terminate for convenience with{' '}
                  <span
                    id="doc-change-4"
                    className={getElementClass('doc-change-4', hasBeenUpdated('doc-change-4'))}
                    onClick={() => onScrollToCard(4)}
                    style={{ cursor: 'pointer' }}
                  >
                    {getElementText('doc-change-4', contractData[4].proposed_draft)}
                  </span>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
