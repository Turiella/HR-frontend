import React from 'react';
import type { Candidate } from '../types';

interface ExportOptionsProps {
  candidates: Candidate[];
  onExportCSV: () => void;
  onExportPDF: () => void;
}

export const ExportOptions: React.FC<ExportOptionsProps> = ({
  candidates,
  onExportCSV,
  onExportPDF
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={onExportCSV}
        className="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-500 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
      >
        <span className="flex items-center">
          <span className="mr-2">📊</span>
          Exportar CSV
          <span className="ml-2 text-xs bg-green-700 px-2 py-0.5 rounded">
            {candidates.length} candidatos
          </span>
        </span>
      </button>
      <button
        onClick={onExportPDF}
        className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
      >
        Exportar PDF
      </button>
    </div>
  );
};
