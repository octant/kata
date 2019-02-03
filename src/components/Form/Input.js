import React, { useContext, useEffect } from "react";

export default function({ name, context }) {
  const { form, formDispatcher } = useContext(context);
  const { label, type } = form.schema[name];
  const set = e =>
    formDispatcher({
      type: "values.update",
      payload: { [e.target.name]: e.target.value }
    });

  useEffect(() => {
    console.log("rendering input..." + name);
  }, [form.values[name]]);

  return (
    <>
      <div>
        <label htmlFor={name}>{label}: </label>
        <input
          name={name}
          value={form.values[name]}
          onChange={set}
          type={type}
        />
      </div>
      <div>
        <span style={{ display: "block", height: "1.1em", color: "orangered" }}>
          {form.errors[name] ? form.errors[name][0] : ""}
        </span>
      </div>
    </>
  );
}
