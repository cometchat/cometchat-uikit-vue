import { DataSource } from "../../shared/Framework/DataSource";
import { DataSourceDecorator } from "../../shared/Framework/DataSourceDecorator";
import { CometChat } from "@cometchat-pro/chat";
import {
  CometChatTheme,
  CometChatUIEvents,
  fontHelper,
  localize,
} from "uikit-resources-lerna";
import { MessageBubbleAlignment, ImageModeration } from "uikit-utils-lerna";
import { PlaceholderImage } from "../../../assets";

import { ImageModerationConfiguration } from "./ImageModerationConfiguration";

export class ImageModerationExtensionDecorator extends DataSourceDecorator {
  public configuration?: ImageModerationConfiguration;
  public newDataSource!: DataSource;
  theme!: CometChatTheme;

  constructor(
    dataSource: DataSource,
    { configuration }: { configuration?: ImageModerationConfiguration }
  ) {
    super(dataSource);
    this.newDataSource = dataSource;
    this.configuration = configuration!;
  }

  override getId(): string {
    return "imagemoderation";
  }

  override getImageMessageContentView(
    message: CometChat.MediaMessage,
    alignment: MessageBubbleAlignment,
    theme: CometChatTheme
  ) {
    this.theme = theme;
    const metadata: any = message.getMetadata();
    const style = this.getImageModerationStyle(theme);
    console.log("message.getAttachments: ", message.getAttachments());
    try {
      let imageUrl = message.getAttachments()[0].getUrl();
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
        imageUrl = (message.getMetadata() as object)["@injected"]["extensions"][
          "thumbnail-generation"
        ]["url_small"];
      }

      return {
        componentName: "CometChatImageModerationBubble",
        props: {
          message: message,
          imageModerationStyle: style,
          src: imageUrl,
          placeholderImage: PlaceholderImage,
          listeners: {
            "cc-show-dialog": this.showDialog.bind(this),
          },
        },
      };
    } catch (err) {
      console.log("ERROR: ", err);
    }
  }

  showDialog(_event: any) {
    CometChatUIEvents.ccShowDialog.next({
      confirmCallback: _event?.detail?.onConfirm,
      child: this.getConfirmDialogView(_event),
    });
  }

  getConfirmDialogView(_event: any) {
    const configurationConfirmDialogStyle =
      this.configuration?.getConfirmDialogSyle();

    const confirmDialogStyle = {
      confirmButtonBackground:
        configurationConfirmDialogStyle?.confirmButtonBackground ||
        this.theme.palette.getError(),
      cancelButtonBackground:
        configurationConfirmDialogStyle?.cancelButtonBackground ||
        this.theme.palette.getSecondary(),
      confirmButtonTextColor:
        configurationConfirmDialogStyle?.confirmButtonTextColor ||
        this.theme.palette.getAccent900("light"),
      confirmButtonTextFont:
        configurationConfirmDialogStyle?.confirmButtonTextFont ||
        fontHelper(this.theme.typography.text2),
      cancelButtonTextColor:
        configurationConfirmDialogStyle?.cancelButtonTextColor ||
        this.theme.palette.getAccent900("dark"),
      cancelButtonTextFont:
        configurationConfirmDialogStyle?.cancelButtonTextFont ||
        fontHelper(this.theme.typography.text2),
      titleFont:
        configurationConfirmDialogStyle?.titleFont ||
        fontHelper(this.theme.typography.title1),
      titleColor:
        configurationConfirmDialogStyle?.titleColor ||
        this.theme.palette.getAccent(),
      messageTextFont:
        configurationConfirmDialogStyle?.messageTextFont ||
        fontHelper(this.theme.typography.subtitle2),
      messageTextColor:
        configurationConfirmDialogStyle?.messageTextColor ||
        this.theme.palette.getAccent600(),
      background:
        configurationConfirmDialogStyle?.cancelButtonBackground ||
        this.theme.palette.getBackground(),
      height: configurationConfirmDialogStyle?.background || "100%",
      width: configurationConfirmDialogStyle?.width || "100%",
      border:
        configurationConfirmDialogStyle?.border ||
        `1px solid ${this.theme.palette.getAccent100()}`,
      borderRadius: configurationConfirmDialogStyle?.borderRadius || "8px",
    };
    const backdropStyle = {
      height: this.configuration?.getBackDropStyle()?.height || "100%",
      width: this.configuration?.getBackDropStyle()?.width || "100%",
      background:
        this.configuration?.getBackDropStyle()?.background ||
        "rgba(0, 0, 0, 0.5)",
    };

    return {
      componentName: "CometChatConfirmDialogView",
      props: {
        backdropStyle: backdropStyle,
        title: "",
        warningText: "Are you sure want to see unsafe content?",
        confirmText: localize("YES"),
        cancelText: localize("NO"),
        confirmDialogStyle: confirmDialogStyle,
        listeners: {
          "cc-cancel-clicked": this.onCancelClicked,
          "cc-confirm-clicked": () => {
            this.onConfirmClicked(_event);
          },
        },
      },
    };
  }

  onCancelClicked = () => {
    CometChatUIEvents.ccHideDialog.next();
  };

  onConfirmClicked = (_event: any) => {
    if (_event?.detail?.onConfirm) {
      _event?.detail?.onConfirm();
    }
    CometChatUIEvents.ccHideDialog.next();
  };

  getImageModerationStyle(_theme: CometChatTheme) {
    const configuarationImageModerationBubbleStyle =
      this.configuration?.getImageModerationStyle();
    return {
      filterColor:
        configuarationImageModerationBubbleStyle?.filterColor ||
        _theme.palette.getPrimary(),
      height: configuarationImageModerationBubbleStyle?.height || "100%",
      width: configuarationImageModerationBubbleStyle?.width || "100%",
      border: configuarationImageModerationBubbleStyle?.border || "none",
      warningTextColor:
        configuarationImageModerationBubbleStyle?.warningTextColor ||
        _theme.palette.getAccent("dark"),
      warningTextFont:
        configuarationImageModerationBubbleStyle?.warningTextFont ||
        fontHelper(_theme.typography.title2),
    };
  }
}
