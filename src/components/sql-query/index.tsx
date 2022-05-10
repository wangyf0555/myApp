import Editor from "@monaco-editor/react";
import { useMonacoEditor } from './sql-query.hooks';

function SqlQuery() {
    useMonacoEditor();
    return (
        <Editor
            height="90vh"
            defaultLanguage="sql"
            defaultValue=""
        />
    );
}

export default SqlQuery;