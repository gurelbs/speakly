import React,{useEffect, useState} from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { googleSearch, wikiSearch, youtubeSearch } from './Commands/Commends'
import api from './api/api'
import Languages from './Languages'
import allLanguagesList from './languagesList'
import Spinner from './Spinner'
import toArrayBuffer from './utils'

const Recognition =  () => {
    const [currentLanguages, setCurrentLanguages] = useState('')
    const [textData, setTextData] = useState({})
    const [arrayBufferData, setArrayBufferData] = useState(null)
    const [textAnswer, setTextAnswer] = useState(null)
    const [toggleBtn, setToggleBtn] = useState(true)
    const [isSleep, setIsSleep] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { transcript,interimTranscript,finalTranscript,resetTranscript} = useSpeechRecognition();
    let {text,interim,final} = textData
    useEffect(() => {
        const ssIsWork = SpeechRecognition.browserSupportsSpeechRecognition()
        if (!ssIsWork) console.log('browser not supported');
        if (!isSleep) SpeechRecognition.startListening({continuous: true})
        setTextData({
            text: transcript,
            interim: interimTranscript,
            final: finalTranscript
        })
    },[transcript,interimTranscript,finalTranscript,isSleep])

    const fetchData = async (txt) => {
        if (final?.trim() === '' || !final?.length) return console.log('no term');
        try {
            setIsLoading(true)
            const userData = await api.post('/cmd', { txt: txt, lang: ('he-il' || currentLanguages)})
            const {answer,content} = userData.data
            const ab = toArrayBuffer(content.data)
            setIsLoading(false)
            setTextAnswer(answer.res);
            setArrayBufferData(ab)
            const audio = new (window.AudioContext || window.webkitAudioContext)()
            const buffer = await audio.createBuffer(2, arrayBufferData.byteLength, 44000);
            const source = audio.createBufferSource();
            source.buffer = buffer
            source.connect(audio.destination);
            console.log(audio.state);
            if (audio.state === 'suspended') {
                return audio.resume();
            }
            return source.start()
        } catch (e) {
            console.log(e);
            setIsLoading(false)
            setTextAnswer(e.message);
        }
    }
    useEffect(() => {
        let id;
        if (final?.startsWith('חפש בגוגל')){
            id = setTimeout( () => {
                googleSearch(final)
                clear()
            } ,200)
        }
        return () => clearTimeout(id)
    }, [final])
    useEffect(() => {
        let id;
        if (final?.startsWith('חפש בויקיפדיה')){
            id = setTimeout( () => {
                wikiSearch(final)
                clear()
            } ,200)
        }
        return () => clearTimeout(id)
    }, [final])
    useEffect(() => {
        let id;
        if (final?.startsWith('חפש ביוטיוב')){
            id = setTimeout( () => {
                youtubeSearch(final)
                clear()
            } ,200)
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
    }, [final,interim,text])
    const clear = () => {
        resetTranscript()
        setTextAnswer('')
        setIsLoading(false)
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
    }, [interimTranscript,finalTranscript,clear])
    useEffect(() => {
        if (interimTranscript === 'רמי') return clear()
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
          {console.log(arrayBufferData)}
        <p>Transcript: {text}</p>
        <p>interim Transcript: {interim}</p>
        <p>final Transcript: {final}</p>
        <div style={{direction: 'rtl', textAlign: 'center'}}>
            {(isLoading && <Spinner/>) || ''}
        </div>
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

export default Recognition
