/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		screens: {
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
		},
		extend: {
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
			},
			colors: {
				mainBlack: "#3A3A5B",
				mainBlue: "#539CFF",
				mainPeach: "#EEA47F",
				darkBlue: "#427DCC",
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
