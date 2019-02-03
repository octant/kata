import { createContext } from "react";

export const FormContext = inputs => {
  return createContext(
    Object.entries(inputs).reduce(
      (prev, [name, def]) => ({ ...prev, [name]: def.defaultValue }),
      {}
    )
  );
};
