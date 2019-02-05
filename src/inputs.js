/*eslint no-control-regex: "off"*/
import addYears from "date-fns/add_years";
import format from "date-fns/format";
import differenceInCalendarYears from "date-fns/difference_in_years";

export const person = {
  email: {
    defaultValue: "",
    display: true,
    type: "email",
    label: "Email Address",
    required: true,
    validations: [
      {
        test: ({ email }) =>
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
            email
          ),
        message: "Improperly formatted email address"
      }
    ]
  },

  firstName: {
    defaultValue: "",
    display: true,
    label: "First Name",
    observe: ["lastName"],
    required: true,
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
    required: true,
    type: "text",
    validations: [
      {
        test: ({ firstName }) => firstName[0] === "M",
        message: "'First Name' must begin with 'M'"
      }
    ]
  },

  dob: {
    type: "date",
    defaultValue: "",
    label: "Date of Birth",
    validations: [
      {
        test: ({ dob }) =>
          dob > format(addYears(new Date(), -65), "YYYY-MM-DD"),
        message: "Must be under 65 years of age"
      },
      {
        test: ({ dob }) => dob < format(new Date(), "YYYY-MM-DD"),
        message: "Must be older than 0 years of age"
      }
    ],
    required: true
  },

  numberOfSiblings: {
    type: "number",
    defaultValue: "",
    display: true,
    label: "# of Siblings",
    validations: [
      {
        test: ({ numberOfSiblings }) => numberOfSiblings >= 0,
        message: "Cannot have less than 1 sibling"
      }
    ]
  },

  hasDriversLicense: {
    type: "select",
    label: "Do you have a driver's license?",
    defaultValue: "",
    display: true,
    required: true,
    options: [
      {},
      { value: "true", text: "Yes" },
      { value: "false", text: "No" }
    ],
    validations: [
      {
        test: ({ dob, hasDriversLicense }) => {
          const ofDrivingAge = differenceInCalendarYears(new Date(), dob) >= 16;

          return hasDriversLicense === "true" ? ofDrivingAge && dob : true;
        },
        message: "You must be 16 to have a driver's license"
      }
    ]
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
