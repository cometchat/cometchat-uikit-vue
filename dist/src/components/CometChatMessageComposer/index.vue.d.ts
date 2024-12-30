import { Ref, PropType, CSSProperties } from "vue";
import { MessageComposerStyle, StickersStyle, AIOptionsStyle, CometChatTextFormatter, UserMemberWrapperConfiguration } from "@cometchat/uikit-shared";
import { AuxiliaryButtonAlignment, CometChatMessageComposerAction, Placement, RecordingType, UserMemberListType, PreviewMessageMode } from "@cometchat/uikit-resources";
import { ActionSheetStyle, EmojiKeyboardStyle, PopoverStyle, PreviewStyle, MediaRecorderStyle } from "@cometchat/uikit-elements";
import { CometChat } from "@cometchat/chat-sdk-javascript";
declare const _sfc_main: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
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
}>, {
    inputElementRef: any;
    sendReaction: () => void;
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
    showStickerKeyboard: Ref<boolean, boolean>;
    showPreview: Ref<boolean, boolean>;
    messageToBeEdited: any;
    auxiliaryView: Ref<any, any>;
    localize: (str: string) => any;
    showSendButton: Ref<boolean, boolean>;
    sendButton: Ref<any, any>;
    showEmojiKeyboard: Ref<boolean, boolean>;
    showVoiceRecorder: Ref<boolean, boolean>;
    sendButtonStyle: any;
    enableStickerKeyboard: boolean;
    sendMessageOnEnter: (event: any) => void;
    closeIconURL: string;
    stickerButtonIconURL: string;
    showActionSheetItem: Ref<boolean, boolean>;
    auxilaryPlacement: Placement.top;
    emojiPopover: PopoverStyle;
    inputChangeHandler: (event: any) => void;
    popoverStyle: PopoverStyle;
    actionsheetStyle: ActionSheetStyle;
    attachmentButtonStyle: any;
    stickerButtonRef: any;
    closePreview: () => void;
    openActionSheet: (event: any) => void;
    handleActions: (event: any) => void;
    messageText: Ref<string, string>;
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
    getPopoverStyle: () => PopoverStyle;
    getStickerKeyboardStyle: () => StickersStyle;
    getPreviewStyle: () => PreviewStyle;
    getAttachmentOptions: () => any;
    textRef: Ref<string, string>;
    getWrapperStyle: () => {
        height: any;
        width: any;
    };
    createPollViewRef: Ref<ViewType, ViewType>;
    defaultAuxiliaryOptions: any;
    handleComponentEvents: (event: any) => void;
    getAuxiliaryButtonView: () => ViewType;
    voiceRecorderRef: Ref<any, any>;
    voiceRecordButtonStyle: any;
    RecordingType: typeof RecordingType;
    getVoiceRecorderStyle: () => MediaRecorderStyle;
    openVoiceRecorder: () => void;
    getVoiceRecorderStylePopover: () => PopoverStyle;
    onVoiceRecordingClose: () => void;
    onVoiceRecordingSubmit: (event: any) => void;
    getPrimaryViewStyle: () => CSSProperties;
    auxiliaryViewStyle: () => any;
    showAIButton: Ref<boolean, boolean>;
    openAIOptions: () => void;
    AIOptions: Ref<any[], any[]>;
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
    }, ViewType | {
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
    mentionsSearchTerm: Ref<string, string>;
    showListForMentions: Ref<boolean, boolean>;
    textFormatters: Ref<CometChatTextFormatter[], CometChatTextFormatter[]>;
    defaultMentionsItemClickHandler: (user: CometChat.User | CometChat.GroupMember) => void;
    defaultOnEmptyForMentions: () => void;
    searchMentions: (searchTerm: string) => void;
    userMemberWrapperConfig: Ref<{
        userMemberListType: UserMemberListType;
        onItemClick: () => void;
        listItemView: any;
        avatarStyle: {
            borderRadius?: string;
            width?: string;
            height?: string;
            border?: string;
            nameTextColor?: string;
            backgroundSize?: string;
            nameTextFont?: string;
            outerViewBorderWidth?: string;
            outerViewBorderSpacing?: string;
            outerViewBorderRadius?: string;
            outerViewBorderColor?: string;
            backgroundColor?: string;
        };
        statusIndicatorStyle: any;
        subtitleView: any;
        usersRequestBuilder: {
            limit: number;
            status: string;
            searchKeyword: string;
            shouldHideBlockedUsers: boolean;
            role: string;
            roles: {
                [x: number]: string;
                toString: () => string;
                charAt: (pos: number) => string;
                charCodeAt: (index: number) => number;
                concat: (...strings: string[]) => string;
                indexOf: (searchString: string, position?: number) => number;
                lastIndexOf: (searchString: string, position?: number) => number;
                localeCompare: {
                    (that: string): number;
                    (that: string, locales?: string | string[], options?: Intl.CollatorOptions): number;
                };
                match: {
                    (regexp: string | RegExp): RegExpMatchArray;
                    (matcher: {
                        [Symbol.match](string: string): RegExpMatchArray;
                    }): RegExpMatchArray;
                };
                replace: {
                    (searchValue: string | RegExp, replaceValue: string): string;
                    (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
                    (searchValue: {
                        [Symbol.replace](string: string, replaceValue: string): string;
                    }, replaceValue: string): string;
                    (searchValue: {
                        [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string;
                    }, replacer: (substring: string, ...args: any[]) => string): string;
                };
                search: {
                    (regexp: string | RegExp): number;
                    (searcher: {
                        [Symbol.search](string: string): number;
                    }): number;
                };
                slice: (start?: number, end?: number) => string;
                split: {
                    (separator: string | RegExp, limit?: number): string[];
                    (splitter: {
                        [Symbol.split](string: string, limit?: number): string[];
                    }, limit?: number): string[];
                };
                substring: (start: number, end?: number) => string;
                toLowerCase: () => string;
                toLocaleLowerCase: (locales?: string | string[]) => string;
                toUpperCase: () => string;
                toLocaleUpperCase: (locales?: string | string[]) => string;
                trim: () => string;
                readonly length: number;
                substr: (from: number, length?: number) => string;
                valueOf: () => string;
                codePointAt: (pos: number) => number;
                includes: (searchString: string, position?: number) => boolean;
                endsWith: (searchString: string, endPosition?: number) => boolean;
                normalize: {
                    (form: "NFC" | "NFD" | "NFKC" | "NFKD"): string;
                    (form?: string): string;
                };
                repeat: (count: number) => string;
                startsWith: (searchString: string, position?: number) => boolean;
                anchor: (name: string) => string;
                big: () => string;
                blink: () => string;
                bold: () => string;
                fixed: () => string;
                fontcolor: (color: string) => string;
                fontsize: {
                    (size: number): string;
                    (size: string): string;
                };
                italics: () => string;
                link: (url: string) => string;
                small: () => string;
                strike: () => string;
                sub: () => string;
                sup: () => string;
                padStart: (maxLength: number, fillString?: string) => string;
                padEnd: (maxLength: number, fillString?: string) => string;
                trimEnd: () => string;
                trimStart: () => string;
                trimLeft: () => string;
                trimRight: () => string;
                matchAll: (regexp: RegExp) => IterableIterator<RegExpMatchArray>;
                replaceAll: {
                    (searchValue: string | RegExp, replaceValue: string): string;
                    (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
                };
                at: (index: number) => string;
                [Symbol.iterator]: () => IterableIterator<string>;
            }[];
            tags: {
                [x: number]: string;
                toString: () => string;
                charAt: (pos: number) => string;
                charCodeAt: (index: number) => number;
                concat: (...strings: string[]) => string;
                indexOf: (searchString: string, position?: number) => number;
                lastIndexOf: (searchString: string, position?: number) => number;
                localeCompare: {
                    (that: string): number;
                    (that: string, locales?: string | string[], options?: Intl.CollatorOptions): number;
                };
                match: {
                    (regexp: string | RegExp): RegExpMatchArray;
                    (matcher: {
                        [Symbol.match](string: string): RegExpMatchArray;
                    }): RegExpMatchArray;
                };
                replace: {
                    (searchValue: string | RegExp, replaceValue: string): string;
                    (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
                    (searchValue: {
                        [Symbol.replace](string: string, replaceValue: string): string;
                    }, replaceValue: string): string;
                    (searchValue: {
                        [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string;
                    }, replacer: (substring: string, ...args: any[]) => string): string;
                };
                search: {
                    (regexp: string | RegExp): number;
                    (searcher: {
                        [Symbol.search](string: string): number;
                    }): number;
                };
                slice: (start?: number, end?: number) => string;
                split: {
                    (separator: string | RegExp, limit?: number): string[];
                    (splitter: {
                        [Symbol.split](string: string, limit?: number): string[];
                    }, limit?: number): string[];
                };
                substring: (start: number, end?: number) => string;
                toLowerCase: () => string;
                toLocaleLowerCase: (locales?: string | string[]) => string;
                toUpperCase: () => string;
                toLocaleUpperCase: (locales?: string | string[]) => string;
                trim: () => string;
                readonly length: number;
                substr: (from: number, length?: number) => string;
                valueOf: () => string;
                codePointAt: (pos: number) => number;
                includes: (searchString: string, position?: number) => boolean;
                endsWith: (searchString: string, endPosition?: number) => boolean;
                normalize: {
                    (form: "NFC" | "NFD" | "NFKC" | "NFKD"): string;
                    (form?: string): string;
                };
                repeat: (count: number) => string;
                startsWith: (searchString: string, position?: number) => boolean;
                anchor: (name: string) => string;
                big: () => string;
                blink: () => string;
                bold: () => string;
                fixed: () => string;
                fontcolor: (color: string) => string;
                fontsize: {
                    (size: number): string;
                    (size: string): string;
                };
                italics: () => string;
                link: (url: string) => string;
                small: () => string;
                strike: () => string;
                sub: () => string;
                sup: () => string;
                padStart: (maxLength: number, fillString?: string) => string;
                padEnd: (maxLength: number, fillString?: string) => string;
                trimEnd: () => string;
                trimStart: () => string;
                trimLeft: () => string;
                trimRight: () => string;
                matchAll: (regexp: RegExp) => IterableIterator<RegExpMatchArray>;
                replaceAll: {
                    (searchValue: string | RegExp, replaceValue: string): string;
                    (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
                };
                at: (index: number) => string;
                [Symbol.iterator]: () => IterableIterator<string>;
            }[];
            showFriendsOnly: boolean;
            showTags: boolean;
            UIDs: {
                [x: number]: string;
                toString: () => string;
                charAt: (pos: number) => string;
                charCodeAt: (index: number) => number;
                concat: (...strings: string[]) => string;
                indexOf: (searchString: string, position?: number) => number;
                lastIndexOf: (searchString: string, position?: number) => number;
                localeCompare: {
                    (that: string): number;
                    (that: string, locales?: string | string[], options?: Intl.CollatorOptions): number;
                };
                match: {
                    (regexp: string | RegExp): RegExpMatchArray;
                    (matcher: {
                        [Symbol.match](string: string): RegExpMatchArray;
                    }): RegExpMatchArray;
                };
                replace: {
                    (searchValue: string | RegExp, replaceValue: string): string;
                    (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
                    (searchValue: {
                        [Symbol.replace](string: string, replaceValue: string): string;
                    }, replaceValue: string): string;
                    (searchValue: {
                        [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string;
                    }, replacer: (substring: string, ...args: any[]) => string): string;
                };
                search: {
                    (regexp: string | RegExp): number;
                    (searcher: {
                        [Symbol.search](string: string): number;
                    }): number;
                };
                slice: (start?: number, end?: number) => string;
                split: {
                    (separator: string | RegExp, limit?: number): string[];
                    (splitter: {
                        [Symbol.split](string: string, limit?: number): string[];
                    }, limit?: number): string[];
                };
                substring: (start: number, end?: number) => string;
                toLowerCase: () => string;
                toLocaleLowerCase: (locales?: string | string[]) => string;
                toUpperCase: () => string;
                toLocaleUpperCase: (locales?: string | string[]) => string;
                trim: () => string;
                readonly length: number;
                substr: (from: number, length?: number) => string;
                valueOf: () => string;
                codePointAt: (pos: number) => number;
                includes: (searchString: string, position?: number) => boolean;
                endsWith: (searchString: string, endPosition?: number) => boolean;
                normalize: {
                    (form: "NFC" | "NFD" | "NFKC" | "NFKD"): string;
                    (form?: string): string;
                };
                repeat: (count: number) => string;
                startsWith: (searchString: string, position?: number) => boolean;
                anchor: (name: string) => string;
                big: () => string;
                blink: () => string;
                bold: () => string;
                fixed: () => string;
                fontcolor: (color: string) => string;
                fontsize: {
                    (size: number): string;
                    (size: string): string;
                };
                italics: () => string;
                link: (url: string) => string;
                small: () => string;
                strike: () => string;
                sub: () => string;
                sup: () => string;
                padStart: (maxLength: number, fillString?: string) => string;
                padEnd: (maxLength: number, fillString?: string) => string;
                trimEnd: () => string;
                trimStart: () => string;
                trimLeft: () => string;
                trimRight: () => string;
                matchAll: (regexp: RegExp) => IterableIterator<RegExpMatchArray>;
                replaceAll: {
                    (searchValue: string | RegExp, replaceValue: string): string;
                    (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
                };
                at: (index: number) => string;
                [Symbol.iterator]: () => IterableIterator<string>;
            }[];
            SortBy: string;
            SortOrder: string;
            SearchIn: {
                [x: number]: string;
                toString: () => string;
                charAt: (pos: number) => string;
                charCodeAt: (index: number) => number;
                concat: (...strings: string[]) => string;
                indexOf: (searchString: string, position?: number) => number;
                lastIndexOf: (searchString: string, position?: number) => number;
                localeCompare: {
                    (that: string): number;
                    (that: string, locales?: string | string[], options?: Intl.CollatorOptions): number;
                };
                match: {
                    (regexp: string | RegExp): RegExpMatchArray;
                    (matcher: {
                        [Symbol.match](string: string): RegExpMatchArray;
                    }): RegExpMatchArray;
                };
                replace: {
                    (searchValue: string | RegExp, replaceValue: string): string;
                    (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
                    (searchValue: {
                        [Symbol.replace](string: string, replaceValue: string): string;
                    }, replaceValue: string): string;
                    (searchValue: {
                        [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string;
                    }, replacer: (substring: string, ...args: any[]) => string): string;
                };
                search: {
                    (regexp: string | RegExp): number;
                    (searcher: {
                        [Symbol.search](string: string): number;
                    }): number;
                };
                slice: (start?: number, end?: number) => string;
                split: {
                    (separator: string | RegExp, limit?: number): string[];
                    (splitter: {
                        [Symbol.split](string: string, limit?: number): string[];
                    }, limit?: number): string[];
                };
                substring: (start: number, end?: number) => string;
                toLowerCase: () => string;
                toLocaleLowerCase: (locales?: string | string[]) => string;
                toUpperCase: () => string;
                toLocaleUpperCase: (locales?: string | string[]) => string;
                trim: () => string;
                readonly length: number;
                substr: (from: number, length?: number) => string;
                valueOf: () => string;
                codePointAt: (pos: number) => number;
                includes: (searchString: string, position?: number) => boolean;
                endsWith: (searchString: string, endPosition?: number) => boolean;
                normalize: {
                    (form: "NFC" | "NFD" | "NFKC" | "NFKD"): string;
                    (form?: string): string;
                };
                repeat: (count: number) => string;
                startsWith: (searchString: string, position?: number) => boolean;
                anchor: (name: string) => string;
                big: () => string;
                blink: () => string;
                bold: () => string;
                fixed: () => string;
                fontcolor: (color: string) => string;
                fontsize: {
                    (size: number): string;
                    (size: string): string;
                };
                italics: () => string;
                link: (url: string) => string;
                small: () => string;
                strike: () => string;
                sub: () => string;
                sup: () => string;
                padStart: (maxLength: number, fillString?: string) => string;
                padEnd: (maxLength: number, fillString?: string) => string;
                trimEnd: () => string;
                trimStart: () => string;
                trimLeft: () => string;
                trimRight: () => string;
                matchAll: (regexp: RegExp) => IterableIterator<RegExpMatchArray>;
                replaceAll: {
                    (searchValue: string | RegExp, replaceValue: string): string;
                    (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
                };
                at: (index: number) => string;
                [Symbol.iterator]: () => IterableIterator<string>;
            }[];
            setLimit: (limit: number) => import("@cometchat/chat-sdk-javascript").UsersRequestBuilder;
            setStatus: (status: string) => import("@cometchat/chat-sdk-javascript").UsersRequestBuilder;
            setSearchKeyword: (searchKeyword: string) => import("@cometchat/chat-sdk-javascript").UsersRequestBuilder;
            hideBlockedUsers: (hideBlockedUsers: boolean) => import("@cometchat/chat-sdk-javascript").UsersRequestBuilder;
            setRole: (role: string) => import("@cometchat/chat-sdk-javascript").UsersRequestBuilder;
            setRoles: (roles: String[]) => import("@cometchat/chat-sdk-javascript").UsersRequestBuilder;
            friendsOnly: (friendsOnly: boolean) => import("@cometchat/chat-sdk-javascript").UsersRequestBuilder;
            setTags: (tags: String[]) => import("@cometchat/chat-sdk-javascript").UsersRequestBuilder;
            withTags: (withTags: boolean) => import("@cometchat/chat-sdk-javascript").UsersRequestBuilder;
            setUIDs: (uids: String[]) => import("@cometchat/chat-sdk-javascript").UsersRequestBuilder;
            sortBy: (sortBy: string) => import("@cometchat/chat-sdk-javascript").UsersRequestBuilder;
            sortByOrder: (sortOrder: string) => import("@cometchat/chat-sdk-javascript").UsersRequestBuilder;
            searchIn: (searchIn: String[]) => import("@cometchat/chat-sdk-javascript").UsersRequestBuilder;
            build: () => import("@cometchat/chat-sdk-javascript").UsersRequest;
        };
        disableUsersPresence: boolean;
        userPresencePlacement: import("@cometchat/uikit-resources").UserPresencePlacement;
        hideSeparator: boolean;
        loadingStateView: any;
        groupMemberRequestBuilder: {
            limit: number;
            searchKeyword: string;
            guid: string;
            scopes?: {
                [x: number]: string;
                toString: () => string;
                charAt: (pos: number) => string;
                charCodeAt: (index: number) => number;
                concat: (...strings: string[]) => string;
                indexOf: (searchString: string, position?: number) => number;
                lastIndexOf: (searchString: string, position?: number) => number;
                localeCompare: {
                    (that: string): number;
                    (that: string, locales?: string | string[], options?: Intl.CollatorOptions): number;
                };
                match: {
                    (regexp: string | RegExp): RegExpMatchArray;
                    (matcher: {
                        [Symbol.match](string: string): RegExpMatchArray;
                    }): RegExpMatchArray;
                };
                replace: {
                    (searchValue: string | RegExp, replaceValue: string): string;
                    (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
                    (searchValue: {
                        [Symbol.replace](string: string, replaceValue: string): string;
                    }, replaceValue: string): string;
                    (searchValue: {
                        [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string;
                    }, replacer: (substring: string, ...args: any[]) => string): string;
                };
                search: {
                    (regexp: string | RegExp): number;
                    (searcher: {
                        [Symbol.search](string: string): number;
                    }): number;
                };
                slice: (start?: number, end?: number) => string;
                split: {
                    (separator: string | RegExp, limit?: number): string[];
                    (splitter: {
                        [Symbol.split](string: string, limit?: number): string[];
                    }, limit?: number): string[];
                };
                substring: (start: number, end?: number) => string;
                toLowerCase: () => string;
                toLocaleLowerCase: (locales?: string | string[]) => string;
                toUpperCase: () => string;
                toLocaleUpperCase: (locales?: string | string[]) => string;
                trim: () => string;
                readonly length: number;
                substr: (from: number, length?: number) => string;
                valueOf: () => string;
                codePointAt: (pos: number) => number;
                includes: (searchString: string, position?: number) => boolean;
                endsWith: (searchString: string, endPosition?: number) => boolean;
                normalize: {
                    (form: "NFC" | "NFD" | "NFKC" | "NFKD"): string;
                    (form?: string): string;
                };
                repeat: (count: number) => string;
                startsWith: (searchString: string, position?: number) => boolean;
                anchor: (name: string) => string;
                big: () => string;
                blink: () => string;
                bold: () => string;
                fixed: () => string;
                fontcolor: (color: string) => string;
                fontsize: {
                    (size: number): string;
                    (size: string): string;
                };
                italics: () => string;
                link: (url: string) => string;
                small: () => string;
                strike: () => string;
                sub: () => string;
                sup: () => string;
                padStart: (maxLength: number, fillString?: string) => string;
                padEnd: (maxLength: number, fillString?: string) => string;
                trimEnd: () => string;
                trimStart: () => string;
                trimLeft: () => string;
                trimRight: () => string;
                matchAll: (regexp: RegExp) => IterableIterator<RegExpMatchArray>;
                replaceAll: {
                    (searchValue: string | RegExp, replaceValue: string): string;
                    (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
                };
                at: (index: number) => string;
                [Symbol.iterator]: () => IterableIterator<string>;
            }[];
            setGuid: (guid: string) => import("@cometchat/chat-sdk-javascript").GroupMembersRequestBuilder;
            setLimit: (limit: number) => import("@cometchat/chat-sdk-javascript").GroupMembersRequestBuilder;
            setSearchKeyword: (searchKeyword: string) => import("@cometchat/chat-sdk-javascript").GroupMembersRequestBuilder;
            setScopes: (scopes: String[]) => import("@cometchat/chat-sdk-javascript").GroupMembersRequestBuilder;
            build: () => import("@cometchat/chat-sdk-javascript").GroupMembersRequest;
        };
        loadingIconURL: string;
    }, UserMemberWrapperConfiguration | {
        userMemberListType: UserMemberListType;
        onItemClick: () => void;
        listItemView: any;
        avatarStyle: {
            borderRadius?: string;
            width?: string;
            height?: string;
            border?: string;
            nameTextColor?: string;
            backgroundSize?: string;
            nameTextFont?: string;
            outerViewBorderWidth?: string;
            outerViewBorderSpacing?: string;
            outerViewBorderRadius?: string;
            outerViewBorderColor?: string;
            backgroundColor?: string;
        };
        statusIndicatorStyle: any;
        subtitleView: any;
        usersRequestBuilder: {
            limit: number;
            status: string;
            searchKeyword: string;
            shouldHideBlockedUsers: boolean;
            role: string;
            roles: {
                [x: number]: string;
                toString: () => string;
                charAt: (pos: number) => string;
                charCodeAt: (index: number) => number;
                concat: (...strings: string[]) => string;
                indexOf: (searchString: string, position?: number) => number;
                lastIndexOf: (searchString: string, position?: number) => number;
                localeCompare: {
                    (that: string): number;
                    (that: string, locales?: string | string[], options?: Intl.CollatorOptions): number;
                };
                match: {
                    (regexp: string | RegExp): RegExpMatchArray;
                    (matcher: {
                        [Symbol.match](string: string): RegExpMatchArray;
                    }): RegExpMatchArray;
                };
                replace: {
                    (searchValue: string | RegExp, replaceValue: string): string;
                    (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
                    (searchValue: {
                        [Symbol.replace](string: string, replaceValue: string): string;
                    }, replaceValue: string): string;
                    (searchValue: {
                        [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string;
                    }, replacer: (substring: string, ...args: any[]) => string): string;
                };
                search: {
                    (regexp: string | RegExp): number;
                    (searcher: {
                        [Symbol.search](string: string): number;
                    }): number;
                };
                slice: (start?: number, end?: number) => string;
                split: {
                    (separator: string | RegExp, limit?: number): string[];
                    (splitter: {
                        [Symbol.split](string: string, limit?: number): string[];
                    }, limit?: number): string[];
                };
                substring: (start: number, end?: number) => string;
                toLowerCase: () => string;
                toLocaleLowerCase: (locales?: string | string[]) => string;
                toUpperCase: () => string;
                toLocaleUpperCase: (locales?: string | string[]) => string;
                trim: () => string;
                readonly length: number;
                substr: (from: number, length?: number) => string;
                valueOf: () => string;
                codePointAt: (pos: number) => number;
                includes: (searchString: string, position?: number) => boolean;
                endsWith: (searchString: string, endPosition?: number) => boolean;
                normalize: {
                    (form: "NFC" | "NFD" | "NFKC" | "NFKD"): string;
                    (form?: string): string;
                };
                repeat: (count: number) => string;
                startsWith: (searchString: string, position?: number) => boolean;
                anchor: (name: string) => string;
                big: () => string;
                blink: () => string;
                bold: () => string;
                fixed: () => string;
                fontcolor: (color: string) => string;
                fontsize: {
                    (size: number): string;
                    (size: string): string;
                };
                italics: () => string;
                link: (url: string) => string;
                small: () => string;
                strike: () => string;
                sub: () => string;
                sup: () => string;
                padStart: (maxLength: number, fillString?: string) => string;
                padEnd: (maxLength: number, fillString?: string) => string;
                trimEnd: () => string;
                trimStart: () => string;
                trimLeft: () => string;
                trimRight: () => string;
                matchAll: (regexp: RegExp) => IterableIterator<RegExpMatchArray>;
                replaceAll: {
                    (searchValue: string | RegExp, replaceValue: string): string;
                    (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
                };
                at: (index: number) => string;
                [Symbol.iterator]: () => IterableIterator<string>;
            }[];
            tags: {
                [x: number]: string;
                toString: () => string;
                charAt: (pos: number) => string;
                charCodeAt: (index: number) => number;
                concat: (...strings: string[]) => string;
                indexOf: (searchString: string, position?: number) => number;
                lastIndexOf: (searchString: string, position?: number) => number;
                localeCompare: {
                    (that: string): number;
                    (that: string, locales?: string | string[], options?: Intl.CollatorOptions): number;
                };
                match: {
                    (regexp: string | RegExp): RegExpMatchArray;
                    (matcher: {
                        [Symbol.match](string: string): RegExpMatchArray;
                    }): RegExpMatchArray;
                };
                replace: {
                    (searchValue: string | RegExp, replaceValue: string): string;
                    (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
                    (searchValue: {
                        [Symbol.replace](string: string, replaceValue: string): string;
                    }, replaceValue: string): string;
                    (searchValue: {
                        [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string;
                    }, replacer: (substring: string, ...args: any[]) => string): string;
                };
                search: {
                    (regexp: string | RegExp): number;
                    (searcher: {
                        [Symbol.search](string: string): number;
                    }): number;
                };
                slice: (start?: number, end?: number) => string;
                split: {
                    (separator: string | RegExp, limit?: number): string[];
                    (splitter: {
                        [Symbol.split](string: string, limit?: number): string[];
                    }, limit?: number): string[];
                };
                substring: (start: number, end?: number) => string;
                toLowerCase: () => string;
                toLocaleLowerCase: (locales?: string | string[]) => string;
                toUpperCase: () => string;
                toLocaleUpperCase: (locales?: string | string[]) => string;
                trim: () => string;
                readonly length: number;
                substr: (from: number, length?: number) => string;
                valueOf: () => string;
                codePointAt: (pos: number) => number;
                includes: (searchString: string, position?: number) => boolean;
                endsWith: (searchString: string, endPosition?: number) => boolean;
                normalize: {
                    (form: "NFC" | "NFD" | "NFKC" | "NFKD"): string;
                    (form?: string): string;
                };
                repeat: (count: number) => string;
                startsWith: (searchString: string, position?: number) => boolean;
                anchor: (name: string) => string;
                big: () => string;
                blink: () => string;
                bold: () => string;
                fixed: () => string;
                fontcolor: (color: string) => string;
                fontsize: {
                    (size: number): string;
                    (size: string): string;
                };
                italics: () => string;
                link: (url: string) => string;
                small: () => string;
                strike: () => string;
                sub: () => string;
                sup: () => string;
                padStart: (maxLength: number, fillString?: string) => string;
                padEnd: (maxLength: number, fillString?: string) => string;
                trimEnd: () => string;
                trimStart: () => string;
                trimLeft: () => string;
                trimRight: () => string;
                matchAll: (regexp: RegExp) => IterableIterator<RegExpMatchArray>;
                replaceAll: {
                    (searchValue: string | RegExp, replaceValue: string): string;
                    (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
                };
                at: (index: number) => string;
                [Symbol.iterator]: () => IterableIterator<string>;
            }[];
            showFriendsOnly: boolean;
            showTags: boolean;
            UIDs: {
                [x: number]: string;
                toString: () => string;
                charAt: (pos: number) => string;
                charCodeAt: (index: number) => number;
                concat: (...strings: string[]) => string;
                indexOf: (searchString: string, position?: number) => number;
                lastIndexOf: (searchString: string, position?: number) => number;
                localeCompare: {
                    (that: string): number;
                    (that: string, locales?: string | string[], options?: Intl.CollatorOptions): number;
                };
                match: {
                    (regexp: string | RegExp): RegExpMatchArray;
                    (matcher: {
                        [Symbol.match](string: string): RegExpMatchArray;
                    }): RegExpMatchArray;
                };
                replace: {
                    (searchValue: string | RegExp, replaceValue: string): string;
                    (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
                    (searchValue: {
                        [Symbol.replace](string: string, replaceValue: string): string;
                    }, replaceValue: string): string;
                    (searchValue: {
                        [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string;
                    }, replacer: (substring: string, ...args: any[]) => string): string;
                };
                search: {
                    (regexp: string | RegExp): number;
                    (searcher: {
                        [Symbol.search](string: string): number;
                    }): number;
                };
                slice: (start?: number, end?: number) => string;
                split: {
                    (separator: string | RegExp, limit?: number): string[];
                    (splitter: {
                        [Symbol.split](string: string, limit?: number): string[];
                    }, limit?: number): string[];
                };
                substring: (start: number, end?: number) => string;
                toLowerCase: () => string;
                toLocaleLowerCase: (locales?: string | string[]) => string;
                toUpperCase: () => string;
                toLocaleUpperCase: (locales?: string | string[]) => string;
                trim: () => string;
                readonly length: number;
                substr: (from: number, length?: number) => string;
                valueOf: () => string;
                codePointAt: (pos: number) => number;
                includes: (searchString: string, position?: number) => boolean;
                endsWith: (searchString: string, endPosition?: number) => boolean;
                normalize: {
                    (form: "NFC" | "NFD" | "NFKC" | "NFKD"): string;
                    (form?: string): string;
                };
                repeat: (count: number) => string;
                startsWith: (searchString: string, position?: number) => boolean;
                anchor: (name: string) => string;
                big: () => string;
                blink: () => string;
                bold: () => string;
                fixed: () => string;
                fontcolor: (color: string) => string;
                fontsize: {
                    (size: number): string;
                    (size: string): string;
                };
                italics: () => string;
                link: (url: string) => string;
                small: () => string;
                strike: () => string;
                sub: () => string;
                sup: () => string;
                padStart: (maxLength: number, fillString?: string) => string;
                padEnd: (maxLength: number, fillString?: string) => string;
                trimEnd: () => string;
                trimStart: () => string;
                trimLeft: () => string;
                trimRight: () => string;
                matchAll: (regexp: RegExp) => IterableIterator<RegExpMatchArray>;
                replaceAll: {
                    (searchValue: string | RegExp, replaceValue: string): string;
                    (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
                };
                at: (index: number) => string;
                [Symbol.iterator]: () => IterableIterator<string>;
            }[];
            SortBy: string;
            SortOrder: string;
            SearchIn: {
                [x: number]: string;
                toString: () => string;
                charAt: (pos: number) => string;
                charCodeAt: (index: number) => number;
                concat: (...strings: string[]) => string;
                indexOf: (searchString: string, position?: number) => number;
                lastIndexOf: (searchString: string, position?: number) => number;
                localeCompare: {
                    (that: string): number;
                    (that: string, locales?: string | string[], options?: Intl.CollatorOptions): number;
                };
                match: {
                    (regexp: string | RegExp): RegExpMatchArray;
                    (matcher: {
                        [Symbol.match](string: string): RegExpMatchArray;
                    }): RegExpMatchArray;
                };
                replace: {
                    (searchValue: string | RegExp, replaceValue: string): string;
                    (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
                    (searchValue: {
                        [Symbol.replace](string: string, replaceValue: string): string;
                    }, replaceValue: string): string;
                    (searchValue: {
                        [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string;
                    }, replacer: (substring: string, ...args: any[]) => string): string;
                };
                search: {
                    (regexp: string | RegExp): number;
                    (searcher: {
                        [Symbol.search](string: string): number;
                    }): number;
                };
                slice: (start?: number, end?: number) => string;
                split: {
                    (separator: string | RegExp, limit?: number): string[];
                    (splitter: {
                        [Symbol.split](string: string, limit?: number): string[];
                    }, limit?: number): string[];
                };
                substring: (start: number, end?: number) => string;
                toLowerCase: () => string;
                toLocaleLowerCase: (locales?: string | string[]) => string;
                toUpperCase: () => string;
                toLocaleUpperCase: (locales?: string | string[]) => string;
                trim: () => string;
                readonly length: number;
                substr: (from: number, length?: number) => string;
                valueOf: () => string;
                codePointAt: (pos: number) => number;
                includes: (searchString: string, position?: number) => boolean;
                endsWith: (searchString: string, endPosition?: number) => boolean;
                normalize: {
                    (form: "NFC" | "NFD" | "NFKC" | "NFKD"): string;
                    (form?: string): string;
                };
                repeat: (count: number) => string;
                startsWith: (searchString: string, position?: number) => boolean;
                anchor: (name: string) => string;
                big: () => string;
                blink: () => string;
                bold: () => string;
                fixed: () => string;
                fontcolor: (color: string) => string;
                fontsize: {
                    (size: number): string;
                    (size: string): string;
                };
                italics: () => string;
                link: (url: string) => string;
                small: () => string;
                strike: () => string;
                sub: () => string;
                sup: () => string;
                padStart: (maxLength: number, fillString?: string) => string;
                padEnd: (maxLength: number, fillString?: string) => string;
                trimEnd: () => string;
                trimStart: () => string;
                trimLeft: () => string;
                trimRight: () => string;
                matchAll: (regexp: RegExp) => IterableIterator<RegExpMatchArray>;
                replaceAll: {
                    (searchValue: string | RegExp, replaceValue: string): string;
                    (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
                };
                at: (index: number) => string;
                [Symbol.iterator]: () => IterableIterator<string>;
            }[];
            setLimit: (limit: number) => import("@cometchat/chat-sdk-javascript").UsersRequestBuilder;
            setStatus: (status: string) => import("@cometchat/chat-sdk-javascript").UsersRequestBuilder;
            setSearchKeyword: (searchKeyword: string) => import("@cometchat/chat-sdk-javascript").UsersRequestBuilder;
            hideBlockedUsers: (hideBlockedUsers: boolean) => import("@cometchat/chat-sdk-javascript").UsersRequestBuilder;
            setRole: (role: string) => import("@cometchat/chat-sdk-javascript").UsersRequestBuilder;
            setRoles: (roles: String[]) => import("@cometchat/chat-sdk-javascript").UsersRequestBuilder;
            friendsOnly: (friendsOnly: boolean) => import("@cometchat/chat-sdk-javascript").UsersRequestBuilder;
            setTags: (tags: String[]) => import("@cometchat/chat-sdk-javascript").UsersRequestBuilder;
            withTags: (withTags: boolean) => import("@cometchat/chat-sdk-javascript").UsersRequestBuilder;
            setUIDs: (uids: String[]) => import("@cometchat/chat-sdk-javascript").UsersRequestBuilder;
            sortBy: (sortBy: string) => import("@cometchat/chat-sdk-javascript").UsersRequestBuilder;
            sortByOrder: (sortOrder: string) => import("@cometchat/chat-sdk-javascript").UsersRequestBuilder;
            searchIn: (searchIn: String[]) => import("@cometchat/chat-sdk-javascript").UsersRequestBuilder;
            build: () => import("@cometchat/chat-sdk-javascript").UsersRequest;
        };
        disableUsersPresence: boolean;
        userPresencePlacement: import("@cometchat/uikit-resources").UserPresencePlacement;
        hideSeparator: boolean;
        loadingStateView: any;
        groupMemberRequestBuilder: {
            limit: number;
            searchKeyword: string;
            guid: string;
            scopes?: {
                [x: number]: string;
                toString: () => string;
                charAt: (pos: number) => string;
                charCodeAt: (index: number) => number;
                concat: (...strings: string[]) => string;
                indexOf: (searchString: string, position?: number) => number;
                lastIndexOf: (searchString: string, position?: number) => number;
                localeCompare: {
                    (that: string): number;
                    (that: string, locales?: string | string[], options?: Intl.CollatorOptions): number;
                };
                match: {
                    (regexp: string | RegExp): RegExpMatchArray;
                    (matcher: {
                        [Symbol.match](string: string): RegExpMatchArray;
                    }): RegExpMatchArray;
                };
                replace: {
                    (searchValue: string | RegExp, replaceValue: string): string;
                    (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
                    (searchValue: {
                        [Symbol.replace](string: string, replaceValue: string): string;
                    }, replaceValue: string): string;
                    (searchValue: {
                        [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string;
                    }, replacer: (substring: string, ...args: any[]) => string): string;
                };
                search: {
                    (regexp: string | RegExp): number;
                    (searcher: {
                        [Symbol.search](string: string): number;
                    }): number;
                };
                slice: (start?: number, end?: number) => string;
                split: {
                    (separator: string | RegExp, limit?: number): string[];
                    (splitter: {
                        [Symbol.split](string: string, limit?: number): string[];
                    }, limit?: number): string[];
                };
                substring: (start: number, end?: number) => string;
                toLowerCase: () => string;
                toLocaleLowerCase: (locales?: string | string[]) => string;
                toUpperCase: () => string;
                toLocaleUpperCase: (locales?: string | string[]) => string;
                trim: () => string;
                readonly length: number;
                substr: (from: number, length?: number) => string;
                valueOf: () => string;
                codePointAt: (pos: number) => number;
                includes: (searchString: string, position?: number) => boolean;
                endsWith: (searchString: string, endPosition?: number) => boolean;
                normalize: {
                    (form: "NFC" | "NFD" | "NFKC" | "NFKD"): string;
                    (form?: string): string;
                };
                repeat: (count: number) => string;
                startsWith: (searchString: string, position?: number) => boolean;
                anchor: (name: string) => string;
                big: () => string;
                blink: () => string;
                bold: () => string;
                fixed: () => string;
                fontcolor: (color: string) => string;
                fontsize: {
                    (size: number): string;
                    (size: string): string;
                };
                italics: () => string;
                link: (url: string) => string;
                small: () => string;
                strike: () => string;
                sub: () => string;
                sup: () => string;
                padStart: (maxLength: number, fillString?: string) => string;
                padEnd: (maxLength: number, fillString?: string) => string;
                trimEnd: () => string;
                trimStart: () => string;
                trimLeft: () => string;
                trimRight: () => string;
                matchAll: (regexp: RegExp) => IterableIterator<RegExpMatchArray>;
                replaceAll: {
                    (searchValue: string | RegExp, replaceValue: string): string;
                    (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
                };
                at: (index: number) => string;
                [Symbol.iterator]: () => IterableIterator<string>;
            }[];
            setGuid: (guid: string) => import("@cometchat/chat-sdk-javascript").GroupMembersRequestBuilder;
            setLimit: (limit: number) => import("@cometchat/chat-sdk-javascript").GroupMembersRequestBuilder;
            setSearchKeyword: (searchKeyword: string) => import("@cometchat/chat-sdk-javascript").GroupMembersRequestBuilder;
            setScopes: (scopes: String[]) => import("@cometchat/chat-sdk-javascript").GroupMembersRequestBuilder;
            build: () => import("@cometchat/chat-sdk-javascript").GroupMembersRequest;
        };
        loadingIconURL: string;
    }>;
    mentionsSearchCount: Ref<number, number>;
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
    showMentionsCountWarning: Ref<boolean, boolean>;
    usersRequestBuilder: Ref<import("@cometchat/chat-sdk-javascript").UsersRequestBuilder, import("@cometchat/chat-sdk-javascript").UsersRequestBuilder>;
    groupMembersRequestBuilder: Ref<import("@cometchat/chat-sdk-javascript").GroupMembersRequestBuilder, import("@cometchat/chat-sdk-javascript").GroupMembersRequestBuilder>;
    userMemberWrapperRef: any;
    userMemberWrapperListType: Ref<UserMemberListType, UserMemberListType>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
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
}>> & Readonly<{}>, {
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
}, {}, undefined, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
