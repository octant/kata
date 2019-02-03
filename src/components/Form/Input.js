import React, { useContext, useEffect } from "react";

export default function({ name, context }) {
  const { inputs, inputDispatcher } = useContext(context);
  const { label, type } = inputs.schema[name];
  const set = e =>
    inputDispatcher({
      type: "set",
      payload: { [e.target.name]: e.target.value }
    });

  useEffect(() => {
    console.log("rendering input..." + name);
  }, [inputs.values[name]]);

  return (
    <div>
      <label htmlFor={name}>{label}: </label>
      <input
        name={name}
        value={inputs.values[name]}
        onChange={set}
        type={type}
      />
    </div>
  );
}
