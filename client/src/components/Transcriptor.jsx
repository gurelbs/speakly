import React,{useEffect,useState,useCallback} from 'react';
import Quill from 'quill';
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import "quill/dist/quill.snow.css" 
import './styles/editor.css'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import {useParams} from 'react-router-dom'
import { io } from 'socket.io-client'
// ui
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
const TOOLBAR_OPTIONS = [
    ['bold', 'italic', 'underline', 'strike'],       // toggled buttons
    ['blockquote', 'code-block'],                    // blocks
    [{ 'header': 1 }, { 'header': 2 }],              // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],    // lists
    [{ 'script': 'sub'}, { 'script': 'super' }],     // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],         // outdent/indent
    [{ 'direction': 'rtl' }],                        // text direction
    [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],       // header dropdown
    [{ 'color': [] }, { 'background': [] }],         // dropdown with defaults
    [{ 'font': [] }],                                // font family
    [{ 'align': [] }],                               // text align
    ['clean'],                                       // remove formatting
  ]
export default function Translator() {
    const {
        interimTranscript,
        finalTranscript,
        resetTranscript,
        listening,
        browserSupportsSpeechRecognition,
      } = useSpeechRecognition()
    const [textData,setTextData] = useState({})
    const [socket,setSocket] = useState()
    const [quill,setQuill] = useState()
    const [isActive,setIsActive] = useState(false)
    const {id: documentId} = useParams()
    const ENDPOINT = "http://localhost:5000";
    useEffect(() => {
        const s = io(ENDPOINT)
        setSocket(s)
        return () => s.disconnect()
    },[])

    useEffect(() => {
        if (!quill || !socket) return 
        const handler = delta => quill.updateContents(delta)
        socket.on('receive-chenges',handler)
        return () => socket.off('receive-change',handler)
    },[quill,socket])

    useEffect(() => {
        if (!quill || !socket) return 
        const handler = (delta, oldDelta, source) => {
            if (source !== 'user') return
            socket.emit("send-chenges",delta)
        }
        quill.on('text-change',handler)
        return () => quill.off('text-change',handler)
    },[quill,socket])

    useEffect(() => {
        if (!quill || !socket) return 
        socket.once("load-document", document => {
            quill.setContents(document)
            quill.enable()
        })
        socket.emit('get-document',documentId)
    },[quill,socket,documentId])

    useEffect(() => {
        if (!quill || !socket) return
        const interval = setInterval(() => {
            socket.emit("save-document", quill.getContents())
        }, 2000);
        return () => clearInterval(interval)
    },[socket,quill])

    const textEditorRef = useCallback((wrapp) => {
        if (!wrapp) return
        wrapp.innerHTML = ''
        const editor = document.createElement('div')
        wrapp.append(editor)
        let q = new Quill(editor, {theme: "snow", modules: { toolbar: TOOLBAR_OPTIONS }})
        q.disable()
        q.setText('טוען...')
        setQuill(q)
    },[])
    
    useEffect(() => {
        if (!isActive || !quill || !finalTranscript || finalTranscript === '') return
        resetTranscript()
        quill.focus()
        let quillLength = quill.getLength() - 1
        quill.insertText(quillLength,`${finalTranscript} `)
    },[isActive,quill,finalTranscript])

    useEffect(() => {
        if (!isActive) {
            SpeechRecognition.stopListening()
            SpeechRecognition.abortListening() 
        } else {
            SpeechRecognition.startListening({continuous: true})
        }
    },[isActive])

    useEffect(() => {
        if (interimTranscript.includes('מחיקת הכל')) resetTranscript()
    },[interimTranscript])
    
    return (
        <div className="page">
            <Paper elevation={3} className="controls">
                <Grid 
                 container
                 direction="column"
                 justify="center"
                 alignItems="center">
                <IconButton  className='mic-icon' onClick={() => setIsActive(btn => !btn)}>
                    {isActive ? <MicIcon style={{ color: '#ba68c8' }} fontSize="large"/> : <MicOffIcon fontSize="large"/>}
                </IconButton>
                    {isActive ? <p1 className="code-txt">זיהוי קולי פעיל</p1> : ''}
                <p className="pre-txt">{interimTranscript}</p>
                </Grid>
            </Paper>
            <div id="container" ref={textEditorRef}></div>
        </div>
    )
}