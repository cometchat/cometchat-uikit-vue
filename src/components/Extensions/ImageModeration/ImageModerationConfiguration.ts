import { ConfirmDialogStyle } from "my-cstom-package-lit";
import { BaseStyle, ImageModerationStyle } from "uikit-utils-lerna";

export class ImageModerationConfiguration {
  private style?: ImageModerationStyle;
  private confirmDialogStyle?: ConfirmDialogStyle;
  private backDropStyle?: BaseStyle;

  constructor(configuration: {
    style?: ImageModerationStyle;
    confirmDialogStyle?: ConfirmDialogStyle;
    backDropStyle?: BaseStyle;
  }) {
    this.style = configuration.style;
    this.confirmDialogStyle = configuration.confirmDialogStyle;
    this.backDropStyle = configuration.backDropStyle;
  }

  getImageModerationStyle(): ImageModerationStyle | undefined {
    return this.style;
  }
  getConfirmDialogSyle(): ConfirmDialogStyle | undefined {
    return this.confirmDialogStyle;
  }
  getBackDropStyle(): BaseStyle | undefined {
    return this.backDropStyle;
  }
}
