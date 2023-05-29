import {
  MessageBubbleAlignment,
  ConversationUtils,
  DetailsUtils,
} from "uikit-utils-lerna";
import { DataSource } from "../Framework/DataSource";
import { ChatConfigurator } from "../Framework/ChatConfigurator";
import {
  CometChatActionsIcon,
  CometChatMessageTemplate,
  CometChatMessageComposerAction,
  CometChatTheme,
  localize,
  CometChatUIKitConstants,
  fontHelper,
  CometChatDetailsTemplate,
  CometChatActionsView,
} from "uikit-resources-lerna";
import { CometChat } from "@cometchat-pro/chat";

import {
  EditIcon as editIcon,
  DeleteIcon as deleteIcon,
  CopyIcon as copyIcon,
  ThreadIcon as threadIcon,
  AudioIcon as audioIcon,
  VideoIcon as videoIcon,
  FileIcon as fileIcon,
  ImageIcon as imageIcon,
  PlaceholderImage as placeHolderImage,
  DownloadIcon as downloadIcon,
} from "../../../assets";

import {
  TextBubbleStyle,
  ImageBubbleStyle,
  FileBubbleStyle,
  BaseStyle,
} from "my-cstom-package-lit";

const defaultTheme: CometChatTheme = new CometChatTheme({});
export class MessagesDataSource implements DataSource {
  getEditOption(theme: CometChatTheme): CometChatActionsIcon {
    return new CometChatActionsIcon({
      id: CometChatUIKitConstants.MessageOption.editMessage,
      title: localize("EDIT_MESSAGE"),
      iconURL: editIcon,
      onClick: undefined,
      iconTint: theme.palette.getAccent600(),
      backgroundColor: "transparent",
      titleFont: fontHelper(theme.typography.subtitle1),
      titleColor: theme.palette.getAccent600(),
    });
  }

  getDeleteOption(theme: CometChatTheme): CometChatActionsIcon {
    return new CometChatActionsIcon({
      id: CometChatUIKitConstants.MessageOption.deleteMessage,
      title: localize("DELETE"),
      iconURL: deleteIcon,
      onClick: undefined,
      iconTint: theme.palette.getAccent600(),
      backgroundColor: "transparent",
      titleFont: fontHelper(theme.typography.subtitle1),
      titleColor: theme.palette.getAccent600(),
    });
  }

  getReplyInThreadOption(theme: CometChatTheme): CometChatActionsIcon {
    return new CometChatActionsIcon({
      id: CometChatUIKitConstants.MessageOption.replyInThread,
      title: localize("REPLY_IN_THREAD"),
      iconURL: threadIcon,
      onClick: undefined,
      iconTint: theme.palette.getAccent600(),
      backgroundColor: "transparent",
      titleFont: fontHelper(theme.typography.subtitle1),
      titleColor: theme.palette.getAccent600(),
    });
  }

  getCopyOption(theme: CometChatTheme): CometChatActionsIcon {
    return new CometChatActionsIcon({
      id: CometChatUIKitConstants.MessageOption.copyMessage,
      title: localize("COPY_MESSAGE"),
      iconURL: copyIcon,
      onClick: undefined,
      iconTint: theme.palette.getAccent600(),
      backgroundColor: "transparent",
      titleFont: fontHelper(theme.typography.subtitle1),
      titleColor: theme.palette.getAccent600(),
    });
  }

  isSentByMe(
    loggedInUser: CometChat.User,
    message: CometChat.BaseMessage
  ): boolean {
    return (
      !message.getSender() ||
      loggedInUser.getUid() === message.getSender().getUid()
    );
  }

  getTextMessageOptions(
    loggedInUser: CometChat.User,
    messageObject: CometChat.BaseMessage,
    theme: CometChatTheme,
    group?: CometChat.Group
  ): Array<CometChatActionsIcon | CometChatActionsView> {
    const _isSentByMe: boolean = this.isSentByMe(loggedInUser, messageObject);
    let _isModerator = false;

    if (
      group?.getScope() == CometChatUIKitConstants.groupMemberScope.moderator
    ) {
      _isModerator = true;
    }

    let messageOptionList: Array<CometChatActionsIcon> = [];
    messageOptionList = ChatConfigurator.getDataSource().getCommonOptions(
      loggedInUser,
      messageObject,
      theme,
      group
    );

    if (_isSentByMe || _isModerator) {
      messageOptionList.push(this.getEditOption(theme));
    }
    messageOptionList.push(this.getCopyOption(theme));
    return messageOptionList;
  }

