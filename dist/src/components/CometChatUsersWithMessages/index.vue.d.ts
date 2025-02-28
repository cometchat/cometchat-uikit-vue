import { Ref, PropType } from "vue";
import { MessagesConfiguration, UsersConfiguration, WithMessagesStyle } from "@cometchat/uikit-shared";
import { CometChat } from "@cometchat/chat-sdk-javascript";
declare const _sfc_main: import("vue").DefineComponent<{
    user: {
        type: PropType<import("@cometchat/chat-sdk-javascript").User>;
    };
    isMobileView: {
        type: BooleanConstructor;
        default: boolean;
    };
    messageText: {
        type: StringConstructor;
        default: () => any;
    };
    usersWithMessagesStyle: {
        type: PropType<WithMessagesStyle>;
        default: () => WithMessagesStyle;
    };
    messagesConfiguration: {
        type: PropType<MessagesConfiguration>;
        default: () => MessagesConfiguration;
    };
    usersConfiguration: {
        type: PropType<UsersConfiguration>;
        default: () => UsersConfiguration;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
}, {
    labelStyle: any;
    onItemClick: (user: CometChat.User) => void;
    emptyMessageStyle: () => {
        background: string;
        height: string;
        width: string;
        border: string;
        borderRadius: string;
    };
    usersWrapperStyles: () => {
        height: any;
        width: any;
        border: any;
        borderRadius: any;
        background: any;
    };
    messagesConfig: Ref<any>;
    currentUser: Ref<any>;
    getMenu: () => any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    user: {
        type: PropType<import("@cometchat/chat-sdk-javascript").User>;
    };
    isMobileView: {
        type: BooleanConstructor;
        default: boolean;
    };
    messageText: {
        type: StringConstructor;
        default: () => any;
    };
    usersWithMessagesStyle: {
        type: PropType<WithMessagesStyle>;
        default: () => WithMessagesStyle;
    };
    messagesConfiguration: {
        type: PropType<MessagesConfiguration>;
        default: () => MessagesConfiguration;
    };
    usersConfiguration: {
        type: PropType<UsersConfiguration>;
        default: () => UsersConfiguration;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
}>>, {
    onError: (error: CometChat.CometChatException) => void;
    usersConfiguration: UsersConfiguration;
    isMobileView: boolean;
    messageText: string;
    messagesConfiguration: MessagesConfiguration;
    usersWithMessagesStyle: WithMessagesStyle;
}, {}>;
export default _sfc_main;
