export const backdropStyle = (props) => {

  return {
      zIndex: "3",
      backgroundColor: "rgba(0,0,0,0.3)",
      position: "fixed",
      width: "100%",
      height: "100%",
      top: "0",
      left: "0",
      cursor: "pointer",
      transition: "background .3s ease-out 0",
      ...props.style,
  }
}

export const dialogStyle = () => {

  return {
      opacity: "1"
  }
}