  getImageMessageOptions(
    loggedInUser: CometChat.User,
    messageObject: CometChat.BaseMessage,
    theme: CometChatTheme,
    group?: CometChat.Group
  ): Array<CometChatActionsIcon | CometChatActionsView> {
    let messageOptionList: CometChatActionsIcon[] = [];
    messageOptionList = ChatConfigurator.getDataSource().getCommonOptions(
      loggedInUser,
      messageObject,
      theme,
      group
    );
    return messageOptionList;
  }

  getVideoMessageOptions(
    loggedInUser: CometChat.User,
    messageObject: CometChat.BaseMessage,
    theme: CometChatTheme,
    group?: CometChat.Group
  ): Array<CometChatActionsIcon | CometChatActionsView> {
    let messageOptionList: CometChatActionsIcon[] = [];
    messageOptionList = ChatConfigurator.getDataSource().getCommonOptions(
      loggedInUser,
      messageObject,
      theme,
      group
    );
    return messageOptionList;
  }

  getAudioMessageOptions(
    loggedInUser: CometChat.User,
    messageObject: CometChat.BaseMessage,
    theme: CometChatTheme,
    group?: CometChat.Group
  ): Array<CometChatActionsIcon | CometChatActionsView> {
    let messageOptionList: CometChatActionsIcon[] = [];
    messageOptionList = ChatConfigurator.getDataSource().getCommonOptions(
      loggedInUser,
      messageObject,
      theme,
      group
    );
    return messageOptionList;
  }

  getFileMessageOptions(
    loggedInUser: CometChat.User,
    messageObject: CometChat.BaseMessage,
    theme: CometChatTheme,
    group?: CometChat.Group
  ): Array<CometChatActionsIcon | CometChatActionsView> {
    let messageOptionList: CometChatActionsIcon[] = [];
    messageOptionList = ChatConfigurator.getDataSource().getCommonOptions(
      loggedInUser,
      messageObject,
      theme,
      group
    );
    return messageOptionList;
  }

  getBottomView(
    _messageObject: CometChat.BaseMessage,
    _alignment: MessageBubbleAlignment
  ) {
    return null;
  }

  getTextMessageTemplate(theme: CometChatTheme): CometChatMessageTemplate {
    return new CometChatMessageTemplate({
      type: CometChatUIKitConstants.MessageTypes.text,
      category: CometChatUIKitConstants.MessageCategory.message,
      contentView: (
        message: CometChat.BaseMessage,
        _alignment: MessageBubbleAlignment
      ) => {
        const textMessage: CometChat.TextMessage =
          message as CometChat.TextMessage;
        if (textMessage.getDeletedAt() != null) {
          return this.getDeleteMessageBubble(textMessage, theme);
        }
        return ChatConfigurator.getDataSource().getTextMessageContentView(
          textMessage,
          _alignment,
          theme
        );
      },
      options: ChatConfigurator.getDataSource().getMessageOptions,
      bottomView: (
        _message: CometChat.BaseMessage,
        _alignment: MessageBubbleAlignment
      ) => {
        return ChatConfigurator.getDataSource().getBottomView(
          _message,
          _alignment
        );
      },
    });
  }

  getAudioMessageTemplate(theme: CometChatTheme): CometChatMessageTemplate {
    return new CometChatMessageTemplate({
      type: CometChatUIKitConstants.MessageTypes.audio,
      category: CometChatUIKitConstants.MessageCategory.message,
      contentView: (
        message: CometChat.BaseMessage,
        _alignment: MessageBubbleAlignment
      ) => {
        const audioMessage: CometChat.MediaMessage =
          message as CometChat.MediaMessage;
        if (audioMessage.getDeletedAt() != null) {
          return this.getDeleteMessageBubble(message, theme);
        }
        return ChatConfigurator.getDataSource().getAudioMessageContentView(
          audioMessage,
          _alignment,
          theme
        );
      },
      options: ChatConfigurator.getDataSource().getMessageOptions,
      bottomView: (
        _message: CometChat.BaseMessage,
        _alignment: MessageBubbleAlignment
      ) => {
        return ChatConfigurator.getDataSource().getBottomView(
          _message,
          _alignment
        );
      },
    });
  }

