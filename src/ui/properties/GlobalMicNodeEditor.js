import React from "react";
import PropTypes from "prop-types";
import NodeEditor from "./NodeEditor";
import { Microphone } from "styled-icons/fa-solid/Microphone";

export default function GlobalMicNodeEditor(props) {
  return <NodeEditor description={GlobalMicNodeEditor.description} {...props}></NodeEditor>;
}

GlobalMicNodeEditor.propTypes = {
  editor: PropTypes.object,
  node: PropTypes.object,
  multiEdit: PropTypes.bool
};

GlobalMicNodeEditor.iconComponent = Microphone;
GlobalMicNodeEditor.description = "Enables a global microphone radius for those inside this object.";
