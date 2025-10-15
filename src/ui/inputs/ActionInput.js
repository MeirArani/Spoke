import React from "react";
import * as css from "./ActionStyles";
import SelectInput from "./SelectInput";
import PropTypes from "prop-types";

const actions = () => [
  {
    label: "AnimationModelPlay",
    value: { name: "animationModelPlay", target: null }
  },
  {
    label: "AnimationModelStop",
    value: { name: "animationModelStop", target: null }
  },
  {
    label: "AudioPlay",
    value: { name: "audioPlay", audioUrl: null, audioType: null }
  },
  {
    label: "ChangeVisible",
    value: { name: "changeVisible", target: null, visible: true }
  },
  {
    label: "ChangeTroikaText",
    value: { name: "changeTroikaText", target: null, text: null }
  },
  {
    label: "MoveScene",
    value: { name: "moveScene", roomUrl: null }
  },
  {
    label: "SwitchEvent",
    value: { name: "switchEvent", targetTrigger: null, eventType: null, event: null }
  },
  {
    label: "Sleep",
    value: { name: "sleep", time: 0 }
  }
];

export const getDefaultAction = name => {
  actions.forEach(action => {
    if (action.label === name) {
      return action.value;
    }
  });
  return null;
};

export default function ActionInput(props) {
  return (
    <css.ActionContainer>
      <ActionArrows
        isTop={props.isTop}
        isBottom={props.isBottom}
        onShiftUp={props.onShiftUp}
        onShiftDown={props.onShiftDown}
        uuid={props.uuid}
      />

      <css.ActionMain>
        <ActionSelector
          onSelection={selection => props.onSelection(selection)}
          target={props.target.name}
          actionName={props.target.name}
        />
        {props.children}
      </css.ActionMain>

      <ActionDelete onRemove={props.onRemove} uuid={props.uuid} />
    </css.ActionContainer>
  );
}

export function ActionSelector(props) {
  return (
    <css.ActionProperty>
      <css.ActionLabelDiv>
        <css.ActionLabelStyle>{"Action"}</css.ActionLabelStyle>
      </css.ActionLabelDiv>
      <css.ActionSelection>
        <SelectInput
          options={actions()}
          value={props.target}
          placeholder={props.actionName ? props.actionName : "Select..."}
          onChange={action => props.onSelection(action)}
          classNamePrefix={"select"}
        />
      </css.ActionSelection>
    </css.ActionProperty>
  );
}

export function ActionArrows(props) {
  return (
    <css.ActionButtonGroup>
      <css.ActionButton disabled={props.isTop} onClick={_ => props.onShiftUp(props.uuid)}>
        ∧
      </css.ActionButton>
      <css.ActionButton disabled={props.isBottom} onClick={_ => props.onShiftDown(props.uuid)}>
        ∨
      </css.ActionButton>
    </css.ActionButtonGroup>
  );
}

export function ActionDelete(props) {
  return (
    <css.DeleteButtonMain>
      <css.DeleteButton onClick={_ => props.onRemove(props.uuid)}>x</css.DeleteButton>
    </css.DeleteButtonMain>
  );
}

ActionInput.propTypes = {
  isTop: PropTypes.bool,
  isBottom: PropTypes.bool,
  onRemove: PropTypes.func,
  onShiftUp: PropTypes.func,
  onShiftDown: PropTypes.func,
  onSelection: PropTypes.func,
  target: PropTypes.object,
  actionName: PropTypes.string,
  children: PropTypes.node,
  uuid: PropTypes.string
};

ActionSelector.propTypes = {
  target: PropTypes.object,
  actionName: PropTypes.string,
  onSelection: PropTypes.func
};

ActionArrows.propTypes = {
  isTop: PropTypes.bool,
  isBottom: PropTypes.bool,
  onShiftUp: PropTypes.func,
  onShiftDown: PropTypes.func,
  uuid: PropTypes.string
};

ActionDelete.propTypes = {
  onRemove: PropTypes.func,
  uuid: PropTypes.string
};
