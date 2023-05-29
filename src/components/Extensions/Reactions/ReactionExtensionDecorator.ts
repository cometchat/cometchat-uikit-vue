import { CometChat } from "@cometchat-pro/chat";
import {
  CometChatTheme,
  CometChatUIKitConstants,
  fontHelper,
  CometChatMessageTemplate,
  CometChatActionsIcon,
  CometChatActionsView,
  CometChatMessageEvents,
  MessageStatus,
  localize,
} from "uikit-resources-lerna";
import {
  MessageBubbleAlignment,
  ReactionsView,
  CometChatUIKitUtility,
  ReactionsConstants,
} from "uikit-utils-lerna";

import { ReactionIcon } from "../../../assets";

import { ReactionConfiguration } from "./ReactionConfiguration";

import { DataSourceDecorator } from "../../shared/Framework/DataSourceDecorator";
import { DataSource } from "../../shared/Framework/DataSource";

export class ReactionExtensionDecorator extends DataSourceDecorator {
  public loggedInUser: CometChat.User | null = null;
  public theme?: CometChatTheme = new CometChatTheme({});
  public configuration?: ReactionConfiguration;
  public newDataSource!: DataSource;

  constructor(
    dataSource: DataSource,
    { configuration }: { configuration?: ReactionConfiguration },
    theme?: CometChatTheme
  ) {
    super(dataSource);
    this.newDataSource = dataSource;
    this.configuration = configuration;

    this.theme = theme;
    this.getLoggedInUser();
  }

  async getLoggedInUser() {
    this.loggedInUser = await CometChat.getLoggedinUser();
  }

  override getCommonOptions(
    loggedInUser: CometChat.User,
    messageObject: CometChat.BaseMessage,
    _theme: CometChatTheme,
    group?: CometChat.Group
  ): (CometChatActionsIcon | CometChatActionsView)[] {
    this.theme = _theme ?? new CometChatTheme({});
    const configurationOptionStyle = this.configuration?.getOptionStyle();
    this.loggedInUser = loggedInUser;
    const options: (CometChatActionsIcon | CometChatActionsView)[] | any =
      super.getCommonOptions(loggedInUser, messageObject, this.theme, group);
    if (
      !this.checkIfOptionExist(
        options,
        CometChatUIKitConstants.MessageOption.reactToMessage
      )
    ) {
      const keyboardStyle = {
        width: "320px",
        height: "300px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
      };

      const newOption: CometChatActionsView = new CometChatActionsView({
        id: CometChatUIKitConstants.MessageOption.reactToMessage,
        title: localize("REACT_TO_MESSAGE"),
        iconURL: this.configuration?.getOptionIconURL()
          ? this.configuration?.getOptionIconURL()
          : ReactionIcon,
        customView: (closePopover: any) => {
          return {
            componentName: "cometchat-emoji-keyboard",
            props: {
              emojiKeyboardStyle: keyboardStyle,
            },
            listeners: {
              "cc-emoji-clicked": (args: any) => {
                closePopover(args);
                this.emojiSelected(args, messageObject, loggedInUser);
              },
            },
          };
        },
        iconTint:
          configurationOptionStyle?.iconTint ||
          this.theme!.palette.getAccent600(),
        titleFont:
          configurationOptionStyle?.titleFont ||
          fontHelper(this.theme!.typography.subtitle1),
        titleColor:
          configurationOptionStyle?.titleColor ||
          this.theme!.palette.getAccent600(),
        backgroundColor: configurationOptionStyle?.background || "transparent",
      });
      options.push(newOption);
    }
    return options;
  }

