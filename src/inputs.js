/*eslint no-control-regex: "off"*/
import addYears from "date-fns/add_years";
import format from "date-fns/format";
import differenceInCalendarYears from "date-fns/difference_in_years";
import "core-js";

export const person = {
  email: {
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
    type: "text",
    label: "First Name",
    required: true
  },

  lastName: {
    type: "text",
    label: "Last Name",
    required: true
  },

  dob: {
    type: "date",
    label: "Date of Birth",
    required: true,
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
    ]
  },

  numberOfSiblings: {
    type: "number",
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

  topThree: {
    type: "multiselect",
    label: "Choose your top three flavours of icecream",
    defaultValue: [],
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

  upgrade: {
    type: "radio",
    label: "Upgrade account?",
    required: true,
    options: [
      { value: "accept", text: "Yes, upgrade my account" },
      { value: "decline", text: "No, I'll keep what I have" }
    ]
  },

  agree: {
    type: "checkbox",
    label: "I agree to the terms and conditions",
    required: true,
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
    type: "text",
    label: "Make",
    required: false
  },

  model: {
    type: "text",
    label: "Model",
    required: false
  },

  year: {
    defaultValue: 2019,
    label: "Year",
    required: false,
    type: "number"
  },

  color: {
    type: "text",
    label: "Color",
    required: false
  }
};
