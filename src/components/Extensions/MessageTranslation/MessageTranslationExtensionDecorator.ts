import { DataSource } from "../../shared/Framework/DataSource";
import { DataSourceDecorator } from "../../shared/Framework/DataSourceDecorator";
import { CometChat } from "@cometchat-pro/chat";

import {
  CometChatTheme,
  CometChatMessageOption,
  CometChatUIKitConstants,
  fontHelper,
  localize,
  CometChatMessageEvents,
  CometChatActionsIcon,
  CometChatActionsView,
} from "uikit-resources-lerna";
import {
  MessageBubbleAlignment,
  MessageTranslationStyle,
  MessageStatus,
} from "uikit-utils-lerna";

import { TranslateIcon } from "../../../assets";

import { MessageTranslationConfiguration } from "./MessageTranslationConfiguration";

export class MessageTranslationExtensionDecorator extends DataSourceDecorator {
  public configuration?: MessageTranslationConfiguration;
  public newDataSource!: DataSource;

  constructor(
    dataSource: DataSource,
    { configuration }: { configuration: MessageTranslationConfiguration }
  ) {
    super(dataSource);
    this.newDataSource = dataSource;
    this.configuration = configuration;
  }

  override getTextMessageOptions(
    loggedInUser: CometChat.User,
    messageObject: CometChat.BaseMessage,
    theme: CometChatTheme,
    group?: CometChat.Group
  ): Array<CometChatActionsIcon | CometChatActionsView> {
    const configurationOptionStyle = this.configuration?.getOptionStyle();
    const options: Array<CometChatActionsIcon | CometChatActionsView> =
      super.getTextMessageOptions(loggedInUser, messageObject, theme, group);
    if (
      !this.checkIfOptionExist(
        options,
        CometChatUIKitConstants.MessageOption.translateMessage
      )
    ) {
      const newOption: CometChatActionsIcon | CometChatActionsView =
        new CometChatActionsIcon({
          id: CometChatUIKitConstants.MessageOption.translateMessage,
          title: localize("TRANSLATE_MESSAGE"),
          iconURL: this.configuration?.getOptionIconURL()
            ? this.configuration?.getOptionIconURL()
            : TranslateIcon,
          onClick: function () {
            CometChat.callExtension(
              "message-translation",
              "POST",
              "v2/translate",
              {
                msgId: messageObject.getId(),
                text: (messageObject as CometChat.TextMessage).getText(),
                languages: navigator.languages,
              }
            )
              .then((message_translations: any) => {
                if (
                  message_translations &&
                  // message_translations.hasOwnProperty("translations")
                  Object.prototype.hasOwnProperty.call(
                    message_translations,
                    "translations"
                  )
                ) {
                  console.log("message_translations");
                  const translatedMessage =
                    message_translations["translations"][0][
                      "message_translated"
                    ];
                  if (translatedMessage && translatedMessage.trim()) {
                    const metadata: any = (
                      messageObject as CometChat.TextMessage
                    ).getMetadata();
                    metadata["translated_message"] = translatedMessage;
                    (messageObject as CometChat.TextMessage).setMetadata(
                      metadata
                    );
                    CometChatMessageEvents.ccMessageEdited.next({
                      message: messageObject as CometChat.TextMessage,
                      status: MessageStatus.success,
                    });
                  }
                }
              })
              .catch((error) => {
                console.log("error", error);
              });
          },
          iconTint:
            configurationOptionStyle?.iconTint || theme.palette.getAccent600(),
          titleColor:
            configurationOptionStyle?.titleColor ||
            theme.palette.getAccent600(),
          titleFont:
            configurationOptionStyle?.titleFont ||
            fontHelper(theme.typography.subtitle1),
          backgroundColor:
            configurationOptionStyle?.background || "transparent",
        });
      options.push(newOption);
    }
    return options;
  }

  getTranslationStyle = (
    _alignment: MessageBubbleAlignment,
    _theme: CometChatTheme
  ) => {
    const configurationMessageTranslationStyle =
      this.configuration?.getMessageTranslationStyle();
    const isLeftAligned = _alignment !== MessageBubbleAlignment.left;
    if (isLeftAligned) {
      return new MessageTranslationStyle({
        translatedTextFont:
          configurationMessageTranslationStyle?.translatedTextFont ||
          fontHelper(_theme.typography.text3),
        translatedTextColor:
          configurationMessageTranslationStyle?.translatedTextColor ||
          _theme.palette.getAccent("dark"),
        helpTextColor:
          configurationMessageTranslationStyle?.helpTextColor ||
          _theme.palette.getAccent700("dark"),
        helpTextFont:
          configurationMessageTranslationStyle?.helpTextFont ||
          fontHelper(_theme.typography.caption2),
        background:
          configurationMessageTranslationStyle?.background || "transparent",
      });
    } else {
      return new MessageTranslationStyle({
        translatedTextFont:
          configurationMessageTranslationStyle?.translatedTextFont ||
          fontHelper(_theme.typography.text3),
        translatedTextColor:
          configurationMessageTranslationStyle?.translatedTextColor ||
          _theme.palette.getAccent("light"),
        helpTextColor:
          configurationMessageTranslationStyle?.helpTextColor ||
          _theme.palette.getAccent700(),
        helpTextFont:
          configurationMessageTranslationStyle?.helpTextFont ||
          fontHelper(_theme.typography.caption2),
        background:
          configurationMessageTranslationStyle?.background || "transparent",
      });
    }
  };

  getTextMessageStyle(
    _alignment: MessageBubbleAlignment,
    _theme: CometChatTheme
  ) {
    const isLeftAligned = _alignment !== MessageBubbleAlignment.left;

    if (isLeftAligned) {
      return {
        textFont: fontHelper(_theme.typography.text3),
        textColor: _theme.palette.getAccent900(),
      };
    } else {
      return {
        textFont: fontHelper(_theme.typography.text3),
        textColor: _theme.palette.getAccent(),
      };
    }
  }

  override getTextMessageContentView(
    message: CometChat.TextMessage,
    alignment: MessageBubbleAlignment,
    theme: CometChatTheme
  ) {
    const metadata: any = message.getMetadata();
    if (
      metadata &&
      // metadata.hasOwnProperty("translated_message") &&
      Object.prototype.hasOwnProperty.call(metadata, "translated_message") &&
      !message.getDeletedAt() &&
      message.getType() !== CometChatUIKitConstants.MessageTypes.groupMember
    ) {
      const translatedText = metadata["translated_message"];

      return {
        componentName: "CometChatMessageTranslationBubble",
        props: {
          translatedText: translatedText,
          alignment: alignment,
          messageTranslationStyle: this.getTranslationStyle(alignment, theme),
          textStyle: this.getTextMessageStyle(alignment, theme),
          text: message.getText(),
        },
      };
    } else {
      return super.getTextMessageContentView(message, alignment, theme);
    }
  }

  checkIfOptionExist(template: CometChatMessageOption[], id: string): boolean {
    return template.some((obj) => obj.id === id);
  }

  override getId(): string {
    return "messagetranslation";
  }
}
