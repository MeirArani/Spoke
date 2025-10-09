import ModelNode from "./ModelNode";

export default class InteractTriggerNode extends ModelNode {
  static nodeName = "Interact Trigger";

  static componentName = "interact-trigger";

  static initialElementProps = {
    initialScale: "fit",
    src: "https://sketchfab.com/models/a4c500d7358a4a199b6a5cd35f416466"
  };

  static async deserialize(editor, json, _loadAsync, _onError) {
    const node = await super.deserialize(editor, json);

    return node;
  }

  constructor(editor) {
    super(editor);
    this.pressedEvent = null;
  }

  copy(source, recursive = true) {
    super.copy(source, recursive);
    this.pressedEvent = source.pressedEvent;

    this.updateStaticModes();

    return this;
  }

  prepareForExport(_ctx) {
    super.prepareForExport();

    this.addGLTFComponent("interact-trigger", {
      triggerType: "reference",
      isGlobal: false,
      pressedEvent: this.pressedEvent // TODO: ADD!
    });
    this.replaceObject();
  }
}
