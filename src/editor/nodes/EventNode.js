import { Group } from "three";
import EditorNodeMixin from "./EditorNodeMixin";

export default class EventNode extends EditorNodeMixin(Group) {
  static componentName = "event";

  static nodeName = "Event";

  static async deserialize(editor, json) {
    const node = await super.deserialize(editor, json);

    const { actions } = json.components.find(c => c.name === "event").props;
    actions.forEach(action => {
      node.actions.push(action);
    });

    return node;
  }

  constructor(editor) {
    super(editor);
    this.actions = [];
  }

  serialize() {
    return super.serialize({
      event: { actions: this.actions }
    });
  }

  copy(source, recursive = true) {
    super.copy(source, recursive);
    this.actions = source.actions;
    return this;
  }

  clone() {
    return new this.constructor(this.editor).copy(this, false);
  }

  prepareForExport() {
    super.prepareForExport();
    const exportActions = this.actions.map(action => {
      const ret = action;
      switch (action.name) {
        case "animationModelPlay":
        case "animationModelStop":
        case "changeVisible":
        case "changeTroikaText":
          ret.target = this.gltfIndexForUUID(action.target);
          break;
        case "switchEvent":
          ret.targetTrigger = this.gltfIndexForUUID(action.targetTrigger);
          ret.event = this.gltfIndexForUUID(action.event);
      }
      return ret;
    });
    this.addGLTFComponent("event", {
      actions: exportActions
    });
    this.replaceObject();
  }
}