  getVideoMessageTemplate(theme: CometChatTheme): CometChatMessageTemplate {
    return new CometChatMessageTemplate({
      type: CometChatUIKitConstants.MessageTypes.video,
      category: CometChatUIKitConstants.MessageCategory.message,
      contentView: (
        message: CometChat.BaseMessage,
        _alignment: MessageBubbleAlignment
      ) => {
        const videoMessage: CometChat.MediaMessage =
          message as CometChat.MediaMessage;
        if (videoMessage.getDeletedAt() != null) {
          return this.getDeleteMessageBubble(message, theme);
        }
        return ChatConfigurator.getDataSource().getVideoMessageContentView(
          videoMessage,
          _alignment,
          theme
        );
      },
      options: ChatConfigurator.getDataSource().getMessageOptions,
      bottomView: (
        _message: CometChat.BaseMessage,
        _alignment: MessageBubbleAlignment
      ) => {
        return ChatConfigurator.getDataSource().getBottomView(
          _message,
          _alignment
        );
      },
    });
  }

  getImageMessageTemplate(theme: CometChatTheme): CometChatMessageTemplate {
    return new CometChatMessageTemplate({
      type: CometChatUIKitConstants.MessageTypes.image,
      category: CometChatUIKitConstants.MessageCategory.message,
      contentView: (
        message: CometChat.BaseMessage,
        _alignment: MessageBubbleAlignment
      ) => {
        const imageMessage: CometChat.MediaMessage =
          message as CometChat.MediaMessage;
        if (imageMessage.getDeletedAt() != null) {
          return this.getDeleteMessageBubble(message, theme);
        }
        return ChatConfigurator.getDataSource().getImageMessageContentView(
          imageMessage,
          _alignment,
          theme
        );
      },
      options: ChatConfigurator.getDataSource().getMessageOptions,
      bottomView: (
        _message: CometChat.BaseMessage,
        _alignment: MessageBubbleAlignment
      ) => {
        return ChatConfigurator.getDataSource().getBottomView(
          _message,
          _alignment
        );
      },
    });
  }

  getGroupActionTemplate(theme: CometChatTheme): CometChatMessageTemplate {
    return new CometChatMessageTemplate({
      type: CometChatUIKitConstants.MessageTypes.groupMember,
      category: CometChatUIKitConstants.MessageCategory.action,
      contentView: (
        message: CometChat.BaseMessage,
        _alignment: MessageBubbleAlignment
      ) => {
        return this.getGroupActionBubble(message, theme);
      },
    });
  }

  getFileMessageTemplate(theme: CometChatTheme): CometChatMessageTemplate {
    return new CometChatMessageTemplate({
      type: CometChatUIKitConstants.MessageTypes.file,
      category: CometChatUIKitConstants.MessageCategory.message,
      contentView: (
        message: CometChat.BaseMessage,
        _alignment: MessageBubbleAlignment
      ) => {
        const fileMessage: CometChat.MediaMessage =
          message as CometChat.MediaMessage;
        if (fileMessage.getDeletedAt() != null) {
          return this.getDeleteMessageBubble(message, theme);
        }

        return ChatConfigurator.getDataSource().getFileMessageContentView(
          fileMessage,
          _alignment,
          theme
        );
      },
      options: ChatConfigurator.getDataSource().getMessageOptions,
      bottomView: (
        _message: CometChat.BaseMessage,
        _alignment: MessageBubbleAlignment
      ) => {
        return ChatConfigurator.getDataSource().getBottomView(
          _message,
          _alignment
        );
      },
    });
  }

  getAllMessageTemplates(
    theme?: CometChatTheme
  ): Array<CometChatMessageTemplate> {
    const _theme: CometChatTheme = theme ?? defaultTheme;
    return [
      ChatConfigurator.getDataSource().getTextMessageTemplate(_theme),
      ChatConfigurator.getDataSource().getImageMessageTemplate(_theme),
      ChatConfigurator.getDataSource().getVideoMessageTemplate(_theme),
      ChatConfigurator.getDataSource().getAudioMessageTemplate(_theme),
      ChatConfigurator.getDataSource().getFileMessageTemplate(_theme),
      ChatConfigurator.getDataSource().getGroupActionTemplate(_theme),
    ];
  }

