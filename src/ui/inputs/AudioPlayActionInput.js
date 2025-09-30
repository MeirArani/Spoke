import React from "react";
import { ActionProperty } from "./ActionStyles";
import { ActionLabel, ActionSelection } from "./ActionStyles";
import SelectInput from "./SelectInput";
import AudioInput from "./AudioInput";
import PropTypes from "prop-types";

export default function AudioPlayActionInput(props) {
  return (
    <div>
      <ActionProperty>
        <ActionLabel>AudioURL</ActionLabel>
        <ActionSelection>
          <AudioInput value={props.audioUrl} onChange={selection => props.onSelection("audioUrl", selection)} />
        </ActionSelection>
      </ActionProperty>
      <ActionProperty>
        <ActionLabel>AudioType</ActionLabel>
        <ActionSelection>
          <SelectInput
            options={[{ label: "SoundEffect", value: "SoundEffect" }]}
            value={props.audioType}
            placeholder={"Select..."}
            onChange={selection => props.onSelection("audioType", selection)}
          />
        </ActionSelection>
      </ActionProperty>
    </div>
  );
}

AudioPlayActionInput.propTypes = {
  audioUrl: PropTypes.string,
  onSelection: PropTypes.func,
  audioType: PropTypes.string
};
