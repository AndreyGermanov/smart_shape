import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        host: true
    },
    build: {
        sourcemap: "true",
        outDir : "",
        lib: {
            entry: resolve(__dirname, 'src/index.js'),
            name: 'SmartShape',
            fileName: 'smart_shape',
        },
    }
})
