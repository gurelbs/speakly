import React,{useEffect,useCallback} from 'react';
import Quill from 'quill';
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import "quill/dist/quill.snow.css" 
import './styles/editor.css'
const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
  ]
export default function Translator() {
    const textEditorRef = useCallback((wrapp) => {
        if (!wrapp) return
        wrapp.innerHTML = ''
        const editor = document.createElement('div')
        wrapp.append(editor)
        new Quill(editor, {theme: "snow", modules: { toolbar: TOOLBAR_OPTIONS }})
        return () => textEditorRef.innerHTML = ''
    },[])
    return (
        
        <div className="page">
            <div id="container" className="editor-container" ref={textEditorRef}>

            </div>
        </div>
    )
}
