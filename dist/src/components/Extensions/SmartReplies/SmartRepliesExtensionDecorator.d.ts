import { DataSource } from "../../shared/Framework/DataSource";
import { DataSourceDecorator } from "../../shared/Framework/DataSourceDecorator";
import { CometChatTheme } from "@cometchat/uikit-resources";
import { SmartRepliesConfiguration } from "./SmartRepliesConfiguration";
export declare class SmartReplyExtensionDecorator extends DataSourceDecorator {
    configuration?: SmartRepliesConfiguration;
    private LISTENER_ID;
    private activeUser;
    private activeGroup;
    currentMessage: CometChat.BaseMessage | null;
    loggedInUser: CometChat.User | null;
    theme?: CometChatTheme;
    constructor(dataSource: DataSource, configuration: SmartRepliesConfiguration, theme: CometChatTheme | undefined);
    getId(): string;
    private addMessageListener;
    getReplies(message: CometChat.TextMessage): any[];
    getSmartReplyStyle(): {
        replyTextFont: string;
        replyTextColor: string;
        replyBackground: string;
        boxShadow: string;
        closeIconTint: string;
        background: string;
        width: string;
        height: string;
        border: string;
        display: string;
        justifyContent: string;
    };
    sendSmartReply(_event: any): void;
    closeSmartReply(): void;
    getSmartReplyView(message: CometChat.TextMessage): {
        componentName: string;
        props: {
            smartReplyStyle: {
                replyTextFont: string;
                replyTextColor: string;
                replyBackground: string;
                boxShadow: string;
                closeIconTint: string;
                background: string;
                width: string;
                height: string;
                border: string;
                display: string;
                justifyContent: string;
            };
            replies: any[];
            listeners: {
                "cc-reply-clicked": (e: any) => void;
                "cc-close-clicked": any;
            };
        };
    };
}
