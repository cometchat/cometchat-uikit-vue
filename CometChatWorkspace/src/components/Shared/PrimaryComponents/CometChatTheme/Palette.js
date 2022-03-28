// const modes = {
// 	light: "light",
// 	dark: "dark"
// }

// const getAccentOpacity = (colorCode, opacity) => {

// 	if (colorCode.startsWith("#")) {
// 		return hexToRGBA(colorCode, opacity);
// 	};

// 	return RGBToRGBA(colorCode, opacity);
// };

// const hexToRGBA = (hex, opacity) => {

// 	const r = parseInt(hex.slice(1, 3), 16);
// 	const g = parseInt(hex.slice(3, 5), 16);
// 	const b = parseInt(hex.slice(5, 7), 16);

// 	return "rgba(" + +r + "," + +g + "," + +b + "," + opacity + ")";
// };

// const RGBToRGBA = (rgb, opacity) => {

// 	// Choose correct separator
// 	let sep = rgb.indexOf(",") > -1 ? "," : " ";
// 	// Turn "rgb(r,g,b)" into [r,g,b]
// 	rgb = rgb.substr(4).split(")")[0].split(sep);

// 	let r = (+rgb[0]).toString(16),
// 		g = (+rgb[1]).toString(16),
// 		b = (+rgb[2]).toString(16);

// 	return "rgba(" + r + "," + g + "," + b + "," + opacity + ")";
// }

// export const Palette = {
// 	mode: modes.light,
// 	primary: {
// 		light: "rgb(51, 153, 255)",
// 		dark: "rgb(51, 153, 255)",
// 	},
// 	error: {
// 		light: "rgb(255, 59, 48)",
// 		dark: "rgb(255, 59, 48)",
// 	},
// 	accent: {
// 		light: "rgb(20, 20, 20)",
// 		dark: "rgb(255, 255, 255)",
// 	},
// 	accent50: {
// 		light: getAccentOpacity(this.accent[this.mode], "0.04"),
// 		dark: getAccentOpacity(this.accent[this.mode], "0.04"),
// 	},
// 	accent100: {
// 		light: getAccentOpacity(this.accent[this.mode], "0.08"),
// 		dark: getAccentOpacity(this.accent[this.mode], "0.08"),
// 	},
// 	accent200: {
// 		light: getAccentOpacity(this.accent[this.mode], "0.15"),
// 		dark: getAccentOpacity(this.accent[this.mode], "0.14"),
// 	},
// 	accent300: {
// 		light: getAccentOpacity(this.accent[this.mode], "0.24"),
// 		dark: getAccentOpacity(this.accent[this.mode], "0.23"),
// 	},
// 	accent400: {
// 		light: getAccentOpacity(this.accent[this.mode], "0.33"),
// 		dark: getAccentOpacity(this.accent[this.mode], "0.34"),
// 	},
// 	accent500: {
// 		light: getAccentOpacity(this.accent[this.mode], "0.46"),
// 		dark: getAccentOpacity(this.accent[this.mode], "0.46"),
// 	},
// 	accent600: {
// 		light: getAccentOpacity(this.accent[this.mode], "0.58"),
// 		dark: getAccentOpacity(this.accent[this.mode], "0.58"),
// 	},
// 	accent700: {
// 		light: getAccentOpacity(this.accent[this.mode], "0.69"),
// 		dark: getAccentOpacity(this.accent[this.mode], "0.71"),
// 	},
// 	accent800: {
// 		light: getAccentOpacity(this.accent[this.mode], "0.82"),
// 		dark: getAccentOpacity(this.accent[this.mode], "0.84"),
// 	},
// };