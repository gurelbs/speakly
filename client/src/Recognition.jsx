import React,{useEffect, useState} from 'react'
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
    const clear = () => {
        resetTranscript()
        setTextAnswer('')
        setIsLoading(false)
        SpeechRecognition.abortListening()
    }
    const handleReco = () => {
        setToggleBtn(toggleBtn => !toggleBtn)
        return toggleBtn && !isSleep
            ? SpeechRecognition.startListening({continuous: true})
            : SpeechRecognition.stopListening({continuous: false})
    }
    useEffect(() => {
        if (interimTranscript === 'כרמית') return clear()
    }, [interimTranscript])
    useEffect(() => {
        let id;
        if (final?.includes('מוזיקה אקראית')) {
            let u = new SpeechSynthesisUtterance('אוקיי, אני מפעילה מוזיקה אקראית מיוטיוב');
                speechSynthesis.speak(u);
                id = setInterval(() => {
                    if (speechSynthesis.speaking) resetTranscript()
                }, 10);
            return window.open('https://stackoverflow.com/index.php')
        }
        return () => clearInterval(id)
    }, [final])

    useEffect(() => {
        if (interimTranscript === 'רענני את הדף') return window.location.reload()
    }, [interimTranscript])

    useEffect(() => {
        if (interimTranscript === 'לכי לישון') {
            setIsLoading(false)
            resetTranscript()
            setIsSleep(true)
            clear()
            return SpeechRecognition.abortListening()

        }
    }, [interimTranscript])

    useEffect(() => {
        if (interimTranscript.includes('מחקי הכל')) return clear() + console.clear()
    }, [interimTranscript])

    useEffect(() => {
        if (final?.startsWith('חפשי בגוגל')) googleSearch(final) 
        else if (final?.startsWith('חפשי בויקיפדיה')) wikiSearch(final)
        else if (final?.startsWith('חפשי ביוטיוב')) youtubeSearch(final)
        else if (final?.startsWith('פתחי רדיו')) playRadio()
    }, [final])

    useEffect(() => {
        let validator = final !== '' && text !== '' && final === text && interim === '';
        if (validator){
            resetTranscript()
            const fetchData = async () => {
                setIsSleep(true)
                console.log('fetching Data with auto cancellation token.');
                const answer = await fetchTextAnswer()
                setTextAnswer(answer)
                let u = new SpeechSynthesisUtterance(answer);
                speechSynthesis.speak(u);
                setInterval(() => {
                    if (speechSynthesis.speaking) resetTranscript()
                }, 10);
                setIsSleep(false)
            }
            fetchData()
        }
        return () => {
            return source.cancel('Operation canceled by the user.');
        }
    }, [final,interim,text])

    useEffect(() => {
        const ssIsWork = SpeechRecognition.browserSupportsSpeechRecognition()
        if (!ssIsWork) return console.log('browser not supported');
        if (!isSleep) SpeechRecognition.startListening({continuous:true})
        else return SpeechRecognition.stopListening()
        setTextData({
            text: transcript,
            interim: interimTranscript,
            final: finalTranscript
        })
    },[transcript,interimTranscript,finalTranscript,isSleep])
    const toggleRecognitionBtn = () => {
        handleReco()
        setToggleBtn(!toggleBtn)
    }
  return (
      <div className='page'>
          <div>
        <p><b>תרגום:</b> {text}</p>
        <p><b>זיהוי קולי:</b> {interim}</p>
        <p><b>תרגום סופי:</b> {final}</p>

          </div>
        <div style={{direction: 'rtl', textAlign: 'center'}}>
            {(isLoading && <Spinner/>) || ''}
        </div>
        <h1 style={{direction: 'rtl', textAlign: 'center'}}>{textAnswer}</h1>
        <Languages cb={e => setCurrentLanguages(e.target.value)} languagesList={allLanguagesList}/>
        <div>
            <button onClick={() => toggleRecognitionBtn}>{!toggleBtn ? 'עצרי' : 'התחילי'}</button>
        </div>
        <button 
            disabled={(text !== '' || !toggleBtn) ? false : true}
            onClick={() => fetchTextAnswer(transcript)}>דבר</button>
        <button onClick={() => clear()}>מחק</button>
      </div>
  )
}
export default Recognition