import React from "react";

import "./App.css";

import { person } from "./inputs";
import { Button, Form, Input } from "./components/Templates/reactstrap";

function App() {
  return (
    <div style={{ margin: `1.6em` }}>
      <Form
        schema={person}
        values={{ firstName: "Michael", email: "mwood@data-crush.com" }}
      >
        <h3>Personal Information</h3>
        <Input name="email" />
        <Input name="firstName" />
        <Input name="lastName" />
        <Input name="dob" />
        <Input name="numberOfSiblings" />
        <Input name="hasDriversLicense" />
        <Input name="topThree" />
        <Input name="upgrade" />
        <Input name="agree" />
        <hr />
        <Button
          color="primary"
          onClick={({ form }) => console.log(form.values)}
        >
          Submit
        </Button>{" "}
        <Button
          onClick={({ formDispatcher }) => formDispatcher({ type: "reset" })}
        >
          Reset
        </Button>
      </Form>
    </div>
  );
}

export default App;
