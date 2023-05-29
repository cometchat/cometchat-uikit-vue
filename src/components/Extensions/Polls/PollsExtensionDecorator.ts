import { DataSource } from "../../shared/Framework/DataSource";
import { DataSourceDecorator } from "../../shared/Framework/DataSourceDecorator";
import { CometChat } from "@cometchat-pro/chat";
import {
  CometChatUIKitConstants,
  CometChatMessageTemplate,
  CometChatTheme,
  CometChatMessageComposerAction,
  localize,
  fontHelper,
  MessageBubbleAlignment,
  CometChatUIEvents,
} from "uikit-resources-lerna";
import { PollsConstants, CreatePollStyle } from "uikit-utils-lerna";
import { PollsIcon } from "../../../assets";

import { PollsConfiguration } from "./PollsConfiguration";

export class PollsExtensionDecorator extends DataSourceDecorator {
  public theme: CometChatTheme = new CometChatTheme({});
  private loggedInUser: CometChat.User | null = null;
  public configuration?: PollsConfiguration;
  public newDataSource!: DataSource;

  constructor(
    dataSource: DataSource,
    { configuration }: { configuration?: PollsConfiguration }
  ) {
    super(dataSource);
    this.getLoggedInUser();
    this.newDataSource = dataSource;
    this.configuration = configuration;
  }

  async getLoggedInUser() {
    this.loggedInUser = await CometChat.getLoggedinUser();
  }

  override getId(): string {
    return "polls";
  }

  override getAllMessageTypes(): string[] {
    const types = super.getAllMessageTypes();
    if (!types.includes(PollsConstants.extension_poll)) {
      types.push(PollsConstants.extension_poll);
    }
    return types;
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
    if (!this.checkIfTemplateExist(templates, PollsConstants.extension_poll)) {
      templates.push(this.getPollsTemplate(theme));
    }
    return templates;
  }

