import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Input from "./Input";

const StyledTextArea = styled(Input)`
  background-color: rgb(7, 8, 9);
  border-radius: 4px;
  border: 1px solid rgb(93, 100, 108);
  color: rgb(255, 255, 255);
  padding: 6px 8px;
  display: flex;
  width: 100%;
  height: 6em;
`;

const TextAreaInput = React.forwardRef(({ onChange, ...rest }, ref) => (
  <StyledTextArea onChange={e => onChange(e.target.value, e)} {...rest} ref={ref} />
));

TextAreaInput.displayName = "TextAreaInput";

TextAreaInput.defaultProps = {
  value: "",
  onChange: () => {},
  type: "text",
  required: false
};

TextAreaInput.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

export default TextAreaInput;
