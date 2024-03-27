import { CometChatMessageTemplate, CometChatTheme, MessageBubbleAlignment } from "@cometchat/uikit-resources";
import { Ref } from "vue";
export declare class MessageUtils {
    messageBubbleStyle(message: CometChat.BaseMessage, theme: Ref<CometChatTheme>, alignment: MessageBubbleAlignment, currentUser: any): {
        background: string;
        border: string;
        borderRadius: string;
    } | {
        background: string;
        borderRadius: string;
        border?: undefined;
    };
    getContentView(message: CometChat.BaseMessage, template: CometChatMessageTemplate): any;
    getBubbleWrapper(message: CometChat.BaseMessage, template: CometChatMessageTemplate): any;
    getMessageBubble(baseMessage: CometChat.BaseMessage, template: CometChatMessageTemplate, messageBubbleStyle: any, alignment: MessageBubbleAlignment): any;
}
