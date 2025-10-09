import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import NodeEditor from "./NodeEditor";
import PropertyGroup from "./PropertyGroup";
import { Event } from "styled-icons/material";
import ActionInput from "../inputs/ActionInput";
import { PlusMinusButton, PlusMinusButtonContainer } from "../inputs/ActionStyles";
import AnimationModelNode from "../../editor/nodes/AnimationModelNode";
import ModelNode from "../../editor/nodes/ModelNode";
import InteractTriggerNode from "../../editor/nodes/InteractTriggerNode";
import TroikaTextNode from "../../editor/nodes/TroikaTextNode";
import CollisionTriggerNode from "../../editor/nodes/CollisionTrigger";
import EventNode from "../../editor/nodes/EventNode";
import AnimationModelActionInput from "../inputs/AnimationModelActionInput";
import AudioPlayActionInput from "../inputs/AudioPlayActionInput";
import ChangeVisibleAction from "../inputs/ChangeVisibleActionInput";
import ChangeTroikaTextAction from "../inputs/ChangeTroikaTextActionInput";
import MoveSceneAction from "../inputs/MoveSceneActionInput";
import SwitchEventAction from "../inputs/SwitchEventActionInput";
import SleepAction from "../inputs/SleepActionInput";
import { useEffect } from "react";
import PropTypes from "prop-types";

export default function EventNodeEditor(props) {
  const [actions, setActions] = useState(props.node.actions);

  useEffect(() => {
    setActions(props.node.actions);
  }, [props.node.actions]);

  const editor = props.editor;
  const scene = editor.scene;

  const saveActions = newActions => {
    editor.setPropertySelected("actions", newActions);
  };

  const onAdd = () => {
    saveActions([...actions, { uuid: uuid() }]);
  };

  const onRemove = uuid => {
    saveActions(actions.filter(item => item.uuid !== uuid));
  };

  const onShiftUp = uuid => {
    const action = actions.find(action => action.uuid === uuid);
    const index = actions.indexOf(action);
    if (index >= actions.length || index <= 0) return;

    const newState = actions;
    [newState[index], newState[index - 1]] = [newState[index - 1], newState[index]];

    saveActions(newState);
  };

  const onShiftDown = uuid => {
    const action = actions.find(action => action.uuid === uuid);
    const index = actions.indexOf(action);
    if (index >= actions.length - 1 || index < 0) return;

    const newState = [...actions];
    [newState[index + 1], newState[index]] = [newState[index], newState[index + 1]];

    saveActions(newState);
  };

  const renderAction = action => {
    const index = actions.indexOf(action);
    const isTop = index === 0;
    const isBottom = index === actions.length - 1;

    const onSelection = selection => {
      const newState = actions;
      newState[index] = { ...newState[index], ...selection };
      saveActions(newState);
    };

    const updateAction = (property, value) => {
      const newState = actions;
      newState.find(state => state.uuid === action.uuid)[property] = value;
      saveActions(newState);
    };

    let render = null;
    let play = true;
    switch (action.name) {
      case "animationModelPlay":
      case "animationModelStop":
        play = false;
        render = (
          <AnimationModelActionInput
            isTop={isTop}
            isBottom={isBottom}
            animationModels={scene.getNodesByType(AnimationModelNode)}
            target={action.target}
            play={play}
            onSelection={updateAction}
          />
        );
        break;
      case "audioPlay":
        render = (
          <AudioPlayActionInput
            isTop={isTop}
            isBottom={isBottom}
            audioType={action.audioType}
            audioUrl={action.audioUrl}
            onSelection={updateAction}
          />
        );
        break;
      case "changeVisible":
        render = (
          <ChangeVisibleAction
            isTop={isTop}
            isBottom={isBottom}
            onSelection={updateAction}
            models={scene.getNodesByType(ModelNode).concat(scene.getNodesByType(AnimationModelNode))}
            target={action.target}
            visible={action.visible}
          />
        );
        break;
      case "changeTroikaText":
        render = (
          <ChangeTroikaTextAction
            isTop={isTop}
            isBottom={isBottom}
            onSelection={updateAction}
            target={action.target}
            text={action.text}
            textNodes={scene.getNodesByType(TroikaTextNode)}
          />
        );
        break;
      case "moveScene":
        render = (
          <MoveSceneAction isTop={isTop} isBottom={isBottom} onSelection={updateAction} roomUrl={action.roomUrl} />
        );
        break;
      case "switchEvent":
        render = (
          <SwitchEventAction
            isTop={isTop}
            isBottom={isBottom}
            onSelection={updateAction}
            targetTrigger={action.targetTrigger}
            eventType={action.eventType}
            event={action.event}
            triggers={scene.getNodesByType(InteractTriggerNode).concat(scene.getNodesByType(CollisionTriggerNode))}
            events={scene.getNodesByType(EventNode)}
          />
        );
        break;
      case "sleep":
        render = <SleepAction isTop={isTop} isBottom={isBottom} onSelection={updateAction} time={action.time} />;
        break;
      default:
        break;
    }

    return (
      <ActionInput
        isTop={isTop}
        isBottom={isBottom}
        onRemove={onRemove}
        onShiftUp={onShiftUp}
        onShiftDown={onShiftDown}
        onSelection={onSelection}
        uuid={action.uuid}
        target={action}
      >
        {render}
      </ActionInput>
    );
  };

  return (
    <NodeEditor description={EventNodeEditor.description} {...props}>
      <PropertyGroup>{actions.map(action => renderAction(action))}</PropertyGroup>
      <PropertyGroup>
        <PlusMinusButtonContainer>
          <PlusMinusButton onClick={onAdd}>+</PlusMinusButton>
          <PlusMinusButton
            onClick={_ => {
              if (actions.length < 1) return;
              onRemove(actions[actions.length - 1].uuid);
            }}
          >
            -
          </PlusMinusButton>
        </PlusMinusButtonContainer>
      </PropertyGroup>
    </NodeEditor>
  );
}

EventNodeEditor.iconComponent = Event;
EventNodeEditor.description = "Trigger a series of actions";

EventNodeEditor.propTypes = {
  node: PropTypes.object,
  editor: PropTypes.object
};
