/*eslint no-control-regex: "off"*/
import addYears from "date-fns/add_years";
import format from "date-fns/format";
import differenceInCalendarYears from "date-fns/difference_in_years";
import "core-js";

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
        test: ({ firstName }) => /^[A-Z]/.test(firstName),
        message: "Must begin with an upper case"
      }
    ]
  },

  lastName: {
    defaultValue: "",
    display: true,
    label: "Last Name",
    required: true,
    type: "text",
    validations: [
      {
        test: ({ lastName }) => /^[A-Z]/.test(lastName),
        message: "Must begin with an upper case"
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

  topThree: {
    type: "multiselect",
    label: "Choose your top three flavours of icecream",
    defaultValue: [],
    display: true,
    required: true,
    options: [
      { value: "chocolate", text: "Chocolate" },
      { value: "chunkyMonkey", text: "Chunky Monkey" },
      { value: "rockyRoad", text: "Rocky road" },
      { value: "strawBerry", text: "Strawberry" },
      { value: "vanilla", text: "Vanilla" }
    ],
    validations: [
      {
        test: ({ topThree }) => topThree.length === 3,
        message: "Choose three"
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
  },

  upgrade: {
    type: "radio",
    label: "Upgrade account?",
    display: true,
    defaultValue: "",
    required: true,
    options: [
      { value: "accept", text: "Yes, upgrade my account" },
      { value: "decline", text: "No, I'll keep what I have" }
    ],
    validations: []
  },

  agree: {
    type: "checkbox",
    required: true,
    display: true,
    defaultValue: "",
    label: "I agree to the terms and conditions",
    validations: [
      {
        test: ({ agree }) => agree,
        message: "You must agree to the terms and conditions"
      }
    ]
  }
};

export const vehicle = {
  make: {
    defaultValue: "",
    display: true,
    label: "Make",
    required: false,
    type: "text",
    validations: []
  },

  model: {
    defaultValue: "",
    display: true,
    label: "Model",
    required: false,
    type: "text",
    validations: []
  },

  year: {
    defaultValue: 2019,
    display: true,
    label: "Year",
    required: false,
    type: "number",
    validations: []
  },

  color: {
    defaultValue: "",
    display: true,
    label: "Color",
    required: false,
    type: "text",
    validations: []
  }
};
