import { DataSource } from "../../shared/Framework/DataSource";
import { DataSourceDecorator } from "../../shared/Framework/DataSourceDecorator";
import { CometChat } from "@cometchat-pro/chat";
import {
  CometChatMessageEvents,
  CometChatTheme,
  CometChatUIEvents,
  CometChatUIKitConstants,
  fontHelper,
  MessageStatus,
} from "uikit-resources-lerna";
import { IActiveChatChanged } from "uikit-resources-lerna";
import {
  CometChatUIKitUtility,
  SmartRepliesConstants,
  MessageBubbleAlignment,
} from "uikit-utils-lerna";
import { SmartRepliesConfiguration } from "./SmartRepliesConfiguration";

export class SmartReplyExtensionDecorator extends DataSourceDecorator {
  public configuration?: SmartRepliesConfiguration;
  private LISTENER_ID = "smartreply__listener";
  private activeUser!: CometChat.User;
  private activeGroup!: CometChat.Group;
  public currentMessage: CometChat.BaseMessage | null = null;
  public loggedInUser!: CometChat.User | null;
  public theme?: CometChatTheme;

  constructor(
    dataSource: DataSource,
    configuration: SmartRepliesConfiguration = new SmartRepliesConfiguration({
      style: {},
    }),
    theme: CometChatTheme | undefined
  ) {
    super(dataSource);
    this.configuration = configuration;
    this.theme = theme;
    this.addMessageListener();
  }

  override getId(): string {
    return "smartreply";
  }

  private addMessageListener(): void {
    CometChat.getLoggedinUser().then((user: CometChat.User | null) => {
      if (user) {
        this.loggedInUser = user;
      }
    });
    CometChat.addMessageListener(this.LISTENER_ID, {
      onTextMessageReceived: (textMessage: CometChat.TextMessage) => {
        if (textMessage != null) {
          this.currentMessage = textMessage;
          if (
            textMessage.getReceiverType() ===
              CometChatUIKitConstants.MessageReceiverType.user &&
            this.activeUser != null
          ) {
            if (
              textMessage.getSender() != null &&
              textMessage.getSender().getUid() != null &&
              this.activeUser.getUid() == textMessage.getSender().getUid()
            ) {
              CometChatUIEvents.ccShowPanel.next({
                configuration: this.configuration!,
                message: textMessage,
                child: this.getSmartReplyView(textMessage),
              });
            }
          } else if (
            textMessage.getReceiverType() ===
              CometChatUIKitConstants.MessageReceiverType.group &&
            this.activeGroup != null
          ) {
            if (
              this.activeGroup.getGuid() != null &&
              this.activeGroup.getGuid() == textMessage.getReceiverId()
            ) {
              CometChatUIEvents.ccShowPanel.next({
                configuration: this.configuration!,
                message: textMessage,
                child: this.getSmartReplyView(textMessage),
              });
            }
          }
        }
      },
    });
    CometChatUIEvents.ccActiveChatChanged.subscribe(
      (data: IActiveChatChanged) => {
        this.currentMessage = data.message!;
        this.activeUser = data.user!;
        this.activeGroup = data.group!;

        if (
          this.currentMessage instanceof CometChat.TextMessage &&
          this.currentMessage != null &&
          this.currentMessage.getSender() != null &&
          this.loggedInUser != null &&
          this.currentMessage.getSender().getUid() != null &&
          this.currentMessage.getSender().getUid() != this.loggedInUser.getUid()
        ) {
          CometChatUIEvents.ccShowPanel.next({
            configuration: this.configuration!,
            message: this.currentMessage!,
            child: this.getSmartReplyView(this.currentMessage),
          });
        }
      }
    );
    CometChatMessageEvents.ccMessageSent.subscribe(() => {
      CometChatUIEvents.ccHidePanel.next();
      this.currentMessage = null;
    });
  }

  getReplies(message: CometChat.TextMessage) {
    const smartReply: any = message;
    const smartReplyObject =
      smartReply?.metadata?.[SmartRepliesConstants.injected]?.extensions?.[
        SmartRepliesConstants.smart_reply
      ];
    if (
      smartReplyObject?.reply_positive &&
      smartReplyObject?.reply_neutral &&
      smartReplyObject?.reply_negative
    ) {
      const { reply_positive, reply_neutral, reply_negative } =
        smartReplyObject;
      return [reply_positive, reply_neutral, reply_negative];
    }
    return null;
  }

