import { AIAssistBotConfiguration } from "@cometchat/uikit-shared";
import { CometChatTheme, MessageBubbleAlignment } from "@cometchat/uikit-resources";
export declare function getBubbleAlignment(message: CometChat.TextMessage, sender: CometChat.User): MessageBubbleAlignment;
export declare function getContentView(message: CometChat.TextMessage, theme: CometChatTheme, alignment: MessageBubbleAlignment, configuration: AIAssistBotConfiguration): ViewType;
export declare function getBubbleFooterView(item: CometChat.TextMessage, configuration: AIAssistBotConfiguration, theme: CometChatTheme, sender: CometChat.User): ViewType;
