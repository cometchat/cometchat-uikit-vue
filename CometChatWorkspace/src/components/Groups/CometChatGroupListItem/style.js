export const listItemStyle = (props) => {
  const selectedState =
    props.selectedGroup && props.selectedGroup.guid === props.group.guid
      ? {
          backgroundColor: `${props.theme.backgroundColor.primary}`,
        }
      : {};

  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
    cursor: "pointer",
    width: props.width,
    height: props.height,
    padding: "8px 16px",
    ...selectedState,
    "--group-item-bg-color-hover": `${props.theme.backgroundColor.primary}`,
  };
};

export const listItemIconStyle = (img, props) => {
  return {
    display: "inline-block",
    width: "24px",
    height: "24px",
    maskImage: `url(${img})`,
    maskRepeat: "no-repeat",
    maskPosition: "center",
    backgroundColor: `${props.theme.secondaryTextColor}`,
  };
};

export const itemThumbnailStyle = () => {
  return {
    display: "inline-block",
    width: "36px",
    height: "36px",
    flexShrink: "0",
  };
};

export const itemDetailStyle = () => {
  return {
    width: "calc(100% - 70px)",
    flexGrow: "1",
    paddingLeft: "15px",
  };
};

export const itemNameStyle = () => {
  return {
    maxWidth: "calc(100% - 30px)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    margin: "0",
  };
};

export const itemNameWrapperStyle = (props) => {
  return {
    lineHeight: "22px",
    font: props.titleFont,
    color: props.titleColor,
    display: "flex",
    alignItems: "center",
    width: "100%",
    margin: "0",
  }
};

export const itemDescriptionStyle = (props) => {
  return {
		borderWidth: `0 0 ${props.borderWidth} 0`,
		borderStyle: `${props.borderStyle}`,
		borderColor: props.borderColor,
		padding: "0 0 8px 0",
		font: `${props.subTitleFont}`,
		color: `${props.subTitleColor}`,
	};
};
