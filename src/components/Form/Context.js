import React, { createContext, useReducer } from "react";

export default ({ schema, values = {} }) => {
  const FormContext = createContext();

  const defaultValues = Object.entries(schema).reduce(
    (prev, [name, def]) => ({ ...prev, [name]: def.defaultValue }),
    {}
  );

  const initialState = {
    errors: validate({ ...defaultValues, ...values }),
    schema: schema,
    values: { ...defaultValues, ...values }
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
    return Object.entries(values).reduce((prev, [name]) => {
      const validations = [
        ...schema[name].validations,
        {
          test: ({ [name]: value }) =>
            schema[name].required ? value !== "" : true,
          message: "*"
        }
      ];
      const errors = validations.filter(({ test }) => !test(values));

      return errors.length > 0
        ? { ...prev, [name]: errors.map(({ message }) => message) }
        : prev;
    }, {});
  }

  function FormContextProvider(props) {
    const [form, formDispatcher] = useReducer(reducer, initialState);
    const value = { form, formDispatcher };

    return (
      <FormContext.Provider value={value}>
        {props.children}
      </FormContext.Provider>
    );
  }

  return {
    Context: FormContext,
    Provider: FormContextProvider
  };
};
