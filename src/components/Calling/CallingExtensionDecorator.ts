import { CometChat } from "@cometchat-pro/chat";
import {
  CometChatUIKitConstants,
  CometChatMessageTemplate,
  CometChatTheme,
  localize,
  DocumentIconAlignment,
  fontHelper,
  CometChatUIEvents,
} from "uikit-resources-lerna";
import {
  MessageBubbleAlignment,
  CallingDetailsUtils,
  CallscreenStyle,
  CallButtonsStyle,
} from "uikit-utils-lerna";
import { VideoCall2xIcon, AudioCallIcon, VideoCallIcon } from "../../assets";

import { DataSourceDecorator } from "../shared/Framework/DataSourceDecorator";
import { DataSource } from "../shared/Framework/DataSource";
import { ChatConfigurator } from "../shared/Framework/ChatConfigurator";

const CallingConstants = Object.freeze({
  meeting: "meeting",
  ongoing: "ongoing",
  ended: "ended",
  initiated: "initiated",
  cancelled: "cancelled",
  rejected: "rejected",
  unanswered: "unanswered",
});

export class CallingExtensionDecorator extends DataSourceDecorator {
  public theme!: CometChatTheme;
  public loggedInUser!: CometChat.User | null;

  constructor(dataSource: DataSource) {
    super(dataSource);
    this.addLoginListener();
    this.getLoggedInUser();
  }

  addLoginListener() {
    const listenerID = "login_listener";
    CometChat.addLoginListener(
      listenerID,
      new CometChat.LoginListener({
        logoutSuccess: () => {
          try {
            const call: CometChat.Call = CometChat.getActiveCall();
            if (call) {
              CometChat.endCall(call.getSessionId());
            }
          } catch (error) {
            console.log("error in endCall on logout", error);
          }
        },
      })
    );
  }

  async getLoggedInUser() {
    this.loggedInUser = await CometChat.getLoggedinUser();
  }

  override getAllMessageTypes(): string[] {
    const types = super.getAllMessageTypes();
    if (!types.includes(CallingConstants.meeting)) {
      types.push(CallingConstants.meeting);
    }
    if (!types.includes(CometChatUIKitConstants.MessageTypes.audio)) {
      types.push(CometChatUIKitConstants.MessageTypes.audio);
    }
    if (!types.includes(CometChatUIKitConstants.MessageTypes.video)) {
      types.push(CometChatUIKitConstants.MessageTypes.video);
    }
    return types;
  }

  override getId(): string {
    return "calling";
  }

  override getAllMessageCategories(): string[] {
    const categories = super.getAllMessageCategories();
    if (!categories.includes(CometChatUIKitConstants.MessageCategory.call)) {
      categories.push(CometChatUIKitConstants.MessageCategory.call);
    }
    if (!categories.includes(CometChatUIKitConstants.MessageCategory.custom)) {
      categories.push(CometChatUIKitConstants.MessageCategory.custom);
    }
    return categories;
  }

  checkIfTemplateTypeExist(
    template: CometChatMessageTemplate[],
    type: string
  ): boolean {
    return template.some((obj) => obj.type === type);
  }

  checkIfTemplateCategoryExist(
    template: CometChatMessageTemplate[],
    category: string
  ): boolean {
    return template.some((obj) => obj.category === category);
  }

  override getAllMessageTemplates(
    _theme?: CometChatTheme | undefined
  ): CometChatMessageTemplate[] {
    this.theme = _theme as CometChatTheme;
    const templates = super.getAllMessageTemplates(_theme);
    if (!this.checkIfTemplateTypeExist(templates, CallingConstants.meeting)) {
      templates.push(this.getDirectCallTemplate(this.theme));
    }
    if (
      !this.checkIfTemplateCategoryExist(
        templates,
        CometChatUIKitConstants.MessageCategory.call
      )
    ) {
      templates.push(...this.getDefaultCallTemplate(this.theme));
    }
    return templates;
  }

  getDirectCallTemplate(_theme: CometChatTheme): CometChatMessageTemplate {
    return new CometChatMessageTemplate({
      type: CallingConstants.meeting,
      category: CometChatUIKitConstants.MessageCategory.custom,
      bottomView: (
        _message: CometChat.BaseMessage,
        _alignment: MessageBubbleAlignment
      ) => {
        return super.getBottomView(_message, _alignment);
      },
      contentView: (
        message: CometChat.BaseMessage,
        _alignment: MessageBubbleAlignment
      ) => {
        return this.getDirectCallMessageBubble(
          message as CometChat.CustomMessage,
          _alignment,
          _theme
        );
      },
      options: (
        loggedInUser: CometChat.User,
        messageObject: CometChat.BaseMessage,
        theme: CometChatTheme,
        group?: CometChat.Group
      ) => {
        return ChatConfigurator.getDataSource().getCommonOptions(
          loggedInUser,
          messageObject,
          theme,
          group
        );
      },
    });
  }

