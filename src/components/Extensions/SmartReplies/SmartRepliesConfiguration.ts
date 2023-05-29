import { SmartRepliesStyle } from "uikit-utils-lerna";

export class SmartRepliesConfiguration {
  private style?: SmartRepliesStyle;

  constructor(configuration: { style?: SmartRepliesStyle }) {
    this.style = configuration.style;
  }

  getSmartRepliesStyle(): SmartRepliesStyle | undefined {
    return this.style;
  }
}
