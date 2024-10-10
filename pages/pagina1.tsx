import React, { useState } from 'react';
import LoginWithReplit from './LoginWithReplit'; // Ensure the path is correct
const { getUserInfo } = require("@replit/repl-auth");
<script src="https://replit.com/public/js/repl-auth-v2.js"></script>

const Pagina1 = () => {
  const [att1Value, setAtt1Value] = useState('');
  const [apiResponse, setApiResponse] = useState(''); 
  const [token, setToken] = useState(''); // State to store the JWT token
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State for authentication

  const callApi = async () => {
    try {
      const response = await fetch('/api/api1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include token in the header
        },
        body: JSON.stringify({ att1: att1Value }),
      });
      const data = await response.json();
      setApiResponse(data.message);
      console.log('API Response:', data);
    } catch (error) {
      console.error('Error calling API:', error);
      setApiResponse('Error calling API');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAtt1Value(event.target.value);
  };

  const handleTokenChange = (newToken: string) => {
    setToken(newToken);
    setIsAuthenticated(true); // Set authenticated to true when a token is received
  };

  return (
    
    <div>
      <button onclick="LoginWithReplit()"> Login </button>
      <h1>Call api api1</h1>
      {/* Button to trigger Replit authentication */}      <button onClick={() => LoginWithReplit.handleReplitAuthLogin()}>Authenticate with Replit</button>      {/* ... rest of your UI ... */}
      <h1>Call api api1</h1>
      <LoginWithReplit onTokenChange={handleTokenChange} /> 
      <input 
        type="text" 
        value={att1Value} 
        onChange={handleChange} 
        placeholder="Enter att1 value" 
        disabled={!isAuthenticated} // Disable input if not authenticated
      />
      <button onClick={callApi} disabled={!isAuthenticated}>Send Data</button> 
      <p>API Response: {apiResponse}</p> 
      <p>JWT Token: {token}</p> 
    </div>
  );
};

export default Pagina1;