import React from "react";

import "./App.css";

import Form from "./components/Form";
import Input from "./components/Form/Input";
import Controls from "./components/Form/Controls";
import { person, vehicle } from "./inputs";

function App() {
  return (
    <>
      <Form schema={person} values={{ firstName: "Michael" }}>
        <h3>Personal Information</h3>
        <Input name="firstName" />
        <Input name="lastName" />
        <Input name="age" />
        <Controls />
      </Form>
      <Form schema={vehicle}>
        <h3>Vehicle Information</h3>
        <Input name="make" />
        <Input name="model" />
        <Input name="year" />
        <Input name="color" />
        <Controls />
      </Form>
    </>
  );
}

export default App;
