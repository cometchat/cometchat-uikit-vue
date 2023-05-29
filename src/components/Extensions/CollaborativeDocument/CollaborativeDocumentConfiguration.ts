import { DocumentBubbleStyle } from "my-cstom-package-lit";

import { OptionsStyle } from "uikit-utils-lerna";
export class CollaborativeDocumentConfiguration {
  private style?: DocumentBubbleStyle;
  private iconURL?: string;
  private optionIconURL?: string;
  private optionStyle?: OptionsStyle;

  constructor(configuration: {
    style?: DocumentBubbleStyle;
    iconURL?: string;
    optionIconURL?: string;
    optionStyle?: OptionsStyle;
  }) {
    this.style = configuration.style;
    this.iconURL = configuration.iconURL;
    this.optionIconURL = configuration.optionIconURL;
    this.optionStyle = configuration.optionStyle;
  }

  getDocumentBubbleStyle(): DocumentBubbleStyle | undefined {
    return this.style;
  }

  getIconURL(): string | undefined {
    return this.iconURL;
  }

  getOptionIconURL(): string | undefined {
    return this.optionIconURL;
  }

  getOptionStyle(): OptionsStyle | undefined {
    return this.optionStyle;
  }
}
