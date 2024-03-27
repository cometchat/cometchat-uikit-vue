import { DataSource } from "../../shared/Framework/DataSource";
import { DataSourceDecorator } from "../../shared/Framework/DataSourceDecorator";
import { CometChatMessageTemplate, CometChatTheme } from "@cometchat/uikit-resources";
import { CreatePollStyle } from "@cometchat/uikit-shared";
import { PollsConfiguration } from "./PollsConfiguration";
export declare class PollsExtensionDecorator extends DataSourceDecorator {
    theme: CometChatTheme;
    private loggedInUser;
    configuration?: PollsConfiguration;
    newDataSource: DataSource;
    constructor(dataSource: DataSource, { configuration }: {
        configuration?: PollsConfiguration;
    });
    getLoggedInUser(): Promise<void>;
    getId(): string;
    getAllMessageTypes(): string[];
    getAllMessageCategories(): string[];
    checkIfTemplateExist(template: CometChatMessageTemplate[], type: string): boolean;
    getAllMessageTemplates(_theme: CometChatTheme, additionalConfigurations?: any): CometChatMessageTemplate[];
    getPollsTemplate(_theme: CometChatTheme): CometChatMessageTemplate;
    getPollsContentView(message: CometChat.CustomMessage, _theme: CometChatTheme): {
        componentName: string;
        props: {
            pollStyle: {
                borderRadius: string;
                background: string;
                votePercentTextFont: string;
                votePercentTextColor: string;
                pollQuestionTextFont: string;
                pollQuestionTextColor: string;
                pollOptionTextFont: string;
                pollOptionTextColor: string;
                pollOptionBackground: string;
                optionsIconTint: string;
                totalVoteCountTextFont: string;
                totalVoteCountTextColor: string;
                selectedPollOptionBackground: string;
                userSelectedOptionBackground: string;
                pollOptionBorder: string;
                pollOptionBorderRadius: string;
            };
            pollQuestion: any;
            pollId: any;
            senderUid: any;
            loggedInUser: import("@cometchat/chat-sdk-javascript").User;
            metadata: Object;
        };
    };
    getPollBubbleData(message: CometChat.CustomMessage, key?: string): any;
    getAttachmentOptions(theme?: CometChatTheme, id?: any): any;
    onPollsButtonClicked(...args: any): void;
    getPollView(user: CometChat.User, group: CometChat.Group, createPollStyle: CreatePollStyle): {
        componentName: string;
        props: {
            user: import("@cometchat/chat-sdk-javascript").User;
            group: import("@cometchat/chat-sdk-javascript").Group;
            createPollStyle: CreatePollStyle;
            deleteIconURL: string;
            closeIconURL: string;
            addAnswerIconURL: string;
            listeners: {
                "cc-close-clicked": () => void;
            };
        };
    };
    triggerCloseEvent(): void;
    getLastConversationMessage(conversation: CometChat.Conversation, loggedInUser: CometChat.User, additionalConfigurations: any): string;
}
