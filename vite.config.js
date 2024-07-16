import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
	resolve: {
		alias: {
			"@components": __dirname + "/src/components/",
			"@header": __dirname + "/src/components/0.header/",
			"@preview": __dirname + "/src/components/1.preview/",
			"@about": __dirname + "/src/components/2.about/",
			"@courses": __dirname + "/src/components/3.courses/",
			"@book": __dirname + "/src/components/4.book/",
			"@footer": __dirname + "/src/components/5.footer/",
			"@data": __dirname + "/src/data/",
			"@hooks": __dirname + "/src/hooks/"
		}
	}
})
