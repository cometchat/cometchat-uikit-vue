import { OptionsStyle, ReactionsStyle } from "uikit-utils-lerna";

export class ReactionConfiguration {
  private style?: ReactionsStyle;
  private addReactionIconURL?: string;
  private optionIconURL?: string;
  private optionStyle?: OptionsStyle;

  constructor(configuration: {
    style?: ReactionsStyle;
    addReactionIconURL?: string;
    optionIconURL?: string;
    optionStyle?: OptionsStyle;
  }) {
    const { style, addReactionIconURL, optionIconURL, optionStyle } =
      configuration;
    this.style = style;
    this.addReactionIconURL = addReactionIconURL;
    this.optionIconURL = optionIconURL;
    this.optionStyle = optionStyle;
  }

  getReactionsStyle(): ReactionsStyle | undefined {
    return this.style;
  }

  getAddReactionIconURL(): string | undefined {
    return this.addReactionIconURL;
  }

  getOptionIconURL(): string | undefined {
    return this.optionIconURL;
  }

  getOptionStyle(): OptionsStyle | undefined {
    return this.optionStyle;
  }
}
