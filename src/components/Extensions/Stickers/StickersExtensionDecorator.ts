import {
  CometChatUIKitConstants,
  CometChatMessageTemplate,
  CometChatTheme,
  localize,
  MessageBubbleAlignment,
  Placement,
  fontHelper,
  CometChatMessageEvents,
  MessageStatus,
} from "uikit-resources-lerna";
import { CometChat } from "@cometchat-pro/chat";
import { StickersConstants, CometChatUIKitUtility } from "uikit-utils-lerna";
import { StickerIcon, PlusRotatedIcon } from "../../../assets";
import { PopoverStyle } from "my-cstom-package-lit";
import { DataSourceDecorator } from "../../shared/Framework/DataSourceDecorator";
import { DataSource } from "../../shared/Framework/DataSource";
import { StickerConfiguration } from "./StickersConfiguration";

export class StickersExtensionDecorator extends DataSourceDecorator {
  public configuration?: StickerConfiguration;
  public newDataSource!: DataSource;

  public theme?: CometChatTheme = new CometChatTheme({});
  private id: any;
  private user: any;
  private group: any;

  constructor(
    dataSource: DataSource,
    { configuration }: { configuration: StickerConfiguration }
  ) {
    super(dataSource);
    this.newDataSource = dataSource;
    this.configuration = configuration;
  }

  getDataSource() {
    return this.newDataSource;
  }

  override getAllMessageTemplates(
    _theme?: CometChatTheme
  ): CometChatMessageTemplate[] {
    const theme = _theme ?? new CometChatTheme({});
    this.theme = theme;
    const template: CometChatMessageTemplate[] = super.getAllMessageTemplates(
      theme
    );
    if (!this.checkIfTemplateExist(template, StickersConstants.sticker)) {
      template.push(this.getStickerTemplate(theme));
      return template;
    }
    return template;
  }

  override getAuxiliaryOptions(
    id: Map<string, any>,
    user?: CometChat.User,
    group?: CometChat.Group,
    theme?: CometChatTheme
  ) {
    this.id = id;
    this.user = user;
    this.group = group;
    this.theme = theme;

    const auxiliaryOptions = super.getAuxiliaryOptions(id, user, group, theme);
    auxiliaryOptions.push(
      this.getStickerAuxiliaryButton(id, user, group, theme)
    );
    return auxiliaryOptions;
  }

  getStickerAuxiliaryButton(
    id: Map<string, any>,
    user?: CometChat.User,
    group?: CometChat.Group,
    theme?: CometChatTheme
  ) {
    const configurationStickersStyle = this.configuration?.getStickersStyle();

    const emojiButtonStyle: any = {
      height: "24px",
      width: "24px",
      border: "none",
      borderRadius: "0",
      buttonIconTint: "grey",
      background: "transparent",
    };

    const style = new PopoverStyle({
      width: "272px",
      height: "400px",
      background: theme!.palette.getBackground(),
      borderRadius: "12px",
      boxShadow:
        "0px 0px 0px 1px rgba(20, 20, 20, 0.04), 0px 16px 32px 0px rgba(20, 20, 20, 0.2)",
    });

    const stickerKeyboardStyle = {
      width: configurationStickersStyle?.width || "300px",
      height: configurationStickersStyle?.height || "400px",
      border: configurationStickersStyle?.border || "none",
      emptyStateTextFont:
        configurationStickersStyle?.emptyStateTextFont ||
        fontHelper(theme!.typography.title1),
      emptyStateTextColor:
        configurationStickersStyle?.emptyStateTextColor ||
        theme!.palette.getAccent600(),
      errorStateTextFont:
        configurationStickersStyle?.errorStateTextFont ||
        fontHelper(theme!.typography.title1),
      errorStateTextColor:
        configurationStickersStyle?.errorStateTextColor ||
        theme!.palette.getAccent600(),
      loadingIconTint:
        configurationStickersStyle?.loadingIconTint ||
        theme!.palette.getAccent600(),
      background:
        configurationStickersStyle?.background ||
        theme!.palette.getBackground(),
      borderRadius: configurationStickersStyle?.borderRadius || "12px",
    };

    const openIconURL = this.configuration?.getStickerIconURL() || StickerIcon;
    const closeIconURL =
      this.configuration?.getCloseIconURL() || PlusRotatedIcon;

    return {
      componentName: "CometChatStickersAuxiliaryButton",
      props: {
        placement: Placement.top,
        popoverStyle: style,
        openIconURL: openIconURL,
        closeIconURL: closeIconURL,
        emojiButtonStyle: emojiButtonStyle,
        stickerKeyboardStyle: stickerKeyboardStyle,

        stickerKeyboardListeners: {
          "cc-sticker-clicked": (e: any) => this.sendSticker(e),
        },
      },
    };
  }

