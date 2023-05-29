import { CometChat } from "@cometchat-pro/chat";
import {
  CometChatTheme,
  CometChatMessageTemplate,
  CometChatMessageComposerAction,
  fontHelper,
  CometChatUIKitConstants,
  localize,
  DocumentIconAlignment,
  MessageBubbleAlignment,
} from "uikit-resources-lerna";
import {
  CollaborativeDocumentConstants,
  CometChatUIKitUtility,
} from "uikit-utils-lerna";
import { DocumentIcon } from "../../../assets";
import { DataSourceDecorator } from "../../shared/Framework/DataSourceDecorator";
import { DataSource } from "../../shared/Framework/DataSource";
import { CollaborativeDocumentConfiguration } from "./CollaborativeDocumentConfiguration";

export class CollaborativeDocumentExtensionDecorator extends DataSourceDecorator {
  public configuration: CollaborativeDocumentConfiguration;
  public newDataSource!: DataSource;
  public theme!: CometChatTheme;

  constructor(
    dataSource: DataSource,
    configuration: CollaborativeDocumentConfiguration = new CollaborativeDocumentConfiguration(
      { style: {}, iconURL: DocumentIcon, optionIconURL: "", optionStyle: {} }
    )
  ) {
    super(dataSource);
    this.newDataSource = dataSource;
    this.configuration = configuration!;
  }

  override getAllMessageTypes(): string[] {
    const types = super.getAllMessageTypes();
    if (!types.includes(CollaborativeDocumentConstants.extension_document)) {
      types.push(CollaborativeDocumentConstants.extension_document);
    }
    return types;
  }

  override getId(): string {
    return "collaborativedocument";
  }

  override getAllMessageCategories(): string[] {
    const categories = super.getAllMessageCategories();
    if (!categories.includes(CometChatUIKitConstants.MessageCategory.custom)) {
      categories.push(CometChatUIKitConstants.MessageCategory.custom);
    }
    return categories;
  }

  checkIfTemplateExist(
    template: CometChatMessageTemplate[],
    type: string
  ): boolean {
    return template.some((obj) => obj.type === type);
  }

  override getAllMessageTemplates(
    _theme: CometChatTheme
  ): CometChatMessageTemplate[] {
    const theme = _theme ?? new CometChatTheme({});
    this.theme = theme;
    const templates = super.getAllMessageTemplates(theme);
    if (
      !this.checkIfTemplateExist(
        templates,
        CollaborativeDocumentConstants.extension_document
      )
    ) {
      templates.push(this.getDocumentTemplate(theme));
    }
    return templates;
  }

