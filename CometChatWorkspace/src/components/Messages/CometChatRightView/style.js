import { messageAlignment } from "../";

export const messageRightGutterStyle = () => {
  return {
    flex: "1 1 0",
    minWidth: "0",
    padding: "8px",
    paddingLeft: "16px",
    margin: "-8px -8px -16px -16px",
    height: "100%",
  };
};

export const messageSenderStyle = props => {
  return {
    color: props.usernameColor,
    font: props.usernameFont,
  };
};

export const messageKitReceiptStyle = props => {
  let justifyContent = { justifyContent: "flex-start" };
  if (props.messageAlignment === messageAlignment.standard && props.loggedInUser?.uid === props.messageObject?.sender?.uid) {
    justifyContent = { justifyContent: "flex-end" };
  }

  return {
    display: "flex",
    alignItems: "center",
    height: "24px",
    ...justifyContent,
  };
};

export const messageTimestampStyle = () => {
  return {
    display: "flex",
    alignItems: "center",
    height: "24px",
  };
};

export const messageReplyReceiptStyle = props => {

	const position = (props.messageAlignment === messageAlignment.standard && props.loggedInUser?.uid === props.messageObject?.sender?.uid) ? {
		justifyContent: "flex-end",
	} : {
		justifyContent: "flex-start"
	}

	return {
		width: "100%",
		height: "24px",
		display: "flex",
		alignItems: "center",
		...position,
	};
}