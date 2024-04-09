import { DataSource } from "../../shared/Framework/DataSource";
import { DataSourceDecorator } from "../../shared/Framework/DataSourceDecorator";
import { CometChatTheme, MessageBubbleAlignment } from "@cometchat/uikit-resources";
import { ImageModerationConfiguration } from "./ImageModerationConfiguration";
export declare class ImageModerationExtensionDecorator extends DataSourceDecorator {
    configuration?: ImageModerationConfiguration;
    newDataSource: DataSource;
    theme: CometChatTheme;
    constructor(dataSource: DataSource, { configuration }: {
        configuration?: ImageModerationConfiguration;
    });
    getId(): string;
    getImageMessageContentView(message: CometChat.MediaMessage, alignment: MessageBubbleAlignment, theme: CometChatTheme): {
        componentName: string;
        props: {
            message: import("@cometchat/chat-sdk-javascript").MediaMessage;
            imageModerationStyle: {
                filterColor: string;
                height: string;
                width: string;
                border: string;
                borderRadius: string;
                warningTextColor: string;
                warningTextFont: string;
            };
            src: string;
            placeholderImage: string;
            listeners: {
                "cc-show-dialog": any;
            };
        };
    };
    showDialog(_event: any): void;
    getConfirmDialogView(_event: any): {
        componentName: string;
        props: {
            backdropStyle: {
                height: string;
                width: string;
                background: string;
            };
            title: string;
            warningText: string;
            confirmText: any;
            cancelText: any;
            confirmDialogStyle: {
                confirmButtonBackground: string;
                cancelButtonBackground: string;
                confirmButtonTextColor: string;
                confirmButtonTextFont: string;
                cancelButtonTextColor: string;
                cancelButtonTextFont: string;
                titleFont: string;
                titleColor: string;
                messageTextFont: string;
                messageTextColor: string;
                background: string;
                height: string;
                width: string;
                border: string;
                borderRadius: string;
            };
            listeners: {
                "cc-cancel-clicked": () => void;
                "cc-confirm-clicked": () => void;
            };
        };
    };
    onCancelClicked: () => void;
    onConfirmClicked: (_event: any) => void;
    getImageModerationStyle(_theme: CometChatTheme): {
        filterColor: string;
        height: string;
        width: string;
        border: string;
        borderRadius: string;
        warningTextColor: string;
        warningTextFont: string;
    };
}