  sendSticker(event: any) {
    try {
      const details = event?.detail;
      const sticker = {
        name: details?.stickerName,
        URL: details?.stickerURL,
      };
      const receiverId: string = this.user?.getUid() || this.group?.getGuid();
      const receiverType: string = this.user
        ? CometChatUIKitConstants.MessageReceiverType.user
        : CometChatUIKitConstants.MessageReceiverType.group;
      const { parentMessageId } = this.id;

      const customData = {
        sticker_url: sticker.URL,
        sticker_name: sticker.name,
      };

      const customType = StickersConstants.sticker;

      const customMessage: CometChat.CustomMessage =
        new CometChat.CustomMessage(
          receiverId,
          receiverType,
          customType,
          customData
        );

      if (parentMessageId) {
        customMessage.setParentMessageId(parentMessageId);
      }

      customMessage.setMetadata({ incrementUnreadCount: true });

      (customMessage as any).setSentAt(
        CometChatUIKitUtility.getUnixTimestamp()
      );

      customMessage.setMuid(CometChatUIKitUtility.ID());

      CometChatMessageEvents.ccMessageSent.next({
        message: customMessage,
        status: MessageStatus.inprogress,
      });

      CometChat.sendCustomMessage(customMessage).then(
        (message) => {
          CometChatMessageEvents.ccMessageSent.next({
            message: message,
            status: MessageStatus.success,
          });
        },
        (error) => {
          customMessage.setMetadata({ error: true });
          CometChatMessageEvents.ccMessageSent.next({
            message: customMessage,
            status: MessageStatus.error,
          });
        }
      );
    } catch (error: any) {
      console.log("error in sending sticker", error);
    }
  }

  getSticker(message: CometChat.CustomMessage) {
    let stickerData: any;
    if (
      CometChatUIKitUtility.checkHasOwnProperty(
        message,
        StickersConstants.data
      ) &&
      CometChatUIKitUtility.checkHasOwnProperty(
        (message as CometChat.CustomMessage).getData(),
        StickersConstants.custom_data
      )
    ) {
      stickerData = message.getCustomData();
      if (
        CometChatUIKitUtility.checkHasOwnProperty(
          stickerData,
          StickersConstants.sticker_url
        )
      ) {
        return stickerData?.sticker_url;
      } else {
        return "";
      }
    } else {
      return "";
    }
  }

  getStickerMessageContentView(
    stickerMessage: CometChat.CustomMessage,
    _theme: CometChatTheme
  ) {
    const imageBubbleStyle: any = {
      height: "128px",
      width: "128px",
      border: "none",
      borderRadius: "0",
      background: "transparent",
    };
    return `<cometchat-image-bubble src='${this.getSticker(
      stickerMessage
    )}' imageStyle='${JSON.stringify(
      imageBubbleStyle
    )}'></cometchat-image-bubble>`;
  }

  getStickerTemplate(_theme: CometChatTheme): CometChatMessageTemplate {
    return new CometChatMessageTemplate({
      type: StickersConstants.sticker,
      category: CometChatUIKitConstants.MessageCategory.custom,
      contentView: (
        message: CometChat.BaseMessage,
        _alignment: MessageBubbleAlignment
      ) => {
        const stickerMessage: CometChat.CustomMessage =
          message as CometChat.CustomMessage;
        if (stickerMessage.getDeletedAt()) {
          return super.getDeleteMessageBubble(stickerMessage, _theme);
        }
        return this.getStickerMessageContentView(stickerMessage, _theme);
      },
      bottomView: (
        _message: CometChat.BaseMessage,
        _alignment: MessageBubbleAlignment
      ) => {
        return super.getBottomView(_message, _alignment);
      },
      options: (
        loggedInUser: CometChat.User,
        messageObject: CometChat.BaseMessage,
        theme: CometChatTheme,
        group?: CometChat.Group
      ) => {
        return super.getCommonOptions(
          loggedInUser,
          messageObject,
          theme,
          group
        );
      },
    });
  }

  checkIfTemplateExist(
    template: CometChatMessageTemplate[],
    type: string
  ): boolean {
    return template.some((obj) => obj.type === type);
  }

  override getAllMessageCategories(): string[] {
    const categories: string[] = super.getAllMessageCategories();
    if (
      !categories.some(
        (category) =>
          category === CometChatUIKitConstants.MessageCategory.custom
      )
    ) {
      categories.push(CometChatUIKitConstants.MessageCategory.custom);
    }
    return categories;
  }

  override getAllMessageTypes(): string[] {
    const types: string[] = super.getAllMessageTypes();
    if (!types.some((type) => type === StickersConstants.sticker)) {
      types.push(StickersConstants.sticker);
    }
    return types;
  }

  override getId(): string {
    return "stickers";
  }

  override getLastConversationMessage(
    conversation: CometChat.Conversation,
    loggedInUser: CometChat.User
  ): string {
    const message: CometChat.BaseMessage | undefined =
      conversation.getLastMessage();
    if (
      message != null &&
      message.getType() == StickersConstants.sticker &&
      message.getCategory() == CometChatUIKitConstants.MessageCategory.custom
    ) {
      return localize("CUSTOM_MESSAGE_STICKER");
    } else {
      return super.getLastConversationMessage(conversation, loggedInUser);
    }
  }
}
