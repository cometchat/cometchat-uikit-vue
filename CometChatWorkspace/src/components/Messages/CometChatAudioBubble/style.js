export const messageKitBlockStyle = props => {
	return {
		borderRadius: props.cornerRadius,
		// padding: "8px 16px",
		// background: props.backgroundColor,
		border: props.border,
		display: "flex",
		width: "100%",
	};
};

export const messageBlockStyle = () => {
	return {
		width: "100%",
		whiteSpace: "pre-wrap",
		wordWrap: "break-word",
		textAlign: "left",
		margin: "0",
		display: "inline-block",
	};
};

export const messageBlockAudioStyle = () => {
	return {
		width: "250px",
		height: "54px",
	};
};