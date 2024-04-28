import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CodeDisplay from "./CodeDisplay";
import generateCypressCode from "./ai/generateCypressCode";

function App() {
  const [description, setDescription] = useState("");
  const [testCode, setTestCode] = useState("");
  const [debugResponse, setDebugResponse] = useState("");
  const [identifier, setIdentifier] = useState("id");
  const [steps, setSteps] = useState("");
  const [customIdentifier, setCustomIdentifier] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleStepsChange = (event) => {
    setSteps(event.target.value);
  };

  const handleSubmit = async () => {
    if (!description) {
      alert("Vyplň popis testu!");
      return;
    }
    setLoading(true); // Start loading
    const activeIdentifier =
      identifier === "other" ? customIdentifier : identifier;
    const generatedObject = await generateCypressCode(
      description,
      activeIdentifier,
      steps
    );
    setTestCode(generatedObject.testCode);
    setDebugResponse(generatedObject.debugResponse);
    setLoading(false); // Stop loading
  };

  const handleIdentifierChange = (event) => {
    setIdentifier(event.target.value);
    if (event.target.value !== "other") {
      setCustomIdentifier("");
    }
  };

  const handleCustomIdentifierChange = (event) => {
    setCustomIdentifier(event.target.value);
  };

  return (
    <div className="container mt-5">
      <div className="logo-container">
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="Tredgate Logo"
          className="logo"
          data-testid="logo-img"
        />
      </div>
      <div className="content">
        <h1>Generátor Cypress test kódu</h1>
        <div className="form-group">
          <label htmlFor="description" className="labelTitle">
            Popis testu
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
          <label htmlFor="steps" className="labelTitle">
            Kroky testu
          </label>
          <textarea
            className="form-control"
            id="steps"
            rows="3"
            value={steps}
            onChange={handleStepsChange}
          ></textarea>
          <label htmlFor="identifiers" className="labelTitle">
            Identifikátory elementů
          </label>
          <br />
          <input
            type="radio"
            id="id"
            name="identifiers"
            value="id"
            onChange={handleIdentifierChange}
            checked={identifier === "id"}
          />
          <label htmlFor="id">id</label>
          <br />
          <input
            type="radio"
            id="class"
            name="identifiers"
            value="class"
            onChange={handleIdentifierChange}
            checked={identifier === "class"}
          />
          <label htmlFor="class">class</label>
          <br />
          <input
            type="radio"
            id="data-testid"
            name="identifiers"
            value="data-testid"
            onChange={handleIdentifierChange}
            checked={identifier === "data-testid"}
          />
          <label htmlFor="data-testid">data-testid</label>
          <br />
          <input
            type="radio"
            id="other"
            name="identifiers"
            value="other"
            onChange={handleIdentifierChange}
            checked={identifier === "other"}
          />
          <label htmlFor="other">Jiný</label>
          {identifier === "other" && (
            <input
              type="text"
              id="other-input"
              className="form-control mt-2"
              value={customIdentifier}
              onChange={handleCustomIdentifierChange}
              placeholder="Vyplň jiný identifikátor"
            />
          )}
          <br />
        </div>
        <button className="btn btn-primary mt-3" onClick={handleSubmit}>
          Vygeneruj kód
        </button>
        {loading && <div className="loader">Generuji...</div>}
        <div className="mt-4">
          <div className="mt-4">
            <h3>Vygenerovaný Cypress kód:</h3>
            <CodeDisplay code={testCode} />
          </div>
        </div>
        <div className="mt-4">
          <h3>ChatGPT odpověď (debug)</h3>
          <pre>{debugResponse || "Odpověď z GPT pro debug"}</pre>
        </div>
      </div>
    </div>
  );
}
export default App;
