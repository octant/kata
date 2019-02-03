import React from "react";

import "./App.css";

import Form from "./components/Form";
import inputs from "./inputs";

function App() {
  return (
    <>
      <Form defs={inputs} name="husband" />
      <Form defs={inputs} name="wife" />
    </>
  );
}

export default App;
