import React from "react";

import Context from "./Context";

function FormProvider({ children, schema }) {
  const FormContext = Context(schema);
  return (
    <FormContext.Provider>
      {React.Children.map(children, child =>
        React.cloneElement(child, { context: FormContext.Context })
      )}
    </FormContext.Provider>
  );
}

export default FormProvider;