  emojiSelected(
    data: any,
    message: CometChat.BaseMessage | any,
    loggedInUser: CometChat.User
  ) {
    try {
      const emoji = data?.detail?.id;
      let removeEmoji = false;
      let reactionObject: any = {};
      let newMessageObject!: CometChat.TextMessage | null;
      const userObject: any = {};
      if (loggedInUser?.getAvatar()) {
        userObject["avatar"] = loggedInUser?.getAvatar();
      }
      if (loggedInUser?.getName()) {
        userObject["name"] = loggedInUser?.getName();
      }
      const uid: any = loggedInUser?.getUid();
      const emojiObject = {
        [emoji]: {
          [uid]: userObject,
        },
      };
      const reactionExtensionsData =
        CometChatUIKitUtility.checkMessageForExtensionsData(
          message,
          "reactions"
        );
      if (reactionExtensionsData) {
        if (reactionExtensionsData["emoji"]) {
          if (reactionExtensionsData["emoji"][uid]) {
            delete reactionExtensionsData["emoji"];
            removeEmoji = true;
          } else {
            const data: any =
              message["metadata"]["@injected"]["extensions"]["reactions"];
            data[emoji][uid] = userObject;
            reactionObject = {
              ...data,
            };
          }
        } else {
          if (!Object.prototype.hasOwnProperty.call(message, "metadata")) {
            message["metadata"] = {};
          }
          if (
            !Object.prototype.hasOwnProperty.call(
              message["metadata"],
              "@injected"
            )
          ) {
            message["metadata"]["@injected"] = {};
          }
          if (
            !Object.prototype.hasOwnProperty.call(
              message["metadata"]["@injected"],
              "extensions"
            )
          ) {
            message["metadata"]["@injected"]["extensions"] = {};
          }
          if (
            !Object.prototype.hasOwnProperty.call(
              message["metadata"]["@injected"]["extensions"],
              "reactions"
            )
          ) {
            message["metadata"]["@injected"]["extensions"]["reactions"] = {};
          }
          const data: any =
            message["metadata"]["@injected"]["extensions"]["reactions"];
          reactionObject = { ...data, ...emojiObject };
        }
      } else {
        if (!Object.prototype.hasOwnProperty.call(message, "metadata")) {
          message["metadata"] = {};
        }
        if (
          !Object.prototype.hasOwnProperty.call(
            message["metadata"],
            "@injected"
          )
        ) {
          message["metadata"]["@injected"] = {};
        }
        if (
          !Object.prototype.hasOwnProperty.call(
            message["metadata"]["@injected"],
            "extensions"
          )
        ) {
          message["metadata"]["@injected"]["extensions"] = {};
        }
        if (
          !Object.prototype.hasOwnProperty.call(
            message["metadata"]["@injected"]["extensions"],
            "reactions"
          )
        ) {
          message["metadata"]["@injected"]["extensions"]["reactions"] = {};
        }
        reactionObject = {
          ...emojiObject,
        };
      }
      let metadataObject: any;
      if (removeEmoji) {
        metadataObject = {
          ...message["metadata"],
        };
      } else {
        metadataObject = {
          ...message["metadata"],
          "@injected": {
            ...message["metadata"]["@injected"],
            extensions: {
              ...message["metadata"]["@injected"]["extensions"],
              reactions: {
                ...reactionObject,
              },
            },
          },
        };
      }
      // eslint-disable-next-line
      newMessageObject = message as CometChat.TextMessage;
      newMessageObject.setMetadata(metadataObject);
      CometChatMessageEvents.ccMessageEdited.next({
        message,
        status: MessageStatus.success,
      });
      CometChat.callExtension(
        ReactionsConstants.reactions,
        ReactionsConstants.post,
        ReactionsConstants.v1,
        { msgId: message.getId(), emoji: emoji }
      ).then(
        (response: any) => {
          console.log("reaction added successfully", response);
        },
        (error: CometChat.CometChatException) => {
          console.log("error in adding reaction", error);
        }
      );
    } catch (error: any) {
      console.log("error in adding reaction", error);
    }
  }

