import React from "react";

import "./App.css";

import Form from "./components/Form";
import { person, vehicle } from "./inputs";

function App() {
  return (
    <>
      <Form schema={person} />
      <Form schema={vehicle} />
    </>
  );
}

export default App;
