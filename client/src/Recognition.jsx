import React,{useEffect, useState} from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import api from './api/api'
import Languages from './Languages'
import allLanguagesList from './languagesList'
import {
    googleSearch
} from './Commands/Commends'

export default function Recognition () {
    const [currentLanguages, setCurrentLanguages] = useState('')
    const [textData, setTextData] = useState({})
    const [textAnswer, setTextAnswer] = useState('')
    const [toggleBtn, setToggleBtn] = useState(true)
    const [isSleep, setIsSleep] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { transcript,interimTranscript,finalTranscript,resetTranscript} = useSpeechRecognition();
    let {text,interim,final} = textData
    useEffect(() => {
        if (!SpeechRecognition.browserSupportsSpeechRecognition()) return console.log('browser not supported');
        if (!isSleep){
            SpeechRecognition.startListening({continuous: true})
        }
        setTextData({
            text: transcript,
            interim: interimTranscript,
            final: finalTranscript
        })
    },[transcript,interimTranscript,finalTranscript])

    const fetchData = async (txt) => {
        if (final?.trim() === '' || !final?.length) return console.log('no term');
        setIsLoading(true)
        try {
            const userData = await api({
                method: 'POST',
                // responseType: 'arr',
                url: '/cmd',
                data: {
                    txt: txt,
                    lang: currentLanguages || 'he-il'
                }
            })
            const {decoded, answer} = userData.data
            setIsLoading(false)
            setTextAnswer(answer.res);
            const encoded = Uint8Array.from([...decoded].map(ch => ch.charCodeAt())).buffer;
            let audio = new (window.AudioContext || window.webkitAudioContext)();
            let data = await audio.decodeAudioData(encoded)
            let source = audio.createBufferSource();
            source.buffer = data
            source.connect(audio.destination)
            return source.start()
            
        } catch (error) {
            // setTextAnswer('קצת מביך, לא מצאתי כלום...');
            console.log(error);
        }
    }
    useEffect(() => {
        let id;
        if (final?.includes('חפש בגוגל')){
            id = setTimeout( () => {
                googleSearch(final)
            } ,300)
        }
        return () => clearTimeout(id)
    }, [final])
    useEffect(() => {
        let id;
        if (final?.length > 0 && text !== '' && interim === ''){
            console.log('auto run after 10ms');
            setTimeout(() => {
                fetchData(final)
            }, 10);
        }
        return () => clearTimeout(id)
    }, [final])
    const clear = () => {
        resetTranscript()
        setTextAnswer('')
    }
    const handleReco = () => {
        setToggleBtn(toggleBtn => !toggleBtn)
        return toggleBtn === true
            ? SpeechRecognition.startListening({continuous: true})
            : SpeechRecognition.stopListening({continuous: false})
    }
    const stopReco = () => {
        setToggleBtn(!toggleBtn)
        setIsSleep(true)
        clear()
        return SpeechRecognition.stopListening({continuous: false})
    }
    useEffect(() => {
        if (interimTranscript === 'דבר') {
            fetchData(finalTranscript)
            clear()
        }
    }, [interimTranscript,finalTranscript])
    useEffect(() => {
        if (interimTranscript === 'מחק') clear()
    }, [interimTranscript])
    useEffect(() => {
        if (interimTranscript === 'לך לישון') stopReco()
    }, [interimTranscript])
    useEffect(() => {
        if (interimTranscript.startsWith('תרגם')){
            let langText = interimTranscript.split(' ')
            let lang = langText.splice(langText.length-1,langText.length).join('')
            console.log(lang.split('').splice(1,lang.length).join(''))
        }
    }, [interimTranscript])
  return (
      <div>
        <p>Transcript: {text}</p>
        <p>interim Transcript: {interim}</p>
        <p>final Transcript: {final}</p>
        <h1 style={{direction: 'rtl', textAlign: 'center'}}>{textAnswer}</h1>
        <Languages cb={e => setCurrentLanguages(e.target.value)} languagesList={allLanguagesList}/>
        <div>
            <button onClick={() => handleReco()}>{!toggleBtn ? 'עצור' : 'התחל'}</button>
        </div>
        <button 
            disabled={(text !== '' || !toggleBtn) ? false : true}
            onClick={() => fetchData(transcript)}>דבר</button>
        <button onClick={clear}>מחק</button>
      </div>
  )
}