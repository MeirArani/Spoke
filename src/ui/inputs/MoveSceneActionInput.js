import React from "react";
import { ActionProperty } from "./ActionStyles";
import { ActionLabel, ActionSelection } from "./ActionStyles";
import AudioInput from "./AudioInput";
import PropTypes from "prop-types";

export default function MoveSceneAction(props) {
  let roomUrl = props.roomUrl;

  const onSelection = selection => {
    roomUrl = selection;
    props.onSelection("roomUrl", selection);
  };

  return (
    <ActionProperty>
      <ActionLabel>RoomURL</ActionLabel>
      <ActionSelection>
        <AudioInput value={roomUrl} onChange={onSelection} />
      </ActionSelection>
    </ActionProperty>
  );
}

MoveSceneAction.propTypes = {
  roomUrl: PropTypes.string,
  onSelection: PropTypes.func
};