  getSmartReplyStyle() {
    return {
      replyTextFont:
        this.configuration?.getSmartRepliesStyle()?.replyTextFont ||
        fontHelper(this.theme!.typography.caption1),
      replyTextColor:
        this.configuration?.getSmartRepliesStyle()?.replyTextColor ||
        this.theme!.palette.getAccent(),
      replyBackground:
        this.configuration?.getSmartRepliesStyle()?.replyBackground ||
        this.theme!.palette.getBackground(),
      boxShadow:
        this.configuration?.getSmartRepliesStyle()?.boxShadow ||
        `0px 0px 1px ${this.theme!.palette.getAccent600()}`,
      closeIconTint:
        this.configuration?.getSmartRepliesStyle()?.closeIconTint ||
        this.theme!.palette.getAccent600(),
      background:
        this.configuration?.getSmartRepliesStyle()?.background ||
        this.theme!.palette.getBackground(),
      width: this.configuration?.getSmartRepliesStyle()?.width,
      height: this.configuration?.getSmartRepliesStyle()?.height,
      border: this.configuration?.getSmartRepliesStyle()?.border,

      display: "flex",
      justifyContent: "flex-start",
    };
  }

  sendSmartReply(_event: any) {
    const receiverType: string = this.activeUser
      ? CometChatUIKitConstants.MessageReceiverType.user
      : CometChatUIKitConstants.MessageReceiverType.group;
    const reply = _event?.detail?.reply;
    const _message = this.currentMessage;
    if (reply && reply.trim().length > 0 && _message) {
      let newMessage: CometChat.TextMessage;
      if (
        _message.getReceiverType() ===
        CometChatUIKitConstants.MessageReceiverType.user
      ) {
        newMessage = new CometChat.TextMessage(
          _message.getSender().getUid(),
          reply.trim(),
          receiverType
        );
        newMessage.setReceiver(this.activeUser);
      } else {
        const group: CometChat.Group =
          _message.getReceiver() as CometChat.Group;
        newMessage = new CometChat.TextMessage(
          group.getGuid(),
          reply.trim(),
          receiverType
        );
        newMessage.setReceiver(this.activeGroup);
      }
      if (_message.getParentMessageId() > 0) {
        newMessage.setParentMessageId(_message.getParentMessageId());
      }
      newMessage.setCategory(
        CometChatUIKitConstants.MessageCategory
          .message as CometChat.MessageCategory
      );
      newMessage.setSender(this.loggedInUser!);
      newMessage.setSentAt(CometChatUIKitUtility.getUnixTimestamp());
      newMessage.setMuid(CometChatUIKitUtility.ID());
      CometChatMessageEvents.ccMessageSent.next({
        message: newMessage,
        status: MessageStatus.inprogress,
      });
      CometChat.sendMessage(newMessage).then(
        (message: CometChat.BaseMessage) => {
          CometChatMessageEvents.ccMessageSent.next({
            message: message,
            status: MessageStatus.success,
          });
        },
        (error: CometChat.CometChatException) => {
          newMessage.setMetadata({ error: true });
          CometChatMessageEvents.ccMessageSent.next({
            message: newMessage,
            status: MessageStatus.error,
          });
        }
      );
    }
  }

  closeSmartReply() {
    CometChatUIEvents.ccHidePanel.next();
    this.currentMessage = null;
  }

  getSmartReplyView(message: CometChat.TextMessage) {
    if (!this.getReplies(message)) {
      return null;
    }
    return {
      componentName: "CometChatSmartReplyBubble",
      props: {
        smartReplyStyle: this.getSmartReplyStyle(),
        replies: this.getReplies(message),
        listeners: {
          "cc-reply-clicked": (e: any) => {
            e["msg"] = message;
            this.sendSmartReply(e);
          },
          "cc-close-clicked": this.closeSmartReply.bind(this),
        },
      },
    };
  }
}
