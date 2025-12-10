import React, { Component } from "react";
import PropTypes from "prop-types";
import NodeEditor from "./NodeEditor";
import { Upvote } from "styled-icons/boxicons-regular/";
import BooleanInput from "../inputs/BooleanInput";
import InputGroup from "../inputs/InputGroup";

export default class JumpNodeEditor extends Component {
  static propTypes = {
    editor: PropTypes.object,
    node: PropTypes.object
  };

  static iconComponent = Upvote;

  static description = "Jump!!!";

  onChangeJumpEnabled = jumpEnabled => {
    this.props.editor.setPropertySelected("jumpEnabled", jumpEnabled);
  };

  render() {
    const node = this.props.node;

    return (
      <NodeEditor description={JumpNodeEditor.description} {...this.props}>
        <InputGroup name="Jump Enabled">
          <BooleanInput value={node.jumpEnabled} onChange={this.onChangeJumpEnabled} />
        </InputGroup>
      </NodeEditor>
    );
  }
}
