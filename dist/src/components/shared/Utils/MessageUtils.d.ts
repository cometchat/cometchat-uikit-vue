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
    /**
 * Function to check if a user's status should be visible
 * @param {CometChat.User | CometChat.GroupMember} user - The user whose status visibility is to be checked.
 * @return {boolean} - Returns `true` if the user's status should be hidden (blocked or offline), `false` otherwise.
 */
    getUserStatusVisibility(user?: CometChat.User | CometChat.GroupMember): boolean;
}
