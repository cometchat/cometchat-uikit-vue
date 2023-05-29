import { ChatConfigurator } from "../../shared/Framework/ChatConfigurator";
import { ExtensionsDataSource } from "../../shared/Framework/ExtensionsDatasource";
import { PollsConfiguration } from "./PollsConfiguration";
import { PollsExtensionDecorator } from "./PollsExtensionDecorator";
import { DeleteIcon, Close2xIcon, PlusIcon } from "../../../assets";

export class PollsExtension implements ExtensionsDataSource {
  private configuration?: PollsConfiguration;

  constructor(
    { configuration }: { configuration?: PollsConfiguration } = {
      configuration: new PollsConfiguration({
        closeIconURL: Close2xIcon,
        deleteIconURL: DeleteIcon,
        addAnswerIconURL: PlusIcon,
      }),
    }
  ) {
    this.configuration = configuration;
  }

  enable(): void {
    ChatConfigurator.enable(
      (dataSource) =>
        new PollsExtensionDecorator(dataSource, {
          configuration: this.configuration as PollsConfiguration,
        })
    );
  }
}
