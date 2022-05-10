

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import './aceComponent.less';

import { useRef, useState } from "react";


export default function AceComponent(props: any) {
  const { tables = [], columns = []} = props

  const aceEditorEl = useRef(null)
  const [autoCompleterPosition, setAutoCompleterPosition] = useState({left: 0, top: 0})
  const [currentWord, setCurrentWord] = useState<string>('')
  const [suggestions, setSuggestions] = useState([])  
  const [showAutoCompleter, setShowAutoCompleter] = useState<boolean>(false)

  function getEditor () {
    return aceEditorEl.current?.['editor']
  }

  function getCurrentWord (row: number, column: number): string {
    const editor: any = getEditor()
    const session = editor.getSession()

    // 通过当前行的字符和光标所在的列获取word
    const currentText = session.getLine(row)
    const currentTextArray = currentText.split('')
    const currentColumn = column
    const currentWordArray = []
    for (let i = currentColumn - 1; i >= 0; i--) {
      const str = currentTextArray[i]
      if (typeof str === 'undefined') continue
      if (str === ' ') break
      currentWordArray.unshift(str)
    }
    return currentWordArray.join('')
  }

  function handleChange (value: any, event: any) {
    const { action, end } = event
    const { row, column } = end
    const realColumn = action === 'remove' ? column - 1 : column
    const currentWord = getCurrentWord(row, realColumn)
    setCurrentWord(currentWord)
    if (!currentWord) {
      setSuggestions([])
      setShowAutoCompleter(false)
      return
    }
    if (action === 'insert' || (action === 'remove' && showAutoCompleter)) {
        const macthList = columns.filter((col: any) => currentWord && col.indexOf(currentWord) > -1)
        setSuggestions(macthList)
        setShowAutoCompleter(!!macthList.length)
    }
  }


  function handlePaste (text: any) {
    console.log(text)
  }

  function handleFocus () {
  }

  function handleBlur () {
  }

  function handleClick (v: any) {
    setShowAutoCompleter(false)
  }

  function handleCursorChange (arg: any) {
    // 获取光标位置
    const editorEl = document.getElementById('UNIQUE_ID_OF_DIV')
    const textarea = editorEl?.getElementsByTagName('textarea')[0]
    const textareaRect = textarea?.getBoundingClientRect()
    const cursorPosition = {
      left: textareaRect?.x || 0,
      top: textareaRect?.y || 0
    }
    setAutoCompleterPosition(cursorPosition)
  }

  function handleSelectionChange (a:any, b:any) {
    // console.log(a, b)
  }

  function handleInsertText (suggestion: string) {
    const editor: any = getEditor()
    editor.insert(suggestion)
    const cursorPosition = editor.getCursorPosition()
    const { row, column } = cursorPosition
    setTimeout(() => {
      editor.navigateTo(row, column)
    }, 0);
    editor.focus()
  }

  return (
    <div className="ace-component" onClick={handleClick}>
      <AceEditor
        ref={ aceEditorEl }
        width='80vw'
        mode="mysql"
        theme="one_dark"
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        onChange={ handleChange }
        onPaste={ handlePaste }
        onFocus={ handleFocus }
        onBlur={ handleBlur }
        onCursorChange={handleCursorChange}
        onSelectionChange={handleSelectionChange}
        setOptions={
          {
            enableLiveAutocompletion: false
          }
        }
      />
    </div>
  );
}
