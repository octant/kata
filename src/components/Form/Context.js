import React, { createContext, useReducer } from "react";

export default schema => {
  const InputContext = createContext();

  const defaultValues = Object.entries(schema).reduce(
    (prev, [name, def]) => ({ ...prev, [name]: def.defaultValue }),
    {}
  );

  const initialState = {
    errors: validate(defaultValues),
    schema: schema,
    values: defaultValues
  };

  const reducer = (state, { type, payload }) => {
    switch (type) {
      case "reset":
        return {
          ...state,
          values: { ...initialState.values },
          errors: validate({ ...initialState.values })
        };
      case "values.update":
        return {
          ...state,
          values: { ...state.values, ...payload },
          errors: validate({ ...state.values, ...payload })
        };
      default:
        return { ...state };
    }
  };

  function validate(values) {
    return Object.keys(values).reduce((prev, name) => {
      const errors = schema[name].validations.filter(
        ({ test }) => !test(values)
      );

      return errors
        ? { ...prev, [name]: errors.map(({ message }) => message) }
        : prev;
    }, {});
  }

  function InputContextProvider(props) {
    const [inputs, inputDispatcher] = useReducer(reducer, initialState);
    const value = { inputs, inputDispatcher };

    return (
      <InputContext.Provider value={value}>
        {props.children}
      </InputContext.Provider>
    );
  }

  return {
    Context: InputContext,
    Provider: InputContextProvider
  };
};
