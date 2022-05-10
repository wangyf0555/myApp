import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useMonaco } from '@monaco-editor/react';
import { THEME_NAME, MONACO_EDITOR_THEME, KEYWORDS } from './constants';
import { getModelText } from './utils';

const keywords = KEYWORDS.map(key => ({
    label: key, insertText: key, detail: 'keyword'
}))
export function useCallbackRef(fn: (...args: any[]) => any) {
    const fnRef = useRef(fn);
    fnRef.current = fn;
    return useCallback((...args: any[]) => fnRef.current(...args), []);
}

export function useMonacoEditor() {
    const monaco = useMonaco();

    useEffect(() => {
        if (monaco) {
            monaco.editor.defineTheme(THEME_NAME, MONACO_EDITOR_THEME as any);
            monaco.editor.setTheme(THEME_NAME);
        }
    }, [monaco]);

    const provideCompletionItems = useCallbackRef((model: any, position: any) => {
        const getText = getModelText(model, position)
        const lastText = getText('before', false)
        console.log(lastText)
        const suggestion: any[] = [];
        return {
            suggestions: suggestion.map(item => ({
                ...item,
                kind: monaco?.languages.CompletionItemKind.Variable,
            })),
        } as any;
    });

    useEffect(() => {
        if (monaco) {
            monaco.languages.registerCompletionItemProvider('sql', {
                provideCompletionItems,
            });
        }
    }, [monaco, provideCompletionItems]);
}
