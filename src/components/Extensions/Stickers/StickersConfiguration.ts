import { StickersStyle } from "uikit-utils-lerna";

export class StickerConfiguration {
  private style: StickersStyle;
  private stickerIconURL: string;
  private closeIconURL: string;

  constructor(configuration: {
    style?: StickersStyle;
    stickerIconURL?: string;
    closeIconURL?: string;
  }) {
    const { style, stickerIconURL, closeIconURL } = configuration;
    this.style = style as StickersStyle;
    this.stickerIconURL = stickerIconURL as string;
    this.closeIconURL = closeIconURL as string;
  }

  getStickersStyle(): StickersStyle {
    return this.style;
  }

  getStickerIconURL(): string {
    return this.stickerIconURL;
  }

  getCloseIconURL(): string {
    return this.closeIconURL;
  }
}
