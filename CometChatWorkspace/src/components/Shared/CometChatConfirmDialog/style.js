export const alertWrapperStyle = theme => {
	return {
		width: "calc(100% - 32px)",
		height: "auto",
		backgroundColor: `${theme.backgroundColor.white}`,
		position: "absolute",
		margin: "0 auto",
		padding: "16px",
		fontSize: "13px",
		borderRadius: "8px",
		border: "1px solid #eee",
		zIndex: "1000",
		top: "50%",
		left: "0",
		right: "0",
		transform: "translateY(-50%)",
	};
};

export const alertMessageStyle = () => {
	return {
		textAlign: "center"
	}
}

export const alertButtonWrapStyle = () => {
	return {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		margin: "24px 0 0 0",
	};
}

export const alertButtonStyleYes = (theme) => {
	return {
		padding: "5px 24px",
		margin: "0 8px",
		borderRadius: "4px",
		fontSize: "12px",
		fontWeight: "600",
		border: `1px solid ${theme.borderColor.blue}`,
		backgroundColor: `${theme.backgroundColor.blue}`,
		color: `${theme.color.white}`,
	}
}

export const alertButtonStyleNo = (theme) => {
	return {
		padding: "5px 24px",
		margin: "0 8px",
		borderRadius: "4px",
		fontSize: "12px",
		fontWeight: "600",
		border: `1px solid ${theme.borderColor.blue}`,
		backgroundColor: `${theme.backgroundColor.secondary}`,
	}
}