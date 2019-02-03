import React, { useContext, useEffect } from "react";
import { InputContext } from "../../contexts/Input";

export default function({ name, type }) {
  const { inputs, inputDispatcher } = useContext(InputContext);
  const set = e =>
    inputDispatcher({
      type: "set",
      name: e.target.name,
      value: e.target.value
    });

  useEffect(() => {
    console.log("rendering input..." + name);
  }, [inputs[name]]);

  return <input name={name} value={inputs[name]} onChange={set} type={type} />;
}
