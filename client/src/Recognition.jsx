import React,{useEffect, useState} from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import api from './api/api'
export default function Recognition () {
    const [textData, setTextData] = useState({})
    const [toggleBtn, setToggleBtn] = useState(true)
    const { transcript,interimTranscript,finalTranscript,resetTranscript} = useSpeechRecognition();
    let {text,interim,final} = textData
    
    useEffect(() => {
        if (!SpeechRecognition.browserSupportsSpeechRecognition()) return null
        SpeechRecognition.startListening({continuous: true})
        setTextData({
            text: transcript,
            interim: interimTranscript,
            final: finalTranscript
        })
    },[transcript,interimTranscript,finalTranscript])

    const fetchData = async (txt) => {
        if (text === '') return console.log('no term');
        const userData = await api({
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
        const audioBuffer = await audioContext.decodeAudioData(userData.data);
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
    const clear = () => {
        resetTranscript()
        setTextData('')
    }
    const handleReco = () => {
        setToggleBtn(toggleBtn => !toggleBtn)
        clear()
        return toggleBtn
        ? SpeechRecognition.startListening({continuous: true})
        : SpeechRecognition.stopListening({continuous: false})
    }
    useEffect(() => {
        if (interimTranscript === 'דבר') {
            fetchData(finalTranscript)
            clear()
        }
    }, [interimTranscript,finalTranscript])
    useEffect(() => {
        if (interimTranscript === 'מחק') return clear()
    }, [interimTranscript])

  return (
      <div>
        <p>Transcript: {text}</p>
        <p>interim Transcript: {interim}</p>
        <p>final Transcript: {final}</p>
        <div>
            <button onClick={() => handleReco()}>{toggleBtn ? 'עצור' : 'התחל'}</button>
        </div>
        <button 
            disabled={!toggleBtn}
            onClick={() => fetchData(transcript)}>דבר</button>
        <button onClick={clear}>מחק</button>
      </div>
  )
}