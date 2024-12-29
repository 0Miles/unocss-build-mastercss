import { defineConfig, ExtractorContext } from 'unocss'
import { generateCSS, MasterCSS } from '@master/css'

const spaceRE = /\s+/g
const symbolRE = /['"`;{}:=]+/g

const findCompleteString = (content: string) => {
    const completeStrings = content?.match(/((?<!\\)["'`])(?:\\\1|(?:(?!\1))[\S\s])*(?<!\\)\1/g)
    return completeStrings
}

const replaceCompleteString = (content: string, completeStrings: string[] | null) => {
    completeStrings?.forEach((completeString, index) => {
        content = content.replace(completeString, `COMPLETE-STRING--${index}--`)
    })
    return content
}

export default defineConfig({
    rules: [
        [
            /.+/,
            ([classname], { }) => {
                return generateCSS([classname])
            }
        ]
    ],
    extractors: [
        {
            name: 'mastercss',
            extract: ({ code }: ExtractorContext) => {
                const result = new Set<string>()

                const process = (content?: string) => {
                    if (!content) return
                    const completeStrings = findCompleteString(content)
                    const code = replaceCompleteString(content, completeStrings)
                    const splitSpace = code.split(spaceRE)
                    splitSpace.forEach((splitSpaceBlock) => {
                        if (splitSpaceBlock.includes('COMPLETE-STRING--')) {
                            const index = parseInt(splitSpaceBlock.split('COMPLETE-STRING--')[1].split('--')[0])
                            const origin = completeStrings?.[index] ?? ''
                            result.add(splitSpaceBlock.replace(`COMPLETE-STRING--${index}--`, origin))
                            const trimQuotation = origin.slice(1, -1)
                            process(trimQuotation)
                            return
                        }
                        result.add(splitSpaceBlock)
                        const splitSymbol = splitSpaceBlock.split(symbolRE)
                        splitSymbol.forEach((splitSymbolBlock) => {
                            result.add(splitSymbolBlock)
                        })
                    })

                }

                process(code)
                return result
            }
        }
    ]
})