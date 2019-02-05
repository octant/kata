import React, { useContext } from "react";

export default function Controls({ context }) {
  const { form, formDispatcher } = useContext(context);

  return (
    <div>
      <button
        disabled={Object.keys(form.errors).length > 0}
        onClick={() => console.log(form.values)}
      >
        submit
      </button>
      <button onClick={() => formDispatcher({ type: "reset" })}>Reset</button>
    </div>
  );
}
