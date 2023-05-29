import { MessageTranslationExtensionDecorator } from "./MessageTranslationExtensionDecorator";

import { MessageTranslationConfiguration } from "./MessageTranslationConfiguration";
import { ExtensionsDataSource } from "../../shared/Framework/ExtensionsDatasource";
import { ChatConfigurator } from "../../shared/Framework/ChatConfigurator";

export class MessageTranslationExtension implements ExtensionsDataSource {
  private configuration?: MessageTranslationConfiguration =
    new MessageTranslationConfiguration({});

  constructor(
    { configuration }: { configuration?: MessageTranslationConfiguration } = {
      configuration: new MessageTranslationConfiguration({}),
    }
  ) {
    this.configuration = configuration;
  }

  enable(): void {
    ChatConfigurator.enable(
      (dataSource) =>
        new MessageTranslationExtensionDecorator(dataSource, {
          configuration: this.configuration as MessageTranslationConfiguration,
        })
    );
  }
}
