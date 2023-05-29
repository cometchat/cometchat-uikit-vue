import { DataSource } from "../../shared/Framework/DataSource";
import { DataSourceDecorator } from "../../shared/Framework/DataSourceDecorator";
import { CometChat } from "@cometchat-pro/chat";
import {
  CometChatTheme,
  CometChatUIKitConstants,
  MessageBubbleAlignment,
} from "uikit-resources-lerna";
import { CometChatUIKitUtility } from "uikit-utils-lerna";

export class TextModeratorExtensionDecorator extends DataSourceDecorator {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  override getId(): string {
    return "textmoderator";
  }

  getModeratedtext(message: CometChat.TextMessage): string {
    const text: string = CometChatUIKitUtility.getExtensionData(message);
    if (text?.trim()?.length > 0) {
      return text;
    } else {
      return message.getText();
    }
  }

  override getLastConversationMessage(
    conversation: CometChat.Conversation,
    loggedInUser: CometChat.User
  ): string {
    const message: CometChat.TextMessage = conversation.getLastMessage();
    if (
      message &&
      !message.getDeletedAt() &&
      message.getType() === CometChatUIKitConstants.MessageTypes.text &&
      message.getCategory() === CometChatUIKitConstants.MessageCategory.message
    ) {
      return this.getModeratedtext(message);
    } else {
      return super.getLastConversationMessage(conversation, loggedInUser);
    }
  }

  override getTextMessageContentView(
    message: CometChat.TextMessage,
    alignment: MessageBubbleAlignment,
    theme: CometChatTheme
  ) {
    const moderatedText = this.getModeratedtext(message);
    if (this.getModeratedtext(message) !== message.getText()) {
      message.setText(moderatedText);
    }
    return super.getTextMessageContentView(message, alignment, theme);
  }
}
