export const messageKitBlockStyle = props => {
	return {
		padding: "15px",
		border: props.border,
		borderRadius: "15px",
		backgroundColor: props.backgroundColor,
	};
};

export const messageBlockStyle = props => {
	return {
		margin: "0",
		maxWidth: props.width,
		height: props.height,
		display: "flex"
	};
};

export const messageIconStyle = props => {
	return {
		WebkitMask: `url(${props.iconURL}) no-repeat left center`,
		backgroundColor: `${props.iconTint}`,
		width: "24px",
		height: "24px",
		display: "inline-block",
	};
};

export const messageTxtStyle = props => {
	return {
		margin: "0",
		whiteSpace: "pre-wrap",
		wordBreak: "break-word",
		textAlign: "left",
		width: "calc(100% - 24px)",
		font: `${props.titleFont}`,
		color: `${props.titleColor}`,
		paddingLeft: "8px",
	};
};

export const messageBtnStyle = () => {
	return {
		width: "100%",
		listStyleType: "none",
		padding: "0",
		margin: "0",
	};
};

export const messageBtnItemStyle = props => {
	return {
		backgroundColor: `${props.buttonBackgroundColor}`,
		borderRadius: props.cornerRadius,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		position: "relative",
		margin: "16px 0 0 0",
		padding: "8px",
		cursor: "pointer",
	};
};

export const messageBtnItemTextStyle = props => {
	return {
		background: "0 0",
		textAlign: "center",
		color: `${props.buttonTextColor}`,
		width: "100%",
		font: `${props.buttonTextFont}`,
		display: "inline-block",
		margin: "0",
	};
};