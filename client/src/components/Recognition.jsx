import React,{useEffect, useState} from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { googleSearch, wikiSearch, youtubeSearch,playRadio } from './../Commands/Commends'
import axios from 'axios'
import api from './../api/api'
import CheckBtn from './CheckBtn'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
const Recognition =  () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const [currentLanguages, setCurrentLanguages] = useState('he-il')
    const [textData, setTextData] = useState({})
    const [textAnswer, setTextAnswer] = useState('')
    const [isSleep, setIsSleep] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { transcript,interimTranscript,finalTranscript,resetTranscript} = useSpeechRecognition();
    let {text,interim,final} = textData;
    const useStyle = makeStyles({

    })
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
        setIsLoading(true)
        resetTranscript()
        setTextAnswer('')
        setIsLoading(false)
    }
    useEffect(() => {
        if (interim?.includes('רותם')) {
            clear()
        }
    }, [interim])
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
        if (interim?.includes('לכי לישון')) {
            let u = new SpeechSynthesisUtterance('לילה טוב');
                speechSynthesis.speak(u);
                if (speechSynthesis.speaking) {
                    resetTranscript()
                    clear()
                } else {
                    setTimeout(() => SpeechRecognition.abortListening(), 100);
                }
        }
    }, [interim])

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
                setIsLoading(true)
                setIsSleep(true)
                console.log('fetching Data with auto cancellation token.');
                const answer = await fetchTextAnswer()
                setTextAnswer(answer)
                let u = new SpeechSynthesisUtterance(answer);
                setIsLoading(false)
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
        if (!isSleep) SpeechRecognition.startListening({continuous:true})
        else return SpeechRecognition.stopListening()
        setTextData({
            text: transcript,
            interim: interimTranscript,
            final: finalTranscript
        })
    },[transcript,interimTranscript,finalTranscript,isSleep])

  return (
      
        <div className='page'>
            <React.Fragment>
      <CssBaseline />
      <Container>
            <CheckBtn/>
            <h1 style={{direction: 'rtl', textAlign: 'center'}}>{textAnswer }</h1>
      </Container>
    </React.Fragment>
        </div>
        // // {/* <h1 style={{direction: 'rtl', textAlign: 'center'}}>{textAnswer !== '' ? textAnswer : <Spinner/>}</h1> */}
        //   {/* <div>
        // <p><b>תרגום:</b> {text}</p>
        // <p><b>זיהוי קולי:</b> {interim}</p>
        // <p><b>תרגום סופי:</b> {final}</p>

        //   </div>
        // <div style={{direction: 'rtl', textAlign: 'center'}}>
        //     {(isLoading && <Spinner/>) || ''}
        // </div> */}
        // {/* <Languages cb={e => setCurrentLanguages(e.target.value)} languagesList={allLanguagesList}/>
        // <div>
        //     <button onClick={() => toggleRecognitionBtn}>{!toggleBtn ? 'עצרי' : 'התחילי'}</button>
        // </div>
        // <button 
        //     disabled={(text !== '' || !toggleBtn) ? false : true}
        //     onClick={() => fetchTextAnswer(transcript)}>דבר</button>
        // <button onClick={() => clear()}>מחק</button> */}
  )
}
export default Recognition