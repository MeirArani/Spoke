import React from "react";
import { ActionProperty } from "./ActionStyles";
import { ActionLabel, ActionSelection } from "./ActionStyles";
import SelectInput from "./SelectInput";
import PropTypes from "prop-types";

export default function AnimationModelActionInput(props) {
  return (
    <ActionProperty>
      <ActionLabel>Target</ActionLabel>
      <ActionSelection>
        <SelectInput
          value={props.target}
          options={props.options}
          placeholder={"Select node..."}
          onChange={selection => props.onSelection("target", selection)}
        />
      </ActionSelection>
    </ActionProperty>
  );
}

AnimationModelActionInput.propTypes = {
  animationModels: PropTypes.array,
  target: PropTypes.object,
  onSelection: PropTypes.func,
  options: PropTypes.array
};
