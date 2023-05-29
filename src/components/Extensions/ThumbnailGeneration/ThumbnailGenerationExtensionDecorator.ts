import { ChatConfigurator } from "../../shared/Framework/ChatConfigurator";
import { DataSource } from "../../shared/Framework/DataSource";
import { DataSourceDecorator } from "../../shared/Framework/DataSourceDecorator";
import { CometChat } from "@cometchat-pro/chat";
import { BaseStyle, ImageBubbleStyle } from "my-cstom-package-lit";
import { CometChatTheme } from "uikit-resources-lerna";
import { PlaceholderImage } from "../../../assets";

export class ThumbnailGenerationExtensionDecorator extends DataSourceDecorator {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  override getId(): string {
    return "thumbnailgeneration";
  }

  override getImageMessageBubble(
    imageUrl: string,
    placeholderImage: string,
    message: CometChat.MediaMessage,
    theme: CometChatTheme,
    // eslint-disable-next-line
    onClick?: Function,
    style?: ImageBubbleStyle
  ) {
    if (ChatConfigurator.names.includes("imagemoderation")) {
      return super.getImageMessageBubble(
        imageUrl,
        placeholderImage,
        message,
        theme
      );
    } else {
      try {
        let imageUrl: string = message.getAttachments()[0].getUrl();
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
            "thumbnail-generation"
          ) &&
          metadata["@injected"]["extensions"]["thumbnail-generation"][
            "url_small"
          ]
        ) {
          // eslint-disable-next-line
          //@ts-ignore
          imageUrl = (message.getMetadata() as object)["@injected"][
            "extensions"
          ]["thumbnail-generation"]["url_small"];
        }
        return super.getImageMessageBubble(
          imageUrl,
          PlaceholderImage,
          message,
          theme
        );
      } catch (error: any) {
        //do nothing
        console.log("ATTACHHMENTS: ", message.getAttachments());
      }
    }
  }

  override getVideoMessageBubble(
    videoUrl: string,
    message: CometChat.MediaMessage,
    theme: CometChatTheme,
    thumbnailUrl?: string,
    // eslint-disable-next-line
    onClick?: Function,
    style?: BaseStyle
  ) {
    const metadata: any = message.getMetadata();
    let thumbnailImage = thumbnailUrl;
    if (
      metadata &&
      Object.prototype.hasOwnProperty.call(metadata, "@injected") &&
      Object.prototype.hasOwnProperty.call(
        metadata["@injected"],
        "extensions"
      ) &&
      Object.prototype.hasOwnProperty.call(
        metadata["@injected"]["extensions"],
        "thumbnail-generation"
      ) &&
      metadata["@injected"]["extensions"]["thumbnail-generation"]["url_small"]
    ) {
      // eslint-disable-next-line
      //@ts-ignore
      thumbnailImage = (message.getMetadata() as object)["@injected"][
        "extensions"
      ]["thumbnail-generation"]["url_small"];
    }
    return super.getVideoMessageBubble(
      message?.getAttachments()[0]?.getUrl(),
      message,
      theme,
      thumbnailImage
    );
  }
}
