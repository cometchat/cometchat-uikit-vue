import { Palette } from "./Palette";
import { Typography } from "./Typography";
//import { Breakpoints } from "./Breakpoints";

class CometChatTheme {

	palette;
	typography;
	globalStyles;
	breakpoints;

	constructor(params) {

		for (const [key, value] of Object.entries(params.palette)) {

			//console.log(`${key}: ${value}`);

			if (Palette && Palette.key) {
				this.palette[key] = value;
			}
		}

		for (const [key, value] of Object.entries(params.typography)) {
			
			//console.log(`${key}: ${value}`);

			if (Typography && Typography.key) {
				this.typography[key] = value;
			}
		}

		if (Object.keys(params.globalStyles).length) {
			this.globalStyles = { ...params.globalStyles };
		}

		if (Object.keys(params.breakpoints).length) {
			this.breakpoints["values"] = { ...params.breakpoints };
		}
	}
}

export { CometChatTheme };