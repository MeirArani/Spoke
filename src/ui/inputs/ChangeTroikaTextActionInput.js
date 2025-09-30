import React from "react";
import { ActionProperty } from "./ActionStyles";
import { ActionLabel, ActionSelection } from "./ActionStyles";
import SelectInput from "./SelectInput";
import TextAreaInput from "./TextAreaInput";
import PropTypes from "prop-types";

export default function ChangeTroikaTextAction(props) {
  const options = props.textNodes.map(textNode => {
    return { label: textNode.name, value: textNode };
  });

  let target = props.target;
  let text = props.text;

  const onTargetSelection = selection => {
    target = selection;
    props.onSelection("target", selection);
  };

  const onTextUpdate = textUpdate => {
    text = textUpdate;
    props.onSelection("text", textUpdate);
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
        <ActionLabel>Text</ActionLabel>
        <ActionSelection>
          <TextAreaInput value={text} onChange={onTextUpdate} />
        </ActionSelection>
      </ActionProperty>
    </>
  );
}

ChangeTroikaTextAction.propTypes = {
  textNodes: PropTypes.array,
  target: PropTypes.object,
  text: PropTypes.text,
  onSelection: PropTypes.func
};