  getMessageTemplate(
    messageType: string,
    messageCategory: string,
    theme?: CometChatTheme
  ): CometChatMessageTemplate | null {
    const _theme: CometChatTheme = theme ?? defaultTheme;

    let _template: CometChatMessageTemplate | null = null;
    if (messageCategory != CometChatUIKitConstants.MessageCategory.call) {
      switch (messageType) {
        case CometChatUIKitConstants.MessageTypes.text:
          _template =
            ChatConfigurator.getDataSource().getTextMessageTemplate(_theme);
          break;

        case CometChatUIKitConstants.MessageTypes.image:
          _template =
            ChatConfigurator.getDataSource().getImageMessageTemplate(_theme);
          break;

        case CometChatUIKitConstants.MessageTypes.video:
          _template =
            ChatConfigurator.getDataSource().getVideoMessageTemplate(_theme);
          break;

        case CometChatUIKitConstants.MessageTypes.groupMember:
          _template =
            ChatConfigurator.getDataSource().getGroupActionTemplate(_theme);
          break;

        case CometChatUIKitConstants.MessageTypes.file:
          _template =
            ChatConfigurator.getDataSource().getFileMessageTemplate(_theme);
          break;

        case CometChatUIKitConstants.MessageTypes.audio:
          _template =
            ChatConfigurator.getDataSource().getAudioMessageTemplate(_theme);
          break;
      }
    }
    return _template;
  }

  getMessageOptions(
    loggedInUser: CometChat.User,
    messageObject: CometChat.BaseMessage,
    theme: CometChatTheme,
    group?: CometChat.Group
  ): Array<CometChatActionsIcon | CometChatActionsView> {
    let _optionList: Array<CometChatActionsIcon | CometChatActionsView> = [];

    let _isSentByMe = false;

    //console.log("MESSAGE OBJECT: ", messageObject);
    if (loggedInUser.getUid() == messageObject.getSender()?.getUid()) {
      _isSentByMe = true;
    }
    if (
      messageObject.getCategory() ==
      CometChatUIKitConstants.MessageCategory.message
    ) {
      switch (messageObject.getType()) {
        case CometChatUIKitConstants.MessageTypes.text:
          _optionList = ChatConfigurator.getDataSource().getTextMessageOptions(
            loggedInUser,
            messageObject,
            theme,
            group
          );
          break;
        case CometChatUIKitConstants.MessageTypes.image:
          _optionList = ChatConfigurator.getDataSource().getImageMessageOptions(
            loggedInUser,
            messageObject,
            theme,
            group
          );
          break;
        case CometChatUIKitConstants.MessageTypes.video:
          _optionList = ChatConfigurator.getDataSource().getVideoMessageOptions(
            loggedInUser,
            messageObject,
            theme,
            group
          );
          break;
        case CometChatUIKitConstants.MessageTypes.groupMember:
          _optionList = [];
          break;
        case CometChatUIKitConstants.MessageTypes.file:
          _optionList = ChatConfigurator.getDataSource().getFileMessageOptions(
            loggedInUser,
            messageObject,
            theme,
            group
          );
          break;
        case CometChatUIKitConstants.MessageTypes.audio:
          _optionList = ChatConfigurator.getDataSource().getAudioMessageOptions(
            loggedInUser,
            messageObject,
            theme,
            group
          );
          break;
      }
    } else if (
      messageObject.getCategory() ==
      CometChatUIKitConstants.MessageCategory.custom
    ) {
      _optionList = ChatConfigurator.getDataSource().getCommonOptions(
        loggedInUser,
        messageObject,
        theme,
        group
      );
    }
    return _optionList;
  }

  getCommonOptions(
    loggedInUser: CometChat.User,
    messageObject: CometChat.BaseMessage,
    theme: CometChatTheme,
    group?: CometChat.Group
  ): Array<CometChatActionsIcon | CometChatActionsView> {
    const _isSentByMe: boolean = this.isSentByMe(loggedInUser, messageObject);
    let _isModerator = false;
    if (group?.getScope() == CometChatUIKitConstants.groupMemberScope.moderator)
      _isModerator = true;

    const messageOptionList: Array<CometChatActionsIcon> = [];

    if (_isSentByMe == true || _isModerator == true)
      messageOptionList.push(this.getDeleteOption(theme));
    if (!messageObject.getParentMessageId()) {
      messageOptionList.push(this.getReplyInThreadOption(theme));
    }
    return messageOptionList;
  }

