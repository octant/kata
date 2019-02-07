import React, { createContext, useReducer } from "react";
import Schema from "./lib/schema";
export default ({ schema: definition, values = {} }) => {
  const FormContext = createContext();

  const _schema = new Schema(definition);
  const inputs = _schema.inputs();
  const defaultValues = _schema.defaults();

  const initialState = {
    errors: validate({ ...defaultValues, ...values }),
    inputRefs: {},
    schema: inputs,
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
      case "refs.add":
        return {
          ...state,
          inputRefs: { ...state.inputRefs, ...payload }
        };
      default:
        return { ...state };
    }
  };

  function validate(values) {
    return Object.entries(values).reduce((prev, [name]) => {
      const validations = [
        ...inputs[name].validations,
        {
          test: ({ [name]: value }) =>
            inputs[name].required ? value !== "" : true,
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
