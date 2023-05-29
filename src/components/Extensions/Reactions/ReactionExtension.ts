import { ChatConfigurator } from "../../shared/Framework/ChatConfigurator";
import { ExtensionsDataSource } from "../../shared/Framework/ExtensionsDatasource";
import { CometChatTheme } from "uikit-resources-lerna";
import { ReactionConfiguration } from "./ReactionConfiguration";
import { ReactionExtensionDecorator } from "./ReactionExtensionDecorator";

export class ReactionExtension implements ExtensionsDataSource {
  private configuration?: ReactionConfiguration = new ReactionConfiguration({});
  private theme?: CometChatTheme;
  constructor(
    {
      configuration,
      theme,
    }: { configuration?: ReactionConfiguration; theme?: CometChatTheme } = {
      configuration: new ReactionConfiguration({}),
      theme: new CometChatTheme({}),
    }
  ) {
    this.configuration = configuration;
    this.theme = theme;
  }

  enable(): void {
    ChatConfigurator.enable(
      (dataSource) =>
        new ReactionExtensionDecorator(
          dataSource,
          {
            configuration: this.configuration,
          },
          this.theme
        )
    );
  }
}
