import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post('http://127.0.0.1:8000/api/chat/', { input });
        setResponse(res.data.response);
    } catch (error) {
        setResponse('Error: ' + error.message);
    }
};


  return (
    <div>
      <h1>ChatGPT Wrapper</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Ask something..."
        />
        <button type="submit">Send</button>
      </form>
      <div>
        <p><strong>Response:</strong> {response}</p>
      </div>
    </div>
  );
}

export default App;
