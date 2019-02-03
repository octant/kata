import React, { useContext, useEffect } from "react";

import FormalInput from "./Input";
import schema from "../../inputs";
import { InputContext } from "../../contexts/Input";

export default function Form() {
  const { inputs, inputDispatcher } = useContext(InputContext);

  useEffect(() => {
    console.log("rendering form...");
  }, []);

  const reset = () => inputDispatcher({ type: "reset" });

  return (
    <>
      <h1>Formal Inputs</h1>
      <div>
        <FormalInput name="firstName" {...schema.firstName} />
      </div>
      <div>
        <FormalInput name="lastName" {...schema.lastName} />
      </div>
      <div>
        <FormalInput name="age" {...schema.age} />
      </div>
      <div>
        <button onClick={() => console.log(inputs)}>Submit</button>
        <button onClick={reset}>Reset</button>
      </div>
    </>
  );
}
