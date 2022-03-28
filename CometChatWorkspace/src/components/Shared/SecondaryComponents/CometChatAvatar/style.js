export const getImageStyle = (props, imageURL) => {
  return {
    display: "flex",
    width: "100%",
    height: "100%",
    flex: "1 1 100%",
    backgroundColor: props.backgroundColor,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: props.backgroundSize,
    backgroundImage: `url(${imageURL})`,
    border: props.border,
    borderRadius: props.cornerRadius,
  };
};

export const getContainerStyle = (props) => {
  return {
    height: props.height,
    width: props.width,
    borderRadius: props.cornerRadius,
    margin: props.outerViewSpacing,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#ffffff",
    boxSizing: "content-box",
    cursor: "inherit",
    outline: "none",
    overflow: "hidden",
    position: "static",
    padding: "0",
  };
};

export const getOuterViewStyle = (props) => {
  return {
    display: "inline-block",
    borderRadius: props.cornerRadius,
    border: props.outerView,
    margin: "0",
    padding: "0",
  };
};