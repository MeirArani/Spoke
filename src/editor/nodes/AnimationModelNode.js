import { Box3, Sphere, PropertyBinding } from "three";
import Model from "../objects/Model";
import EditorNodeMixin from "./EditorNodeMixin";
import { setStaticMode, StaticModes } from "../StaticMode";
import cloneObject3D from "../utils/cloneObject3D";
import { getComponents } from "../gltf/moz-hubs-components";
import { RethrownError } from "../utils/errors";
import { getObjectPerfIssues, maybeAddLargeFileIssue } from "../utils/performance";
import ModelNode from "./ModelNode";

const defaultStats = {
  nodes: 0,
  meshes: 0,
  materials: 0,
  textures: 0,
  polygons: 0,
  vertices: 0,
  jsonSize: 0,
  bufferInfo: {},
  textureInfo: {},
  meshInfo: {}
};

export default class AnimationModelNode extends ModelNode {
  static nodeName = "Animation Model";

  static componentName = "animation-gltf-model";

  static initialElementProps = {
    initialScale: "fit",
    src: "https://sketchfab.com/models/a4c500d7358a4a199b6a5cd35f416466"
  };

  static async deserialize(editor, json, loadAsync, onError) {
    const node = await super.deserialize(editor, json);

    loadAsync(
      (async () => {
        const { src, attribution } = json.components.find(c => c.name === "gltf-model").props;

        await node.load(src, onError);

        // Legacy, might be a raw string left over before switch to JSON.
        if (attribution && typeof attribution === "string") {
          const [name, author] = attribution.split(" by ");
          node.attribution = node.attribution || {};
          Object.assign(node.attribution, author ? { author: author } : null, name ? { title: name } : null);
        } else {
          node.attribution = attribution;
        }

        node.combine = !!json.components.find(c => c.name === "combine");

        const animationComponent = json.components.find(c => c.name === "animation-model");

        if (animationComponent && animationComponent.props) {
          const { activeClipIndex, animationStartOffset, audioNode } = loopAnimationComponent.props;

          if (animationStartOffset !== undefined) {
            node.animationStartOffset = animationStartOffset;
          }

          if (audioNode !== undefined) {
            node.audioNode = audioNode;
          }

          if (activeClipIndex !== undefined && node.model && node.model.animations) {
            // DEPRECATED: Old loop-animation component stored the clip name rather than the clip index

            if (activeClipIndex !== -1) {
              node.activeClipItems = node.getActiveItems([activeClipIndex]);
            }
          }
        }
      })()
    );

    return node;
  }

  constructor(editor) {
    super(editor);
    this.activeClipIndex = null;
    this.animationStartOffset = 0.0;
    this.audioNode = null;
  }

  serialize() {
    const components = {
      "animation-gltf-model": {
        src: this._canonicalUrl,
        attribution: this.attribution
      }
    };

    if (this.activeClipIndices.length > 0) {
      components["animation-model"] = {
        activeClipIndex: this.activeClipIndex,
        animationStartOffset: this.animationStartOffset,
        audioNode: this.audioNode
      };
    }

    if (this.combine) {
      components.combine = {};
    }

    return super.serialize(components);
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
  }
}
