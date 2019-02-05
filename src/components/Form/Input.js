import React, { useContext, useEffect } from "react";

export default function(WrappedComponent) {
  return function({ name, context }) {
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
      <WrappedComponent
        onChange={set}
        value={form.values[name]}
        errors={(form.errors[name] || []).filter(
          ({ message }) => message !== "*"
        )}
        {...{ name, label, type }}
      />
    );
  };
}
