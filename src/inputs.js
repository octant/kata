export const person = {
  firstName: {
    defaultValue: "",
    display: true,
    label: "First Name",
    observe: ["lastName"],
    required: false,
    type: "text",
    validations: [
      {
        test: ({ firstName }) => firstName[0] === "M",
        message: "Must begin with 'M'"
      }
    ]
  },

  lastName: {
    defaultValue: "",
    display: true,
    label: "Last Name",
    observe: [],
    required: false,
    type: "text",
    validations: [
      {
        test: ({ firstName }) => firstName[0] === "M",
        message: "'First Name' must begin with 'M'"
      }
    ]
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

export const vehicle = {
  make: {
    defaultValue: "",
    display: true,
    label: "Make",
    observe: [],
    required: false,
    type: "text",
    validations: []
  },

  model: {
    defaultValue: "",
    display: true,
    label: "Model",
    observe: [],
    required: false,
    type: "text",
    validations: []
  },

  year: {
    defaultValue: 2019,
    display: true,
    label: "Year",
    observe: [],
    required: false,
    type: "number",
    validations: []
  },

  color: {
    defaultValue: "",
    display: true,
    label: "Color",
    observe: [],
    required: false,
    type: "text",
    validations: []
  }
};