  getAllMessageTypes(): Array<string> {
    return [
      CometChatUIKitConstants.MessageTypes.text,
      CometChatUIKitConstants.MessageTypes.image,
      CometChatUIKitConstants.MessageTypes.audio,
      CometChatUIKitConstants.MessageTypes.video,
      CometChatUIKitConstants.MessageTypes.file,
      CometChatUIKitConstants.MessageTypes.groupMember,
    ];
  }

  addList(): string {
    return "<Message Utils>";
  }

  getAllMessageCategories(): Array<string> {
    return [
      CometChatUIKitConstants.MessageCategory.message,
      CometChatUIKitConstants.MessageCategory.action,
    ];
  }

  getAuxiliaryOptions(
    id: Map<string, any>,
    user?: CometChat.User,
    group?: CometChat.Group,
    theme?: CometChatTheme
  ): any {
    return [];
  }

  getId(): string {
    return "messageUtils";
  }

  getTextMessageContentView(
    message: CometChat.TextMessage,
    _alignment: MessageBubbleAlignment,
    theme: CometChatTheme
  ) {
    return ChatConfigurator.getDataSource().getTextMessageBubble(
      message.getText(),
      message,
      _alignment,
      theme
    );
  }

  getAudioMessageContentView(
    message: CometChat.MediaMessage,
    _alignment: MessageBubbleAlignment,
    theme: CometChatTheme
  ): any {
    return ChatConfigurator.getDataSource().getAudioMessageBubble(
      message?.getAttachments()[0]?.getUrl(),
      message,
      theme,
      message?.getAttachments()[0]?.getName()
    );
  }

  getFileMessageContentView(
    message: CometChat.MediaMessage,
    _alignment: MessageBubbleAlignment,
    theme: CometChatTheme
  ): any {
    return ChatConfigurator.getDataSource().getFileMessageBubble(
      message?.getAttachments()[0]?.getUrl(),
      message,
      theme,
      message?.getAttachments()[0]?.getName()
    );
  }

  getImageMessageContentView(
    message: CometChat.MediaMessage,
    _alignment: MessageBubbleAlignment,
    theme: CometChatTheme
  ): any {
    return ChatConfigurator.getDataSource().getImageMessageBubble(
      message?.getAttachments()[0]?.getUrl(),
      placeHolderImage,
      message,
      theme
    );
  }

  getVideoMessageContentView(
    message: CometChat.MediaMessage,
    _alignment: MessageBubbleAlignment,
    theme: CometChatTheme
  ): any {
    return ChatConfigurator.getDataSource().getVideoMessageBubble(
      message?.getAttachments()[0]?.getUrl(),
      message,
      theme
    );
  }

  getActionMessage(message: any): string {
    let actionMessage = "";
    if (
      Object.prototype.hasOwnProperty.call(message, "actionBy") == false ||
      Object.prototype.hasOwnProperty.call(message, "actionOn") == false
    ) {
      return actionMessage;
    }
    if (
      message.action !== CometChatUIKitConstants.groupMemberAction.JOINED &&
      message.action !== CometChatUIKitConstants.groupMemberAction.LEFT &&
      (Object.prototype.hasOwnProperty.call(message.actionBy, "name") ==
        false ||
        Object.prototype.hasOwnProperty.call(message.actionOn, "name") == false)
    ) {
      return actionMessage;
    }
    if (
      message.action === CometChatUIKitConstants.groupMemberAction.SCOPE_CHANGE
    ) {
      if (
        Object.prototype.hasOwnProperty.call(message, "data") &&
        Object.prototype.hasOwnProperty.call(message.data, "extras")
      ) {
        if (
          Object.prototype.hasOwnProperty.call(message.data.extras, "scope")
        ) {
          if (
            Object.prototype.hasOwnProperty.call(
              message.data.extras.scope,
              "new"
            ) === false
          ) {
            return actionMessage;
          }
        } else {
          return actionMessage;
        }
      } else {
        return actionMessage;
      }
    }
    if (
      message.action ===
        CometChatUIKitConstants.groupMemberAction.SCOPE_CHANGE &&
      Object.prototype.hasOwnProperty.call(message.data.extras, "scope") ===
        false
    ) {
      return actionMessage;
    }
    if (
      message.action ===
        CometChatUIKitConstants.groupMemberAction.SCOPE_CHANGE &&
      Object.prototype.hasOwnProperty.call(message.data.extras.scope, "new") ===
        false
    ) {
      return actionMessage;
    }
    const byEntity = message.actionBy;
    const onEntity = message.actionOn;
    const byString = byEntity.name;
    const forString =
      message.action !== CometChatUIKitConstants.groupMemberAction.JOINED &&
      message.action !== CometChatUIKitConstants.groupMemberAction.LEFT
        ? onEntity.name
        : "";
    switch (message.action) {
      case CometChatUIKitConstants.groupMemberAction.ADDED:
        actionMessage = `${byString} ${localize("ADDED")} ${forString}`;
        break;
      case CometChatUIKitConstants.groupMemberAction.JOINED:
        actionMessage = `${byString} ${localize("JOINED")}`;
        break;
      case CometChatUIKitConstants.groupMemberAction.LEFT:
        actionMessage = `${byString} ${localize("LEFT")}`;
        break;
      case CometChatUIKitConstants.groupMemberAction.KICKED:
        actionMessage = `${byString} ${localize("KICKED")} ${forString}`;
        break;
      case CometChatUIKitConstants.groupMemberAction.BANNED:
        actionMessage = `${byString} ${localize("BANNED")} ${forString}`;
        break;
      case CometChatUIKitConstants.groupMemberAction.UNBANNED:
        actionMessage = `${byString} ${localize("UNBANNED")} ${forString}`;
        break;
      case CometChatUIKitConstants.groupMemberAction.SCOPE_CHANGE: {
        const newScope = message["data"]["extras"]["scope"]["new"];
        actionMessage = `${byString} ${localize(
          "MADE"
        )} ${forString} ${newScope}`;
        break;
      }
      default:
        break;
    }
    return actionMessage;
  }

