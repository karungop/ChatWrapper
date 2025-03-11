import React, { useState } from "react";
import OpenAI from "openai";

const App = () => {
  const [industry, setIndustry] = useState("");
  const [prompt, setPrompt] = useState("");
  const [expertType, setExpertType] = useState("");
  const [parameters, setParameters] = useState([{ key: "", value: "" }]);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  // Debugging: Log the API key to ensure it's being loaded correctly
  //console.log("API Key:", process.env.REACT_APP_OPENAI_API_KEY);

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true, // This allows frontend calls (NOT recommended for production)
  });

  // Debugging: Log the OpenAI object to ensure it's initialized correctly
  //console.log("OpenAI Object:", openai);

  const handleAddParameter = () => {
    setParameters([...parameters, { key: "", value: "" }]);
  };

  const handleRemoveParameter = (index) => {
    setParameters(parameters.filter((_, i) => i !== index));
  };

  const handleParameterChange = (index, keyOrValue, newValue) => {
    const updatedParams = [...parameters];
    updatedParams[index][keyOrValue] = newValue;
    setParameters(updatedParams);
  };

  const handleSubmit = async () => {
    setIsLoading(true); // Set loading state to true
    const fullPrompt = `Industry: ${industry}\nExpert: ${expertType}\n${prompt}`;

    // Debugging: Log the full prompt and parameters
    console.log("Full Prompt:", fullPrompt);
    console.log("Parameters:", parameters);

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4", // Ensure this is the correct model name
        messages: [{ role: "user", content: fullPrompt }],
        ...Object.fromEntries(parameters.map(({ key, value }) => [key, value])),
      });

      // Debugging: Log the completion response
      console.log("Completion:", completion);

      setResponse(completion.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse("Error: Unable to get response.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>ChatGPT Wrapper</h2>
      <input
        type="text"
        placeholder="Industry"
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
      />
      <input
        type="text"
        placeholder="Expert Type"
        value={expertType}
        onChange={(e) => setExpertType(e.target.value)}
      />
      <textarea
        placeholder="Enter your prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <h3>Additional Parameters</h3>
      {parameters.map((param, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Key"
            value={param.key}
            onChange={(e) => handleParameterChange(index, "key", e.target.value)}
          />
          <input
            type="text"
            placeholder="Value"
            value={param.value}
            onChange={(e) => handleParameterChange(index, "value", e.target.value)}
          />
          <button onClick={() => handleRemoveParameter(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddParameter}>Add Parameter</button>

      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Generating..." : "Generate Response"}
      </button>

      {response ? (
        <div>
          <h3>Response</h3>
          <p>{response}</p>
        </div>
      ) : (
        <p>No response yet. Submit a prompt to get a response.</p>
      )}
    </div>
  );
};

export default App;