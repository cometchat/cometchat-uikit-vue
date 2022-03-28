export const messageKitBlockStyle = props => {
  return {
    borderRadius: props.cornerRadius,
    padding: "8px 16px",
    background: props.backgroundColor,
    border: props.border,
  };
};

export const messageBlockStyle = props => {
  return {
    color: props.textColor,
    font: props.textFont,
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    textAlign: "left",
    margin: "0",
    '.emoji': {
      width: "24px",
      height: "24px",
      display: "inline-block"
    },
    // a: {
    // 	color: "inherit",
    // },
  };
};