import { Loader2, Zap } from "lucide-react"

export interface AIAnalysisButtonProps {
  analyzing: boolean
  analyzeContracts?: () => void
}
export const AIAnalysisButton = ({
  analyzing,
  analyzeContracts,
}: AIAnalysisButtonProps) => {
  return (
    <div className="flex justify-between">
      <div></div>
      <button
        onClick={analyzeContracts}
        // disabled={selectedRoles.length === 0 || !files.doc1 || analyzing || (selectedRoles.includes('comparison') && !files.doc2)}
        className=" px-8 py-4 bg-red-600 text-white rounded-lg font-semibold text-lg shadow-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-3"
      >
        {analyzing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Analyzing Contracts...
          </>
        ) : (
          <>
            <Zap className="w-5 h-5" />
            Start AI Analysis
          </>
        )}
      </button>
    </div>


  )
}