import React, { createContext, useReducer } from "react";

export default schema => {
  const InputContext = createContext();

  const initialState = {
    errors: {},
    schema: schema,
    values: Object.entries(schema).reduce(
      (prev, [name, def]) => ({ ...prev, [name]: def.defaultValue }),
      {}
    )
  };

  const reducer = (state, { type, payload }) => {
    switch (type) {
      case "reset":
        return { ...state, values: { ...initialState.values } };
      case "set":
        return { ...state, values: { ...state.values, ...payload } };
      default:
        return { ...state };
    }
  };

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
    context: InputContext,
    provider: InputContextProvider,
    schema
  };
};
