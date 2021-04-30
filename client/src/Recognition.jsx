import React,{useEffect, useState} from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import api from './api/api'
export default function Recognition () {
    const [data, setText] = useState({})
    const [toggleBtn, setToggleBtn] = useState(false)
    const { transcript,interimTranscript,finalTranscript,resetTranscript} = useSpeechRecognition();
    const {text,interim,final} = data

    useEffect(() => {
        if (!SpeechRecognition.browserSupportsSpeechRecognition()) return null
        setText({
            text: transcript,
            interim: interimTranscript,
            final: finalTranscript
        })
    },[transcript,interimTranscript,finalTranscript])

    const fetchData = async (txt) => {
        if (text === '') return console.log('no term');
        const {data} = await api({
            method: 'POST',
            responseType: 'arraybuffer',
            url: '/cmd',
            data: {
                txt: txt, 
                lang: 'he-IL'
            }
        })
        const getAudioContext =  () => new (window.AudioContext || window.webkitAudioContext)();
        const audioContext = getAudioContext();
        const audioBuffer = await audioContext.decodeAudioData(data);
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        return source.start()
    }   
    useEffect(() => {
        let id;
        if (interimTranscript.includes('חפש בגוגל')){
            id = setTimeout( () => {
                googleSearch(interimTranscript)
            } ,500)
        }
        return () => clearTimeout(id)
    }, [interimTranscript])
    const googleSearch = interim => {
        const words = interim.split(' ')
        window.open(`https://www.google.com/search?q=${words.splice(2,words.length).join(' ')}`)
    }
    useEffect(() => {
        if (interimTranscript === 'דבר'){
            fetchData(finalTranscript)
        }
        if (interimTranscript === 'מחק'){
            clear()
        }
    },[interimTranscript])
    const handleReco = () => {
        setToggleBtn(toggleBtn => !toggleBtn)
        toggleBtn === true
        ? SpeechRecognition.startListening({continuous: toggleBtn,language:'he-IL'})
        : SpeechRecognition.stopListening({continuous: false})
    }
    const clear = () => {
        resetTranscript()
        setText('')
    }
  return (
      <div>
        <p>Transcript: {text}</p>
        <p>interim Transcript: {interim}</p>
        <p>final Transcript: {final}</p>
        <div>
            <button onClick={() => handleReco()}>{'start' || !toggleBtn ? 'start' : 'stop'}</button>
        </div>
        <button onClick={() => fetchData(transcript)}>speak</button>
        <button onClick={clear}>clear</button>
      </div>
  )
}