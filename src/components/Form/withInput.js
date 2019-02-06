import React, { useContext, useEffect } from "react";

export default function(WrappedComponent) {
  return function({ name, context }) {
    const { form, formDispatcher } = useContext(context);
    const { label, options, type, required } = form.schema[name];

    const set = ({ name, value }) =>
      formDispatcher({
        type: "values.update",
        payload: { [name]: value }
      });

    useEffect(() => {
      console.log("rendering input..." + name);
    }, [form.values[name]]);

    return (
      <WrappedComponent
        change={set}
        value={form.values[name]}
        errors={(form.errors[name] || []).filter(
          ({ message }) => message !== "*"
        )}
        {...{ name, label, options, required, type }}
      />
    );
  };
}
