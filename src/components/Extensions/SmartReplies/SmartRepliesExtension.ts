import { SmartReplyExtensionDecorator } from "./SmartRepliesExtensionDecorator";
import { SmartRepliesConfiguration } from "./SmartRepliesConfiguration";
import { ExtensionsDataSource } from "../../shared/Framework/ExtensionsDatasource";
import { ChatConfigurator } from "../../shared/Framework/ChatConfigurator";
import { CometChatTheme } from "uikit-resources-lerna";

export class SmartReplyExtension implements ExtensionsDataSource {
  private configuration?: SmartRepliesConfiguration;
  private theme?: CometChatTheme;
  constructor(
    {
      configuration,
      theme,
    }: { configuration?: SmartRepliesConfiguration; theme?: CometChatTheme } = {
      configuration: new SmartRepliesConfiguration({
        style: {},
      }),
      theme: new CometChatTheme({}),
    }
  ) {
    this.configuration = configuration;
    this.theme = theme;
  }
  enable(): void {
    ChatConfigurator.enable(
      (dataSource) =>
        new SmartReplyExtensionDecorator(
          dataSource,
          this.configuration,
          this.theme
        )
    );
  }
}
