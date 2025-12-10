import { Group } from "three";
import EditorNodeMixin from "./EditorNodeMixin";

export default class GroupNode extends EditorNodeMixin(Group) {
  static componentName = "jump";

  static nodeName = "Jump";

  static async deserialize(editor, json, loadAsync) {
    const node = await super.deserialize(editor, json);

    loadAsync(async () => {
      const { jumpEnabled } = json.components.find(c => c.name === "jump").props;
      node.jumpEnabled = jumpEnabled;
    });

    return node;
  }

  constructor(editor) {
    super(editor);
    this.jumpEnabled = true;
  }

  serialize() {
    return super.serialize({
      jump: { jumpEnabled: this.jumpEnabled }
    });
  }

  copy(source, recursive = true) {
    super.copy(source, recursive);
    this.jumpEnabled = source.jumpEnabled;
    return this;
  }

  clone() {
    return new this.constructor(this.editor).copy(this, false);
  }

  prepareForExport() {
    super.prepareForExport();
    this.addGLTFComponent("jump", {
      jumpEnabled: this.jumpEnabled
    });
    this.replaceObject();
  }
}
