

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-min-noconflict/ext-searchbox";
import * as lanageTools from "ace-builds/src-noconflict/ext-language_tools";
import './aceComponent.less';
import { useRef, useState, useEffect } from "react";
/**
 * lanageTools方法：
 * addCompleter,
 * keyWordCompleter: { getConpletions: funtion },
 * snippetCompleter: { getConpletions: funtion, getDocTooltip: function },
 * textCompleter: { getConpletions: funtion }
 * 
 * 
 */
 import Editor, { useMonaco } from "@monaco-editor/react";

export default function AceComponent(props: any) {
  const { tables = [], columns = []} = props

  const aceEditorEl = useRef(null)

  useEffect(() => {
    function getCompleters(prefix: string) {
      if (!prefix) return []
      const score = 1000
      const completers: any = []
      columns.forEach((col: string, index: number) => {
        if (col.indexOf(prefix) > -1) {
          completers.push({
            name: col,
            value: col,
            score: score + index,
            meta: 'rhyme'
          })
        }
      })
      return completers
    }
    const completers = {
      getCompletions: function (editor: any, session: any, pos: any, prefix: any, callBack: Function) {
        const completers = getCompleters(prefix)
        callBack(null, completers)
      }
    }
    lanageTools.addCompleter(completers)
  })

  return (
    <div className="ace-component">
      <AceEditor
        ref={ aceEditorEl }
        width='30vw'
        mode="mysql"
        theme="one_dark"
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        setOptions={
          {
            enableLiveAutocompletion: true
          }
        }
      />
    </div>
  );
}
