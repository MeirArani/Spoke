import EditorNodeMixin from "./EditorNodeMixin";

export default function ActionParamsNode(Type) {
  return class extends EditorNodeMixin(Type) {
    static async deserialize(editor, json) {
      const node = await super.deserialize(editor, json);

      const actions = json.components.find(c => c.name === "event").props.actions;

      node.actions = actions;

      return node;
    }

    constructor(editor) {
      super(editor);
    }

    copy(source, recursive = true) {
      super.copy(source, recursive);

      this.actions = source.actions;

      return this;
    }

    serialize(components) {
      return super.serialize({
        ...components
      });
    }
  };
}
