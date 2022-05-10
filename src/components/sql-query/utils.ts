export function getModelText(model: any, position: any) {
    const { lineNumber, column } = position
    return (textPositionOfPoint: string, isMultiText: boolean) => {
        let text = ''
        if (textPositionOfPoint === 'before') {
            text = model.getValueInRange({
                startLineNumber: isMultiText ? 1 : lineNumber,
                startColumn: 0,
                endLineNumber: lineNumber,
                endColumn: column
            })
        } else {
            text = model.getValueInRange({
                startLineNumber: lineNumber,
                startColumn: column,
                endLineNumber: isMultiText ? model.getLineCount() : lineNumber,
                endColumn: model.getLineMaxColumn(model.getLineCount())
            })
        }
        const texts = text.trim().split(/\s+/)
        return texts[texts.length - 1].toLowerCase()
    }
}

/**
 * 
 * 联想<库名>.<表名> || <别名>.<字段>
* 联想库名
* 联想字段
* 自定义字段联想
* 默认联想关键字
*/

// 联想库名
export function getSuggestions() {

}