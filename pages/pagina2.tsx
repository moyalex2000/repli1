import React, { useState } from 'react';
import { executeQuery } from './index'; // Or import from utils/database

const Pagina2 = () => {
  const [inputValue, setInputValue] = useState('');
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const sendJsonToApi = async () => {
    const json = JSON.stringify({ att1: inputValue });
    console.log("parametros: "+json.toString)
    try {
      const response = await fetch('/api/hello', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: json,
      });
      const data = await response.json();
      setResponseMessage(data.message);
    } catch (error) {
      console.error('Error sending data to API:', error);
      setResponseMessage('An error occurred while sending the data.');
    }
  };

  return (
    <div>
      <h1>Inserta en Mysql en el api hello</h1>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button onClick={sendJsonToApi}>Send to API</button>

      {responseMessage && (
        <div>
          <h2>API Response:</h2>
          <textarea rows={4} value={responseMessage} readOnly /> 
        </div>
      )}
    </div>
  );
};

export default Pagina2;