  getDefaultCallTemplate(_theme: CometChatTheme): CometChatMessageTemplate[] {
    const templates: CometChatMessageTemplate[] = [
      new CometChatMessageTemplate({
        type: CometChatUIKitConstants.MessageTypes.audio,
        category: CometChatUIKitConstants.MessageCategory.call,
        bottomView: (
          _message: CometChat.BaseMessage,
          _alignment: MessageBubbleAlignment
        ) => {
          return super.getBottomView(_message, _alignment);
        },
        contentView: (
          message: CometChat.BaseMessage,
          _alignment: MessageBubbleAlignment
        ) => {
          return this.getDefaultAudioCallMessageBubble(
            message as CometChat.Call,
            _alignment,
            _theme
          );
        },
      }),
      new CometChatMessageTemplate({
        type: CometChatUIKitConstants.MessageTypes.video,
        category: CometChatUIKitConstants.MessageCategory.call,
        bottomView: (
          _message: CometChat.BaseMessage,
          _alignment: MessageBubbleAlignment
        ) => {
          return super.getBottomView(_message, _alignment);
        },
        contentView: (
          message: CometChat.BaseMessage,
          _alignment: MessageBubbleAlignment
        ) => {
          return this.getDefaultVideoCallMessageBubble(
            message as CometChat.Call,
            _alignment,
            _theme
          );
        },
      }),
    ];
    return templates;
  }

  getCallBubbleStyle(
    _alignment: MessageBubbleAlignment,
    _theme: CometChatTheme
  ) {
    const isLeftAligned = _alignment == MessageBubbleAlignment.left;
    if (!isLeftAligned) {
      return {
        titleFont: fontHelper(_theme.typography.text2),
        titleColor: _theme.palette.getAccent("dark"),
        iconTint: _theme.palette.getAccent("dark"),
        buttonTextFont: fontHelper(_theme.typography.text2),
        buttonTextColor: _theme.palette.getPrimary(),
        buttonBackground: _theme.palette.getAccent("dark"),
        width: "240px",
        background: _theme.palette.getPrimary(),
        borderRadius: "12px",
      };
    } else {
      return {
        titleFont: fontHelper(_theme.typography.text2),
        titleColor: _theme.palette.getAccent(),
        iconTint: _theme.palette.getPrimary(),
        buttonTextFont: fontHelper(_theme.typography.text2),
        buttonTextColor: _theme.palette.getPrimary(),
        buttonBackground: _theme.palette.getAccent("dark"),
        width: "240px",
        background: _theme.palette.getAccent100(),
        borderRadius: "12px",
      };
    }
  }

  getSessionId(_message: CometChat.CustomMessage) {
    const data = _message.getData();
    return data?.customData?.sessionID;
  }

  getCallBubbleTitle(_message: CometChat.CustomMessage) {
    if (
      !_message.getSender() ||
      _message.getSender().getUid() == this.loggedInUser!.getUid()
    ) {
      return localize("YOU_INITIATED_GROUP_CALL");
    } else {
      return `${_message.getSender().getName()}  ${localize(
        "INITIATED_GROUP_CALL"
      )}`;
    }
  }

  getDirectCallMessageBubble(
    _message: CometChat.CustomMessage,
    _alignment: MessageBubbleAlignment,
    _theme: CometChatTheme
  ) {
    const callBubbleAlignment: DocumentIconAlignment =
      DocumentIconAlignment.left;
    const callBubbleStyle = this.getCallBubbleStyle(_alignment, _theme);
    const sessionId = this.getSessionId(_message);
    const directCallIconURL = VideoCall2xIcon;
    const callBubbleTitle = this.getCallBubbleTitle(_message);
    const joinCallButtonText = localize("JOIN");

    return {
      componentName: "CometChatDocumentExtensionBubble",
      props: {
        hideSeparator: true,
        iconAlignment: callBubbleAlignment,
        documentStyle: callBubbleStyle,
        URL: sessionId,
        iconURL: directCallIconURL,
        title: callBubbleTitle,
        buttonText: joinCallButtonText,
        ccClicked: this.startDirectCall.bind(this),
      },
    };
  }

  startDirectCall(sessionId: string) {
    CometChatUIEvents.ccShowOngoingCall.next({
      child: this.getOngoingCallUI(sessionId),
    });
  }

