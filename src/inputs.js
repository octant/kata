export default {
  firstName: {
    defaultValue: "",
    display: true,
    label: "First Name",
    observe: ["lastName"],
    required: false,
    type: "text",
    validations: []
  },

  lastName: {
    defaultValue: "",
    display: true,
    label: "Last Name",
    observe: [],
    required: false,
    type: "text",
    validations: []
  },

  age: {
    defaultValue: "",
    display: true,
    label: "Age",
    observe: [],
    required: false,
    type: "number",
    validations: []
  }
};
