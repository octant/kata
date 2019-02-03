import React, { useContext } from "react";

export default function Controls({ context }) {
  const { inputs, inputDispatcher } = useContext(context);
  return (
    <div>
      <button onClick={() => console.log(inputs.values)}>submit</button>
      <button onClick={() => inputDispatcher({ type: "reset" })}>Reset</button>
    </div>
  );
}
