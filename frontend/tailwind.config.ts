import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				primary: {
					100: "#e4e5f1",
					200: "#c0c2db",
					300: "#9c9fc6",
					400: "#757aa5",
					500: "#8889b9",
					600: "#646791",
					700: "#4a4d6d",
					800: "#31334a",
					900: "#191a26",
				},
			},
		},
	},
	plugins: [],
};
export default config;
