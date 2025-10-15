import { getComponents } from "../gltf/moz-hubs-components";
import GenericModelNode from "./GenericModelNode";

export default class ModelNode extends GenericModelNode {
  static nodeName = "Model";

  static componentName = "gltf-model";

  static initialElementProps = {
    initialScale: "fit",
    src: "https://sketchfab.com/models/a4c500d7358a4a199b6a5cd35f416466"
  };

  static async deserialize(editor, json, loadAsync, onError) {
    const node = await super.deserialize(editor, json, loadAsync, onError);

    const loopAnimationComponent = json.components.find(c => c.name === "loop-animation");

    if (loopAnimationComponent && loopAnimationComponent.props) {
      const { clip, activeClipIndices } = loopAnimationComponent.props;

      if (clip !== undefined && node.model && node.model.animations) {
        // DEPRECATED: Old loop-animation component stored the clip name rather than the clip index
        const clipIndex = node.model.animations.findIndex(animation => animation.name === clip);

        if (clipIndex !== -1) {
          node.activeClipItems = node.getActiveItems([clipIndex]);
        }
      } else {
        node.activeClipItems = node.getActiveItems(activeClipIndices);
      }
    }

    return node;
  }

  constructor(editor) {
    super(editor);
  }

  serialize() {
    const components = {
      "gltf-model": {
        src: this._canonicalUrl,
        attribution: this.attribution
      },
      shadow: {
        cast: this.castShadow,
        receive: this.receiveShadow
      }
    };

    if (this.activeClipIndices.length > 0) {
      components["loop-animation"] = {
        activeClipIndices: this.activeClipIndices
      };
    }
    return super.serialize(components);
  }

  copy(source, recursive = true) {
    super.copy(source, recursive);

    return this;
  }

  prepareForExport(ctx) {
    super.prepareForExport();

    this.addGLTFComponent("shadow", {
      cast: this.castShadow,
      receive: this.receiveShadow
    });

    const clipIndices = this.activeClipIndices.map(index => {
      return ctx.animations.indexOf(this.model.animations[index]);
    });

    this.model.traverse(child => {
      const components = getComponents(child);

      if (components && components["loop-animation"]) {
        delete components["loop-animation"];
      }
    });

    if (clipIndices.length > 0) {
      this.addGLTFComponent("loop-animation", {
        activeClipIndices: clipIndices
      });
    }

    if (this.billboard) {
      this.addGLTFComponent("billboard", {});
    }
  }
}
