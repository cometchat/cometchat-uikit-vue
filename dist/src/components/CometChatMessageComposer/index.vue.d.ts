import { Ref, PropType, CSSProperties } from "vue";
import { MessageComposerStyle, StickersStyle, AIOptionsStyle, CometChatTextFormatter, UserMemberWrapperConfiguration } from "@cometchat/uikit-shared";
import { AuxiliaryButtonAlignment, CometChatMessageComposerAction, Placement, RecordingType, UserMemberListType, PreviewMessageMode } from "@cometchat/uikit-resources";
import { ActionSheetStyle, EmojiKeyboardStyle, PopoverStyle, PreviewStyle, MediaRecorderStyle } from "@cometchat/uikit-elements";
import { CometChat } from "@cometchat/chat-sdk-javascript";
declare const _sfc_main: import("vue").DefineComponent<{
    id: {
        type: StringConstructor;
        default: any;
    };
    user: {
        type: PropType<import("@cometchat/chat-sdk-javascript").User>;
    };
    group: {
        type: PropType<import("@cometchat/chat-sdk-javascript").Group>;
    };
    text: {
        type: StringConstructor;
        default: string;
    };
    onTextChange: {
        type: PropType<(text: string) => void>;
    };
    placeHolderText: {
        type: StringConstructor;
        default: () => any;
    };
    sendButtonView: {
        type: PropType<ViewType>;
    };
    onSendButtonClick: {
        type: PropType<(message: CometChat.BaseMessage, previewMessageMode?: PreviewMessageMode) => void>;
    };
    secondaryButtonView: {
        type: PropType<ViewType>;
    };
    attachmentIconURL: {
        type: StringConstructor;
        default: string;
    };
    auxiliaryButtonView: {
        type: PropType<(entity: EntityType, composerId: ComposerId) => ViewType>;
    };
    auxiliaryButtonsAlignment: {
        type: PropType<AuxiliaryButtonAlignment>;
        default: () => AuxiliaryButtonAlignment;
    };
    attachmentOptions: {
        type: PropType<(entity: EntityType, composerId: ComposerId) => CometChatMessageComposerAction[]>;
    };
    parentMessageId: {
        type: NumberConstructor;
        default: any;
    };
    LiveReactionIconURL: {
        type: StringConstructor;
        default: string;
    };
    hideLiveReaction: {
        type: BooleanConstructor;
        default: boolean;
    };
    headerView: {
        type: PropType<ViewType>;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
    disableSoundForMessages: {
        type: BooleanConstructor;
        default: boolean;
    };
    customSoundForMessage: {
        type: StringConstructor;
    };
    disableTypingEvents: {
        type: BooleanConstructor;
        default: boolean;
    };
    messageComposerStyle: {
        type: PropType<MessageComposerStyle>;
        default: () => MessageComposerStyle;
    };
    hideVoiceRecording: {
        type: BooleanConstructor;
        default: boolean;
    };
    mediaRecorderStyle: {
        type: PropType<MediaRecorderStyle>;
        default: () => MediaRecorderStyle;
    };
    hideLayoutMode: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    actionSheetStyle: {
        type: PropType<ActionSheetStyle>;
        default: () => ActionSheetStyle;
    };
    AIOptionsStyle: {
        type: PropType<AIOptionsStyle>;
        default: () => AIOptionsStyle;
    };
    AIIconURL: {
        type: StringConstructor;
        default: string;
    };
    voiceRecordingStartIconURL: {
        type: StringConstructor;
        default: string;
    };
    voiceRecordingCloseIconURL: {
        type: StringConstructor;
        default: string;
    };
    voiceRecordingStopIconURL: {
        type: StringConstructor;
        default: string;
    };
    voiceRecordingSubmitIconURL: {
        type: StringConstructor;
        default: string;
    };
    userMemberWrapperConfiguration: {
        type: PropType<UserMemberWrapperConfiguration>;
    };
    textFormatters: {
        type: PropType<CometChatTextFormatter[]>;
        default: () => CometChatTextFormatter[];
    };
    disableMentions: {
        type: BooleanConstructor;
        default: boolean;
    };
    mentionsWarningText: {
        type: StringConstructor;
    };
    mentionsWarningStyle: {
        type: ObjectConstructor;
        default: () => void;
    };
    sendButtonIconURL: {
        type: StringConstructor;
        default: string;
    };
    emojiIconURL: {
        type: StringConstructor;
        default: string;
    };
}, {
    inputElementRef: any;
    sendReaction: () => void;
    props: import("@vue/shared").LooseRequired<{
        readonly text: string;
        readonly onError: (error: CometChat.CometChatException) => void;
        readonly disableSoundForMessages: boolean;
        readonly disableMentions: boolean;
        readonly textFormatters: CometChatTextFormatter[];
        readonly attachmentIconURL: string;
        readonly auxiliaryButtonsAlignment: AuxiliaryButtonAlignment;
        readonly LiveReactionIconURL: string;
        readonly hideLiveReaction: boolean;
        readonly disableTypingEvents: boolean;
        readonly messageComposerStyle: MessageComposerStyle;
        readonly hideVoiceRecording: boolean;
        readonly mediaRecorderStyle: MediaRecorderStyle;
        readonly hideLayoutMode: boolean;
        readonly actionSheetStyle: ActionSheetStyle;
        readonly AIOptionsStyle: AIOptionsStyle;
        readonly AIIconURL: string;
        readonly voiceRecordingStartIconURL: string;
        readonly voiceRecordingCloseIconURL: string;
        readonly voiceRecordingStopIconURL: string;
        readonly voiceRecordingSubmitIconURL: string;
        readonly mentionsWarningStyle: Record<string, any>;
        readonly sendButtonIconURL: string;
        readonly emojiIconURL: string;
        readonly headerView?: ViewType;
        readonly user?: import("@cometchat/chat-sdk-javascript").User;
        readonly group?: import("@cometchat/chat-sdk-javascript").Group;
        readonly id?: string;
        readonly onTextChange?: (text: string) => void;
        readonly placeHolderText?: string;
        readonly sendButtonView?: ViewType;
        readonly onSendButtonClick?: (message: CometChat.BaseMessage, previewMessageMode?: PreviewMessageMode) => void;
        readonly secondaryButtonView?: ViewType;
        readonly auxiliaryButtonView?: (entity: EntityType, composerId: ComposerId) => ViewType;
        readonly attachmentOptions?: (entity: EntityType, composerId: ComposerId) => CometChatMessageComposerAction[];
        readonly parentMessageId?: number;
        readonly customSoundForMessage?: string;
        readonly userMemberWrapperConfiguration?: UserMemberWrapperConfiguration;
        readonly mentionsWarningText?: string;
    } & {}>;
    customSendMethod: (message: string) => void;
    emojiButtonRef: any;
    aiButtonRef: any;
    actionSheetRef: any;
    emojiButtonStyle: any;
    emojiKeyboardStyle: EmojiKeyboardStyle;
    inputRef: any;
    previewStyle: PreviewStyle;
    stickerKeyboardStyle: StickersStyle;
    textInputStyle: any;
    showStickerKeyboard: Ref<boolean>;
    showPreview: Ref<boolean>;
    messageToBeEdited: any;
    auxiliaryView: any;
    localize: (str: string) => any;
    showSendButton: Ref<boolean>;
    sendButton: any;
    showEmojiKeyboard: Ref<boolean>;
    showVoiceRecorder: Ref<boolean>;
    sendButtonStyle: any;
    enableStickerKeyboard: boolean;
    sendMessageOnEnter: (event: any) => void;
    closeIconURL: string;
    stickerButtonIconURL: string;
    showActionSheetItem: Ref<boolean>;
    auxilaryPlacement: Placement.top;
    emojiPopover: PopoverStyle;
    inputChangeHandler: (event: any) => void;
    actionsheetStyle: ActionSheetStyle;
    attachmentButtonStyle: any;
    stickerButtonRef: any;
    onPreviewClosed: () => void;
    openActionSheet: (event: any) => void;
    handleActions: (event: any) => void;
    messageText: Ref<string>;
    messageInputChanged: (event: any) => void;
    openEmojiKeyboard: (event: any) => void;
    appendEmoji: (event: any) => void;
    getMessageInputStyle: () => any;
    getAuxiliaryButtonAlignment: () => AuxiliaryButtonAlignment;
    getAttachmentButtonStyle: () => any;
    getEmojiPopover: () => PopoverStyle;
    getLiveReactionStyle: () => {
        height: string;
        width: string;
        border: string;
        borderRadius: string;
        buttonIconTint: any;
        background: string;
        display: string;
        justifyContent: string;
        alignItems: string;
    };
    getEmojiButtonStyle: () => any;
    getEmojiKeyboardStyle: () => EmojiKeyboardStyle;
    getActionsheetStyle: () => ActionSheetStyle;
    getPopoverStyle: () => {
        width: string;
        height: string;
        border: string;
        background: string;
        borderRadius: string;
        boxShadow: string;
    };
    getStickerKeyboardStyle: () => StickersStyle;
    getPreviewStyle: () => PreviewStyle;
    getAttachmentOptions: () => any;
    textRef: Ref<string>;
    getWrapperStyle: () => {
        height: any;
        width: any;
    };
    createPollViewRef: Ref<ViewType>;
    defaultAuxiliaryOptions: any;
    handleComponentEvents: (event: any) => void;
    getAuxiliaryButtonView: () => ViewType;
    voiceRecorderRef: any;
    voiceRecordButtonStyle: any;
    RecordingType: typeof RecordingType;
    getVoiceRecorderStyle: () => MediaRecorderStyle;
    openVoiceRecorder: () => void;
    getVoiceRecorderStylePopover: () => PopoverStyle;
    onVoiceRecordingClose: () => void;
    onVoiceRecordingSubmit: (event: any) => void;
    getPrimaryViewStyle: () => CSSProperties;
    auxiliaryViewStyle: () => any;
    showAIButton: Ref<boolean>;
    openAIOptions: () => void;
    AIOptions: Ref<any[]>;
    handleAIOptionClick: (event: any) => void;
    aiCardView: Ref<{
        html: string;
        componentName?: never;
        props?: never;
        slots?: never;
        listeners?: never;
    } | {
        html?: never;
        componentName: string;
        props?: any;
        slots?: any;
        listeners?: any;
    }>;
    getAiActionSheetStyle: () => any;
    getAiOptionPopoverStyle: () => PopoverStyle;
    mentionsSearchTerm: Ref<string>;
    showListForMentions: Ref<boolean>;
    textFormatters: Ref<CometChatTextFormatter[]>;
    defaultMentionsItemClickHandler: (user: CometChat.User | CometChat.GroupMember) => void;
    defaultOnEmptyForMentions: () => void;
    searchMentions: (searchTerm: string) => void;
    mentionsSearchCount: Ref<number>;
    checkForMentions: (message: CometChat.TextMessage) => string;
    InfoSimpleIcon: string;
    getMentionInfoIconStyle: () => {
        height: string;
        width: string;
        buttonTextFont: string;
        buttonTextColor: string;
        borderRadius: string;
        border: string;
        buttonIconTint: string;
        padding: string;
        iconHeight: string;
        iconWidth: string;
        iconBackground: string;
        gap: string;
    };
    showMentionsCountWarning: Ref<boolean>;
    usersRequestBuilder: Ref<import("@cometchat/chat-sdk-javascript").UsersRequestBuilder>;
    groupMembersRequestBuilder: Ref<import("@cometchat/chat-sdk-javascript").GroupMembersRequestBuilder>;
    userMemberWrapperRef: any;
    userMemberWrapperListType: Ref<UserMemberListType>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    id: {
        type: StringConstructor;
        default: any;
    };
    user: {
        type: PropType<import("@cometchat/chat-sdk-javascript").User>;
    };
    group: {
        type: PropType<import("@cometchat/chat-sdk-javascript").Group>;
    };
    text: {
        type: StringConstructor;
        default: string;
    };
    onTextChange: {
        type: PropType<(text: string) => void>;
    };
    placeHolderText: {
        type: StringConstructor;
        default: () => any;
    };
    sendButtonView: {
        type: PropType<ViewType>;
    };
    onSendButtonClick: {
        type: PropType<(message: CometChat.BaseMessage, previewMessageMode?: PreviewMessageMode) => void>;
    };
    secondaryButtonView: {
        type: PropType<ViewType>;
    };
    attachmentIconURL: {
        type: StringConstructor;
        default: string;
    };
    auxiliaryButtonView: {
        type: PropType<(entity: EntityType, composerId: ComposerId) => ViewType>;
    };
    auxiliaryButtonsAlignment: {
        type: PropType<AuxiliaryButtonAlignment>;
        default: () => AuxiliaryButtonAlignment;
    };
    attachmentOptions: {
        type: PropType<(entity: EntityType, composerId: ComposerId) => CometChatMessageComposerAction[]>;
    };
    parentMessageId: {
        type: NumberConstructor;
        default: any;
    };
    LiveReactionIconURL: {
        type: StringConstructor;
        default: string;
    };
    hideLiveReaction: {
        type: BooleanConstructor;
        default: boolean;
    };
    headerView: {
        type: PropType<ViewType>;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
    disableSoundForMessages: {
        type: BooleanConstructor;
        default: boolean;
    };
    customSoundForMessage: {
        type: StringConstructor;
    };
    disableTypingEvents: {
        type: BooleanConstructor;
        default: boolean;
    };
    messageComposerStyle: {
        type: PropType<MessageComposerStyle>;
        default: () => MessageComposerStyle;
    };
    hideVoiceRecording: {
        type: BooleanConstructor;
        default: boolean;
    };
    mediaRecorderStyle: {
        type: PropType<MediaRecorderStyle>;
        default: () => MediaRecorderStyle;
    };
    hideLayoutMode: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    actionSheetStyle: {
        type: PropType<ActionSheetStyle>;
        default: () => ActionSheetStyle;
    };
    AIOptionsStyle: {
        type: PropType<AIOptionsStyle>;
        default: () => AIOptionsStyle;
    };
    AIIconURL: {
        type: StringConstructor;
        default: string;
    };
    voiceRecordingStartIconURL: {
        type: StringConstructor;
        default: string;
    };
    voiceRecordingCloseIconURL: {
        type: StringConstructor;
        default: string;
    };
    voiceRecordingStopIconURL: {
        type: StringConstructor;
        default: string;
    };
    voiceRecordingSubmitIconURL: {
        type: StringConstructor;
        default: string;
    };
    userMemberWrapperConfiguration: {
        type: PropType<UserMemberWrapperConfiguration>;
    };
    textFormatters: {
        type: PropType<CometChatTextFormatter[]>;
        default: () => CometChatTextFormatter[];
    };
    disableMentions: {
        type: BooleanConstructor;
        default: boolean;
    };
    mentionsWarningText: {
        type: StringConstructor;
    };
    mentionsWarningStyle: {
        type: ObjectConstructor;
        default: () => void;
    };
    sendButtonIconURL: {
        type: StringConstructor;
        default: string;
    };
    emojiIconURL: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    text: string;
    onError: (error: CometChat.CometChatException) => void;
    disableSoundForMessages: boolean;
    disableMentions: boolean;
    textFormatters: CometChatTextFormatter[];
    id: string;
    placeHolderText: string;
    attachmentIconURL: string;
    auxiliaryButtonsAlignment: AuxiliaryButtonAlignment;
    parentMessageId: number;
    LiveReactionIconURL: string;
    hideLiveReaction: boolean;
    disableTypingEvents: boolean;
    messageComposerStyle: MessageComposerStyle;
    hideVoiceRecording: boolean;
    mediaRecorderStyle: MediaRecorderStyle;
    hideLayoutMode: boolean;
    actionSheetStyle: ActionSheetStyle;
    AIOptionsStyle: AIOptionsStyle;
    AIIconURL: string;
    voiceRecordingStartIconURL: string;
    voiceRecordingCloseIconURL: string;
    voiceRecordingStopIconURL: string;
    voiceRecordingSubmitIconURL: string;
    mentionsWarningStyle: Record<string, any>;
    sendButtonIconURL: string;
    emojiIconURL: string;
}, {}>;
export default _sfc_main;
