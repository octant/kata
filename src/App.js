import React from "react";

import "./App.css";

import Form from "./components/Form";
import { person, vehicle } from "./inputs";

function App() {
  return (
    <>
      <Form schema={person} name="husband" />
      <Form schema={vehicle} name="wife" />
    </>
  );
}

export default App;
