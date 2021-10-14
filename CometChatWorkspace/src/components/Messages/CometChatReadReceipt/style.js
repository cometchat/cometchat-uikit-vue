export const msgTimestampStyle = (theme) => {
  return {
    display: "inline-block",
    fontSize: "11px",
    fontWeight: "500",
    lineHeight: "20px",
    textTransform: "uppercase",
    color: `${theme.color.helpText}`,
  };
};

export const iconStyle = (img, color) => {
  return {
      maskImage: `url(${img})`,
      maskRepeat: "no-repeat",
      maskPosition: "center",
      background: `${color}`,
      display: "inline-block",
      width: "24px",
      height: "24px"
  }
}