import React from "react";
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
import AudioNode from "../../editor/nodes/AudioNode";

export default class AnimationModelNodeEditor extends ModelNodeEditor {
  static description = "A (ANIMATED!!!) 3D model in your scene, loaded from a GLTF URL or file.";

  static iconComponent = PlayCircle;

  onChangeSrc = (src, initialProps) => {
    this.props.editor.setPropertiesSelected({ ...initialProps, src });
  };

  onChangeAnimation = activeClipIndex => {
    this.props.editor.setPropertySelected("activeClipItems", activeClipIndex || []);
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

  onChangeAudioNode = audioNode => {
    this.props.editor.setPropertySelected("audioNode", audioNode);
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

    const getAudioNodes = () => {
      const audioNodes = node.editor && node.editor.scene ? node.editor.scene.getNodesByType(AudioNode) : [];
      const ret = audioNodes.map(node => ({ label: node.name, value: node }));

      if (ret.length == 0) {
        ret.unshift({ label: "None", value: -1 });
      }
      return ret;
    };

    return (
      <NodeEditor description={AnimationModelNodeEditor.description} {...this.props}>
        <InputGroup name="Model Url">
          <ModelInput value={node.src} onChange={this.onChangeSrc} />
        </InputGroup>
        <InputGroup name="Animation">
          <SelectInput
            disabled={this.isAnimationPropertyDisabled()}
            options={node.getClipOptions()}
            value={node.activeClipItems}
            onChange={this.onChangeAnimation}
            className="basic-multi-select"
            classNamePrefix="select"
            isMulti
          />
        </InputGroup>
        <InputGroup name="Animation Start Offset">
          <NumericInput value={node.animationStartOffset} onChange={this.onChangeAnimationStartOffset} unit={"sec"} />
        </InputGroup>
        <InputGroup name="Combine">
          <BooleanInput value={node.combine} onChange={this.onChangeCombine} />
        </InputGroup>
        <InputGroup name="Link Audio Node">
          <SelectInput
            options={getAudioNodes()}
            value={node.audioNode}
            placeholder={node.audioNode.name || "Select..."}
            onChange={this.onChangeAudioNode}
            classNamePrefix="select"
          />
        </InputGroup>
        {node.model && <GLTFInfo node={node} />}
        <AttributionNodeEditor name="Attribution" {...this.props} />
      </NodeEditor>
    );
  }
}
