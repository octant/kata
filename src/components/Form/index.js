import React from "react";

import Form from "./Form";
import Context from "./Context";

function FormProvider({ schema }) {
  const FormContext = Context(schema);
  return (
    <FormContext.Provider>
      <Form context={FormContext.Context} />
    </FormContext.Provider>
  );
}

export default FormProvider;
