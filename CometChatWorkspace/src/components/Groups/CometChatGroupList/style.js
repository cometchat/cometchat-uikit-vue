import {hexToRGB} from '../../../util/common' 

export const groupWrapperStyle = (props) => {

  const borderStyle = (props._parent === "") ? {
      border: `${props.borderWidth} ${props.borderStyle} ${props.borderColor}`,
  } : {};

  return {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    boxSizing: "border-box",
    backgroundColor: props.backgroundColor,
    ...borderStyle,
    "*": {
      boxSizing: "border-box",
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

export const groupHeaderStyle = () => {
  return {
    padding: "16px",
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "70px",
  };
};

export const groupHeaderCloseStyle = (img, theme) => {
  const mq = [...theme.breakPoints];

  return {
    cursor: "pointer",
    display: "none",
    mask: `url(${img}) left center no-repeat`,
    backgroundColor: `${theme.secondaryTextColor}`,
    height: "24px",
    width: "33%",
    [`@media ${mq[0]}`]: {
      display: "block!important",
    },
  };
};

export const groupHeaderTitleStyle = props => {

const alignment = props.enableCloseMenu && props.enableCloseMenu.length > 0 ? { width: "33%", textAlign: "center", } : {};
  return {
    margin: "0",
    display: "inline-block",
    width: "100%",
    textAlign: "center",
    font: props.titleFont,
    color: props.titleColor,
    lineHeight: "26px",
    ...alignment,
    "&[dir=rtl]": {
      textAlign: "right",
    },
  };
};

export const groupAddStyle = (img, theme) => {

  return {
    height: "24px",
    cursor: "pointer",
    i: {
      display: "inline-block",
      width: "24px",
      height: "24px",
      mask: `url(${img}) center center no-repeat`,
      backgroundColor: `${theme.primaryColor}`,
    },
  };
};

export const groupSearchStyle = props => {

  const searchBarColorInRGB = hexToRGB(props.searchBarTextColor);
  return {
    margin: "0 16px 16px 16px",
    position: "relative",
    borderRadius: props.searchBarCornerRadius,
    boxShadow: `rgba(${searchBarColorInRGB}, 4%) 0 0 0 1px inset`,
    backgroundColor: props.searchBarBackgroundColor,
    font: props.searchBarTextFont,
    color: props.searchBarTextColor,
    height: "35px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
};

export const groupSearchButtonStyle = (img, props) => {
    
	const searchBarColorInRGB = hexToRGB(props.searchBarTextColor);
	return {
		width: "30px",
		height: "100%",
		padding: "8px 0 8px 8px",
		cursor: "default",
		mask: `url(${img}) 10px center no-repeat`,
		backgroundColor: `rgba(${searchBarColorInRGB}, 40%)!important`,
	};
};

// export const groupSearchInputStyle = () => {
// 	return {
// 		width: "calc(100% - 30px)",
// 		height: "100%",
// 		padding: "8px",
// 		fontSize: "15px",
// 		outline: "none",
// 		border: "none",
// 		backgroundColor: "transparent",
// 	};
// };

export const groupSearchInputStyle = (theme, img) => {
  return {
    display: "block",
    width: "100%",
    border: "0",
    boxShadow: "rgba(20, 20, 20, 0.04) 0 0 0 1px inset",
    borderRadius: "8px",
    lineHeight: "20px",
    padding: "6px 8px 6px 35px",
    fontSize: "15px",
    outline: "none",
    color: `${theme.color.primary}`,
    background: `url(${img}) 10px center / 16px no-repeat ${theme.backgroundColor.grey}`,
  };
};

export const groupMsgStyle = () => {
	return {
		overflow: "hidden",
		width: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		top: "50%",
	};
};

export const groupMsgTxtStyle = props => {

	const titleColorInRGB = hexToRGB(props.titleColor);
	return {
		margin: "0",
		minHeight: "36px",
		color: `rgba(${titleColorInRGB}, 20%)`,
		fontSize: "20px!important",
		fontWeight: "600",
		lineHeight: "30px",
		wordWrap: "break-word",
		padding: "0 16px",
	};
};

export const groupListStyle = () => {
	return {
		height: "calc(100% - 125px)",
		overflowY: "auto",
		margin: "0",
		padding: "0",
	};
};