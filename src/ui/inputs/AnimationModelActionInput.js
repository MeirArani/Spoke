import React from "react";
import { ActionProperty } from "./ActionStyles";
import { ActionLabel, ActionSelection } from "./ActionStyles";
import SelectInput from "./SelectInput";
import PropTypes from "prop-types";

export default function AnimationModelActionInput(props) {
  const options = props.animationModels.map(model => {
    return { label: model.name, value: model };
  });
  let value = props.target;

  const onSelection = selection => {
    value = selection;
    props.onSelection("target", selection);
  };

  return (
    <ActionProperty>
      <ActionLabel>Target</ActionLabel>
      <ActionSelection>
        <SelectInput value={value} options={options} placeholder={"Select node..."} onChange={onSelection} />
      </ActionSelection>
    </ActionProperty>
  );
}

AnimationModelActionInput.propTypes = {
  animationModels: PropTypes.array,
  target: PropTypes.object,
  onSelection: PropTypes.func
};
