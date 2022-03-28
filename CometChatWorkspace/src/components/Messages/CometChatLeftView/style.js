import { messageAlignment } from "../";

export const messageLeftGutterStyle = () => {

  return {
    marginRight: "8px",
    display: "flex",
    flexDirection: "column",
  };
};

export const messageAvatarStyle = () => {
  return {
    flexShrink: "0",
    position: "relative",
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