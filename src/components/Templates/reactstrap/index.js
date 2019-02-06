import React, { useContext } from "react";
import {
  Button as Rsb,
  Form as Rsf,
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
    const { change, dirty, forwardRef, touched, value, ...props } = this.props;

    return (
      <FormGroup check>
        <Label check>
          <Rsi
            required
            invalid={this.invalid(this.props.errors[0], touched)}
            onChange={this.handleCheck}
            innerRef={forwardRef}
            checked={value}
            {...props}
          />
          {props.label} <FeedBack touched={touched}>{props.errors[0]}</FeedBack>
        </Label>
      </FormGroup>
    );
  }

  multiselect() {
    const { change, dirty, forwardRef, touched, type, ...props } = this.props;

    return (
      <FormGroup>
        <Label for={props.name}>
          {props.label} <FeedBack touched={touched}>{props.errors[0]}</FeedBack>
        </Label>
        <Rsi
          invalid={this.invalid(props.errors[0], touched)}
          onChange={this.handleMultiSelect}
          innerRef={forwardRef}
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
      </FormGroup>
    );
  }

  radio() {
    const { change, dirty, forwardRef, touched, ...props } = this.props;

    return (
      <FormGroup tag="fieldset">
        <legend>
          {props.label} <FeedBack touched={touched}>{props.errors[0]}</FeedBack>
        </legend>
        {props.options.map(({ text, value }, i) => {
          return (
            <FormGroup key={`${value}-${0}`} check>
              <Label>
                <Rsi
                  name={props.name}
                  type={props.type}
                  invalid={this.invalid(props.errors[0], touched)}
                  onChange={this.handleChange}
                  innerRef={forwardRef}
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
    const { change, dirty, forwardRef, touched, ...props } = this.props;

    return (
      <FormGroup>
        <Label for={props.name}>
          {props.label} <FeedBack touched={touched}>{props.errors[0]}</FeedBack>
        </Label>
        <Rsi
          invalid={this.invalid(props.errors[0], touched)}
          onChange={this.handleChange}
          innerRef={forwardRef}
          {...props}
        >
          {props.options.map((option, i) => (
            <option key={i} value={option.value}>
              {option.text}
            </option>
          ))}
        </Rsi>
      </FormGroup>
    );
  }

  text() {
    const { change, dirty, forwardRef, touched, ...props } = this.props;

    return (
      <FormGroup>
        <Label for={props.name}>
          {props.label} <FeedBack touched={touched}>{props.errors[0]}</FeedBack>
        </Label>
        <Rsi
          invalid={this.invalid(props.errors[0], touched)}
          onChange={this.handleChange}
          innerRef={forwardRef}
          {...props}
        />
      </FormGroup>
    );
  }

  invalid(error, touched) {
    return touched && error !== undefined;
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

const FeedBack = ({ children, touched }) => {
  return children ? (
    touched ? (
      <span style={{ fontSize: `.8em` }} className="text-danger">
        {children}
      </span>
    ) : null
  ) : null;
};

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
