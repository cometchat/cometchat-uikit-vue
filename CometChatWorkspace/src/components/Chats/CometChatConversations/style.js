import { CometChatLocalize } from "../../";

export const containerStyle = props => {
	return {
		width: props.style.width,
		height: props.style.height,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
		border: props.style.border,
		overflowY: "scroll",
		overflowX: "auto",
	};
};

export const startConversationBtnStyle = props => {

    const direction = CometChatLocalize.isRTL() ? { left: "16px" } : { right: "16px" };
	return {
		mask: `url(${props.startConversation.iconURL}) no-repeat left center`,
		backgroundColor: `${props.startConversation.iconTint}`,
		height: "24px",
		width: "24px",
		cursor: "pointer",
		position: "absolute",
		top: "20px",
		...direction,
	};
};