  getDeleteMessageBubble(
    message: CometChat.BaseMessage,
    theme: CometChatTheme,
    style?: TextBubbleStyle
  ) {
    let defaultStyle;
    const messageText = localize("MESSAGE_IS_DELETED");
    if (!style) {
      defaultStyle = {
        textFont: fontHelper(theme.typography.text2),
        textColor: theme.palette.getAccent400(),
      };
    }

    return {
      componentName: "CometChatTextBubble",
      props: {
        text: messageText,
        textStyle: style ? style : defaultStyle,
      },
    };
  }

  getGroupActionBubble(
    message: CometChat.BaseMessage,
    theme: CometChatTheme,
    style?: TextBubbleStyle
  ) {
    let defaultStyle;
    const messageText = this.getActionMessage(message);
    if (!style) {
      defaultStyle = {
        textFont: fontHelper(theme.typography.subtitle2),
        textColor: theme.palette.getAccent(),
      };
    }

    return {
      componentName: "CometChatTextBubble",
      props: {
        text: messageText,
        textStyle: style ? style : defaultStyle,
      },
    };
  }

  getTextMessageBubbleStyle(
    alignment: MessageBubbleAlignment,
    theme: CometChatTheme
  ) {
    const isLeftAligned = alignment !== MessageBubbleAlignment.left;

    if (isLeftAligned) {
      return {
        textFont: fontHelper(theme.typography.text3),
        textColor: theme.palette.getAccent900(),
      };
    } else {
      return {
        textFont: fontHelper(theme.typography.text3),
        textColor: theme.palette.getAccent(),
      };
    }
  }

  getTextMessageBubble(
    messageText: string,
    message: CometChat.TextMessage,
    alignment: MessageBubbleAlignment,
    theme: CometChatTheme,
    style?: TextBubbleStyle
  ): any {
    let defaultStyle: any = style;
    if (!defaultStyle) {
      defaultStyle = this.getTextMessageBubbleStyle(alignment, theme);
    }

    return {
      componentName: "CometChatTextBubble",
      props: {
        text: messageText,
        textStyle: defaultStyle,
      },
    };
  }

  getAudioMessageBubble(
    audioUrl: string,
    message: CometChat.MediaMessage,
    theme: CometChatTheme,
    title?: string,
    style?: BaseStyle
  ): any {
    return {
      componentName: "CometChatAudioBubble",
      props: {
        src: audioUrl,
        audioStyle: style,
      },
    };
  }

  getFileMessageBubble(
    fileUrl: string,
    message: CometChat.MediaMessage,
    theme: CometChatTheme,
    title?: string,
    style?: FileBubbleStyle
  ): any {
    return {
      componentName: "CometChatFileBubble",
      props: {
        downloadIconURL: downloadIcon,
        subtitle: localize("SHARED_FILE"),
        title: title,
        fileURL: fileUrl,
      },
    };
  }

