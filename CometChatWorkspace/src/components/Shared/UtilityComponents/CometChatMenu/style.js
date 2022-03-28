export const actionWrapperStyle = props => {
	return {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		listStyleType: "none",
		padding: "8px",
		margin: "0",
		background: "#fff",
		borderRadius: "4px",
		zIndex: 9999,
		...props.style
	};
};

export const menuActionStyle = menuIcon => {

	return {
		outline: "0",
		border: "0",
		height: "24px",
		width: "24px",
		borderRadius: "4px",
		alignItems: "center",
		display: "inline-flex",
		justifyContent: "center",
		position: "relative",
		background: `url(${menuIcon}) center center no-repeat`,
		cursor: "pointer",
	};
};

export const menuWrapperStyle = (props) => {
	return {
		position: "absolute",
		background: "#fff",
		top: "20px",
		left: "90%",
		listStyle: "none",
		padding: "1px",
		...props.menuStyle,
	}
}


export const menuItemStyle = () => {
	return {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		margin: "2px",
		background: "#fff"
	}
}

export const menuItemTitleStyle = () => {
	return {
		color: "#777",
		textAlign: "left",
	}
}