  getReactionsStyle(alignment: MessageBubbleAlignment, theme: CometChatTheme) {
    const configurationReactionStyle = this.configuration?.getReactionsStyle();
    if (alignment === MessageBubbleAlignment.left) {
      return {
        height: configurationReactionStyle?.height || "100%",
        width: configurationReactionStyle?.width || "100%",
        border: configurationReactionStyle?.border || "none",
        borderRadius: configurationReactionStyle?.borderRadius || "0",
        background: configurationReactionStyle?.background || "transparent",
        textFont:
          configurationReactionStyle?.textFont ||
          fontHelper(theme.typography.subtitle1),
        textColor:
          configurationReactionStyle?.textColor || theme.palette.getAccent600(),
        activeTextColor:
          configurationReactionStyle?.activeTextColor ||
          theme.palette.getAccent("dark"),
        activeTextFont:
          configurationReactionStyle?.activeTextFont ||
          fontHelper(theme.typography.subtitle1),
        addReactionIconTint:
          configurationReactionStyle?.addReactionIconTint ||
          theme.palette.getAccent600(),
        activeReactionBackground:
          configurationReactionStyle?.activeReactionBackground ||
          theme.palette.getPrimary(),
        reactionBackground:
          configurationReactionStyle?.reactionBackground || "transparent",
        reactionBorder:
          configurationReactionStyle?.reactionBorder ||
          `1px solid ${theme.palette.getAccent100()}`,
        reactionBorderRadius:
          configurationReactionStyle?.reactionBorderRadius || "12px",
        addReactionIconBackground:
          configurationReactionStyle?.addReactionIconBackground ||
          theme.palette.getAccent100(),
      };
    } else {
      return {
        height: configurationReactionStyle?.height || "100%",
        width: configurationReactionStyle?.width || "100%",
        border: configurationReactionStyle?.border || "none",
        borderRadius: configurationReactionStyle?.borderRadius || "0",
        background: configurationReactionStyle?.background || "transparent",
        textFont:
          configurationReactionStyle?.textFont ||
          fontHelper(theme.typography.caption1),
        textColor:
          configurationReactionStyle?.textColor ||
          theme.palette.getAccent("dark"),
        activeTextColor:
          configurationReactionStyle?.activeTextColor ||
          theme.palette.getPrimary(),
        activeTextFont:
          configurationReactionStyle?.activeTextFont ||
          fontHelper(theme.typography.caption1),
        addReactionIconTint:
          configurationReactionStyle?.addReactionIconTint ||
          theme.palette.getAccent("dark"),
        activeReactionBackground:
          configurationReactionStyle?.activeReactionBackground ||
          theme.palette.getAccent("dark"),
        reactionBackground:
          configurationReactionStyle?.reactionBackground || "transparent",
        reactionBorder:
          configurationReactionStyle?.reactionBorder ||
          `1px solid ${theme.palette.getAccent100()}`,
        reactionBorderRadius:
          configurationReactionStyle?.reactionBorderRadius || "12px",
        addReactionIconBackground:
          configurationReactionStyle?.addReactionIconBackground ||
          theme.palette.getAccent100("light"),
      };
    }
  }

  checkIfTemplateExist(
    template: CometChatMessageTemplate[],
    type: string
  ): boolean {
    return template.some((obj) => obj.type === type);
  }

  override getBottomView(
    message: CometChat.BaseMessage,
    alignment: MessageBubbleAlignment
  ) {
    try {
      if (
        message instanceof CometChat.TextMessage ||
        message instanceof CometChat.MediaMessage ||
        message instanceof CometChat.CustomMessage
      ) {
        const metadata: any = message.getMetadata();
        if (
          metadata &&
          Object.prototype.hasOwnProperty.call(metadata, "@injected") &&
          Object.prototype.hasOwnProperty.call(
            metadata["@injected"],
            "extensions"
          ) &&
          Object.prototype.hasOwnProperty.call(
            metadata["@injected"]["extensions"],
            "reactions"
          ) &&
          !message.getDeletedAt() &&
          message.getType() !== CometChatUIKitConstants.MessageTypes.groupMember
        ) {
          const style = this.getReactionsStyle(alignment, this.theme!);
          //reactions-view
          return {
            componentName: "reactions-view",
            props: {
              messageObject: message,
              alignment: alignment,
              loggedInUser: this.loggedInUser,
              reactionsStyle: style,
              addReactionIconURL: this.configuration?.getAddReactionIconURL()
                ? this.configuration?.getAddReactionIconURL()
                : ReactionIcon,
            },
          };
        } else {
          super.getBottomView(message, alignment);
        }
      } else {
        super.getBottomView(message, alignment);
      }
    } catch (e) {
      super.getBottomView(message, alignment);
    }
  }

  checkIfOptionExist(
    template: (CometChatActionsIcon | CometChatActionsView)[],
    id: string
  ): boolean {
    return template.some((obj) => obj.id === id);
  }

  override getId(): string {
    return "reactions";
  }
}
