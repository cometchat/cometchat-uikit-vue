import { Ref, PropType } from "vue";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { MessageListConfiguration, MessageComposerConfiguration, ThreadedMessagesStyle } from "@cometchat/uikit-shared";
declare const _sfc_main: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    onClose: {
        type: PropType<() => void>;
        default: () => void;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
    parentMessage: {
        type: PropType<import("@cometchat/chat-sdk-javascript").BaseMessage>;
    };
    title: {
        type: StringConstructor;
        default: () => any;
    };
    closeIconURL: {
        type: StringConstructor;
        default: string;
    };
    messageActionView: {
        type: PropType<ViewType>;
    };
    messageListConfiguration: {
        type: PropType<MessageListConfiguration>;
        default: () => MessageListConfiguration;
    };
    messageComposerConfiguration: {
        type: PropType<MessageComposerConfiguration>;
        default: () => MessageComposerConfiguration;
    };
    threadedMessagesStyle: {
        type: PropType<ThreadedMessagesStyle>;
        default: () => ThreadedMessagesStyle;
    };
    bubbleView: {
        type: PropType<(message: CometChat.BaseMessage) => ViewType>;
    };
    messageComposerView: {
        type: PropType<(user: CometChat.User, group: CometChat.Group, message: CometChat.BaseMessage) => ViewType>;
    };
    messageListView: {
        type: PropType<(user: CometChat.User, group: CometChat.Group, message: CometChat.BaseMessage) => ViewType>;
    };
    hideMessageComposer: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {
    getMessageListStyle: () => {
        emptyStateView: any;
        errorStateView: any;
        loadingStateView: any;
        disableReceipt: boolean;
        hideReceipt: boolean;
        readIcon: string;
        deliveredIcon: string;
        sentIcon: string;
        waitIcon: string;
        errorIcon: string;
        alignment: import("@cometchat/uikit-resources").MessageListAlignment;
        showAvatar: boolean;
        datePattern: import("@cometchat/uikit-resources").DatePatterns;
        timestampAlignment: import("@cometchat/uikit-resources").TimestampAlignment;
        DateSeparatorPattern: import("@cometchat/uikit-resources").DatePatterns;
        hideDateSeparator: boolean;
        templates: import("@cometchat/uikit-resources/dist/Models/CometChatMessageTemplate").CometChatMessageTemplate[];
        hideError: boolean;
        messagesRequestBuilder: import("@cometchat/chat-sdk-javascript").MessagesRequestBuilder;
        messageInformationConfiguration: import("@cometchat/uikit-shared").MessageInformationConfiguration;
        thresholdValue: number;
        scrollToBottomOnNewMessages: boolean;
        onThreadRepliesClick: any;
        headerView: any;
        footerView: any;
        loadingIconURL: string;
        avatarStyle: import("@cometchat/uikit-elements").AvatarStyle;
        dateSeparatorStyle: import("@cometchat/uikit-elements").DateStyle;
        messageListStyle: import("@cometchat/uikit-shared").MessageListStyle;
        onError: (error: import("@cometchat/chat-sdk-javascript").CometChatException) => void;
        backdropStyle: import("@cometchat/uikit-elements").BackdropStyle;
        disableMentions: boolean;
        reactionsConfiguration: import("@cometchat/uikit-shared").ReactionsConfiguration;
        disableReactions: boolean;
        emojiKeyboardStyle: import("@cometchat/uikit-elements").EmojiKeyboardStyle;
        threadIndicatorIcon: string;
        textFormatters: import("@cometchat/uikit-shared").CometChatTextFormatter[];
        height: string;
    };
    titleStyle: any;
    buttonStyle: any;
    actionButtonStyle: any;
    closeView: () => void;
    getThreadCount: () => string;
    requestBuilder: Ref<import("@cometchat/chat-sdk-javascript").MessagesRequestBuilder, import("@cometchat/chat-sdk-javascript").MessagesRequestBuilder>;
    group: any;
    user: any;
    wrapperStyle: () => {
        background: string;
        height: string;
        width: string;
        border: string;
        borderRadius: string;
    };
    componentDefinition: any;
    messageListViewComputed: import("vue").ComputedRef<ViewType>;
    messageComposerViewComputed: import("vue").ComputedRef<ViewType>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    onClose: {
        type: PropType<() => void>;
        default: () => void;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
    parentMessage: {
        type: PropType<import("@cometchat/chat-sdk-javascript").BaseMessage>;
    };
    title: {
        type: StringConstructor;
        default: () => any;
    };
    closeIconURL: {
        type: StringConstructor;
        default: string;
    };
    messageActionView: {
        type: PropType<ViewType>;
    };
    messageListConfiguration: {
        type: PropType<MessageListConfiguration>;
        default: () => MessageListConfiguration;
    };
    messageComposerConfiguration: {
        type: PropType<MessageComposerConfiguration>;
        default: () => MessageComposerConfiguration;
    };
    threadedMessagesStyle: {
        type: PropType<ThreadedMessagesStyle>;
        default: () => ThreadedMessagesStyle;
    };
    bubbleView: {
        type: PropType<(message: CometChat.BaseMessage) => ViewType>;
    };
    messageComposerView: {
        type: PropType<(user: CometChat.User, group: CometChat.Group, message: CometChat.BaseMessage) => ViewType>;
    };
    messageListView: {
        type: PropType<(user: CometChat.User, group: CometChat.Group, message: CometChat.BaseMessage) => ViewType>;
    };
    hideMessageComposer: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{}>, {
    title: string;
    onError: (error: CometChat.CometChatException) => void;
    onClose: () => void;
    closeIconURL: string;
    hideMessageComposer: boolean;
    messageListConfiguration: MessageListConfiguration;
    messageComposerConfiguration: MessageComposerConfiguration;
    threadedMessagesStyle: ThreadedMessagesStyle;
}, {}, undefined, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
