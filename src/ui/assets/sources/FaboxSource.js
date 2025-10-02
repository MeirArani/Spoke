import KitSource from "../KitSource";
import { TransformPivot } from "../../../editor/controls/SpokeControls";

export default class FaboxSource extends KitSource {
  constructor(api) {
    super(api, "https://roomiq.jp/web/external_file/fabox/fabox.json");
    this.id = "fabox";
    this.name = "Fabox";
    this.transformPivot = TransformPivot.Selection;
  }
}
