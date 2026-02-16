import { Download, CheckCircle, XCircle } from 'lucide-react';
import { AuditResult } from '../lib/supabase';
import { downloadCSV } from '../lib/csvParser';

interface ResultsTableProps {
  results: AuditResult[];
  sessionName: string;
}

export function ResultsTable({ results, sessionName }: ResultsTableProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border-2 border-gray-200">
        <p className="text-gray-500">No audit results available</p>
      </div>
    );
  }

  const handleDownload = () => {
    const exportData = results.map(result => ({
      'Buylead ID': result.eto_ofr_display_id,
      'Category ID': result.fk_glcat_mcat_id,
      'Category Name': result.category_name,
      'Quantity': result.quantity,
      'Unit': result.quantity_unit,
      'BL Segment': result.bl_segment,
      'Indiamart Audit Outcome': result.indiamart_audit_outcome,
      'Threshold Available': result.threshold_available ? 'Yes' : 'No',
      'Indiamart Category': result.indiamart_category,
      'Indiamart Reason': result.indiamart_reason,
      'LLM BL Type': result.llm_bl_type,
      'LLM Threshold Value': result.llm_threshold_value || 'N/A',
      'LLM Threshold Reason': result.llm_threshold_reason,
    }));

    downloadCSV(exportData, `${sessionName}_audit_results.csv`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Audit Results</h3>
          <p className="text-sm text-gray-600 mt-1">{results.length} records processed</p>
        </div>
        <button
          onClick={handleDownload}
          className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
        >
          <Download className="h-4 w-4 mr-2" />
          Download CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Buylead ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Segment
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Audit Outcome
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Threshold
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Classification
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                LLM Type
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {results.map((result, index) => (
              <tr key={result.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 text-sm text-gray-900 font-mono">
                  {result.eto_ofr_display_id}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  <div className="max-w-xs truncate" title={result.category_name}>
                    {result.category_name}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {result.quantity} {result.quantity_unit}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {result.bl_segment}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center">
                    {result.indiamart_audit_outcome === 'Pass' ? (
                      <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <span className={result.indiamart_audit_outcome === 'Pass' ? 'text-green-700' : 'text-red-700'}>
                      {result.indiamart_audit_outcome}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-center">
                  {result.threshold_available ? (
                    <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600 mx-auto" />
                  )}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-teal-100 text-teal-800">
                    {result.indiamart_category}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                    {result.llm_bl_type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
