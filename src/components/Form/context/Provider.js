import React, { useReducer } from "react";

const reducer = (inputs, action) => {
  switch (action.type) {
    case "reset":
      return { ...action.inputs };
    case "set":
      return { ...inputs, [action.name]: action.value };
    default:
      return { ...inputs };
  }
};

export default function FormContextProvider(FormContext) {
  return function(props) {
    const [inputs, inputDispatcher] = useReducer(reducer, props.initialState);
    const value = { inputs, inputDispatcher };

    return (
      <FormContext.Provider value={value}>
        {props.children}
      </FormContext.Provider>
    );
  };
}
