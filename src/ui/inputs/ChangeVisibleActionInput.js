import React from "react";
import { ActionProperty } from "./ActionStyles";
import { ActionLabel, ActionSelection } from "./ActionStyles";
import SelectInput from "./SelectInput";
import BooleanInput from "./BooleanInput";
import PropTypes from "prop-types";

export default function ChangeVisibleAction(props) {
  const options = props.models.map(model => {
    return { label: model.name, value: model };
  });

  let target = props.target;
  let visible = props.visible;

  const onTargetSelection = selection => {
    target = selection;
    props.onSelection("target", selection);
  };

  const onVisibleSelection = selection => {
    visible = selection;
    props.onSelection("visible", selection);
  };
  return (
    <>
      <ActionProperty>
        <ActionLabel>Target</ActionLabel>
        <ActionSelection>
          <SelectInput value={target} options={options} placeholder={"Select node..."} onChange={onTargetSelection} />
        </ActionSelection>
      </ActionProperty>

      <ActionProperty>
        <ActionLabel>Visible</ActionLabel>
        <ActionSelection>
          <BooleanInput value={visible} onChange={onVisibleSelection} />
        </ActionSelection>
      </ActionProperty>
    </>
  );
}
ChangeVisibleAction.propTypes = {
  models: PropTypes.array,
  target: PropTypes.object,
  visible: PropTypes.bool,
  onSelection: PropTypes.func
};
