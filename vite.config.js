import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        outDir : "",
        lib: {
            entry: resolve(__dirname, 'src/index.js'),
            name: 'SmartShape',
            fileName: 'smart_shape',
        },
    }
})
