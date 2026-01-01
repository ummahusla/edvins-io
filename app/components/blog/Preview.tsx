'use client';

import { useState } from 'react';

const Preview = () => {
  const [requiredRows, setRequiredRows] = useState(0);
  const [requiredColumns, setRequiredColumns] = useState(0);
  const [tableHTML, setTableHTML] = useState<JSX.Element | null>(null);

  const generateTable = () => {
    if (requiredRows !== 0 && requiredColumns !== 0) {
      setTableHTML(null);

      let rows: JSX.Element[] = [];

      for (let row = 1; row <= requiredRows; row++) {
        let cells: JSX.Element[] = [];

        for (let column = 1; column <= requiredColumns; column++) {
          cells.push(
            <td
              key={column}
              className="w-10 h-10 border border-slate-700 hover:bg-slate-800/60 transition-colors"
            />
          );
        }

        rows.push(<tr key={row}>{cells}</tr>);
      }

      setTableHTML(<tbody>{rows}</tbody>);
    }
  };

  return (
    <div className="relative overflow-hidden px-6 py-6 my-6 bg-slate-900 text-white rounded-xl">
      <div className="text-xl font-bold mb-1">HTML Table Generator</div>
      <p className="text-xs opacity-60 mb-4">Enter rows/columns and generate a table preview.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm opacity-75">Number of rows</span>
          <input
            type="number"
            value={requiredRows}
            min={1}
            onChange={(e) => {
              setRequiredRows(Number(e.target.value));
              setTableHTML(null);
            }}
            className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        <label className="block">
          <span className="text-sm opacity-75">Number of columns</span>
          <input
            type="number"
            value={requiredColumns}
            min={1}
            onChange={(e) => {
              setRequiredColumns(Number(e.target.value));
              setTableHTML(null);
            }}
            className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={generateTable}
          disabled={requiredRows <= 0 || requiredColumns <= 0}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition disabled:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Generate
        </button>
        {tableHTML && (
          <p className="text-xs text-slate-400">
            Showing {requiredRows} × {requiredColumns}
          </p>
        )}
      </div>

      {tableHTML && (
        <>
          <h3 className="text-sm font-semibold mt-6 mb-2">Preview</h3>
          <div className="overflow-auto rounded-lg border border-slate-800 bg-slate-950/40 p-3">
            <table className="border-separate border-spacing-0">{tableHTML}</table>
          </div>
        </>
      )}
    </div>
  );
};

export default Preview;
