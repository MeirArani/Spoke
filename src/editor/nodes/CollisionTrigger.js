import { Material, BoxBufferGeometry, Object3D, Mesh, BoxHelper, Vector3 } from "three";
import EditorNodeMixin from "./EditorNodeMixin";

export default class CollisionTriggerNode extends EditorNodeMixin(Object3D) {
  static componentName = "collision-trigger";

  static nodeName = "Collision Trigger";

  static _geometry = new BoxBufferGeometry();

  static _material = new Material();

  static async deserialize(editor, json) {
    const node = await super.deserialize(editor, json);

    const props = json.components.find(c => c.name === "trigger-volume").props;

    node.enterEvent = props.enterEvent;
    node.leaveEvent = props.leaveEvent;

    return node;
  }

  constructor(editor) {
    super(editor);

    const boxMesh = new Mesh(CollisionTriggerNode._geometry, CollisionTriggerNode._material);
    const box = new BoxHelper(boxMesh, 0xffff00);
    box.layers.set(1);
    this.helper = box;
    this.add(box);
    this.enterEvent = null;
    this.leaveEvent = null;
  }

  copy(source, recursive = true) {
    if (recursive) {
      this.remove(this.helper);
    }

    super.copy(source, recursive);

    if (recursive) {
      const helperIndex = source.children.indexOf(source.helper);

      if (helperIndex !== -1) {
        this.helper = this.children[helperIndex];
      }
    }

    this.enterEvent = source.enterEvent;
    this.leaveEvent = source.leaveEvent;

    return this;
  }

  serialize() {
    return super.serialize({
      "trigger-volume": {
        enterEvent: this.enterEvent,
        leaveEvent: this.leaveEvent
      }
    });
  }

  prepareForExport() {
    super.prepareForExport();
    this.remove(this.helper);

    const scale = new Vector3();
    this.getWorldScale(scale);

    this.addGLTFComponent("collision-trigger", {
      size: { x: scale.x, y: scale.y, z: scale.z },
      triggerType: "reference", //TODO: Investigate
      isGlobal: false, //TODO: Investigate
      enterEvent: this.enterEvent,
      leaveEvent: this.this.leaveEvent
    });
    this.replaceObject();
  }
}
