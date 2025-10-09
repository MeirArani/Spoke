import { Group } from "three";
import EditorNodeMixin from "./EditorNodeMixin";

export default class EventNode extends EditorNodeMixin(Group) {
  static componentName = "event";

  static nodeName = "Event";

  static async deserialize(editor, json, loadAsync) {
    const node = await super.deserialize(editor, json);

    loadAsync(async () => {
      const { actions } = json.components.find(c => c.name === "event").props;
      actions.forEach(action => {
        this.actions.push(action);
      });
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
      ({ name: action.name, target: action.target });
    });
    this.addGLTFComponent("event", {
      actions: exportActions
    });
    this.replaceObject();
  }
}
