import React, { useContext, useEffect, useState } from "react";

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

    const [dirty, setDirty] = useState(false);
    const [touched, setTouched] = useState(false);

    const handleChange = ({ name, value }) => {
      setTouched(true);
      setDirty(true);
      formDispatcher({
        type: "values.update",
        payload: { [name]: value }
      });
    };

    const handleTouch = e => setTouched(true);

    useEffect(() => {
      formDispatcher({
        type: "refs.add",
        payload: { [name]: React.createRef(null) }
      });
    }, []);

    return (
      <WrappedComponent
        change={handleChange}
        onFocus={handleTouch}
        forwardRef={form.inputRefs[name]}
        value={form.values[name]}
        errors={(form.errors[name] || []).filter(
          ({ message }) => message !== "*"
        )}
        {...{ dirty, name, label, options, required, touched, type }}
      />
    );
  };
}
