export const messageKitBlockStyle = props => {
	return {
		borderRadius: props.cornerRadius,
		padding: "16px",
		background: props.backgroundColor,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		border: props.border,
	};
};

export const messageBlockStyle = () => {
	return {
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	};
};

export const pollQuestionStyle = props => {
	return {
		margin: "0",
		whiteSpace: "pre-wrap",
		wordWrap: "break-word",
		textAlign: "left",
		width: "100%",
		font: props.pollQuestionFont,
		color: props.pollQuestionColor,
	};
};

export const pollAnswerStyle = () => {
	return {
		listStyleType: "none",
		padding: "0",
		margin: "0",
		width: "100%",
	};
};

export const voteCountStyle = props => {

    return {
		width: "100%",
		"p": {
			margin: "0",
			whiteSpace: "pre-wrap",
			wordWrap: "break-word",
			textAlign: "left",
			width: "100%",
			font: props.voteCountFont,
			color: props.voteCountColor,
		}
    }
}

export const voteCountTextStyle = props => {
	return {
		margin: "0",
		whiteSpace: "pre-wrap",
		wordWrap: "break-word",
		textAlign: "left",
		width: "100%",
		font: props.voteCountFont,
		color: props.voteCountColor,
	};
}