import { DataSource } from "../../shared/Framework/DataSource";
import { DataSourceDecorator } from "../../shared/Framework/DataSourceDecorator";
import { CometChat } from "@cometchat-pro/chat";

import {
  CometChatTheme,
  CometChatUIKitConstants,
  fontHelper,
} from "uikit-resources-lerna";
import {
  CometChatUIKitUtility,
  LinkPreviewConstants,
  LinkPreviewStyle,
  MessageBubbleAlignment,
} from "uikit-utils-lerna";

import { LinkPreviewConfiguration } from "./LinkPreviewConfiguration";

export class LinkPreviewExtensionDecorator extends DataSourceDecorator {
  public configuration?: LinkPreviewConfiguration;
  public newDataSource!: DataSource;

  constructor(
    dataSource: DataSource,
    { configuration }: { configuration: LinkPreviewConfiguration }
  ) {
    super(dataSource);
    this.newDataSource = dataSource;
    this.configuration = configuration;
  }

  override getId(): string {
    return "linkpreview";
  }

  override getTextMessageContentView(
    message: CometChat.TextMessage,
    alignment: MessageBubbleAlignment,
    theme: CometChatTheme
  ) {
    const linkPreviewObject: any = this.getLinkPreview(message);
    if (
      linkPreviewObject &&
      !message.getDeletedAt() &&
      message.getType() !== CometChatUIKitConstants.MessageTypes.groupMember
    ) {
      return {
        componentName: "CometChatLinkPreviewBubble",
        props: {
          title: this.getLinkPreviewDetails(linkPreviewObject, "title"),
          description: this.getLinkPreviewDetails(
            linkPreviewObject,
            "description"
          ),
          URL: this.getLinkPreviewDetails(linkPreviewObject, "url"),
          image: this.getLinkPreviewDetails(linkPreviewObject, "image"),
          favIconURL: this.getLinkPreviewDetails(linkPreviewObject, "favicon"),
          linkPreviewStyle: this.getLinkPreviewStyle(theme),
          textStyle: this.getTextMessageStyle(alignment, theme),
          text: message.getText(),
          listeners: {
            "cc-link-clicked": this.openLink,
          },
        },
      };
    } else {
      return super.getTextMessageContentView(message, alignment, theme);
    }
  }

  openLink(event: any) {
    window.open(event?.detail?.url, "_blank");
  }

  getLinkPreviewStyle(_theme: CometChatTheme) {
    const configurationLinkPreviewStyle =
      this.configuration?.getLinkPreviewStyle();
    return new LinkPreviewStyle({
      titleColor:
        configurationLinkPreviewStyle?.titleColor || _theme.palette.getAccent(),
      titleFont:
        configurationLinkPreviewStyle?.titleFont ||
        fontHelper(_theme.typography.title2),
      descriptionColor:
        configurationLinkPreviewStyle?.descriptionColor ||
        _theme.palette.getAccent600(),
      descriptionFont:
        configurationLinkPreviewStyle?.descriptionFont ||
        fontHelper(_theme.typography.subtitle2),
      background: configurationLinkPreviewStyle?.background || "transparent",
      height: configurationLinkPreviewStyle?.height || "100%",
      width: configurationLinkPreviewStyle?.width || "100%",
    });
  }

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

  getLinkPreview(message: CometChat.TextMessage): any {
    try {
      if (message?.getMetadata()) {
        const metadata: any = message.getMetadata();
        const injectedObject = metadata[LinkPreviewConstants.injected];
        if (injectedObject && injectedObject?.extensions) {
          const extensionsObject = injectedObject.extensions;
          if (
            extensionsObject &&
            CometChatUIKitUtility.checkHasOwnProperty(
              extensionsObject,
              LinkPreviewConstants.link_preview
            )
          ) {
            const linkPreviewObject =
              extensionsObject[LinkPreviewConstants.link_preview];
            if (
              linkPreviewObject &&
              CometChatUIKitUtility.checkHasOwnProperty(
                linkPreviewObject,
                LinkPreviewConstants.links
              ) &&
              linkPreviewObject[LinkPreviewConstants.links].length
            ) {
              return linkPreviewObject[LinkPreviewConstants.links][0];
            } else {
              return null;
            }
          } else {
            return null;
          }
        }
      } else {
        return null;
      }
    } catch (error: any) {
      console.log("error in getting link preview details", error);
    }
  }

  getLinkPreviewDetails(linkPreviewObject: any, key: string): string {
    if (Object.keys(linkPreviewObject).length > 0) {
      return linkPreviewObject[key];
    } else {
      return "";
    }
  }
}
