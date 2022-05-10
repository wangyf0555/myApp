import './AceAutoCompleter.less'
import { useState, useEffect } from 'react';

export default function AceAutoCompleter (props: any) {
    const { suggestions, show, position, currentWord, insertText } = props
    const [ activeIndex, setActiveIndex ] = useState<number>(0)

    const wrapStyles = { left: position.left, top: position.top }

    useEffect(() => {
        function handleKeyDown (e: KeyboardEvent) {
            if (e.code === 'Enter') {
                const activeSuggestion = suggestions[activeIndex]
                activeSuggestion && insertText(activeSuggestion)
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return function removeKeyDownEvent() {
            document.removeEventListener('keydown', handleKeyDown)
        }
    })

    function selectSuggestion (suggestion: {}) {
        insertText(suggestion)        
    }

    const suggestionList =  suggestions.map((suggestion: any, index: number) => {
        const wordStartIndex = suggestion.indexOf(currentWord)
        const wordEndIndex = wordStartIndex + currentWord.length
        const startText = suggestion.substring(0, wordStartIndex)
        const endText = suggestion.substring(wordEndIndex)
        return (
            <div className={`autocompleter-suggestion ${activeIndex === index ? 'active' : ''}`}
                onClick={ () => selectSuggestion(suggestion) }
                key={suggestion}>
                {startText}<span className='current-word'>{currentWord}</span>{endText}
            </div>
        )
    })

    const autoCompleterSuggestions = (
        <div className="autocompleter-suggestions">
            <div className="autocompleter-header">
            </div>
            <div className="autocompleter-entries">
                {suggestionList}
            </div>
        </div>
    )

    return (
        <div className="fw-ace-autocompleter" style={wrapStyles}>
            {show && suggestionList.length > 0 && autoCompleterSuggestions}
            <div className="autocompleter-details"></div>
        </div>
    )
}