  getImageMessageBubble(
    imageUrl: string,
    placeholderImage: string,
    message: CometChat.MediaMessage,
    theme: CometChatTheme,
    // eslint-disable-next-line
    onClick?: Function,
    style?: ImageBubbleStyle
  ) {
    return {
      componentName: "CometChatImageBubble",
      props: {
        src: imageUrl,
        placeholderImage: placeholderImage,
        message: message,
      },
    };
  }

  getVideoMessageBubble(
    videoUrl: string,
    message: CometChat.MediaMessage,
    theme: CometChatTheme,
    thumbnailUrl?: string,
    // eslint-disable-next-line
    onClick?: Function,
    style?: BaseStyle
  ): any {
    if (!style) {
      style = {
        height: "130px",
        width: "230px",
        border: "none",
        borderRadius: "8px",
        background: "transparent",
      };
    }

    return {
      componentName: "CometChatVideoBubble",
      props: {
        src: videoUrl,
        videoStyle: style,
        poster: thumbnailUrl,
      },
    };
  }

  imageAttachmentOption(theme: CometChatTheme): CometChatMessageComposerAction {
    return new CometChatMessageComposerAction({
      id: CometChatUIKitConstants.MessageTypes.image,
      title: localize("ATTACH_IMAGE"),
      iconURL: imageIcon,
      onClick: undefined,
      iconTint: theme.palette.getAccent700(),
      titleFont: fontHelper(theme.typography.subtitle1),
      titleColor: theme.palette.getAccent700(),
      borderRadius: "8px",
      background: theme.palette.getAccent100(),
    });
  }

  videoAttachmentOption(theme: CometChatTheme): CometChatMessageComposerAction {
    return new CometChatMessageComposerAction({
      id: CometChatUIKitConstants.MessageTypes.video,
      title: localize("ATTACH_VIDEO"),
      iconURL: videoIcon,
      onClick: undefined,
      iconTint: theme.palette.getAccent700(),
      titleFont: fontHelper(theme.typography.subtitle1),
      titleColor: theme.palette.getAccent700(),
      borderRadius: "8px",
      background: theme.palette.getAccent100(),
    });
  }

  audioAttachmentOption(theme: CometChatTheme): CometChatMessageComposerAction {
    return new CometChatMessageComposerAction({
      id: CometChatUIKitConstants.MessageTypes.audio,
      title: localize("ATTACH_AUDIO"),
      iconURL: audioIcon,
      onClick: undefined,
      iconTint: theme.palette.getAccent700(),
      titleFont: fontHelper(theme.typography.subtitle1),
      titleColor: theme.palette.getAccent700(),
      borderRadius: "8px",
      background: theme.palette.getAccent100(),
    });
  }

  fileAttachmentOption(theme: CometChatTheme): CometChatMessageComposerAction {
    return new CometChatMessageComposerAction({
      id: CometChatUIKitConstants.MessageTypes.file,
      title: localize("ATTACH_FILE"),
      iconURL: fileIcon,
      onClick: undefined,
      iconTint: theme.palette.getAccent700(),
      titleFont: fontHelper(theme.typography.subtitle1),
      titleColor: theme.palette.getAccent700(),
      borderRadius: "8px",
      background: theme.palette.getAccent100(),
    });
  }

  getAttachmentOptions(
    theme: CometChatTheme,
    id?: Map<string, any>
  ): Array<CometChatMessageComposerAction> {
    const actions: Array<CometChatMessageComposerAction> = [
      this.imageAttachmentOption(theme),
      this.videoAttachmentOption(theme),
      this.audioAttachmentOption(theme),
      this.fileAttachmentOption(theme),
    ];

    return actions;
  }

  getLastConversationMessage(
    conversation: CometChat.Conversation,
    loggedInUser: CometChat.User
  ): string {
    return ConversationUtils.getLastConversationMessage(
      conversation,
      loggedInUser
    );
  }

  getDefaultDetailsTemplate(
    loggedInUser: CometChat.User,
    user: CometChat.User | null,
    group: CometChat.Group | null,
    theme: CometChatTheme
  ): CometChatDetailsTemplate[] {
    return DetailsUtils.getDefaultDetailsTemplate(
      loggedInUser,
      user,
      group,
      theme
    );
  }

  getAuxiliaryHeaderMenu(user: CometChat.User, group: CometChat.Group): any {
    return [];
  }
}
