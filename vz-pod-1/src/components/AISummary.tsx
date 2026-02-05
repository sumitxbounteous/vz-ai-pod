import React from 'react';
import { 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Mail, 
  FileText, 
  Download, 
  Copy,
  ChevronRight,
  Target,
  Shield
} from 'lucide-react';

const AISummary: React.FC = () => {
  const riskItems = [
    {
      id: 1,
      severity: 'High Risk',
      severityColor: 'bg-orange-100 text-orange-800',
      title: 'Warranty Disclaimer (Section 11)',
      description: 'Complete removal of implied warranties - no legal recourse for service failures',
      recommendation: 'Restore warranties or negotiate explicit performance guarantees',
      badge: 'R1'
    },
    {
      id: 2,
      severity: 'High Risk',
      severityColor: 'bg-orange-100 text-orange-800',
      title: 'Service Threshold (Section 8)',
      description: 'SLA changed from 4 hours to 24 hours - eliminates accountability',
      recommendation: 'Counter-propose 8-hour threshold with escalating credits',
      badge: 'R1'
    },
    {
      id: 3,
      severity: 'Neutral',
      severityColor: 'bg-yellow-100 text-yellow-800',
      title: 'Service Modification (Section 5)',
      description: 'Unilateral right to modify service with 60-day notice',
      recommendation: 'Add clause requiring mutual agreement for material changes',
      badge: 'N2'
    },
    {
      id: 4,
      severity: 'Favorable',
      severityColor: 'bg-green-100 text-green-800',
      title: "Verizon's Right to Assign (Section 5)",
      description: 'High-speed data allowance tripled from 5GB to 15GB',
      recommendation: 'Ensure retention in final draft while negotiating other high-priority reversals.',
      badge: 'F2'
    }
  ];

  const integrityChecks = [
    'Internal terminology aligned across all sections',
    'All cross-references validated (MSA R2ay;ECU)',
    'Legal compliance confirmed'
  ];

  const oneClickOutputs = [
    { icon: Mail, label: 'Draft Internal Email' },
    { icon: FileText, label: 'Export PDF Summary' },
    { icon: Download, label: 'Download Redlines' },
    { icon: Copy, label: 'Copy Exec Summary' }
  ];

  const nextSteps = [
    {
      step: 1,
      title: 'Share with legal team',
      subtitle: 'Today',
      action: null
    },
    {
      step: 2,
      title: 'Draft counter-proposal',
      subtitle: 'Within 48 hours',
      action: 'Review Draft'
    },
    {
      step: 3,
      title: 'Schedule negotiation call',
      subtitle: 'Next week',
      action: null
    },
    {
      step: 4,
      title: 'Submit formal counter-proposal',
      subtitle: 'After call',
      action: null
    }
  ];

  const negotiationStrategies = [
    {
      title: 'Warranty & Service Bundle',
      sections: 'Sections 11 & 8',
      description: 'Restore implied warranties + reduce SLA to 8 hours'
    },
    {
      title: 'Service Modification Safeguards',
      sections: 'Section 5 & 2',
      description: 'Accept 60-day notice + require approval for downgrades'
    }
  ];

  const recommendations = [
    {
      type: 'Critical',
      color: 'bg-orange-50 text-orange-800 border-orange-200',
      text: 'Do not accept Version 2 as-is - counter-proposal required'
    },
    {
      type: 'Strategic',
      color: 'bg-blue-50 text-blue-800 border-blue-200',
      text: 'Use bundled negotiation to strengthen position'
    },
    {
      type: 'Tactical',
      color: 'bg-green-50 text-green-800 border-green-200',
      text: 'Reference industry standards (4-8 hour SLAs, UCC warranties)'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Version Info */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">Version 2.0</span>
            <span className="text-sm text-gray-500">(Jan 20, 2026)</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-green-700 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              4 Favorable
            </span>
            <span className="text-xs font-medium text-yellow-700 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              4 Neutral
            </span>
            <span className="text-xs font-medium text-red-700 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              2 High Risk
            </span>
          </div>
        </div>

        {/* Critical Recommendation Banner */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-5 mb-6 flex items-start gap-4">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5 text-orange-700" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-semibold text-orange-900 mb-1">AI Critical Recommendation</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Do Not Accept Without Negotiation</h3>
            <p className="text-sm text-gray-700">
              Version 2 contains critical warranty and service threshold risks that require immediate legal review.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {/* Total Changes */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Changes</span>
              <TrendingUp className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">10</div>
            <div className="text-xs text-gray-500">6 Additions, 4 Modifications</div>
          </div>

          {/* Favorable */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Favorable</span>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">4</div>
            <div className="text-xs text-gray-500">Beneficial rights & transparency</div>
          </div>

          {/* High Risk */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">High Risk</span>
              <AlertCircle className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">2</div>
            <div className="text-xs text-gray-500">Detrimental customer impact</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Risk Analysis & Negotiation Strategy */}
          <div className="col-span-2 space-y-6">
            {/* Risk Analysis */}
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-gray-700" />
                    <h2 className="text-lg font-semibold text-gray-900">1. Risk Analysis</h2>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-green-700 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      4 Favorable
                    </span>
                    <span className="text-yellow-700 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      4 Neutral
                    </span>
                    <span className="text-red-700 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      2 High Risk
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {riskItems.map((item) => (
                  <div key={item.id} className="border-l-4 border-gray-200 pl-4 py-2">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${item.severityColor}`}>
                          {item.badge}
                        </span>
                        <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{item.description}</p>
                    <div className="flex items-start gap-2 text-sm text-gray-900">
                      <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                      <span className="font-medium">{item.recommendation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Negotiation Strategy */}
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-gray-700" />
                  <h2 className="text-lg font-semibold text-gray-900">3. Negotiation Strategy</h2>
                </div>
                <span className="text-xs text-gray-600">Bundle for stronger position</span>
              </div>

              <div className="p-6 space-y-4">
                {negotiationStrategies.map((strategy, idx) => (
                  <div key={idx} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-semibold text-gray-900">{strategy.title}</h3>
                      <span className="text-xs text-gray-500">{strategy.sections}</span>
                    </div>
                    <p className="text-sm text-gray-700">{strategy.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-gray-700" />
                  <h2 className="text-lg font-semibold text-gray-900">4. Recommendations</h2>
                </div>
              </div>

              <div className="p-6 space-y-3">
                {recommendations.map((rec, idx) => (
                  <div key={idx} className={`border rounded-lg p-4 ${rec.color}`}>
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-bold px-2 py-1 bg-white rounded">
                        {rec.type}
                      </span>
                      <p className="text-sm flex-1">{rec.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Integrity Check */}
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="border-b border-gray-200 px-5 py-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-gray-700" />
                  <h2 className="text-base font-semibold text-gray-900">Integrity Check</h2>
                </div>
              </div>

              <div className="p-5 space-y-3">
                {integrityChecks.map((check, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span className="text-sm text-gray-700">{check}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* One-Click Outputs */}
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="border-b border-gray-200 px-5 py-4 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-gray-700" />
                <h2 className="text-base font-semibold text-gray-900">One-Click Outputs</h2>
              </div>

              <div className="p-5 space-y-2">
                {oneClickOutputs.map((output, idx) => {
                  const Icon = output.icon;
                  return (
                    <button
                      key={idx}
                      className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors text-left"
                    >
                      <Icon className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-900">{output.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="border-b border-gray-200 px-5 py-4 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-gray-700" />
                <h2 className="text-base font-semibold text-gray-900">Next Steps</h2>
              </div>

              <div className="p-5 space-y-4">
                {nextSteps.map((step) => (
                  <div key={step.step} className="flex gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-700">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-500 mb-2">{step.subtitle}</div>
                      {step.action && (
                        <button className="text-xs px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-1">
                          {step.action}
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISummary;
