import { ChatConfigurator } from "../../shared/Framework/ChatConfigurator";
import { ExtensionsDataSource } from "../../shared/Framework/ExtensionsDatasource";
import { ImageModerationConfiguration } from "./ImageModerationConfiguration";
import { ImageModerationExtensionDecorator } from "./ImageModerationExtensionDecorator";

export class ImageModerationExtension implements ExtensionsDataSource {
  private configuration?: ImageModerationConfiguration =
    new ImageModerationConfiguration({});

  constructor(
    { configuration }: { configuration?: ImageModerationConfiguration } = {
      configuration: new ImageModerationConfiguration({}),
    }
  ) {
    this.configuration = configuration;
  }

  enable(): void {
    ChatConfigurator.enable(
      (dataSource) =>
        new ImageModerationExtensionDecorator(dataSource, {
          configuration: this.configuration,
        })
    );
  }
}
