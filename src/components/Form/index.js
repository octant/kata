import React from "react";

import Context from "./Context";

function FormProvider({ children, schema, values }) {
  const FormContext = Context({ schema, values });
  return (
    <FormContext.Provider>
      {React.Children.map(children, child =>
        child.type
          ? React.cloneElement(child, { context: FormContext.Context })
          : child
      )}
    </FormContext.Provider>
  );
}

export { default as withInput } from "./withInput";

export default FormProvider;
