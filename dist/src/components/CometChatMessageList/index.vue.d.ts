import { PropType, Ref } from "vue";
export declare const MessageListFooterStyle: () => {
    display: string;
    alignItems: string;
    justifyContent: string;
    width: string;
    height: string;
};
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { AvatarStyle, DateStyle, EmojiKeyboardStyle } from "@cometchat/uikit-elements";
import { States, MessageListAlignment, DatePatterns, TimestampAlignment, CometChatMessageTemplate, CometChatTheme, MessageBubbleAlignment, CometChatActionsView, CometChatActionsIcon, TitleAlignment } from "@cometchat/uikit-resources";
import { MessageListStyle, ListStyle, MessageInformationConfiguration, ReactionsConfiguration, CometChatTextFormatter } from "@cometchat/uikit-shared";
export declare const defaultDateSeparatorStyle: DateStyle;
export declare const unreadMessageStyle: () => {
    height: string;
    width: string;
    background: string;
    display: string;
    justifyContent: string;
    buttonTextFont: string;
    color: string;
    border: string;
    borderRadius: string;
};
declare const _sfc_main: import("vue").DefineComponent<{
    hideError: {
        type: BooleanConstructor;
        default: boolean;
    };
    scrollToBottomOnNewMessages: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    errorStateView: {
        type: PropType<ViewType>;
    };
    loadingStateView: {
        type: PropType<ViewType>;
    };
    emptyStateView: {
        type: PropType<ViewType>;
    };
    state: {
        type: PropType<States>;
        default: () => States;
    };
    thresholdValue: {
        type: NumberConstructor;
        default: number;
    };
    errorStateText: {
        type: StringConstructor;
        default: () => any;
    };
    emptyStateText: {
        type: StringConstructor;
        default: () => any;
    };
    loadingIconURL: {
        type: StringConstructor;
        default: string;
    };
    user: {
        type: PropType<import("@cometchat/chat-sdk-javascript").User>;
    };
    group: {
        type: PropType<import("@cometchat/chat-sdk-javascript").Group>;
    };
    disableReceipt: {
        type: BooleanConstructor;
        default: boolean;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
    disableSoundForMessages: {
        type: BooleanConstructor;
        default: boolean;
    };
    customSoundForMessages: {
        type: StringConstructor;
    };
    readIcon: {
        type: StringConstructor;
        default: string;
    };
    deliveredIcon: {
        type: StringConstructor;
        default: string;
    };
    sentIcon: {
        type: StringConstructor;
        default: string;
    };
    waitIcon: {
        type: StringConstructor;
        default: string;
    };
    errorIcon: {
        type: StringConstructor;
        default: string;
    };
    alignment: {
        type: PropType<MessageListAlignment>;
        default: () => MessageListAlignment;
    };
    showAvatar: {
        type: BooleanConstructor;
        default: boolean;
    };
    timestampAlignment: {
        type: PropType<TimestampAlignment>;
        default: () => TimestampAlignment;
    };
    DateSeparatorPattern: {
        type: PropType<DatePatterns>;
        default: () => DatePatterns;
    };
    templates: {
        type: PropType<CometChatMessageTemplate[]>;
    };
    messagesRequestBuilder: {
        type: PropType<import("@cometchat/chat-sdk-javascript").MessagesRequestBuilder>;
    };
    newMessageIndicatorText: {
        type: StringConstructor;
        default: string;
    };
    onThreadRepliesClick: {
        type: FunctionConstructor;
        default: () => void;
    };
    headerView: {
        type: PropType<ViewType>;
    };
    footerView: {
        type: PropType<ViewType>;
    };
    datePattern: {
        type: PropType<DatePatterns>;
        default: () => DatePatterns;
    };
    parentMessageId: {
        type: NumberConstructor;
    };
    avatarStyle: {
        type: PropType<AvatarStyle>;
        default: () => AvatarStyle;
    };
    dateSeparatorStyle: {
        type: PropType<DateStyle>;
        default: () => DateStyle;
    };
    messageListStyle: {
        type: PropType<MessageListStyle>;
        default: () => MessageListStyle;
    };
    messageInformationConfiguration: {
        type: PropType<MessageInformationConfiguration>;
        default: () => MessageInformationConfiguration;
    };
    reactionsConfiguration: {
        type: PropType<ReactionsConfiguration>;
        default: () => ReactionsConfiguration;
    };
    disableReactions: {
        type: BooleanConstructor;
        default: boolean;
    };
    emojiKeyboardStyle: {
        type: PropType<EmojiKeyboardStyle>;
        default: () => EmojiKeyboardStyle;
    };
    threadIndicatorIcon: {
        type: StringConstructor;
        default: string;
    };
    disableMentions: {
        type: BooleanConstructor;
        default: boolean;
    };
    textFormatters: {
        type: PropType<CometChatTextFormatter[]>;
        default: () => any[];
    };
}, {
    setScrollListToBottom: Ref<boolean>;
    componentState: Ref<States>;
    MessageTypesConstant: Readonly<{
        text: string;
        file: string;
        image: string;
        audio: string;
        video: string;
        delete: "delete";
        edited: "edited";
        groupMember: "groupMember";
        form: "form";
        card: "card";
        customInteractive: "customInteractive";
        scheduler: "scheduler";
    }>;
    textStyle: {
        height: string;
        width: string;
        border: string;
        borderRadius: string;
        background: string;
        textFont: string;
        textColor: string;
    };
    MessageBubbleStyle: any;
    messagesList: Ref<import("@cometchat/chat-sdk-javascript").BaseMessage[]>;
    theme: Ref<CometChatTheme>;
    loggedInUser: import("@cometchat/chat-sdk-javascript").User;
    MessageBubbleAlignment: typeof MessageBubbleAlignment;
    getBubbleAlignment: (message: CometChat.BaseMessage) => MessageBubbleAlignment;
    getContentView: (message: CometChat.BaseMessage) => any;
    getHeaderView: (message: CometChat.BaseMessage) => string | null;
    getFooterView: (message: CometChat.BaseMessage) => ViewType;
    MessageCategory: Readonly<{
        message: string;
        custom: string;
        action: string;
        call: string;
        interactive: string;
    }>;
    showMessageInformation: Ref<boolean>;
    selectedMessage: Ref<import("@cometchat/chat-sdk-javascript").BaseMessage>;
    getBubbleLeadingView: (item: CometChat.BaseMessage) => any;
    getListStyle: () => ListStyle;
    getBubbleStatusInfoViewDate: (item: any) => string;
    getBubbleFooterView: (item: CometChat.BaseMessage) => any;
    getBubbleHeaderView: (item: CometChat.BaseMessage) => any;
    newMessageCount: Ref<string | number>;
    unreadMessagesStyle: {
        height: string;
        width: string;
        background: string;
        display: string;
        justifyContent: string;
        font: string;
        buttonTextColor: string;
        border: string;
        borderRadius: string;
        padding: string;
    };
    scrollToBottom: (skipRequestBuilderCreation?: boolean) => void;
    UnreadCount: any;
    isOnBottom: boolean;
    setMessageOptions: (msgObject: CometChat.BaseMessage) => Array<CometChatActionsIcon | CometChatActionsView>;
    openThreadView: (message: CometChat.BaseMessage) => void;
    getThreadCount: (message: CometChat.BaseMessage) => string;
    threadedAlignment: MessageBubbleAlignment.left;
    openThreadViewToggle: Ref<boolean>;
    currentMessage: any;
    getBubbleWrapper: (message: CometChat.BaseMessage) => any;
    topCallback: () => Promise<void>;
    bottomCallback: () => Promise<void>;
    getEmptyHtml: () => any;
    getLoaderHtml: () => any;
    getErrorHtml: () => any;
    getMessageBubbleDate: (item: CometChat.BaseMessage, i: number) => string;
    MessageThreadViewStyle: (message: CometChat.BaseMessage, theme: Ref<CometChatTheme>, loggedInUser: CometChat.User) => {
        height: string;
        width: string;
        border: string;
        borderRadius: string;
        background: string;
        buttonIconTint: string;
        display: string;
        flexFlow: string;
        alignItems: string;
        buttonTextColor: string;
        buttonTextFont: string;
        iconHeight: string;
        iconWidth: string;
        gap: string;
    };
    unreadMessageStyle: () => {
        height: string;
        width: string;
        background: string;
        display: string;
        justifyContent: string;
        buttonTextFont: string;
        color: string;
        border: string;
        borderRadius: string;
    };
    fetchNextMessage: () => void;
    getLoggedinUser: () => import("@cometchat/chat-sdk-javascript").User;
    getMessageListDivStyle: () => any;
    getDividerStyle: () => {
        height: string;
        width: string;
        background: string;
    };
    threadOpenIcon: string;
    SearchIcon: string;
    TitleAlignment: typeof TitleAlignment;
    getBubbleThreadView: (item: CometChat.BaseMessage) => any;
    showSmartReplyRef: Ref<boolean>;
    getSmartReplyView: () => ViewType;
    MessageListFooterStyle: () => {
        display: string;
        alignItems: string;
        justifyContent: string;
        width: string;
        height: string;
    };
    MessageListHeaderStyle: () => {
        display: string;
        alignItems: string;
        justifyContent: string;
        width: string;
        height: string;
    };
    confirmDialogView: Ref<ViewType>;
    getBottomView: (message: CometChat.BaseMessage) => any;
    showOngoingCallRef: Ref<boolean>;
    getOngoingCallView: () => ViewType;
    ListStyle: typeof ListStyle;
    onInformationClose: () => void;
    getMessageTemplate: (selectedMessage: CometChat.BaseMessage) => any;
    onBottom: Ref<boolean>;
    getStatusInfoView: (message: CometChat.BaseMessage) => any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    hideError: {
        type: BooleanConstructor;
        default: boolean;
    };
    scrollToBottomOnNewMessages: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    errorStateView: {
        type: PropType<ViewType>;
    };
    loadingStateView: {
        type: PropType<ViewType>;
    };
    emptyStateView: {
        type: PropType<ViewType>;
    };
    state: {
        type: PropType<States>;
        default: () => States;
    };
    thresholdValue: {
        type: NumberConstructor;
        default: number;
    };
    errorStateText: {
        type: StringConstructor;
        default: () => any;
    };
    emptyStateText: {
        type: StringConstructor;
        default: () => any;
    };
    loadingIconURL: {
        type: StringConstructor;
        default: string;
    };
    user: {
        type: PropType<import("@cometchat/chat-sdk-javascript").User>;
    };
    group: {
        type: PropType<import("@cometchat/chat-sdk-javascript").Group>;
    };
    disableReceipt: {
        type: BooleanConstructor;
        default: boolean;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
    disableSoundForMessages: {
        type: BooleanConstructor;
        default: boolean;
    };
    customSoundForMessages: {
        type: StringConstructor;
    };
    readIcon: {
        type: StringConstructor;
        default: string;
    };
    deliveredIcon: {
        type: StringConstructor;
        default: string;
    };
    sentIcon: {
        type: StringConstructor;
        default: string;
    };
    waitIcon: {
        type: StringConstructor;
        default: string;
    };
    errorIcon: {
        type: StringConstructor;
        default: string;
    };
    alignment: {
        type: PropType<MessageListAlignment>;
        default: () => MessageListAlignment;
    };
    showAvatar: {
        type: BooleanConstructor;
        default: boolean;
    };
    timestampAlignment: {
        type: PropType<TimestampAlignment>;
        default: () => TimestampAlignment;
    };
    DateSeparatorPattern: {
        type: PropType<DatePatterns>;
        default: () => DatePatterns;
    };
    templates: {
        type: PropType<CometChatMessageTemplate[]>;
    };
    messagesRequestBuilder: {
        type: PropType<import("@cometchat/chat-sdk-javascript").MessagesRequestBuilder>;
    };
    newMessageIndicatorText: {
        type: StringConstructor;
        default: string;
    };
    onThreadRepliesClick: {
        type: FunctionConstructor;
        default: () => void;
    };
    headerView: {
        type: PropType<ViewType>;
    };
    footerView: {
        type: PropType<ViewType>;
    };
    datePattern: {
        type: PropType<DatePatterns>;
        default: () => DatePatterns;
    };
    parentMessageId: {
        type: NumberConstructor;
    };
    avatarStyle: {
        type: PropType<AvatarStyle>;
        default: () => AvatarStyle;
    };
    dateSeparatorStyle: {
        type: PropType<DateStyle>;
        default: () => DateStyle;
    };
    messageListStyle: {
        type: PropType<MessageListStyle>;
        default: () => MessageListStyle;
    };
    messageInformationConfiguration: {
        type: PropType<MessageInformationConfiguration>;
        default: () => MessageInformationConfiguration;
    };
    reactionsConfiguration: {
        type: PropType<ReactionsConfiguration>;
        default: () => ReactionsConfiguration;
    };
    disableReactions: {
        type: BooleanConstructor;
        default: boolean;
    };
    emojiKeyboardStyle: {
        type: PropType<EmojiKeyboardStyle>;
        default: () => EmojiKeyboardStyle;
    };
    threadIndicatorIcon: {
        type: StringConstructor;
        default: string;
    };
    disableMentions: {
        type: BooleanConstructor;
        default: boolean;
    };
    textFormatters: {
        type: PropType<CometChatTextFormatter[]>;
        default: () => any[];
    };
}>>, {
    hideError: boolean;
    errorStateText: string;
    emptyStateText: string;
    onError: (error: CometChat.CometChatException) => void;
    avatarStyle: AvatarStyle;
    loadingIconURL: string;
    state: States;
    datePattern: DatePatterns;
    disableSoundForMessages: boolean;
    disableReceipt: boolean;
    deliveredIcon: string;
    readIcon: string;
    waitIcon: string;
    sentIcon: string;
    errorIcon: string;
    disableMentions: boolean;
    textFormatters: CometChatTextFormatter[];
    alignment: MessageListAlignment;
    emojiKeyboardStyle: EmojiKeyboardStyle;
    scrollToBottomOnNewMessages: boolean;
    thresholdValue: number;
    showAvatar: boolean;
    timestampAlignment: TimestampAlignment;
    DateSeparatorPattern: DatePatterns;
    newMessageIndicatorText: string;
    onThreadRepliesClick: Function;
    dateSeparatorStyle: DateStyle;
    messageListStyle: MessageListStyle;
    messageInformationConfiguration: MessageInformationConfiguration;
    reactionsConfiguration: ReactionsConfiguration;
    disableReactions: boolean;
    threadIndicatorIcon: string;
}, {}>;
export default _sfc_main;
