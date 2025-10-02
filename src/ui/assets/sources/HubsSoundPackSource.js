import AssetManifestSource from "../AssetManifestSource";

export default class HubsSoundPackSource extends AssetManifestSource {
  constructor(editor) {
    super(editor, "Hubs Sound Pack", "https://roomiq.jp/web/hubs-sound-pack/Audio/asset-manifest.json");
  }
}
