import { PropType, Ref, StyleValue } from "vue";
import { CometChatMessageTemplate, Receipts, States, DatePatterns } from "@cometchat/uikit-resources";
import { ListStyle, MessageInformationStyle } from "@cometchat/uikit-shared";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { AvatarStyle, LabelStyle, ReceiptStyle } from "@cometchat/uikit-elements";
declare const _sfc_main: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: () => any;
    };
    message: {
        type: PropType<import("@cometchat/chat-sdk-javascript").BaseMessage>;
        required: true;
    };
    backButtonIconURL: {
        type: StringConstructor;
        default: string;
    };
    closeButtonIconURL: {
        type: StringConstructor;
        default: string;
    };
    template: {
        type: PropType<CometChatMessageTemplate>;
    };
    bubbleView: {
        type: PropType<(message: CometChat.BaseMessage) => ViewType>;
    };
    listItemView: {
        type: PropType<(messageObject: CometChat.BaseMessage, messageReceipt?: CometChat.MessageReceipt) => ViewType>;
    };
    subtitleView: {
        type: PropType<(messageObject: CometChat.BaseMessage, messageReceipt?: CometChat.MessageReceipt) => ViewType>;
    };
    receiptDatePattern: {
        type: PropType<(time: number) => string>;
    };
    onClose: {
        type: PropType<() => void>;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
    messageInformationStyle: {
        type: PropType<MessageInformationStyle>;
        default: () => MessageInformationStyle;
    };
    readIcon: {
        type: StringConstructor;
        default: string;
    };
    deliveredIcon: {
        type: StringConstructor;
        default: string;
    };
    listItemStyle: {
        type: PropType<ListStyle>;
    };
    emptyStateText: {
        type: StringConstructor;
    };
    emptyStateView: {
        type: PropType<ViewType>;
    };
    errorStateText: {
        type: StringConstructor;
    };
    errorStateView: {
        type: PropType<ViewType>;
    };
    loadingIconURL: {
        type: StringConstructor;
        default: string;
    };
    loadingStateView: {
        type: PropType<ViewType>;
    };
}>, {
    currentMessage: {
        getUnreadRepliesCount: () => number;
        setUnreadRepliesCount: (value: number) => void;
        getId: () => number;
        setId: (value: number) => void;
        getConversationId: () => string;
        setConversationId: (value: string) => void;
        getParentMessageId: () => number;
        setParentMessageId: (value: number) => void;
        getMuid: () => string;
        setMuid: (value: string) => void;
        getSender: () => import("@cometchat/chat-sdk-javascript").User;
        setSender: (value: import("@cometchat/chat-sdk-javascript").User) => void;
        getReceiver: () => import("@cometchat/chat-sdk-javascript").User | import("@cometchat/chat-sdk-javascript").Group;
        setReceiver: (value: import("@cometchat/chat-sdk-javascript").User | import("@cometchat/chat-sdk-javascript").Group) => void;
        getReceiverId: () => string;
        setReceiverId: (value: string) => void;
        getType: () => string;
        setType: (value: string) => void;
        getReceiverType: () => string;
        setReceiverType: (value: string) => void;
        getSentAt: () => number;
        setSentAt: (value: number) => void;
        getStatus: () => string;
        setStatus: (value: string) => void;
        getDeliveredAt: () => number;
        setDeliveredAt: (deliveredAt: number) => void;
        getDeliveredToMeAt: () => number;
        setDeliveredToMeAt: (deliveredToMeAt: number) => void;
        getReadAt: () => number;
        setReadAt: (readAt: number) => void;
        getReadByMeAt: () => number;
        setReadByMeAt: (readByMeAt: number) => void;
        getCategory: () => import("@cometchat/chat-sdk-javascript").MessageCategory;
        setCategory: (category: import("@cometchat/chat-sdk-javascript").MessageCategory) => void;
        getEditedAt: () => number;
        setEditedAt: (editedAt: number) => void;
        getEditedBy: () => string;
        setEditedBy: (editedBy: string) => void;
        getDeletedAt: () => number;
        setDeletedAt: (deletedAt: number) => void;
        getDeletedBy: () => string;
        setDeletedBy: (deletedBy: string) => void;
        getReplyCount: () => number;
        setReplyCount: (value: number) => void;
        getRawMessage: () => Object;
        setRawMessage: (rawMessage: Object) => void;
        setMentionedUsers: (mentionedUsers: import("@cometchat/chat-sdk-javascript").User[]) => void;
        getMentionedUsers: () => import("@cometchat/chat-sdk-javascript").User[];
        setHasMentionedMe: (hasMentionedMe: boolean) => void;
        hasMentionedMe: () => boolean;
        getData: () => any;
        setData: (value: object) => void;
        setReactions: (reactions: any) => import("@cometchat/chat-sdk-javascript").ReactionCount[];
        getReactions: () => import("@cometchat/chat-sdk-javascript").ReactionCount[];
    };
    messageReceipt: Ref<import("@cometchat/chat-sdk-javascript").MessageReceipt[], import("@cometchat/chat-sdk-javascript").MessageReceipt[]>;
    user: Ref<import("@cometchat/chat-sdk-javascript").User, import("@cometchat/chat-sdk-javascript").User>;
    listStyle: Ref<ListStyle, ListStyle>;
    state: Ref<States, States>;
    Receipts: typeof Receipts;
    emptyLabelStyle: Ref<{
        textFont?: string;
        textColor?: string;
        height?: string;
        width?: string;
        border?: string;
        borderRadius?: string;
        background?: string;
    }, LabelStyle | {
        textFont?: string;
        textColor?: string;
        height?: string;
        width?: string;
        border?: string;
        borderRadius?: string;
        background?: string;
    }>;
    getTimeFormat: (time: number) => string | DatePatterns.DateTime;
    wrapperStyle: () => any;
    backButtonStyle: () => {
        height: string;
        width: string;
        borderRadius: string;
        border: string;
        background: string;
        buttonIconTint: string;
    };
    messageInformationStyles: () => StyleValue;
    closeClicked: () => void;
    closeButtonStyle: () => {
        height: string;
        width: string;
        border: string;
        borderRadius: string;
        background: string;
        buttonIconTint: string;
    };
    headerStyle: () => {
        flexShrink: string;
    };
    headerTitle: () => StyleValue;
    getDividerStyle: () => {
        width: string;
        height: string;
        background: string;
    };
    avatarStyle: () => AvatarStyle;
    getListItemStyle: () => {
        activeBackground?: string;
        hoverBackground?: string;
        separatorColor?: string;
        titleFont?: string;
        titleColor?: string;
        padding?: string;
        height?: string;
        width?: string;
        border?: string;
        borderRadius?: string;
        background?: string;
    };
    getReceiptStyle: () => ReceiptStyle;
    subtitleStyle: () => {
        font: string;
        color: string;
    };
    dateStyle: () => {
        textFont?: string;
        textColor?: string;
        padding?: string;
        display?: string;
        height?: string;
        width?: string;
        border?: string;
        borderRadius?: string;
        background?: string;
    };
    localize: (str: string) => any;
    getBubbleView: () => ViewType;
    captionTextStyle: () => {
        font: string;
        color: string;
        marginBottom: string;
        marginTop: string;
    };
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: () => any;
    };
    message: {
        type: PropType<import("@cometchat/chat-sdk-javascript").BaseMessage>;
        required: true;
    };
    backButtonIconURL: {
        type: StringConstructor;
        default: string;
    };
    closeButtonIconURL: {
        type: StringConstructor;
        default: string;
    };
    template: {
        type: PropType<CometChatMessageTemplate>;
    };
    bubbleView: {
        type: PropType<(message: CometChat.BaseMessage) => ViewType>;
    };
    listItemView: {
        type: PropType<(messageObject: CometChat.BaseMessage, messageReceipt?: CometChat.MessageReceipt) => ViewType>;
    };
    subtitleView: {
        type: PropType<(messageObject: CometChat.BaseMessage, messageReceipt?: CometChat.MessageReceipt) => ViewType>;
    };
    receiptDatePattern: {
        type: PropType<(time: number) => string>;
    };
    onClose: {
        type: PropType<() => void>;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
    messageInformationStyle: {
        type: PropType<MessageInformationStyle>;
        default: () => MessageInformationStyle;
    };
    readIcon: {
        type: StringConstructor;
        default: string;
    };
    deliveredIcon: {
        type: StringConstructor;
        default: string;
    };
    listItemStyle: {
        type: PropType<ListStyle>;
    };
    emptyStateText: {
        type: StringConstructor;
    };
    emptyStateView: {
        type: PropType<ViewType>;
    };
    errorStateText: {
        type: StringConstructor;
    };
    errorStateView: {
        type: PropType<ViewType>;
    };
    loadingIconURL: {
        type: StringConstructor;
        default: string;
    };
    loadingStateView: {
        type: PropType<ViewType>;
    };
}>> & Readonly<{}>, {
    title: string;
    backButtonIconURL: string;
    closeButtonIconURL: string;
    onError: (error: CometChat.CometChatException) => void;
    loadingIconURL: string;
    deliveredIcon: string;
    readIcon: string;
    messageInformationStyle: MessageInformationStyle;
}, {}, undefined, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
