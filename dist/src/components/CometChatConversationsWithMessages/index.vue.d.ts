import { Ref, PropType } from "vue";
import { ConversationsConfiguration, GroupsConfiguration, MessagesConfiguration, UsersConfiguration, WithMessagesStyle, ContactsConfiguration } from "@cometchat/uikit-shared";
import { CometChat } from "@cometchat/chat-sdk-javascript";
declare const _sfc_main: import("vue").DefineComponent<{
    user: {
        type: PropType<import("@cometchat/chat-sdk-javascript").User>;
    };
    group: {
        type: PropType<import("@cometchat/chat-sdk-javascript").Group>;
    };
    isMobileView: {
        type: BooleanConstructor;
        default: boolean;
    };
    messageText: {
        type: StringConstructor;
        default: () => any;
    };
    conversationsWithMessagesStyle: {
        type: PropType<WithMessagesStyle>;
        default: () => WithMessagesStyle;
    };
    messagesConfiguration: {
        type: PropType<MessagesConfiguration>;
        default: () => MessagesConfiguration;
    };
    conversationConfiguration: {
        type: PropType<ConversationsConfiguration>;
        default: () => ConversationsConfiguration;
    };
    onError: {
        type: FunctionConstructor;
        default: (error: CometChat.CometChatException) => void;
    };
    startConversationConfiguration: {
        type: PropType<ContactsConfiguration>;
        default: () => ContactsConfiguration;
    };
    startConversationIconUrl: {
        type: StringConstructor;
        default: string;
    };
}, {
    labelStyle: any;
    onItemClick: (conversation: CometChat.Conversation) => void;
    emptyMessageStyle: () => {
        background: string;
        height: string;
        width: string;
        border: string;
        borderRadius: string;
    };
    chatsWrapperStyles: () => {
        height: string;
        width: string;
        border: string;
        borderRadius: string;
        background: string;
    };
    messagesConfig: Ref<any>;
    currentUser: Ref<any>;
    currentGroup: Ref<any>;
    activeConversation: any;
    getMenu: () => any;
    getConversationStyle: () => {
        titleTextFont?: string;
        titleTextColor?: string;
        emptyStateTextFont?: string;
        emptyStateTextColor?: string;
        errorStateTextFont?: string;
        errorStateTextColor?: string;
        loadingIconTint?: string;
        onlineStatusColor?: string;
        separatorColor?: string;
        boxShadow?: string;
        privateGroupIconBackground?: string;
        passwordGroupIconBackground?: string;
        lastMessageTextColor?: string;
        lastMessageTextFont?: string;
        typingIndictorTextColor?: string;
        typingIndictorTextFont?: string;
        threadIndicatorTextFont?: string;
        threadIndicatorTextColor?: string;
        height: string;
        width?: string;
        border?: string;
        borderRadius?: string;
        background?: string;
    };
    getStartConversationButton: () => ViewType;
    showContacts: Ref<boolean>;
    onContactsItemClick: (user: CometChat.User | null, group: CometChat.Group | null) => void;
    closeContacts: () => void;
    localize: (str: string) => any;
    getUsersConfiguration: () => UsersConfiguration;
    getGroupsConfiguration: () => GroupsConfiguration;
    shouldShowSidebar: import("vue").ComputedRef<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    user: {
        type: PropType<import("@cometchat/chat-sdk-javascript").User>;
    };
    group: {
        type: PropType<import("@cometchat/chat-sdk-javascript").Group>;
    };
    isMobileView: {
        type: BooleanConstructor;
        default: boolean;
    };
    messageText: {
        type: StringConstructor;
        default: () => any;
    };
    conversationsWithMessagesStyle: {
        type: PropType<WithMessagesStyle>;
        default: () => WithMessagesStyle;
    };
    messagesConfiguration: {
        type: PropType<MessagesConfiguration>;
        default: () => MessagesConfiguration;
    };
    conversationConfiguration: {
        type: PropType<ConversationsConfiguration>;
        default: () => ConversationsConfiguration;
    };
    onError: {
        type: FunctionConstructor;
        default: (error: CometChat.CometChatException) => void;
    };
    startConversationConfiguration: {
        type: PropType<ContactsConfiguration>;
        default: () => ContactsConfiguration;
    };
    startConversationIconUrl: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    onError: Function;
    isMobileView: boolean;
    messageText: string;
    conversationsWithMessagesStyle: WithMessagesStyle;
    messagesConfiguration: MessagesConfiguration;
    conversationConfiguration: ConversationsConfiguration;
    startConversationConfiguration: ContactsConfiguration;
    startConversationIconUrl: string;
}, {}>;
export default _sfc_main;
