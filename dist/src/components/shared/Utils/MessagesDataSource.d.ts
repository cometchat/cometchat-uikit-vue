import { AIOptionsStyle, CardBubbleStyle, CometChatMentionsFormatter, CometChatTextFormatter, CometChatUrlsFormatter, FormBubbleStyle, SchedulerBubbleStyle } from "@cometchat/uikit-shared";
import { BaseStyle, FileBubbleStyle, ImageBubbleStyle, TextBubbleStyle } from "@cometchat/uikit-elements";
import { CardMessage, CometChatActionsIcon, CometChatActionsView, CometChatDetailsTemplate, CometChatMessageComposerAction, CometChatMessageTemplate, CometChatTheme, FormMessage, MentionsTargetElement, MessageBubbleAlignment, SchedulerMessage } from "@cometchat/uikit-resources";
import { DataSource } from "../Framework/DataSource";
export declare class MessagesDataSource implements DataSource {
    getEditOption(theme: CometChatTheme): CometChatActionsIcon;
    getDeleteOption(theme: CometChatTheme): CometChatActionsIcon;
    getReactionOption(theme: CometChatTheme): CometChatActionsIcon;
    getReplyInThreadOption(theme: CometChatTheme): CometChatActionsIcon;
    getSendMessagePrivatelyOption(theme: CometChatTheme): CometChatActionsIcon;
    getMessageInformationOption(theme: CometChatTheme): CometChatActionsIcon;
    getCopyOption(theme: CometChatTheme): CometChatActionsIcon;
    isSentByMe(loggedInUser: CometChat.User, message: CometChat.BaseMessage): boolean;
    getTextMessageOptions(loggedInUser: CometChat.User, messageObject: CometChat.BaseMessage, theme: CometChatTheme, group?: CometChat.Group): Array<CometChatActionsIcon | CometChatActionsView>;
    getImageMessageOptions(loggedInUser: CometChat.User, messageObject: CometChat.BaseMessage, theme: CometChatTheme, group?: CometChat.Group): Array<CometChatActionsIcon | CometChatActionsView>;
    getVideoMessageOptions(loggedInUser: CometChat.User, messageObject: CometChat.BaseMessage, theme: CometChatTheme, group?: CometChat.Group): Array<CometChatActionsIcon | CometChatActionsView>;
    getAudioMessageOptions(loggedInUser: CometChat.User, messageObject: CometChat.BaseMessage, theme: CometChatTheme, group?: CometChat.Group): Array<CometChatActionsIcon | CometChatActionsView>;
    getFileMessageOptions(loggedInUser: CometChat.User, messageObject: CometChat.BaseMessage, theme: CometChatTheme, group?: CometChat.Group): Array<CometChatActionsIcon | CometChatActionsView>;
    getBottomView(_messageObject: CometChat.BaseMessage, _alignment: MessageBubbleAlignment): any;
    getTextMessageTemplate(theme: CometChatTheme, additionalConfigurations?: any): CometChatMessageTemplate;
    getAudioMessageTemplate(theme: CometChatTheme): CometChatMessageTemplate;
    getVideoMessageTemplate(theme: CometChatTheme): CometChatMessageTemplate;
    getImageMessageTemplate(theme: CometChatTheme): CometChatMessageTemplate;
    getGroupActionTemplate(theme: CometChatTheme): CometChatMessageTemplate;
    getFileMessageTemplate(theme: CometChatTheme): CometChatMessageTemplate;
    getFormMessageTemplate(theme: CometChatTheme): CometChatMessageTemplate;
    getCardMessageTemplate(theme: CometChatTheme): CometChatMessageTemplate;
    getSchedulerMessageTemplate(theme: CometChatTheme): CometChatMessageTemplate;
    getAllMessageTemplates(theme?: CometChatTheme, additionalConfigurations?: any): Array<CometChatMessageTemplate>;
    getMessageTemplate(messageType: string, messageCategory: string, theme?: CometChatTheme): CometChatMessageTemplate | null;
    getMessageOptions(loggedInUser: CometChat.User, messageObject: CometChat.BaseMessage, theme: CometChatTheme, group?: CometChat.Group): Array<CometChatActionsIcon | CometChatActionsView>;
    getCommonOptions(loggedInUser: CometChat.User, messageObject: CometChat.BaseMessage, theme: CometChatTheme, group?: CometChat.Group): Array<CometChatActionsIcon | CometChatActionsView>;
    getAllMessageTypes(): Array<string>;
    addList(): string;
    getAllMessageCategories(): Array<string>;
    getAuxiliaryOptions(id: Map<string, any>, user?: CometChat.User, group?: CometChat.Group, theme?: CometChatTheme): any;
    getId(): string;
    getTextMessageContentView(message: CometChat.TextMessage, _alignment: MessageBubbleAlignment, theme: CometChatTheme, additionalConfigurations?: any): any;
    getAudioMessageContentView(message: CometChat.MediaMessage, _alignment: MessageBubbleAlignment, theme: CometChatTheme): any;
    getFileMessageContentView(message: CometChat.MediaMessage, _alignment: MessageBubbleAlignment, theme: CometChatTheme): any;
    getFormMessageContentView(message: FormMessage, _alignment: MessageBubbleAlignment, theme: CometChatTheme): any;
    getCardMessageContentView(message: CardMessage, _alignment: MessageBubbleAlignment, theme: CometChatTheme): any;
    getSchedulerMessageContentView(message: SchedulerMessage, _alignment: MessageBubbleAlignment, theme: CometChatTheme): any;
    getImageMessageContentView(message: CometChat.MediaMessage, _alignment: MessageBubbleAlignment, theme: CometChatTheme): any;
    getVideoMessageContentView(message: CometChat.MediaMessage, _alignment: MessageBubbleAlignment, theme: CometChatTheme): any;
    getActionMessage(message: any): string;
    getDeleteMessageBubble(message: CometChat.BaseMessage, theme: CometChatTheme, style?: TextBubbleStyle): {
        componentName: string;
        props: {
            text: any;
            textStyle: any;
        };
    };
    getGroupActionBubble(message: CometChat.BaseMessage, theme: CometChatTheme, style?: TextBubbleStyle): {
        componentName: string;
        props: {
            text: string;
            textStyle: any;
        };
    };
    getTextMessageBubbleStyle(alignment: MessageBubbleAlignment, theme: CometChatTheme): {
        textFont: string;
        textColor: string;
    };
    getFormMessageBubbleStyle(theme: CometChatTheme): FormBubbleStyle;
    getCardMessageBubbleStyle(theme: CometChatTheme): CardBubbleStyle;
    getSchedulerMessageBubbleStyle(theme: CometChatTheme): SchedulerBubbleStyle;
    getTextMessageBubble(messageText: string, message: CometChat.TextMessage, alignment: MessageBubbleAlignment, theme: CometChatTheme, style?: TextBubbleStyle, additionalConfigurations?: any): any;
    getAudioMessageBubble(audioUrl: string, message: CometChat.MediaMessage, theme: CometChatTheme, title?: string, style?: BaseStyle): any;
    getFileMessageBubble(fileUrl: string, message: CometChat.MediaMessage, theme: CometChatTheme, title?: string, style?: FileBubbleStyle): any;
    getFormMessageBubble(message: FormMessage, theme: CometChatTheme, style?: FormBubbleStyle, onSubmitClick?: Function): ViewType;
    getCardMessageBubble(message: CardMessage, theme: CometChatTheme, style?: CardBubbleStyle): ViewType;
    getSchedulerMessageBubble(message: SchedulerMessage, theme: CometChatTheme, style?: SchedulerBubbleStyle): ViewType;
    getImageMessageBubble(imageUrl: string, placeholderImage: string, message: CometChat.MediaMessage, theme: CometChatTheme, onClick?: Function, style?: ImageBubbleStyle): {
        componentName: string;
        props: {
            src: string;
            placeholderImage: string;
            message: import("@cometchat/chat-sdk-javascript").MediaMessage;
        };
    };
    getVideoMessageBubble(videoUrl: string, message: CometChat.MediaMessage, theme: CometChatTheme, thumbnailUrl?: string, onClick?: Function, style?: BaseStyle): any;
    imageAttachmentOption(theme: CometChatTheme): CometChatMessageComposerAction;
    videoAttachmentOption(theme: CometChatTheme): CometChatMessageComposerAction;
    audioAttachmentOption(theme: CometChatTheme): CometChatMessageComposerAction;
    fileAttachmentOption(theme: CometChatTheme): CometChatMessageComposerAction;
    getAttachmentOptions(theme: CometChatTheme, id?: Map<string, any>): Array<CometChatMessageComposerAction>;
    getLastConversationMessage(conversation: CometChat.Conversation, loggedInUser: CometChat.User, additionalConfigurations: any): string;
    /**
     * Adds styled @ for every mention in the text by matching uid
     *
     * @param {CometChat.TextMessage} message
     * @param {string} subtitle
     * @returns {void}
     */
    getMentionsFormattedText(message: CometChat.TextMessage, subtitle: string, mentionsFormatterParams: {
        mentionsTargetElement: MentionsTargetElement;
        theme: CometChatTheme;
    }): string;
    getDefaultDetailsTemplate(loggedInUser: CometChat.User, user: CometChat.User | null, group: CometChat.Group | null, theme: CometChatTheme): CometChatDetailsTemplate[];
    getAuxiliaryHeaderMenu(user: CometChat.User, group: CometChat.Group): any;
    getAIOptions(user: CometChat.User | null, group: CometChat.Group | null, theme: CometChatTheme, id?: Map<String, any>, AIOptionsStyle?: AIOptionsStyle): Array<CometChatMessageComposerAction | CometChatActionsView>;
    getAllTextFormatters(formatterParams: any): CometChatTextFormatter[];
    getMentionsTextFormatter(params: any): CometChatMentionsFormatter;
    getUrlTextFormatter(params?: any): CometChatUrlsFormatter;
}
