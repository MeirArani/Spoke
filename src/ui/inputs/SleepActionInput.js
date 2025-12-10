import React from "react";
import { ActionProperty } from "./ActionStyles";
import { ActionLabel, ActionSelection } from "./ActionStyles";
import NumericInput from "./NumericInput";
import PropTypes from "prop-types";

export default function SleepAction(props) {
  let time = props.time;
  const onChangeTime = newTime => {
    time = newTime;
    props.onSelection("time", newTime);
  };

  return (
    <ActionProperty>
      <ActionLabel>Target</ActionLabel>
      <ActionSelection>
        <NumericInput unit={"sec"} value={time} onChange={onChangeTime} />
      </ActionSelection>
    </ActionProperty>
  );
}

SleepAction.propTypes = {
  time: PropTypes.number,
  onSelection: PropTypes.func
};
