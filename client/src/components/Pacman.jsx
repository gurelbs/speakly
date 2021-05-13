import React,{useEffect,useState,useRef} from 'react'
import CardMedia from '@material-ui/core/CardMedia';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
 
export default function Pacmen(props) {
    const [toggleBtn, setToggleBtn] = useState()
    const [textData, setTextData] = useState({})
    const [arrowName, setArrowName] = useState(null)
    const { transcript,interimTranscript,finalTranscript,resetTranscript} = useSpeechRecognition();
    const iframeRef = useRef(null)
    useEffect(() => {
        if(toggleBtn){
            SpeechRecognition.startListening({continuous:true})
            saveData()
        } else {
            return SpeechRecognition.stopListening()
        }
    }, [toggleBtn])
    const saveData = () => {
        setTextData({
            text: transcript,
            interim:interimTranscript,
            final:finalTranscript
        })
    }
    useEffect(() => {
        saveData()
    }, [transcript,interimTranscript,finalTranscript])
    useEffect(() => {
        if (['למטה','למעלה','שמאלה','ימינה'].includes(interimTranscript)){
            let hebrewMoveName = interimTranscript
            let englishArrowName;
            switch (hebrewMoveName) {
                case 'ימינה':
                    englishArrowName = 'ArrowRight'
                    break;
                case 'שמאלה':
                    englishArrowName = 'ArrowLeft'  
                    break;
                case 'למעלה':
                    englishArrowName = 'ArrowUp'  
                    break;
                case 'למטה':
                    englishArrowName = 'ArrowDown'  
                    break;
                default: englishArrowName = 'mmmm... undefind' 
                    break;
            }
            return setArrowName(englishArrowName)
        }
    }, [interimTranscript])
    useEffect(() => {
        if (interimTranscript === 'מחק הכל'){
            return resetTranscript()
        }
    }, [interimTranscript])
    useEffect(() => {
        if (arrowName && arrowName !== 'mmmm... undefind'){
                console.log('user say: ', arrowName)
                let e = new KeyboardEvent("keydown", {bubbles : true, cancelable : true,repeat: true, key : arrowName, code: arrowName, char : arrowName, shiftKey : true});
                console.log(e);
                iframeRef.current.contentWindow.document.querySelector("#pcm-p").dispatchEvent(e);
        }
    }, [arrowName])
    return (
        <div className="container-fluid px-0">
            <iframe ref={iframeRef} style={{minHeight:'50vh',width:'100%'}}  src='./../pacman/PAC-MAN.html'></iframe>
            <div className="container">
            <h1 className=' text-dark h1 text-center'>{textData?.interim}</h1>
            {/* <h1 className=' text-dark h1'>{textData?.text}</h1>
            <h1 className=' text-dark h1'>{textData?.final}</h1> */}
            </div>
            <button style={{position:'absolute',margin:'0 auto',padding:'1rem',width:'100%'}} onClick={() => setToggleBtn(btn => !btn)}>{toggleBtn ? 'משחק עם מקשים' : 'משחק בעזרת הקול'}</button>
        </div>
    ) 
}
