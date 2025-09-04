import React, { Component } from "react";
import PropTypes from "prop-types";
import NodeEditor from "./NodeEditor";
import SelectInput from "../inputs/SelectInput";
import InputGroup from "../inputs/InputGroup";
import BooleanInput from "../inputs/BooleanInput";
import ModelInput from "../inputs/ModelInput";
import ModelNodeEditor from "./ModelNodeEditor";
import { GLTFInfo } from "../inputs/GLTFInfo";
import { PlayCircle } from "styled-icons/fa-solid";
import AttributionNodeEditor from "./AttributionNodeEditor";
import NumericInput from "../inputs/NumericInput";

export default class AnimationModelNodeEditor extends ModelNodeEditor {
  static description = "A (ANIMATED!!!) 3D model in your scene, loaded from a GLTF URL or file.";
  static iconComponent = PlayCircle;

  onChangeSrc = (src, initialProps) => {
    this.props.editor.setPropertiesSelected({ ...initialProps, src });
  };

  onChangeAnimation = activeClipItems => {
    this.props.editor.setPropertySelected("activeClipItems", activeClipItems || []);
  };

  onChangeAnimationStartOffset = animationStartOffset => {
    this.props.editor.setPropertySelected("animationStartOffset", animationStartOffset);
  };

  onChangeCollidable = collidable => {
    this.props.editor.setPropertySelected("collidable", collidable);
  };

  onChangeCombine = combine => {
    this.props.editor.setPropertySelected("combine", combine);
  };

  isAnimationPropertyDisabled() {
    const { multiEdit, editor, node } = this.props;

    if (multiEdit) {
      return editor.selected.some(selectedNode => selectedNode.src !== node.src);
    }

    return false;
  }

  render() {
    const node = this.props.node;

    return (
      <NodeEditor description={AnimationModelNodeEditor.description} {...this.props}>
        <InputGroup name="Model Url">
          <ModelInput value={node.src} onChange={this.onChangeSrc} />
        </InputGroup>
        <InputGroup name="Animation">
          <SelectInput
            options={node.getClipOptions()}
            value={node.activeClipItem}
            onChange={this.onChangeAnimation}
            classNamePrefix="select"
          />
        </InputGroup>
        <InputGroup name="Animation Start Offset">
          <NumericInput value={node.animationStartOffset} onChange={this.onChangeAnimationStartOffset} />
        </InputGroup>
        <InputGroup name="Combine">
          <BooleanInput value={node.combine} onChange={this.onChangeCombine} />
        </InputGroup>
        {node.model && <GLTFInfo node={node} />}
        <AttributionNodeEditor name="Attribution" {...this.props} />
      </NodeEditor>
    );
  }
}
