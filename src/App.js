import React, { useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import Navbar from "./Components/Navbar";
import './App.css';
import spinner from "./Icons/wheel-spinner-svgrepo-com.svg";

const App = () => {
  //This is for users wirtten code.
  const [sourceCode, setSourceCode] = useState("");

  //This is the code for users language.
  const [defaultLanguage, setDefaultLanguage] = useState("c");

  //Thid is for theme.
  const [defaultTheme, setDefaultTheme] = useState("light")

  //This is for editors font size.
  const [defaultFontSize, setDefaultFontSize] = useState(20);
  
  //This is for users input.
  const [userInput, setUserInput] = useState("");

  //This state fo output.
  const [userOuptut, setUserOutput] = useState("");

  //This is for loading Spinner while fetching data.
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  //Function to call the compile endpoint
  const CodeCompile = () => {
      setLoadingSpinner(true)
      if (sourceCode === ``) {
        return
      }
      axios.post(`http://localhost:8000/compile`, {
      code: sourceCode,
      language: defaultLanguage,
      input: userInput }).then((res) => {
      setUserOutput(res.data.output);
    }).then(() => {
      setLoadingSpinner(false);
    })
  
  }
  const options = {
    fontSize: defaultFontSize
  }
  // Function to clear the output screen
  const clearOutput = () => {
      setUserOutput("");
    }
  
  return (
    <div className="App">
      <Navbar 
        defaultLanguage={defaultLanguage} setDefaultLanguage={setDefaultLanguage}
        defaultTheme={defaultTheme} setDefaultTheme={setDefaultTheme}
        defaultFontSize={defaultFontSize} setDefaultFontSize={setDefaultFontSize}
      />
      <div className="container-main">
        <div className="code-container">
          <Editor
              options={options}
              height="90vh"
              width="100%"
              theme={defaultTheme}
              language={defaultLanguage}
              defaultLanguage="python"
              defaultValue="#### ----- Code Here ----- ####"
              onChange={(value) => { setSourceCode(value) }}
            />
            <button className="code-runButton" onClick={CodeCompile}>Run</button>
        </div>
        <div className="inputOutput-container">
        
          <h4>Input:</h4>
          <div className="text-areaBox">
            <textarea id="code-source" onChange=
              {(e) => setUserInput(e.target.value)}>
            </textarea>
          </div>
          {loadingSpinner ? (
            <div className="loading-spinnerIcon">
              <img src={spinner} alt="Loading.." />
            </div>
          ): (
            <div className="output-Box">
          <h4>Output:</h4>
              <pre>{userOuptut}</pre>
              <button onClick={() => { clearOutput() }}
                 className="clear-btn">
                 Clear
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App;
