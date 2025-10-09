import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import NodeEditor from "./NodeEditor";
import SelectInput from "../inputs/SelectInput";
import InputGroup from "../inputs/InputGroup";
import BooleanInput from "../inputs/BooleanInput";
import ModelInput from "../inputs/ModelInput";
import { HandPointer } from "styled-icons/fa-solid";
import AttributionNodeEditor from "./AttributionNodeEditor";
import EventNode from "../../editor/nodes/EventNode";
import { GLTFInfo } from "../inputs/GLTFInfo";
export default function InteractTriggerNodeEditor(props) {
  const node = props.node;
  const editor = props.editor;

  const [pressedEvent, setPressedEvent] = useState(node.pressedEvent);
  console.log(pressedEvent);

  useEffect(() => {
    setPressedEvent(node.pressedEvent);
  }, [node.pressedEvent]);

  const onChangeSrc = (src, initialProps) => {
    editor.setPropertiesSelected({ ...initialProps, src });
  };

  const onChangeWalkable = walkable => {
    editor.setPropertySelected("walkable", walkable);
  };

  const onChangeCastShadow = castShadow => {
    editor.setPropertySelected("castShadow", castShadow);
  };

  const onChangeReceiveShadow = receiveShadow => {
    editor.setPropertySelected("receiveShadow", receiveShadow);
  };

  const onChangeBillboard = billboard => {
    editor.setPropertySelected("billboard", billboard);
  };

  const onChangePressedEvent = pressedEvent => {
    editor.setPropertySelected("pressedEvent", pressedEvent);
  };

  return (
    <NodeEditor description={InteractTriggerNodeEditor.description} {...props}>
      <InputGroup name="Model Url">
        <ModelInput value={node.src} onChange={onChangeSrc} />
      </InputGroup>
      <SelectInput
        value={node.pressedEvent}
        options={editor.scene.getNodesByType(EventNode)}
        placeholder={node.pressedEvent || "None"}
        onChange={onChangePressedEvent}
      />
      <InputGroup name="Walkable">
        <BooleanInput value={node.walkable} onChange={onChangeWalkable} />
      </InputGroup>
      <InputGroup name="Cast Shadow">
        <BooleanInput value={node.castShadow} onChange={onChangeCastShadow} />
      </InputGroup>
      <InputGroup name="Receive Shadow">
        <BooleanInput value={node.receiveShadow} onChange={onChangeReceiveShadow} />
      </InputGroup>
      <InputGroup name="Billboard" info="Model always faces user in Hubs. Does not billboard in Spoke.">
        <BooleanInput value={node.billboard} onChange={onChangeBillboard} />
      </InputGroup>
      {node.model && <GLTFInfo node={node} />}
      <AttributionNodeEditor name="Attribution" {...props} />
    </NodeEditor>
  );
}

InteractTriggerNodeEditor.iconComponent = HandPointer;

InteractTriggerNodeEditor.description = "A 3D model that triggers an event";

InteractTriggerNodeEditor.propTypes = {
  editor: PropTypes.object,
  node: PropTypes.object,
  multiEdit: PropTypes.bool
};
