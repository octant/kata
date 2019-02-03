import React, { createContext, useReducer } from "react";
import inputDefs from "../inputs";

export default schema => {
  const InputContext = createContext();

  const initialState = Object.entries(inputDefs).reduce(
    (prev, [name, def]) => ({ ...prev, [name]: def.defaultValue }),
    {}
  );

  const reducer = (inputs, action) => {
    switch (action.type) {
      case "reset":
        return { ...initialState };
      case "set":
        return { ...inputs, [action.name]: action.value };
      default:
        return { ...inputs };
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
    provider: InputContextProvider
  };
};
