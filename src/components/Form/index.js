import React from "react";

import Form from "./Form";
import Context from "./Context";

function FormProvider({ schema }) {
  const FormContext = Context(schema);
  return (
    <FormContext.provider>
      <Form context={FormContext.context} />
    </FormContext.provider>
  );
}

export default FormProvider;
