import React from "react";

import "./App.css";

import Form from "./components/Form";
import input from "./components/Form/Input";
import Controls from "./components/Form/Controls";
import { person, vehicle } from "./inputs";
import Template from "./components/Templates/react-strap";

function App() {
  return (
    <div style={{ margin: `1.6em` }}>
      <Form schema={person} values={{ firstName: "Michael" }}>
        <h3>Personal Information</h3>
        <Input name="firstName" />
        <Input name="lastName" />
        <Input name="age" />
        <Controls />
      </Form>
      <hr />
      <Form schema={vehicle}>
        <h3>Vehicle Information</h3>
        <Input name="make" />
        <Input name="model" />
        <Input name="year" />
        <Input name="color" />
        <Controls />
      </Form>
    </div>
  );
}

const Input = input(Template);
export default App;
