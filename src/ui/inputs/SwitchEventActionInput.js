import React from "react";
import { ActionProperty } from "./ActionStyles";
import { ActionLabel, ActionSelection } from "./ActionStyles";
import SelectInput from "./SelectInput";
import PropTypes from "prop-types";

export default function SwitchEventAction(props) {
  let targetTrigger = props.targetTrigger;
  let eventType = props.eventType;
  let event = props.event;

  const pressedEventTypes = [{ label: "PressedEvent", value: "PressedEvent" }];
  const collisionEventTypes = [
    { label: "EnterEvent", value: "EnterEvent" },
    { label: "LeaveEvent", value: "LeaveEvent" }
  ];

  const onTriggerChange = trigger => {
    if (targetTrigger && trigger.nodeName !== targetTrigger.nodeName) {
      eventType = trigger.nodeName == "PressedEvent" ? "PressedEvent" : "EnterEvent";
      props.onSelection("eventType", eventType);
    }
    targetTrigger = trigger;
    props.onSelection("targetTrigger", trigger);
  };

  const onEventTypeChange = newEventType => {
    eventType = newEventType;
    props.onSelection("eventType", eventType);
  };

  const onEventChange = newEvent => {
    event = newEvent;
    props.onSelection("event", newEvent);
  };

  const triggerOptions = props.triggers.map(trigger => {
    return { label: trigger.name, value: trigger };
  });

  let eventTypeOptions = [];
  if (targetTrigger) {
    eventTypeOptions = props.targetTrigger.nodeName === "Interact Trigger" ? pressedEventTypes : collisionEventTypes;
  }

  const eventOptions = props.events.map(event => {
    return { label: event.name, value: event };
  });

  return (
    <>
      <ActionProperty>
        <ActionLabel>TargetTrigger</ActionLabel>
        <ActionSelection>
          <SelectInput
            value={targetTrigger}
            options={triggerOptions}
            placeholder={"Select node..."}
            onChange={onTriggerChange}
          />
        </ActionSelection>
      </ActionProperty>

      <ActionProperty>
        <ActionLabel>EventType</ActionLabel>
        <ActionSelection>
          <SelectInput
            value={eventType}
            options={eventTypeOptions}
            placeholder={"Select Trigger Type..."}
            onChange={onEventTypeChange}
            disabled={targetTrigger === null}
          />
        </ActionSelection>
      </ActionProperty>

      <ActionProperty>
        <ActionLabel>Event</ActionLabel>
        <ActionSelection>
          <SelectInput
            value={event}
            options={eventOptions}
            placeholder={"Select node..."}
            onChange={onEventChange}
            disabled={targetTrigger === null}
          />
        </ActionSelection>
      </ActionProperty>
    </>
  );
}

SwitchEventAction.propTypes = {
  targetTrigger: PropTypes.object,
  eventType: PropTypes.object,
  event: PropTypes.object,
  onSelection: PropTypes.func,
  triggers: PropTypes.map,
  events: PropTypes.array
};
