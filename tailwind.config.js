/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            screens: {
				'w450': {"raw": "(min-width: 450px)"}
			},
        },
    },
    plugins: [],
}
