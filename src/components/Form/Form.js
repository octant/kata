import React, { useContext, useEffect } from "react";

import FormalInput from "./Input";

export default function Form({ context, schema }) {
  const { inputs, inputDispatcher } = useContext(context);

  useEffect(() => {
    console.log("rendering form...");
  }, []);

  const reset = () => inputDispatcher({ type: "reset" });

  return (
    <>
      <h1>Formal Inputs</h1>
      {Object.entries(schema).map(([name, definition]) => (
        <FormalInput
          key={name}
          name={name}
          definition={definition}
          context={context}
        />
      ))}

      <div>
        <button onClick={() => console.log(inputs)}>Submit</button>
        <button onClick={reset}>Reset</button>
      </div>
    </>
  );
}
