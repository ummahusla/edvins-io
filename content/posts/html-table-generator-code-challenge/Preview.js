import React, { useState, useEffect } from 'react';

const Preview = () => {
  const [requiredRows, setRequiredRows] = useState(0);
  const [requiredColumns, setRequiredColumns] = useState(0);
  const [tableHTML, setTableHTML] = useState(null);

  const generateTable = () => {
    if (requiredRows !== 0 && requiredColumns !== 0) {
      setTableHTML(null);

      let rows = [];

      for (let row = 1; row <= requiredRows; row++) {
        let cells = [];

        for (let column = 1; column <= requiredColumns; column++) {
          cells.push(
            <td
              key={column}
              style={{
                border: '1px solid black',
                width: '50px',
                height: '50px',
              }}
            ></td>
          );
        }

        rows.push(
          <tr
            key={row}
            style={{
              width: '50px',
              height: '50px',
            }}
          >
            {cells}
          </tr>
        );
      }

      setTableHTML(<tbody>{rows}</tbody>);
    }
  };

  return (
    <div>
      <h2>Table Generator</h2>
      <label
        style={{
          display: 'flex',
          marginTop: '10px',
        }}
      >
        Number of rows
      </label>
      <input
        type="number"
        value={requiredRows}
        min={1}
        onChange={(e) => setRequiredRows(Number(e.target.value))}
        style={{
          marginTop: '10px',
        }}
      />
      <label
        style={{
          display: 'flex',
          marginTop: '10px',
        }}
      >
        Number of columns
      </label>
      <input
        type="number"
        value={requiredColumns}
        min={1}
        onChange={(e) => setRequiredColumns(Number(e.target.value))}
        style={{
          marginTop: '10px',
        }}
      />
      <button
        onClick={generateTable}
        style={{
          marginTop: '10px',
          display: 'flex',
        }}
      >
        Submit
      </button>

      {tableHTML && (
        <>
          <h2>Table preview</h2>
          <table
            style={{
              marginTop: '10px',
              border: '1px solid black',
            }}
          >
            {tableHTML}
          </table>
        </>
      )}
    </div>
  );
};

export default Preview;
