import { DataSource } from "../../shared/Framework/DataSource";
import { DataSourceDecorator } from "../../shared/Framework/DataSourceDecorator";
import { CometChatTheme, MessageBubbleAlignment } from "@cometchat/uikit-resources";
export declare class TextModeratorExtensionDecorator extends DataSourceDecorator {
    constructor(dataSource: DataSource);
    getId(): string;
    getModeratedtext(message: CometChat.TextMessage): string;
    getLastConversationMessage(conversation: CometChat.Conversation, loggedInUser: CometChat.User, additionalConfigurations: any): string;
    getTextMessageContentView(message: CometChat.TextMessage, alignment: MessageBubbleAlignment, theme: CometChatTheme, additionalConfigurations?: any): any;
}