  getOngoingCallUI(sessionId: string) {
    const style = new CallscreenStyle({
      maxHeight: "100%",
      maxWidth: "100%",
      border: "none",
      borderRadius: "0",
      background: "#1c2226",
      minHeight: "400px",
      minWidth: "400px",
      minimizeIconTint: this.theme.palette.getAccent900(),
      maximizeIconTint: this.theme.palette.getAccent900(),
    });
    return {
      componentName: "CometChatOngoingCall",
      props: {
        ongoingCallStyle: style,
        sessionID: sessionId,
      },
    };
  }

  callStatusStyle(_message: CometChat.Call, theme: CometChatTheme) {
    return {
      buttonTextFont: fontHelper(theme.typography.subtitle2),
      buttonTextColor: CallingDetailsUtils.isMissedCall(
        _message,
        this.loggedInUser!
      )
        ? theme.palette.getError()
        : theme.palette.getAccent600(),
      borderRadius: "10px",
      border: CallingDetailsUtils.isMissedCall(_message, this.loggedInUser!)
        ? `1px solid RGBA(255, 59, 48, 0.2)`
        : `1px solid ${theme.palette.getAccent100()}`,
      buttonIconTint: CallingDetailsUtils.isMissedCall(
        _message,
        this.loggedInUser!
      )
        ? theme.palette.getError()
        : theme.palette.getAccent600(),
      background: "transparent",
      iconBackground: "transparent",
      padding: "2px 12px 2px 0",
      gap: "0",
      height: "25px",
      justifyContent: "center",
    };
  }

  getCallActionMessage(_message: CometChat.Call) {
    return CallingDetailsUtils.getCallStatus(_message, this.loggedInUser!);
  }

  getDefaultAudioCallMessageBubble(
    _message: CometChat.Call,
    _alignment: MessageBubbleAlignment,
    _theme: CometChatTheme
  ) {
    const style = this.callStatusStyle(_message, _theme);
    const actionMessage = this.getCallActionMessage(_message);
    return {
      componentName: "cometchat-icon-button",
      props: {
        disabled: true,
        iconURL: AudioCallIcon,
        buttonStyle: style,
        text: actionMessage,
      },
    };
  }

  getDefaultVideoCallMessageBubble(
    _message: CometChat.Call,
    _alignment: MessageBubbleAlignment,
    _theme: CometChatTheme
  ) {
    const style = this.callStatusStyle(_message, _theme);
    const actionMessage = this.getCallActionMessage(_message);
    return {
      componentName: "cometchat-icon-button",
      props: {
        disabled: true,
        iconURL: VideoCallIcon,
        buttonStyle: style,
        text: actionMessage,
      },
    };
  }

