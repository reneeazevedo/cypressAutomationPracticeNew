/// <reference types = "cypress" />
export class Util {
    RemoveAllLinesAndTabs(text) {
        const textformatedstreet = text
            .trim()
            .replace(new RegExp(/['\t']/g), "")
            .replace(new RegExp(/['\n']/g), "")
            .replace(new RegExp('\n'), " ")
        return textformatedstreet
    }
}