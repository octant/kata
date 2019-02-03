import React from "react";

import { InputContextProvider } from "../../contexts/Input";
import Form from "./Form";

function FormProvider() {
  return (
    <InputContextProvider>
      <Form />
    </InputContextProvider>
  );
}

export default FormProvider;
