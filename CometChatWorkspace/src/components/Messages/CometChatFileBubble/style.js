export const messageKitBlockStyle = props => {
	return {
		borderRadius: props.cornerRadius,
		padding: "8px 16px",
		background: props.backgroundColor,
		display: "flex",
		width: "100%",
		border: props.border,
	};
};

export const messageBlockStyle = () => {
	return {
		width: "calc(100% - 24px)",
		whiteSpace: "pre-wrap",
		wordWrap: "break-word",
		textAlign: "left",
		margin: "0 8px 0 0",
	};
};

export const messageTitleStyle = props => {
	return {
		color: `${props.titleColor}`,
		font: `${props.titleFont}`,
	};
};

export const messageTitleLinkStyle = props => {
	return {
		color: `${props.titleColor}`,
		font: `${props.titleFont}`,
	};
}

export const messageSubTitleStyle = props => {
	return {
		color: `${props.subTitleColor}`,
		font: `${props.subTitleFont}`,
	};
};

export const messageFileStyle = () => {
	return {
		width: "24px",
		margin: "8px 0",
	};
};

export const messageFileIconStyle = (icon, props) => {
	return {
		WebkitMask: `url(${icon}) center center no-repeat`,
		backgroundColor: `${props.iconTint}`,
		display: "inline-block",
		width: "24px",
		height: "24px",
	};
};