  getDocumentTemplate(_theme: CometChatTheme): CometChatMessageTemplate {
    return new CometChatMessageTemplate({
      type: CollaborativeDocumentConstants.extension_document,
      category: CometChatUIKitConstants.MessageCategory.custom,
      contentView: (
        message: CometChat.BaseMessage,
        _alignment: MessageBubbleAlignment
      ) => {
        const documentMessage: CometChat.CustomMessage =
          message as CometChat.CustomMessage;
        if (documentMessage.getDeletedAt()) {
          return super.getDeleteMessageBubble(documentMessage, _theme);
        }
        return this.getDocumentContentView(documentMessage, _theme);
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

  getDocumentContentView(
    documentMessage: CometChat.CustomMessage,
    _theme: CometChatTheme
  ) {
    const documentBubbleAlignment: DocumentIconAlignment =
      DocumentIconAlignment.right;
    const documentBubbleStyle = {
      titleFont:
        this.configuration.getDocumentBubbleStyle()?.titleFont ||
        fontHelper(this.theme.typography.text2),
      titleColor:
        this.configuration.getDocumentBubbleStyle()?.titleColor ||
        this.theme.palette.getAccent(),
      subtitleFont:
        this.configuration.getDocumentBubbleStyle()?.subtitleFont ||
        fontHelper(this.theme.typography.subtitle2),
      subtitleColor:
        this.configuration.getDocumentBubbleStyle()?.subtitleColor ||
        this.theme.palette.getAccent600(),
      iconTint:
        this.configuration.getDocumentBubbleStyle()?.iconTint ||
        this.theme.palette.getAccent700(),
      buttonTextFont:
        this.configuration.getDocumentBubbleStyle()?.buttonTextFont ||
        fontHelper(this.theme.typography.text2),
      buttonTextColor:
        this.configuration.getDocumentBubbleStyle()?.buttonTextColor ||
        this.theme.palette.getPrimary(),
      buttonBackground:
        this.configuration.getDocumentBubbleStyle()?.buttonBackground ||
        "transparent",
      separatorColor:
        this.configuration.getDocumentBubbleStyle()?.separatorColor ||
        this.theme.palette.getAccent200(),
    };
    const documentURL = this.getDocumentURL(documentMessage);
    const documentTitle = localize("COLLABORATIVE_DOCUMENT");
    const documentButtonText = localize("OPEN_DOCUMENT");
    const documentSubitle = localize("DRAW_DOCUMENT_TOGETHER");

    return {
      componentName: "CometChatDocumentExtensionBubble",
      props: {
        iconURL: this.configuration.getIconURL(),
        title: documentTitle,
        URL: documentURL,
        subtitle: documentSubitle,
        buttonText: documentButtonText,
        documentStyle: documentBubbleStyle,
        hideSeparator: false,
        iconAlignment: documentBubbleAlignment,
        ccClicked: this.launchCollaborativeDocument,
      },
    };
  }

  launchCollaborativeDocument(documentURL: string) {
    window.open(documentURL, "", "fullscreen=yes, scrollbars=auto");
  }

  getDocumentURL(message: CometChat.CustomMessage) {
    try {
      if (message?.getData()) {
        const data: any = message.getData();
        if (data?.metadata) {
          const metadata = data?.metadata;
          if (
            CometChatUIKitUtility.checkHasOwnProperty(metadata, "@injected")
          ) {
            const injectedObject = metadata["@injected"];
            if (injectedObject?.extensions) {
              const extensionObject = injectedObject.extensions;
              return extensionObject[CollaborativeDocumentConstants.document]
                ? extensionObject[CollaborativeDocumentConstants.document]
                    .document_url
                : extensionObject[CollaborativeDocumentConstants.document]
                    .board_url;
            }
          }
        }
      }
    } catch (error: any) {
      // if (this.onError) {
      //     this.onError(error)
      // }
    }
  }

  override getAttachmentOptions(
    theme: CometChatTheme = new CometChatTheme({}),
    id?: any
  ) {
    if (!id?.parentMessageId) {
      const isUser = id?.user ? true : false;
      const receiverType: string = isUser
        ? CometChatUIKitConstants.MessageReceiverType.user
        : CometChatUIKitConstants.MessageReceiverType.group;
      const receiverId: string | undefined = isUser ? id.user : id.group;
      const messageComposerActions: CometChatMessageComposerAction[] =
        super.getAttachmentOptions(theme, id);
      const newAction: CometChatMessageComposerAction =
        new CometChatMessageComposerAction({
          id: CollaborativeDocumentConstants.document,
          title: localize("COLLABORATIVE_DOCUMENT"),
          iconURL: this.configuration.getIconURL(),
          iconTint:
            this.configuration.getOptionStyle()?.iconTint ||
            theme.palette.getAccent700(),
          titleColor:
            this.configuration.getOptionStyle()?.titleColor ||
            theme.palette.getAccent600(),
          titleFont:
            this.configuration.getOptionStyle()?.titleFont ||
            fontHelper(theme.typography.subtitle1),
          background:
            this.configuration.getOptionStyle()?.background ||
            theme.palette.getAccent100(),
          onClick: () => {
            CometChat.callExtension(
              CollaborativeDocumentConstants.document,
              CollaborativeDocumentConstants.post,
              CollaborativeDocumentConstants.v1_create,
              { receiver: receiverId, receiverType: receiverType }
            ).then(
              (res: any) => {
                //do nothing
              },
              (error) => {
                //do nothing
              }
            );
          },
        });
      messageComposerActions.push(newAction);
      return messageComposerActions;
    } else {
      return super.getAttachmentOptions(theme, id);
    }
  }

  override getLastConversationMessage(
    conversation: CometChat.Conversation,
    loggedInUser: CometChat.User
  ): string {
    const message: CometChat.BaseMessage | undefined =
      conversation.getLastMessage();
    if (
      message != null &&
      message.getType() == CollaborativeDocumentConstants.extension_document &&
      message.getCategory() == CometChatUIKitConstants.MessageCategory.custom
    ) {
      return localize("CUSTOM_MESSAGE_DOCUMENT");
    } else {
      return super.getLastConversationMessage(conversation, loggedInUser);
    }
  }
}
