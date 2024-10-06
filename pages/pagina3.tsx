import React, { useState } from 'react';
import { executeQuery } from './index'; // Or import from utils/database

const Pagina2 = () => {
  const [inputValue, setInputValue] = useState('');
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [tableData, setTableData] = useState<{ f1: string }[]>([]); // State for table data (array of objects)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const sendJsonToApi = async () => {
    const json = JSON.stringify({ att1: inputValue });
    console.log("parametros: "+json.toString)
    try {
      const response = await fetch('/api/hello1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: json,
      });
      const data = await response.json();
      setResponseMessage("["+data.message+"]");
      setTableData(data.result); // Update table data state
    } catch (error) {
      console.error('Error sending data to API:', error);
      setResponseMessage('An error occurred while sending the data.');
    }
  };

  return (
    <div>
      <h1>Query</h1>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button onClick={sendJsonToApi}>Send to API</button>

      {responseMessage && (
        <div>
          <h2>API Response:</h2>
          <textarea rows={4} value={responseMessage} readOnly />
        </div>
      )}

      {/* Table to display data */}
      {tableData.length > 0 && (
        <table style={{border:'1px solid black'}}>
          <thead>
            <tr>
              <th>f1</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.f1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Pagina2;