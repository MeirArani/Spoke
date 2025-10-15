import GenericModelNode from "./GenericModelNode";

export default class InteractTriggerNode extends GenericModelNode {
  static nodeName = "Interact Trigger";

  static componentName = "interact-gltf-model";

  static initialElementProps = {
    initialScale: "fit",
    src: "https://hubs.local:9090/assets/models/loading-cube-7dcc3b81897e68b740c1cf12b6cf4c3f.glb"
  };

  static async deserialize(editor, json, loadAsync, onError) {
    const node = await super.deserialize(editor, json, loadAsync, onError);

    const triggerComponent = json.components.find(c => c.name === this.componentName);

    if (triggerComponent && triggerComponent.props) {
      const { pressedEvent } = triggerComponent.props;
      if (pressedEvent !== undefined) {
        node.pressedEvent = pressedEvent;
      }
    }
    return node;
  }

  constructor(editor) {
    super(editor);
    this.type = "InteractTrigger";
    this.pressedEvent = null;
  }

  copy(source, recursive = true) {
    super.copy(source, recursive);
    this.pressedEvent = source.pressedEvent;

    return this;
  }

  serialize() {
    return super.serialize({
      "interact-trigger": {
        triggerType: "reference",
        isGlobal: false,
        pressedEvent: this.pressedEvent
      }
    });
  }

  prepareForExport() {
    super.prepareForExport();

    this.addGLTFComponent("interact-trigger", {
      triggerType: "reference",
      isGlobal: false,
      pressedEvent: this.gltfIndexForUUID(this.pressedEvent)
    });
    this.replaceObject();
  }
}