  getPollsTemplate(_theme: CometChatTheme): CometChatMessageTemplate {
    return new CometChatMessageTemplate({
      type: PollsConstants.extension_poll,
      category: CometChatUIKitConstants.MessageCategory.custom,
      contentView: (
        message: CometChat.BaseMessage,
        _alignment: MessageBubbleAlignment
      ) => {
        const pollsMessage: CometChat.CustomMessage =
          message as CometChat.CustomMessage;
        if (pollsMessage.getDeletedAt()) {
          return super.getDeleteMessageBubble(pollsMessage, _theme);
        }
        return this.getPollsContentView(pollsMessage, _theme);
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

  getPollsContentView(
    message: CometChat.CustomMessage,
    _theme: CometChatTheme
  ) {
    const configurationPollsBubbleStyle =
      this.configuration?.getPollsBubbleStyle();
    const pollBubbleStyle = {
      borderRadius: configurationPollsBubbleStyle?.borderRadius || "8px",
      background: configurationPollsBubbleStyle?.background || "transparent",
      votePercentTextFont:
        configurationPollsBubbleStyle?.votePercentTextFont ||
        fontHelper(_theme.typography.subtitle2),
      votePercentTextColor:
        configurationPollsBubbleStyle?.votePercentTextColor ||
        _theme.palette.getAccent600(),
      pollQuestionTextFont:
        configurationPollsBubbleStyle?.pollQuestionTextFont ||
        fontHelper(_theme.typography.subtitle1),
      pollQuestionTextColor:
        configurationPollsBubbleStyle?.pollQuestionTextColor ||
        _theme.palette.getAccent(),
      pollOptionTextFont:
        configurationPollsBubbleStyle?.pollOptionTextFont ||
        fontHelper(_theme.typography.text2),
      pollOptionTextColor:
        configurationPollsBubbleStyle?.pollOptionTextColor ||
        _theme.palette.getAccent(),
      pollOptionBackground:
        configurationPollsBubbleStyle?.pollOptionBackground ||
        _theme.palette.getAccent900(),
      optionsIconTint:
        configurationPollsBubbleStyle?.optionsIconTint ||
        _theme.palette.getAccent600(),
      totalVoteCountTextFont:
        configurationPollsBubbleStyle?.totalVoteCountTextFont ||
        fontHelper(_theme.typography.subtitle2),
      totalVoteCountTextColor:
        configurationPollsBubbleStyle?.totalVoteCountTextColor ||
        _theme.palette.getAccent600(),
      selectedPollOptionBackground:
        configurationPollsBubbleStyle?.selectedPollOptionBackground ||
        _theme.palette.getAccent200(),
      userSelectedOptionBackground:
        configurationPollsBubbleStyle?.userSelectedOptionBackground ||
        _theme.palette.getPrimary(),
      pollOptionBorder:
        configurationPollsBubbleStyle?.pollOptionBorder ||
        `1px solid ${_theme.palette.getAccent100()}`,
      pollOptionBorderRadius:
        configurationPollsBubbleStyle?.pollOptionBorderRadius || "8px",
    };

    return {
      componentName: "CometChatPollsBubble",
      props: {
        pollStyle: pollBubbleStyle,
        pollQuestion: this.getPollBubbleData(message, "question"),
        pollId: this.getPollBubbleData(message, "id"),
        senderUid: this.getPollBubbleData(message),
        loggedInUser: this.loggedInUser,
        metadata: message?.getMetadata(),
      },
    };
  }

  getPollBubbleData(message: CometChat.CustomMessage, key?: string) {
    const data: any = message.getCustomData();
    if (key) {
      if (key === "options") {
        return Object.values(data[key]);
      } else {
        return data[key];
      }
    } else {
      return message.getSender().getUid();
    }
  }

  override getAttachmentOptions(
    theme: CometChatTheme = new CometChatTheme({}),
    id?: any
  ) {
    if (!id?.parentMessageId) {
      const configurationOptionStyle = this.configuration?.getOptionStyle();
      const messageComposerActions: CometChatMessageComposerAction[] =
        super.getAttachmentOptions(theme, id);
      const newAction: CometChatMessageComposerAction =
        new CometChatMessageComposerAction({
          id: PollsConstants.extension_poll,
          title: localize("POLLS"),
          iconURL: this.configuration?.getOptionIconURL()
            ? this.configuration?.getOptionIconURL()
            : PollsIcon,
          iconTint:
            configurationOptionStyle?.iconTint || theme.palette.getAccent700(),
          titleColor:
            configurationOptionStyle?.titleColor ||
            theme.palette.getAccent600(),
          titleFont:
            configurationOptionStyle?.titleFont ||
            fontHelper(theme.typography.subtitle1),
          background:
            configurationOptionStyle?.background ||
            theme.palette.getAccent100(),
          onClick: this.onPollsButtonClicked.bind(this),
        });
      messageComposerActions.push(newAction);
      return messageComposerActions;
    } else {
      return super.getAttachmentOptions(theme, id);
    }
  }

  onPollsButtonClicked(...args: any) {
    console.log("THE ARGS: ", args.length);
    const [data] = args;
    const user = data[0];
    const group = data[1];
    const configurationCreatePollStyle =
      this.configuration?.getCreatePollStyle();
    const createPollStyle = {
      placeholderTextFont:
        configurationCreatePollStyle?.placeholderTextFont ||
        fontHelper(this.theme.typography.subtitle1),
      placeholderTextColor:
        configurationCreatePollStyle?.placeholderTextColor ||
        this.theme.palette.getAccent600(),
      deleteIconTint:
        configurationCreatePollStyle?.deleteIconTint ||
        this.theme.palette.getAccent600(),
      titleFont:
        configurationCreatePollStyle?.titleFont ||
        fontHelper(this.theme.typography.title1),
      titleColor:
        configurationCreatePollStyle?.titleColor ||
        this.theme.palette.getAccent(),
      closeIconTint:
        configurationCreatePollStyle?.closeIconTint ||
        this.theme.palette.getPrimary(),
      questionInputBackground:
        configurationCreatePollStyle?.questionInputBackground ||
        this.theme.palette.getAccent100(),
      optionInputBackground:
        configurationCreatePollStyle?.optionInputBackground ||
        this.theme.palette.getAccent100(),
      answerHelpTextFont:
        configurationCreatePollStyle?.answerHelpTextFont ||
        fontHelper(this.theme.typography.caption1),
      answerHelpTextColor:
        configurationCreatePollStyle?.answerHelpTextColor ||
        this.theme.palette.getAccent400(),
      addAnswerIconTint:
        configurationCreatePollStyle?.addAnswerIconTint ||
        this.theme.palette.getPrimary(),
      createPollButtonTextFont:
        configurationCreatePollStyle?.createPollButtonTextFont ||
        fontHelper(this.theme.typography.text2),
      createPollButtonTextColor:
        configurationCreatePollStyle?.createPollButtonTextColor ||
        this.theme.palette.getAccent("dark"),
      createPollButtonBackground:
        configurationCreatePollStyle?.createPollButtonBackground ||
        this.theme.palette.getPrimary(),
      addAnswerTextFont:
        configurationCreatePollStyle?.addAnswerTextFont ||
        fontHelper(this.theme.typography.text2),
      addAnswerTextColor:
        configurationCreatePollStyle?.addAnswerTextColor ||
        this.theme.palette.getPrimary(),
      errorTextFont:
        configurationCreatePollStyle?.errorTextFont ||
        fontHelper(this.theme.typography.subtitle1),
      errorTextColor:
        configurationCreatePollStyle?.errorTextColor ||
        this.theme.palette.getError(),
      optionPlaceholderTextFont:
        configurationCreatePollStyle?.optionPlaceholderTextFont ||
        fontHelper(this.theme.typography.subtitle1),
      optionPlaceholderTextColor:
        configurationCreatePollStyle?.optionPlaceholderTextColor ||
        this.theme.palette.getAccent600(),
      questionInputTextFont:
        configurationCreatePollStyle?.questionInputTextFont ||
        fontHelper(this.theme.typography.subtitle2),
      questionInputTextColor:
        configurationCreatePollStyle?.questionInputTextColor ||
        this.theme.palette.getAccent600(),
      optionInputTextFont:
        configurationCreatePollStyle?.optionInputTextFont ||
        fontHelper(this.theme.typography.subtitle2),
      optionInputTextColor:
        configurationCreatePollStyle?.optionInputTextColor ||
        this.theme.palette.getAccent600(),
      width: configurationCreatePollStyle?.width || "360px",
      height: configurationCreatePollStyle?.height || "620px",
      border: configurationCreatePollStyle?.border || "",
      borderRadius: configurationCreatePollStyle?.borderRadius || "8px",
      background:
        configurationCreatePollStyle?.background ||
        this.theme.palette.getAccent900(),
      position: "absolute",
      zIndex: 1,
    };
    CometChatUIEvents.ccShowModal.next({
      child: this.getPollView(user, group, createPollStyle),
    });
  }

  getPollView(
    user: CometChat.User,
    group: CometChat.Group,
    createPollStyle: CreatePollStyle
  ) {
    return {
      componentName: "CometChatCreatePollView",
      props: {
        user: user,
        group: group,
        createPollStyle: createPollStyle,
        deleteIconURL: this.configuration?.getDeleteIconURL() || "",
        closeIconURL: this.configuration?.getCloseIconURL() || "",
        addAnswerIconURL: this.configuration?.getAddAnswerIconURL() || "",
        listeners: {
          "cc-close-clicked": this.triggerCloseEvent,
        },
      },
    };
  }

  triggerCloseEvent() {
    CometChatUIEvents.ccHideModal.next();
  }

  override getLastConversationMessage(
    conversation: CometChat.Conversation,
    loggedInUser: CometChat.User
  ): string {
    const message: CometChat.BaseMessage | undefined =
      conversation.getLastMessage();
    if (
      message != null &&
      message.getType() == PollsConstants.extension_poll &&
      message.getCategory() == CometChatUIKitConstants.MessageCategory.custom
    ) {
      return localize("CUSTOM_MESSAGE_POLL");
    } else {
      return super.getLastConversationMessage(conversation, loggedInUser);
    }
  }
}
