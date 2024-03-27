import { DataSource } from "../../shared/Framework/DataSource";
import { DataSourceDecorator } from "../../shared/Framework/DataSourceDecorator";
import { CometChatTheme, MessageBubbleAlignment } from "@cometchat/uikit-resources";
import { LinkPreviewStyle } from "@cometchat/uikit-shared";
import { LinkPreviewConfiguration } from "./LinkPreviewConfiguration";
export declare class LinkPreviewExtensionDecorator extends DataSourceDecorator {
    configuration?: LinkPreviewConfiguration;
    newDataSource: DataSource;
    constructor(dataSource: DataSource, { configuration }: {
        configuration: LinkPreviewConfiguration;
    });
    getId(): string;
    getTextMessageContentView(message: CometChat.TextMessage, alignment: MessageBubbleAlignment, theme: CometChatTheme, additionalConfigurations?: any): any;
    openLink(event: any): void;
    getLinkPreviewStyle(_theme: CometChatTheme): LinkPreviewStyle;
    getTextMessageStyle(_alignment: MessageBubbleAlignment, _theme: CometChatTheme): {
        textFont: string;
        textColor: string;
    };
    getLinkPreview(message: CometChat.TextMessage): any;
    getLinkPreviewDetails(linkPreviewObject: any, key: string): string;
}
