import React,{useEffect, useState} from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { googleSearch, wikiSearch, youtubeSearch } from './Commands/Commends'
import axios from 'axios'
import api from './api/api'
import Languages from './Languages'
import allLanguagesList from './languagesList'
import Spinner from './Spinner'
import {toArrayBuffer} from './utils'
const Recognition =  () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const [currentLanguages, setCurrentLanguages] = useState('')
    const [textData, setTextData] = useState({})
    const [textAnswer, setTextAnswer] = useState(null)
    const [toggleBtn, setToggleBtn] = useState(true)
    const [isSleep, setIsSleep] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { transcript,interimTranscript,finalTranscript,resetTranscript} = useSpeechRecognition();
    let {text,interim,final} = textData;

    const fetchData = async (txt) => {
        try {
            setIsLoading(true)
            const userData = await api.post('/cmd', { 
                cancelToken: source.token,
                txt: txt, 
                lang: ('he-il' || currentLanguages)
            })
            const {answer,content} = userData?.data
            setIsLoading(false)
            setTextAnswer(answer.res);
            const arrayBuffer = toArrayBuffer(content.data)
            const context = new AudioContext();
            const audioSource = context.createBufferSource();
            const decodeAudio = await context.decodeAudioData(arrayBuffer);
            audioSource.buffer = decodeAudio
            audioSource.connect(context.destination);
            console.log(decodeAudio,context.state);
            if (context.state === 'suspended') return context.suspend(0);
            else if (context.state === 'running') return audioSource.start(0,0);
            else return audioSource.resume()
        } catch (e) {
            setIsLoading(false)
            if (axios.isCancel(e)) return console.log('Request canceled', e.message)
            else return console.log('there is some problem:',e.message)
        }
    }
    const clear = () => {
        resetTranscript()
        setTextAnswer('')
        setIsLoading(false)
    }
    const handleReco = () => {
        setToggleBtn(toggleBtn => !toggleBtn)
        return toggleBtn && !isSleep
            ? SpeechRecognition.startListening({continuous: true})
            : SpeechRecognition.stopListening({continuous: false})
    }
    useEffect(() => {
        if (interimTranscript === 'רמי') return clear()
    }, [interimTranscript])
    useEffect(() => {
        if (interimTranscript === 'רענן את הדף') return window.location.reload()
    }, [interimTranscript])
    useEffect(() => {
        if (interimTranscript === 'לך לישון') {
            setIsLoading(false)
            resetTranscript()
            setIsSleep(true)
            clear()
        }
    }, [interimTranscript])
    useEffect(() => {
        if (interimTranscript.includes('מחק הכל')) return clear() + console.clear()
    }, [interimTranscript])
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
        if (final !== '' && text !== '' && interim === ''){
            console.log('fetching Data with auto cancellation token.');
            fetchData(final)
        }
        return () => source.cancel('Operation canceled by the user.');
    }, [final,interim,text])
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
  return (
      <div>
        <p><b>תרגום:</b> {text}</p>
        <p><b>זיהוי קולי:</b> {interim}</p>
        <p><b>תרגום סופי:</b> {final}</p>
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

    //     useEffect(() => {
    //     if (interimTranscript.startsWith('תרגם')){
    //         let langText = interimTranscript.split(' ')
    //         let lang = langText.splice(langText.length-1,langText.length).join('')
    //         console.log(currentLanguages,lang);
    //         setCurrentLanguages(lang)
    //     }
    // }, [interimTranscript])