import React,{useState,useEffect} from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import IconButton from '@material-ui/core/IconButton';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
export default function SnakeRecognition() {
    const {
        interimTranscript,
        resetTranscript
      } = useSpeechRecognition()
    const [btn, setBtn] = useState(false)
    useEffect(() => {
        resetTranscript()
        return btn 
            ? SpeechRecognition.startListening({continuous: true})
            : SpeechRecognition.stopListening()
    },[btn])

    return (
        <div>
        <p style={{width:"calc('100%'- '1rem')",padding:'1rem'}}>{interimTranscript}</p>
        <IconButton  className='mic-icon' onClick={() => setBtn(btn => !btn)}>
            {btn ? <MicIcon className='btn-anima' style={{ color: '#ba68c8' }} fontSize="large"/> : <MicOffIcon style={{ color: '#eee' }} fontSize="large"/>}
        </IconButton>
        </div>
    )
}
