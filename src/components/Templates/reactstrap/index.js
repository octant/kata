import React, { useContext } from "react";
import {
  Button as Rsb,
  Form as Rsf,
  FormFeedback,
  FormGroup,
  Label,
  Input as Rsi
} from "reactstrap";
import { withInput, withForm } from "../../Form";

class InputTemplates extends React.Component {
  handleChange = e => {
    const { change } = this.props;
    const { name, value } = e.target;
    change({ name, value });
  };

  handleCheck = e => {
    const { change } = this.props;
    const { name, checked } = e.target;
    change({ name, value: checked });
  };

  handleMultiSelect = e => {
    const { change } = this.props;
    const { name, options } = e.target;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    change({ name, value });
  };

  checkbox() {
    const { change, value, ...props } = this.props;

    return (
      <FormGroup check>
        <Label check>
          <Rsi
            required
            invalid={this.invalid(this.props.errors[0])}
            onChange={this.handleCheck}
            checked={value}
            {...props}
          />
          {props.label}
          {props.required ? "*" : ""}
          <FormFeedback>{props.errors[0]}</FormFeedback>
        </Label>
      </FormGroup>
    );
  }

  multiselect() {
    const { change, type, ...props } = this.props;

    return (
      <FormGroup>
        <Label for={props.name}>
          {props.label}
          {props.required ? "*" : ""}
        </Label>
        <Rsi
          invalid={this.invalid(props.errors[0])}
          onChange={this.handleMultiSelect}
          type="select"
          {...props}
          multiple
        >
          {props.options.map((option, i) => (
            <option key={i} value={option.value}>
              {option.text}
            </option>
          ))}
        </Rsi>
        <FormFeedback>{props.errors[0]}</FormFeedback>
      </FormGroup>
    );
  }

  radio() {
    const { change, ...props } = this.props;

    return (
      <FormGroup tag="fieldset">
        <legend>
          {props.label}
          {props.required ? "*" : ""}
        </legend>
        <FormFeedback>{props.errors[0]}</FormFeedback>
        {props.options.map(({ text, value }) => {
          return (
            <FormGroup key={value} check>
              <Label>
                <Rsi
                  name={props.name}
                  type={props.type}
                  invalid={this.invalid(props.errors[0])}
                  onChange={this.handleChange}
                  checked={props.value === value}
                  value={value}
                />{" "}
                {text}
              </Label>
            </FormGroup>
          );
        })}
      </FormGroup>
    );
  }

  select() {
    const { change, ...props } = this.props;

    return (
      <FormGroup>
        <Label for={props.name}>
          {props.label}
          {props.required ? "*" : ""}
        </Label>
        <Rsi
          invalid={this.invalid(props.errors[0])}
          onChange={this.handleChange}
          {...props}
        >
          {props.options.map((option, i) => (
            <option key={i} value={option.value}>
              {option.text}
            </option>
          ))}
        </Rsi>
        <FormFeedback>{props.errors[0]}</FormFeedback>
      </FormGroup>
    );
  }

  text() {
    const { change, ...props } = this.props;

    return (
      <FormGroup>
        <Label for={props.name}>
          {props.label}
          {props.required ? "*" : ""}
        </Label>
        <Rsi
          invalid={this.invalid(props.errors[0])}
          onChange={this.handleChange}
          {...props}
        />
        <FormFeedback>{props.errors[0]}</FormFeedback>
      </FormGroup>
    );
  }

  invalid(error) {
    return error !== undefined && error !== "*";
  }

  input() {
    switch (this.props.type) {
      case "checkbox":
        return this.checkbox();
      case "multiselect":
        return this.multiselect();
      case "radio":
        return this.radio();
      case "select":
        return this.select();
      default:
        return this.text();
    }
  }

  render() {
    return this.input();
  }
}

export const Button = ({ context, children, onClick, ...props }) => {
  const { form, formDispatcher } = useContext(context);

  function handleClick() {
    onClick({ ...props, form, formDispatcher });
  }

  return (
    <Rsb {...props} onClick={handleClick}>
      {children}
    </Rsb>
  );
};

export const Input = withInput(InputTemplates);

export const Form = withForm(Rsf);
