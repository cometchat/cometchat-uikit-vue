/*eslint no-prototype-builtins: "error"*/
import dateFormat from "dateformat";

/**
 * Extracts extension data from message
 * @param {*} message
 * @param {*} extensionKey
 */
export const getExtensionsDataFromMessage = (message, extensionKey) => {
  let output = null;

  if (Object.prototype.hasOwnProperty.call(message, "metadata")) {
    const metadata = message.metadata;
    const injectedObject = metadata["@injected"];
    if (
      injectedObject &&
      Object.prototype.hasOwnProperty.call(injectedObject, "extensions")
    ) {
      const extensionsObject = injectedObject["extensions"];
      if (
        extensionsObject &&
        Object.prototype.hasOwnProperty.call(extensionsObject, extensionKey)
      ) {
        output = extensionsObject[extensionKey];
      }
    }
  }
  return output;
};

/**
 * Simple logger utility
 * @param {*} type
 * @param  {...any} args
 */
export const logger = (type = "error", ...args) => {
  if (process.env.NODE_ENV === "development") {
    const log = console[type];

    if (!log) {
      return;
    }

    if (args) {
      log(...args);
    }
  }
};

export const ID = () => {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

export const getUnixTimestamp = () => {

  return Math.round(+new Date() / 1000);
}

export const checkMessageForExtensionsData = (message, extensionKey) => {

  let output = null;
  
  if (message.metadata) {

      const metadata = message.metadata;
      const injectedObject = metadata["@injected"];
      if (injectedObject && injectedObject.extensions) {

          const extensionsObject = injectedObject["extensions"];
          if (extensionsObject && extensionsObject.extensionKey) {

              output = extensionsObject[extensionKey];
          }
      }
  }

  return output;
}

export const getMessageFileMetadata = (message, metadataKey) => {

  let fileMetadata = null;
  if(message.metadata) {
      const metadata = message.metadata;
      if (metadata[metadataKey]) {
        fileMetadata = metadata[metadataKey];
      }
  }

  return fileMetadata;
}

export const getMessageSentTime = (timestamp) => {

  let oTimestamp = null;

  const messageTimestamp = new Date(timestamp) * 1000;
  oTimestamp = dateFormat(messageTimestamp, "shortTime");

  return oTimestamp;
}

export const hexToRGB = (h) => {
	let r = 0,
		g = 0,
		b = 0;

	// 3 digits
	if (h && h.length === 4) {
		r = "0x" + h[1] + h[1];
		g = "0x" + h[2] + h[2];
		b = "0x" + h[3] + h[3];

		// 6 digits
	} else if (h && h.length === 7) {
		r = "0x" + h[1] + h[2];
		g = "0x" + h[3] + h[4];
		b = "0x" + h[5] + h[6];
	}

	return +r + "," + +g + "," + +b;
}