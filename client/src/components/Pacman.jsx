// import React,{useEffect,useState,useRef} from 'react'
// import CardMedia from '@material-ui/core/CardMedia';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
// import KeyboardEventHandler from 'react-keyboard-event-handler';
// import axios from 'axios'
// import api from './../api/api'
// export default function Pacmen(props) {
//     const [toggleBtn, setToggleBtn] = useState(true)
//     const [textData, setTextData] = useState({})
//     const [arrowName, setArrowName] = useState(null)
//     const { transcript,interimTranscript,finalTranscript,resetTranscript} = useSpeechRecognition();
//     const iframeRef = useRef(null)
//     useEffect(() => {
//         if(toggleBtn){
//             SpeechRecognition.startListening({continuous:true})
//             saveData()
//         } else {
//             return SpeechRecognition.stopListening()
//         }
//     }, [toggleBtn])
//     const saveData = () => {
//         setTextData({
//             text: transcript,
//             interim:interimTranscript,
//             final:finalTranscript
//         })
//     }
//     useEffect(() => {
//         saveData()
//     }, [transcript,interimTranscript,finalTranscript])
//     useEffect(() => {
//         if (['למטה','למעלה','שמאלה','ימינה'].includes(interimTranscript)){
//             let hebrewMoveName = interimTranscript
//             let englishArrowName;
//             switch (hebrewMoveName) {
//                 case 'ימינה':
//                     englishArrowName = 'ArrowRight'
//                     break;
//                 case 'שמאלה':
//                     englishArrowName = 'ArrowLeft'  
//                     break;
//                 case 'למעלה':
//                     englishArrowName = 'ArrowUp'  
//                     break;
//                 case 'למטה':
//                     englishArrowName = 'ArrowDown'  
//                     break;
//                 default: englishArrowName = null
//                     break;
//             }
//             return setArrowName(englishArrowName)
//         }
//     }, [interimTranscript])
//     useEffect(() => {
//         if (interimTranscript === 'מחק הכל'){
//             return resetTranscript()
//         }
//     }, [interimTranscript])
//     useEffect(() => {
//         console.log(iframeRef.current.contentWindow);
//         iframeRef.current.contentWindow.dispatchEvent(new KeyboardEvent('keydown',{bubbles: true,key: 'ArrowRight',code: 'ArrowRight'}))
//         // iframeRef?.current?.contentWindow?.dispatchEvent(arrowRightEvent) ('keydown', e => e.key === arrowName ? console.log(e.key) : console.log('naa'));
//     }, [arrowName])
//     useEffect(() => {
//         const fetchData = async () => {
//             const {data} = await api.get('/pacman', {url: 'http://localhost:3000/pacman/PAC-MAN.html'})
//             console.log(data);
//         } 
//         fetchData()
//     }, [])
//     return (
//         <div className="container-fluid px-0">
//             <iframe ref={iframeRef} tabIndex="0" style={{minHeight:'50vh',width:'100%'}}  src='./../pacman/PAC-MAN.html'></iframe>
//             <div className="container">
//                 <h1 className=' text-dark h1 text-center'>{textData?.interim} - {arrowName}</h1>
//             </div>
//             <div style={{dislay:'flex'}}>
//             <button onClick={() => setToggleBtn(btn => !btn)} style={{position:'relative',margin:'0 auto',padding:'1rem',width:'100%'}}>{toggleBtn ? 'משחק עם מקשים' : 'משחק בעזרת הקול'}</button>
//             <KeyboardEventHandler handleKeys={['all']} onKeyEvent={(key) => setArrowName(key)} />
//             </div>
//         </div>
//     ) 
// }
