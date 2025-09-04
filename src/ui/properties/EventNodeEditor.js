import React, { Component } from "react";
import PropTypes from "prop-types";
import NodeEditor from "./NodeEditor";
import PropertyGroup from "./PropertyGroup";
import { Event } from "styled-icons/material";
import ActionInput from "../inputs/ActionInput";

export default class EventNodeEditor extends Component {
  static propTypes = {
    editor: PropTypes.object,
    node: PropTypes.object
  };

  static iconComponent = Event;

  static description = "Trigger a series of actions";

  render() {
    const node = this.props.node;
    console.log(node);

    return (
      <NodeEditor description={EventNodeEditor.description} {...this.props}>
        <PropertyGroup>
          <ActionInput />
        </PropertyGroup>
      </NodeEditor>
    );
  }
}
