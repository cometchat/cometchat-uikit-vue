import { PropType, Ref } from 'vue';
import { getBackButtonStyle, getBotsContainerStyle, getBotTitleStyle, getOptionStyle } from "./style";
import { AIAssistBotConfiguration } from '@cometchat/uikit-shared';
import { CometChatMessageComposerAction, CometChatTheme } from '@cometchat/uikit-resources';
declare const _sfc_main: import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
    };
    configuration: {
        type: PropType<AIAssistBotConfiguration>;
        default: () => AIAssistBotConfiguration;
    };
    bots: {
        type: PropType<CometChatMessageComposerAction[]>;
        default: () => CometChatMessageComposerAction[];
    };
    closeCallback: {
        type: PropType<() => void>;
    };
    backCallback: {
        type: PropType<() => void>;
    };
}, {
    getContainerStyle: (style?: import("@cometchat/uikit-shared").AIAssistBotStyle, theme?: CometChatTheme) => {
        display: string;
        overflow: string;
        width: string;
        height: string;
        justifyContent: string;
        alignItems: string;
        minHeight: string;
        background: string;
        borderRadius: string;
    };
    contentContainerStyle: import("vue").CSSProperties;
    optionsContainerStyle: import("vue").CSSProperties;
    getBackButtonStyle: typeof getBackButtonStyle;
    getBotsContainerStyle: typeof getBotsContainerStyle;
    getBotTitleStyle: typeof getBotTitleStyle;
    getOptionStyle: typeof getOptionStyle;
    onBotClick: (event: any) => void;
    assistBotStyle: Ref<{
        titleFont?: string;
        titleColor?: string;
        optionTitleFont?: string;
        optionTitleColor?: string;
        subtitleFont?: string;
        subtitleColor?: string;
        closeIconTint?: string;
        backIconTint?: string;
        sendIconTint?: string;
        buttonTextColor?: string;
        buttonTextFont?: string;
        buttonBackground?: string;
        loadingIconTint?: string;
        emptyIconTint?: string;
        errorIconTint?: string;
        height?: string;
        width?: string;
        border?: string;
        borderRadius?: string;
        background?: string;
    }>;
    theme: Ref<CometChatTheme>;
    backButtonIconURL: string;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
    };
    configuration: {
        type: PropType<AIAssistBotConfiguration>;
        default: () => AIAssistBotConfiguration;
    };
    bots: {
        type: PropType<CometChatMessageComposerAction[]>;
        default: () => CometChatMessageComposerAction[];
    };
    closeCallback: {
        type: PropType<() => void>;
    };
    backCallback: {
        type: PropType<() => void>;
    };
}>>, {
    configuration: AIAssistBotConfiguration;
    bots: CometChatMessageComposerAction[];
}, {}>;
export default _sfc_main;
