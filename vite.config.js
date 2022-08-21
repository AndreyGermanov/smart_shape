import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        outDir : "",
        lib: {
            entry: resolve(__dirname, 'src/smart_shape.js'),
            name: 'SmartShape',
            fileName: 'smart_shape',
        },
    }
})
