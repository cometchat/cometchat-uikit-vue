import { PropType, Ref } from "vue";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { getBotChatContainerStyle, getBotChatHeaderStyle, getSendButtonStyle, getCloseButtonStyle, getMessageBubbleStyle, textInputStyle, getAvatarStyle, getBotBackgroundStyle, getMessageListFooterStyle } from "./style";
import { getBubbleAlignment, getContentView, getBubbleFooterView } from "./utils";
import { AIAssistBotConfiguration, AIAssistBotStyle } from "@cometchat/uikit-shared";
import { CometChatTheme, States } from "@cometchat/uikit-resources";
declare const _sfc_main: import("vue").DefineComponent<{
    configuration: {
        type: PropType<AIAssistBotConfiguration>;
        default: AIAssistBotConfiguration;
    };
    bot: {
        type: PropType<import("@cometchat/chat-sdk-javascript").User>;
        default: () => import("@cometchat/chat-sdk-javascript").User;
    };
    sender: {
        type: PropType<import("@cometchat/chat-sdk-javascript").User>;
        default: () => import("@cometchat/chat-sdk-javascript").User;
    };
    messageSendCallBack: {
        type: PropType<(message: string, bot: CometChat.User) => Promise<string>>;
    };
    closeCallBack: {
        type: PropType<() => void>;
    };
}, {
    assistBotStyle: Ref<{
        titleFont?: string;
        titleColor?: string;
        optionTitleFont?: string;
        optionTitleColor?: string;
        subtitleFont?: string;
        subtitleColor?: string;
        closeIconTint?: string;
        backIconTint?: string;
        sendIconTint?: string;
        buttonTextColor?: string;
        buttonTextFont?: string;
        buttonBackground?: string;
        loadingIconTint?: string;
        emptyIconTint?: string;
        errorIconTint?: string;
        height?: string;
        width?: string;
        border?: string;
        borderRadius?: string;
        background?: string;
    }>;
    theme: Ref<CometChatTheme>;
    botMessageBubbleStyle: Ref<{
        textFont?: string;
        textColor?: string;
        height?: string;
        width?: string;
        border?: string;
        borderRadius?: string;
        background?: string;
    }>;
    senderMessageBubbleStyle: Ref<{
        textFont?: string;
        textColor?: string;
        height?: string;
        width?: string;
        border?: string;
        borderRadius?: string;
        background?: string;
    }>;
    botFirstMessage: Ref<string>;
    messages: Ref<{
        getSender: () => import("@cometchat/chat-sdk-javascript").User;
        getReceiver: () => import("@cometchat/chat-sdk-javascript").User | import("@cometchat/chat-sdk-javascript").Group;
        getMetadata: () => Object;
        setMetadata: (value: Object) => void;
        getData: () => any;
        setData: (value: any) => void;
        getText: () => string;
        setText: (text: string) => void;
        setProcessedText: (text: string) => void;
        getProcessedText: () => string;
        getTags: () => String[];
        setTags: (tags: String[]) => void;
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
        setSender: (value: import("@cometchat/chat-sdk-javascript").User) => void;
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
        setReactions: (reactions: any) => import("@cometchat/chat-sdk-javascript").ReactionCount[];
        getReactions: () => import("@cometchat/chat-sdk-javascript").ReactionCount[];
    }[]>;
    subtitleText: any;
    States: typeof States;
    inputText: Ref<string>;
    textInputStyle: typeof textInputStyle;
    sendIconUrl: string;
    closeIconURL: string;
    onMessageSendClick: () => void;
    scrollBottom: Ref<boolean>;
    messageInputRef: any;
    triggerClose: () => void;
    getBotChatContainerStyle: typeof getBotChatContainerStyle;
    getBotChatHeaderStyle: typeof getBotChatHeaderStyle;
    getCloseButtonStyle: typeof getCloseButtonStyle;
    getMessageBubbleStyle: typeof getMessageBubbleStyle;
    getBubbleAlignment: typeof getBubbleAlignment;
    getContentView: typeof getContentView;
    getBubbleFooterView: typeof getBubbleFooterView;
    getSendButtonStyle: typeof getSendButtonStyle;
    onComposerEditTextChange: (event: CustomEvent) => void;
    getAvatarStyle: typeof getAvatarStyle;
    getBotBackgroundStyle: typeof getBotBackgroundStyle;
    getMessageListFooterStyle: typeof getMessageListFooterStyle;
    getBotTitleStyle: (style: AIAssistBotStyle, theme: CometChatTheme) => {
        font: string;
        color: string;
    };
    getBotSubtitleStyle: (style: AIAssistBotStyle, theme: CometChatTheme) => {
        font: string;
        color: string;
    };
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    configuration: {
        type: PropType<AIAssistBotConfiguration>;
        default: AIAssistBotConfiguration;
    };
    bot: {
        type: PropType<import("@cometchat/chat-sdk-javascript").User>;
        default: () => import("@cometchat/chat-sdk-javascript").User;
    };
    sender: {
        type: PropType<import("@cometchat/chat-sdk-javascript").User>;
        default: () => import("@cometchat/chat-sdk-javascript").User;
    };
    messageSendCallBack: {
        type: PropType<(message: string, bot: CometChat.User) => Promise<string>>;
    };
    closeCallBack: {
        type: PropType<() => void>;
    };
}>>, {
    sender: import("@cometchat/chat-sdk-javascript").User;
    configuration: AIAssistBotConfiguration;
    bot: import("@cometchat/chat-sdk-javascript").User;
}, {}>;
export default _sfc_main;
