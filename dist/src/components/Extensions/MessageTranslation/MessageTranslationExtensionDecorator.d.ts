import { DataSource } from "../../shared/Framework/DataSource";
import { DataSourceDecorator } from "../../shared/Framework/DataSourceDecorator";
import { CometChatTheme, CometChatMessageOption, CometChatActionsIcon, CometChatActionsView, MessageBubbleAlignment } from "@cometchat/uikit-resources";
import { MessageTranslationStyle } from "@cometchat/uikit-shared";
import { MessageTranslationConfiguration } from "./MessageTranslationConfiguration";
export declare class MessageTranslationExtensionDecorator extends DataSourceDecorator {
    configuration?: MessageTranslationConfiguration;
    newDataSource: DataSource;
    constructor(dataSource: DataSource, { configuration }: {
        configuration: MessageTranslationConfiguration;
    });
    getTextMessageOptions(loggedInUser: CometChat.User, messageObject: CometChat.BaseMessage, theme: CometChatTheme, group?: CometChat.Group): Array<CometChatActionsIcon | CometChatActionsView>;
    getTranslationStyle: (_alignment: MessageBubbleAlignment, _theme: CometChatTheme) => MessageTranslationStyle;
    getTextMessageStyle(_alignment: MessageBubbleAlignment, _theme: CometChatTheme): {
        textFont: string;
        textColor: string;
    };
    getTextMessageContentView(message: CometChat.TextMessage, alignment: MessageBubbleAlignment, theme: CometChatTheme, additionalConfigurations?: any): any;
    checkIfOptionExist(template: CometChatMessageOption[], id: string): boolean;
    getId(): string;
}
