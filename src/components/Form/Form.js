import React, { useContext, useEffect } from "react";

import FormalInput from "./Input";

export default function Form({ context }) {
  const { inputs, inputDispatcher } = useContext(context);

  useEffect(() => {
    console.log("rendering form...");
  }, []);

  const reset = () => inputDispatcher({ type: "reset" });

  return (
    <>
      <h1>Formal Inputs</h1>
      {Object.keys(inputs.schema).map(name => (
        <FormalInput key={name} name={name} context={context} />
      ))}

      <div>
        <button onClick={() => console.log(inputs.values)}>Submit</button>
        <button onClick={reset}>Reset</button>
      </div>
    </>
  );
}
