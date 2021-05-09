import {bufferToArrayBuffer} from './utils'
import React,{useEffect, useState,useRef} from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { googleSearch, wikiSearch, youtubeSearch,playRadio } from './Commands/Commends'
import axios from 'axios'
import api from './api/api'
import Languages from './Languages'
import allLanguagesList from './languagesList'
import Spinner from './Spinner'

const Recognition =  () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const [currentLanguages, setCurrentLanguages] = useState('he-il')
    const [textData, setTextData] = useState({})
    const [textAnswer, setTextAnswer] = useState('')
    // const [audioAnswer, setAudioAnswer] = useState('')
    const [toggleBtn, setToggleBtn] = useState(true)
    const [isSleep, setIsSleep] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { transcript,interimTranscript,finalTranscript,resetTranscript} = useSpeechRecognition();
    let {text,interim,final} = textData;
    const fetchTextAnswer = async () => {
        try {
            const {data} = await api.post('/cmd',  {
                CancelToken: source.token,
                txt: final,
                lang: currentLanguages
            })
            console.log(data.answer);
            return data.answer
        } catch (e) {
            console.log(e.message);
        }
    }
    // const getAudioContext =  () => {
    //     AudioContext = window.AudioContext || window.webkitAudioContext;
    //     const audioContent = new AudioContext();
    //     return audioContent;
    //   };
      
    // const fetchAudioAnswer = async () => {
    //     let apiURL = `http://api.voicerss.org/?key=2a0ec72724104343b35809b65a8634f8&hl=he-il&c=MP3&f=16khz_16bit_stereo&src=שלום&ssml=false&b64=false`;
    //     try {
    //         console.log(currentLanguages);
    //         const {data} = await api.post(apiURL)
    //         console.log(data);
    //         let ab = bufferToArrayBuffer(data)
    //         const audioContext = getAudioContext();
    //         const audioBuffer = await audioContext.decodeAudioData(ab);
    //         const source = audioContext.createBufferSource();
    //         source.buffer = audioBuffer;
    //         source.connect(audioContext.destination);
    //         source.start();
    //     } catch (e) {
    //         console.log(e.message);
    //     }
    // }
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
        if (final?.startsWith('חפש בגוגל')) googleSearch(final) 
        else if (final?.startsWith('חפש בויקיפדיה')) wikiSearch(final)
        else if (final?.startsWith('חפש ביוטיוב')) youtubeSearch(final)
        else if (final?.startsWith('פתח רדיו')) playRadio()
    }, [final])

    useEffect(() => {
        if (final !== '' && text !== '' && interim === ''){
            resetTranscript()
            const fetchData = async () => {
                console.log('fetching Data with auto cancellation token.');
                const answer = await fetchTextAnswer()
                setTextAnswer(answer)
                // fetchAudioAnswer()
            }
            fetchData()
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
        {/* <audio ref={audioRef} autoPlay onChange={handleAudio}>
            <source src=''/>
        </audio> */}
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
            onClick={() => fetchTextAnswer(transcript)}>דבר</button>
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