import { Material, BoxBufferGeometry, Object3D, Mesh, BoxHelper, Vector3 } from "three";
import EditorNodeMixin from "./EditorNodeMixin";

export default class GlobalMicNode extends EditorNodeMixin(Object3D) {
  static componentName = "global-mic";

  static nodeName = "Global Mic";

  static _geometry = new BoxBufferGeometry();

  static _material = new Material();

  static async deserialize(editor, json) {
    const node = await super.deserialize(editor, json);

    return node;
  }

  constructor(editor) {
    super(editor);

    const boxMesh = new Mesh(GlobalMicNode._geometry, GlobalMicNode._material);
    const box = new BoxHelper(boxMesh, 0xffff00);
    box.layers.set(1);
    this.helper = box;
    this.add(box);
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
    return this;
  }

  serialize() {
    return super.serialize({
      "global-mic": {}
    });
  }

  prepareForExport() {
    super.prepareForExport();
    this.remove(this.helper);

    const scale = new Vector3();
    this.getWorldScale(scale);

    this.addGLTFComponent("global-mic", {
      size: { x: scale.x, y: scale.y, z: scale.z }
    });
  }
}
