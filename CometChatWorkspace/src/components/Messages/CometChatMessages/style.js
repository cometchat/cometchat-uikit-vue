export const chatWrapperStyle = () => {

	return {
		display: "flex",
		flexDirection: "column",
		height: "100%",
		boxSizing: "border-box",
		position: "relative",
		fontFamily: `Inter, sans-serif`,
		"*": {
			boxSizing: "border-box",
			fontFamily: `Inter, sans-serif`,
			"::-webkit-scrollbar": {
				width: "8px",
				height: "4px",
			},
			"::-webkit-scrollbar-track": {
				background: "#ffffff00",
			},
			"::-webkit-scrollbar-thumb": {
				background: "#ccc",
				"&:hover": {
					background: "#aaa",
				},
			},
		},
	};
};

export const liveReactionWrapperStyle = () => {
	return {
		position: "absolute",
		width: "100%",
		height: "100%",
		top: "0",
		right: "0",
		zIndex: "2",
		display: "flex",
		justifyContent: "left",
		alignItems: "center",
	};
};