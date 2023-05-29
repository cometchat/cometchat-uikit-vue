import { ChatConfigurator } from "../../shared/Framework/ChatConfigurator";
import { ExtensionsDataSource } from "../../shared/Framework/ExtensionsDatasource";
import { StickerConfiguration } from "./StickersConfiguration";
import { StickersExtensionDecorator } from "./StickersExtensionDecorator";

export class StickersExtension implements ExtensionsDataSource {
  private configuration?: StickerConfiguration = new StickerConfiguration({});

  constructor(
    { configuration }: { configuration?: StickerConfiguration } = {
      configuration: new StickerConfiguration({}),
    }
  ) {
    this.configuration = configuration;
  }

  enable(): void {
    ChatConfigurator.enable((dataSource) => {
      return new StickersExtensionDecorator(dataSource, {
        configuration: this.configuration as StickerConfiguration,
      });
    });
  }
}
