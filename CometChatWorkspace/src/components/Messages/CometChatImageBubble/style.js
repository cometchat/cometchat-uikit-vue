export const messageKitBlockStyle = props => {
	return {
		padding: "0",
		borderRadius: props.cornerRadius,
		background: props.backgroundColor,
		border: props.border,
		height: props.height,
	};
};

export const messageBlockStyle = props => {
	return {
		margin: "0",
		maxWidth: props.width,
		height: props.height,
		borderRadius: "inherit",
	};
};