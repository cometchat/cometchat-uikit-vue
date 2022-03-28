import {hexToRGB} from '../../../util/common'

export const contactWrapperStyle = (props) => {

  const titleColorInRGB = hexToRGB(props.titleColor);
  const borderStyle = (props._parent === "") ? {
      border: `1px solid rgba(${titleColorInRGB}, 10%)`
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
              background: "#ffffff00"
          },
          "::-webkit-scrollbar-thumb": {
              background: "#ccc",
              "&:hover": {
                  background: "#aaa"
              }
          }
      }
  }
}

export const contactHeaderStyle = ({ color }) => {
  return {
    padding: "19px 16px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    borderBottom: `1px solid ${color.darkSecondary}`,
  };
};

export const contactHeaderCloseStyle = (img, theme) => {
  return {
    cursor: "pointer",
    display: "none",
    mask: `url(${img}) left center no-repeat`,
		backgroundColor: `${theme.secondaryTextColor}`,
    height: "24px",
    width: "33%",
  };
};

export const contactHeaderTitleStyle = (props) => {

  const alignment = (props.enableCloseMenu && props.enableCloseMenu.length > 0) ? {
      width: "33%",
      textAlign: "center"
  } : {};

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
      }
  }
}

export const contactSearchStyle = (props) => {
  
  const searchBarColorInRGB = hexToRGB(props.searchBarTextColor);

  return {
      margin: "16px 16px",
      position: "relative",
      borderRadius: props.searchBarCornerRadius,
      boxShadow: `rgba(${searchBarColorInRGB}, 4%) 0 0 0 1px inset`,
      backgroundColor: props.searchBarBackgroundColor,
      font: props.searchBarTextFont,
      color: props.searchBarTextColor,
      lineHeight: "20px",
      height: "32px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
  }
}

export const contactSearchInputStyle = (theme, img) => {
  return {
    display: "block",
    width: "100%",
    border: "0",
    boxShadow: "rgba(20, 20, 20, 0.04) 0 0 0 1px inset",
    borderRadius: "8px",
    padding: "6px 8px 6px 35px",
    fontSize: "15px",
    outline: "none",
    color: `${theme.color.primary}`,
    background: `url(${img}) 10px center no-repeat ${theme.backgroundColor.grey}`,
  };
};

export const contactMsgStyle = () => {
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

export const contactMsgTxtStyle = props => {
    
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

export const contactListStyle = () => {
  return {
    height: "calc(100% - 125px)",
    overflowY: "auto",
    margin: "0",
    padding: "0",
  };
};

export const contactAlphabetStyle = (props) => {

  const titleColorInRGB = hexToRGB(props.titleColor);
  
  return {
      padding: "0 16px",
      margin: "8px 0",
      width: "100%",
      font: "500 12px Inter",
      color: `rgba(${titleColorInRGB}, 50%)`,
  };
}
