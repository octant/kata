import React, { useContext } from "react";

import Context from "./Context";

export function withForm(WrappedComponent) {
  return function({ children, schema, values, ...props }) {
    const FormContext = Context({ schema, values });
    return (
      <FormContext.Provider>
        <WrappedComponent {...props}>
          {React.Children.map(children, child =>
            typeof child.type === "function"
              ? React.cloneElement(child, { context: FormContext.Context })
              : child
          )}
        </WrappedComponent>
      </FormContext.Provider>
    );
  };
}

export function withInput(WrappedComponent) {
  return function({ name, context }) {
    const { form, formDispatcher } = useContext(context);
    const { label, options, type, required } = form.schema[name];

    const set = ({ name, value }) =>
      formDispatcher({
        type: "values.update",
        payload: { [name]: value }
      });

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