  override getLastConversationMessage(
    conversation: CometChat.Conversation,
    loggedInUser: CometChat.User
  ): string {
    let actionMessage = "";
    if (
      conversation.getLastMessage() &&
      conversation.getLastMessage().category ==
        CometChatUIKitConstants.MessageCategory.call
    ) {
      const call: CometChat.Call = conversation.getLastMessage();
      switch (call.getStatus()) {
        case CallingConstants.initiated: {
          actionMessage = localize("CALL_INITIATED");
          if (call.getType() === CometChatUIKitConstants.MessageTypes.audio) {
            if (
              call.getReceiverType() ===
              CometChatUIKitConstants.MessageReceiverType.user
            ) {
              actionMessage =
                call.getSender().getUid() === loggedInUser?.getUid()
                  ? localize("OUTGOING_AUDIO_CALL")
                  : localize("INCOMING_AUDIO_CALL");
            } else if (
              call.getReceiverType() ===
              CometChatUIKitConstants.MessageReceiverType.group
            ) {
              if (call.getAction() === CallingConstants.initiated) {
                actionMessage =
                  call.getSender().getUid() === loggedInUser?.getUid()
                    ? localize("OUTGOING_AUDIO_CALL")
                    : localize("INCOMING_AUDIO_CALL");
              } else if (call.getAction() === CallingConstants.rejected) {
                actionMessage =
                  call.getSender().getUid() === loggedInUser?.getUid()
                    ? localize("CALL_REJECTED")
                    : `${call.getSender().getName()} ${localize(
                        "REJECTED_CALL"
                      )}`;
              }
            }
          } else if (
            call.getType() === CometChatUIKitConstants.MessageTypes.video
          ) {
            if (
              call.getReceiverType() ===
              CometChatUIKitConstants.MessageReceiverType.user
            ) {
              actionMessage =
                call.getSender().getUid() === loggedInUser?.getUid()
                  ? localize("OUTGOING_VIDEO_CALL")
                  : localize("INCOMING_VIDEO_CALL");
            } else if (
              call.getReceiverType() ===
              CometChatUIKitConstants.MessageReceiverType.group
            ) {
              if (call.getAction() === CallingConstants.initiated) {
                actionMessage =
                  call.getSender().getUid() === loggedInUser?.getUid()
                    ? localize("OUTGOING_VIDEO_CALL")
                    : localize("INCOMING_VIDEO_CALL");
              } else if (call.getAction() === CallingConstants.rejected) {
                actionMessage =
                  call.getSender().getUid() === loggedInUser?.getUid()
                    ? localize("CALL_REJECTED")
                    : `${call.getSender().getName()} ${localize(
                        "REJECTED_CALL"
                      )}`;
              }
            }
          }
          break;
        }
        case CallingConstants.ongoing: {
          if (
            call.getReceiverType() ===
            CometChatUIKitConstants.MessageReceiverType.user
          ) {
            actionMessage = localize("CALL_ACCEPTED");
          } else if (
            call.getReceiverType() ===
            CometChatUIKitConstants.MessageReceiverType.group
          ) {
            if (call.getAction() === CallingConstants.ongoing) {
              actionMessage =
                call.getSender().getUid() === loggedInUser?.getUid()
                  ? localize("CALL_ACCEPTED")
                  : `${call.getSender().getName()} ${localize("JOINED")}`;
            } else if (call.getAction() === CallingConstants.rejected) {
              actionMessage =
                call.getSender().getUid() === loggedInUser?.getUid()
                  ? localize("CALL_REJECTED")
                  : `${call.getSender().getName()}  ${localize(
                      "REJECTED_CALL"
                    )}`;
            } else if (call.getAction() === "left") {
              if (call.getSender().getUid() === loggedInUser?.getUid()) {
                actionMessage = `${localize("YOU")} ${localize(
                  "LEFT_THE_CALL"
                )}`;
              } else {
                actionMessage = `${call.getSender().getName()} ${localize(
                  "LEFT_THE_CALL"
                )}`;
              }
            }
          }
          break;
        }
        case CallingConstants.unanswered: {
          actionMessage = localize("CALL_UNANSWERED");
          if (
            call.getType() === CometChatUIKitConstants.MessageTypes.audio &&
            (call.getReceiverType() ===
              CometChatUIKitConstants.MessageReceiverType.user ||
              call.getReceiverType() ===
                CometChatUIKitConstants.MessageReceiverType.group)
          ) {
            actionMessage =
              call.getSender().getUid() === loggedInUser?.getUid()
                ? localize("UNANSWERED_AUDIO_CALL")
                : localize("MISSED_AUDIO_CALL");
          } else if (
            call.getType() === CometChatUIKitConstants.MessageTypes.video &&
            (call.getReceiverType() ===
              CometChatUIKitConstants.MessageReceiverType.user ||
              call.getReceiverType() ===
                CometChatUIKitConstants.MessageReceiverType.group)
          ) {
            actionMessage =
              call.getSender().getUid() === loggedInUser?.getUid()
                ? localize("UNANSWERED_VIDEO_CALL")
                : localize("MISSED_VIDEO_CALL");
          }
          break;
        }
        case CallingConstants.rejected:
          actionMessage = localize("CALL_REJECTED");
          break;
        case CometChat.CALL_STATUS.ENDED:
          actionMessage = localize("CALL_ENDED");
          break;
        case CometChat.CALL_STATUS.CANCELLED:
          actionMessage = localize("CALL_CANCELLED");
          break;
        case CometChat.CALL_STATUS.BUSY:
          actionMessage = localize("CALL_BUSY");
          break;
        default:
          break;
      }
    } else if (
      conversation.getLastMessage() &&
      conversation.getLastMessage().type == CallingConstants.meeting
    ) {
      const message: CometChat.CustomMessage = conversation.getLastMessage();
      if (
        !message.getSender() ||
        message.getSender().getUid() == loggedInUser.getUid()
      ) {
        actionMessage = localize("YOU_INITIATED_GROUP_CALL");
      } else {
        actionMessage = `${message.getSender().getName()}  ${localize(
          "INITIATED_GROUP_CALL"
        )}`;
      }
    } else {
      actionMessage = super.getLastConversationMessage(
        conversation,
        loggedInUser
      );
    }
    return actionMessage;
  }

  override getAuxiliaryHeaderMenu(
    user: CometChat.User,
    group: CometChat.Group
  ) {
    const auxMenus: Array<any> = [];
    const style: CallButtonsStyle = {
      width: "100%",
      height: "100%",
      border: "none",
      borderRadius: "0",
      background: "transparent",
      buttonPadding: "0px 0px 0px 2px",
      buttonBackground: "transparent",
      buttonBorder: "0 4px",
      buttonBorderRadius: "8px",
    };

    const callButtons = {
      componentName: "CometChatCallButtons",
      props: {
        user: user,
        group: group,
        callButtonsStyle: style,
        voiceCallIconText: "",
        videoCallIconText: "",
        key: "callbuttons",
      },
    };

    auxMenus.push(callButtons);
    return auxMenus;
  }
}
