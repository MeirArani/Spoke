import GenericModelNode from "./GenericModelNode";

export default class AnimationModelNode extends GenericModelNode {
  static nodeName = "Animation Model";

  static componentName = "animation-gltf-model";

  static initialElementProps = {
    initialScale: "fit",
    src: "https://hubs.local:9090/assets/models/loading-cube-7dcc3b81897e68b740c1cf12b6cf4c3f.glb"
  };

  activeClipItem = this.activeClipIndex;

  static async deserialize(editor, json, loadAsync, onError) {
    const node = await super.deserialize(editor, json, loadAsync, onError);

    const animationComponent = json.components.find(c => c.name === "animation-model");

    if (animationComponent && animationComponent.props) {
      const { activeClipIndex, animationStartOffset, audioNode } = animationComponent.props;

      if (animationStartOffset !== undefined) {
        node.animationStartOffset = animationStartOffset;
      }

      if (audioNode !== undefined) {
        node.audioNode = audioNode;
      }

      if (activeClipIndex !== undefined && node.model && node.model.animations) {
        // DEPRECATED: Old loop-animation component stored the clip name rather than the clip index

        if (activeClipIndex !== -1) {
          node.activeClipIndex = activeClipIndex;
        }
      }
    }

    return node;
  }

  constructor(editor) {
    super(editor);
    this.type = "AnimationModel";
    this.activeClipIndex = {};
    this.animationStartOffset = 0.0;
    this.audioNode = null;
  }

  get activeClip() {
    return this.getClipOptions()[this.activeClipIndex];
  }

  serialize() {
    const toAdd = {};
    if (this.activeClipIndex || this.activeClipIndex >= 0) {
      toAdd.activeClipIndex = this.activeClipIndex;
      toAdd.animationStartOffset = this.animationStartOffset;
    }
    if (this.audioNode) {
      toAdd.audioNode = this.audioNode;
    }

    return super.serialize({
      "animation-model": toAdd
    });
  }

  copy(source, recursive = true) {
    super.copy(source, recursive);

    this.activeClipIndex = source.activeClipIndex;
    this.animationStartOffset = source.animationStartOffset;
    this.audioNode = source.audioNode;

    return this;
  }

  prepareForExport(ctx) {
    super.prepareForExport(ctx);
    this.addGLTFComponent("animation-model", {
      activeClipIndex: this.activeClipIndex,
      animationStartOffset: this.animationStartOffset,
      audioNode: this.gltfIndexForUUID(this.audioNode)
    });
    this.replaceObject();
  }
}
