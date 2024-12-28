import { defineConfig } from 'unocss'
import { generateCSS, MasterCSS } from '@master/css'

const masterCss = new MasterCSS()

export default defineConfig({
    rules: [
        [
            /[\w\W]+/,
            ([masterCssClass], { }) => {
                return generateCSS([masterCssClass], masterCss)
            }
        ]
    ]
})