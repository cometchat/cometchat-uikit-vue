export const backdropStyle = (position) => {
  return {
    zIndex: "1000",
    backgroundColor: "#000",
    opacity: ".3",
    position: `${position ? position : "fixed"}`,
    width: "100%",
    height: "100%",
    top: "0",
    left: "0",
    cursor: "pointer",
    transition: "background .3s ease-out 0",
  };
};
