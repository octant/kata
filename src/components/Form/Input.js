import React, { useContext, useEffect } from "react";

export default function({ name, definition, context }) {
  const { inputs, inputDispatcher } = useContext(context);
  const { label, type } = definition;
  const set = e =>
    inputDispatcher({
      type: "set",
      name: e.target.name,
      value: e.target.value
    });

  useEffect(() => {
    console.log("rendering input..." + name);
  }, [inputs[name]]);

  return (
    <div>
      <label htmlFor={name}>{label}: </label>
      <input name={name} value={inputs[name]} onChange={set} type={type} />
    </div>
  );
}
