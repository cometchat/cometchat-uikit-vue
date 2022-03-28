import { ConversationListItemConfiguration } from "./";

const ConversationListConfiguration = function() {
	this.style = {
		width: "100%",
        height: "100%",
        border: "none",
        cornerRadius: "0",
        loadingIconTint: "",
        emptyTextFont: "",
        emptyTextColor: "",
        errorTextFont: "",
        errorTextColor: "",
		background: "transparent",
	},
	this.ConversationListItemConfiguration = new ConversationListItemConfiguration();
}

export { ConversationListConfiguration };