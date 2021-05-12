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
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
const Recognition =  () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const [currentLanguages, setCurrentLanguages] = useState('he-il')
    const [textData, setTextData] = useState({})
    const [textAnswer, setTextAnswer] = useState('')
    const [startRecoBtn, setStartRecoBtn] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isBuildCmd, setIsBuildCmd] = useState(false)

    const { transcript,interimTranscript,finalTranscript,resetTranscript} = useSpeechRecognition();
    let {text,interim,final} = textData;
    const handleRecognitionBtn = () => setStartRecoBtn(reco => !reco)
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
        setTextAnswer('')
        resetTranscript()
    }
    useEffect(() => {
        if (interim?.includes('רותם')) {
            return clear()
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
            resetTranscript()
            clear()
        }
    }, [interim])
    useEffect(() => {
        if (interim?.startsWith('עצור' ||'עצרי')) {
            resetTranscript()
            clear()
            speechSynthesis.cancel()
            SpeechRecognition.stopListening()
        }
    }, [interim])

    useEffect(() => {
        if (interimTranscript.includes('מחקי הכל')) return clear() + console.clear()
    }, [interimTranscript])

    useEffect(() => {
        let startWithGoogle = ['חפשי בגוגל','חפש בגוגל']
        // let startWithGoogle = ['חפשי בגוגל','חפש בגוגל']
        let searchIsValid = text?.startsWith(startWithGoogle)
        if (searchIsValid) {
            setIsBuildCmd(true)
            clear()
            googleSearch(text)
            setIsBuildCmd(false)
        } 
        else if (final?.startsWith('חפשי בויקיפדיה')){return clear() + wikiSearch(final)} 
        else if (final?.startsWith('חפשי ביוטיוב')) {return clear() + youtubeSearch(final)}
        else if (final?.startsWith('פתחי רדיו')) {return clear() + playRadio()}
    }, [text])

    useEffect(() => {
        let validator = final !== '' 
            && text !== '' 
            && final === text 
            && interim === ''
            && !isBuildCmd;
        let id;
        if (validator){
            resetTranscript()
            const fetchData = async () => {
                setIsLoading(true)
                console.log('fetching Data with auto cancellation token.');
                const answer = await fetchTextAnswer()
                setTextAnswer(answer)
                let u = new SpeechSynthesisUtterance(answer);
                setIsLoading(false)
                id = speechSynthesis.speak(u);
                setInterval(() => {
                    if (speechSynthesis.speaking) resetTranscript()
                }, 10);
            }
            fetchData()
            clear()
        }
        return () => {
            setInterval(id)
            source.cancel('Operation canceled by the user.');
        }
    }, [final,interim,text])

    useEffect(() => {
            setTextData({
                text: transcript,
                interim: interimTranscript,
                final: finalTranscript
            })
    },[transcript,interimTranscript,finalTranscript])
    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        paper: {
          padding: theme.spacing(2),
          textAlign: 'center',
          color: theme.palette.text.secondary,
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
          },
      }));
      const classes = useStyles()
      useEffect(() => {
          if (startRecoBtn){
            return SpeechRecognition.startListening({continuous:true})
        }
        return SpeechRecognition.abortListening()
      }, [startRecoBtn])
  return ( <React.Fragment>
        <CssBaseline />
        <Container fixed className={`page `} >
        <Grid container className={classes.root} style={{ minHeight: 'calc(100vh - 64px)', width: '100%'}}>
            <Grid container item xs={12} direction="column" justify="center" alignItems="center">
            <Box xs={6} position="absolute" display="grid" alignItems="center" style={{flexDirection:'colomn'}} flexGrow={1} top={10} spacing={2}>
                <br/><code>{!startRecoBtn ? '' : 'זיהוי קולי פעיל'}</code>   
                <Button 
                    onClick={handleRecognitionBtn}
                    disabled={isLoading}
                    variant="contained"
                    color="primary">{!startRecoBtn ? 'הפעלה' : 'כיבוי'}</Button> 
                </Box>
                <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
                </Backdrop>
                <Typography variant="h5"  component="h2" style={{textAlign: 'center',marginTop:'5rem'}}>
                    {interim}
                </Typography>
                <Typography variant="h3" component="h2" style={{textAlign: 'center',width:'80%',padding:'3rem'}}>
                    {textAnswer}
                </Typography>
            </Grid>
            <Box xs={4} position="absolute" right={1} bottom={1}>
                <CheckBtn/>
            </Box>
        </Grid>
        </Container>
        </React.Fragment>
  )
}
export default Recognition