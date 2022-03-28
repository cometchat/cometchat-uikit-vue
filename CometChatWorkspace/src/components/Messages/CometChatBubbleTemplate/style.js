export const messageHoverStyle = props => {
  return {
    width: `${props.width}`,
    height: `${props.height}`,
  };
};

export const messageActionsStyle = () => {
  return {
    position: "relative",
  };
};

export const messageGutterStyle = () => {
  return {
    padding: "8px 20px",
    display: "flex",
    width: "100%",
  };
};