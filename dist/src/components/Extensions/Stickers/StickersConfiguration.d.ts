import { StickersStyle } from "@cometchat/uikit-shared";
export declare class StickerConfiguration {
    private style;
    private stickerIconURL;
    private closeIconURL;
    constructor(configuration: {
        style?: StickersStyle;
        stickerIconURL?: string;
        closeIconURL?: string;
    });
    getStickersStyle(): StickersStyle;
    getStickerIconURL(): string;
    getCloseIconURL(): string;
}
