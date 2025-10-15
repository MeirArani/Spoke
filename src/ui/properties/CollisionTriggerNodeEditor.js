import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import NodeEditor from "./NodeEditor";
import InputGroup from "../inputs/InputGroup";
import SelectInput from "../inputs/SelectInput";
import { Running } from "styled-icons/fa-solid/Running";
import EventNode from "../../editor/nodes/EventNode";

export default function CollisionTriggerNodeEditor(props) {
  const [enterEvent, setEnterEvent] = useState(props.node.enterEvent);
  const [leaveEvent, setLeaveEvent] = useState(props.node.leaveEvent);

  const eventOptions = props.editor.scene.getNodesByType(EventNode).map(option => {
    return { label: option.name, value: option.uuid, nodeName: option.nodeName };
  });

  useEffect(() => {
    setEnterEvent(props.node.enterEvent);
    setLeaveEvent(props.node.leaveEvent);
  }, [props.node.enterEvent, props.node.leaveEvent]);

  const onChangeEnterEvent = selection => {
    props.editor.setPropertySelected("enterEvent", selection);
  };

  const onChangeLeaveEvent = selection => {
    props.editor.setPropertySelected("leaveEvent", selection);
  };

  return (
    <NodeEditor description={CollisionTriggerNodeEditor.description} {...props}>
      <InputGroup name="Enter Event">
        <SelectInput
          placeholder={(enterEvent && enterEvent.name) || "None"}
          value={enterEvent}
          onChange={onChangeEnterEvent}
          options={eventOptions}
        />
      </InputGroup>
      <InputGroup name="Leave Event">
        <SelectInput
          placeholder={(leaveEvent && leaveEvent.name) || "None"}
          value={leaveEvent}
          onChange={onChangeLeaveEvent}
          options={eventOptions}
        />
      </InputGroup>
    </NodeEditor>
  );
}

CollisionTriggerNodeEditor.iconComponent = Running;

CollisionTriggerNodeEditor.description = "Triggers an event on enter and leaving.";

CollisionTriggerNodeEditor.propTypes = {
  editor: PropTypes.object,
  node: PropTypes.object,
  multiEdit: PropTypes.bool
};
