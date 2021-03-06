import React,{useEffect, useState} from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { googleSearch, wikiSearch, youtubeSearch,playRadio } from './../Commands/Commends'
import axios from 'axios'
import api from './../api/api'
import CheckBtn from './CheckBtn'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';

const Recognition =  () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const [currentLanguages, setCurrentLanguages] = useState('he-il')
    const [textData, setTextData] = useState({})
    const [textAnswer, setTextAnswer] = useState('')
    const [startRecoBtn, setStartRecoBtn] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    // const [isBuildCmd, setIsBuildCmd] = useState(false)
    const [soundOn, setSoundOn] = useState(false)

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
        if (interim?.includes('????????')) {
            return clear()
        }
    }, [interim])
    useEffect(() => {
        let id;
        let u;
        if (final?.includes('???????????? ????????????')) {
            u = new SpeechSynthesisUtterance('????????, ?????? ???????????? ???????????? ???????????? ??????????????');
                speechSynthesis.speak(u);
                id = setInterval(() => {
                    if (speechSynthesis.speaking) resetTranscript()
                }, 100);
            return window.open('https://stackoverflow.com/index.php')
        }
        return () => clearInterval(id)
    }, [final])

    useEffect(() => {
        if (interimTranscript === '?????????? ?????? ????????') return window.location.reload()
    }, [interimTranscript])
    useEffect(() => {
        if (interimTranscript === '???????? ??????'){
            SpeechRecognition.abortListening()
        }
    }, [interimTranscript])

    useEffect(() => {
        if (interim?.includes('?????? ??????????')) {
            let u = new SpeechSynthesisUtterance('???????? ??????');
            speechSynthesis.speak(u);
            resetTranscript()
            SpeechRecognition.stopListening()
            SpeechRecognition.abortListening()
            clear();
        }
    }, [interim])

    useEffect(() => {
        if (interimTranscript.includes('???????? ??????')) return clear() + console.clear()
    }, [interimTranscript])

    useEffect(() => {
        if (finalTranscript.startsWith('?????????? ??????????')) {
            SpeechRecognition.stopListening()
            googleSearch(finalTranscript)
            SpeechRecognition.startListening({continuous: true})
        }
    }, [finalTranscript])
    useEffect(() => {
        if (finalTranscript.startsWith('?????????? ??????????????')) {
            SpeechRecognition.stopListening()
            youtubeSearch(finalTranscript)
            SpeechRecognition.startListening({continuous: true})
        }
    }, [finalTranscript])
    useEffect(() => {
        if (finalTranscript.startsWith('?????????? ??????????????????')) {
            SpeechRecognition.stopListening()
            wikiSearch(finalTranscript)
            SpeechRecognition.startListening({continuous: true})
        }
    }, [finalTranscript])
    useEffect(() => {
        if (finalTranscript.startsWith('?????????? ????????')) {
            SpeechRecognition.stopListening()
            playRadio()
            SpeechRecognition.startListening({continuous: true})
        }
    }, [finalTranscript])
    

    useEffect(() => {
        let validator = finalTranscript !== '' 
            && transcript !== '' 
            && finalTranscript === transcript 
            && interimTranscript === '';
        if (validator){
            resetTranscript()
            const fetchData = async () => {
                setIsLoading(true)
                console.log('fetching Data with auto cancellation token.');
                const answer = await fetchTextAnswer()
                setTextAnswer(answer)
                let u = new SpeechSynthesisUtterance(answer);
                setIsLoading(false)
                speechSynthesis.speak(u);
                if (interim === '????????') speechSynthesis.pause(u);
                if (interim === '????????') speechSynthesis.resume(u);
                setInterval(() => {
                    if (speechSynthesis.speaking) resetTranscript()
                }, 10);
            }
            fetchData()
            clear()
        }
        return () => {
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
        } else {
            speechSynthesis.cancel()
            return SpeechRecognition.abortListening()
        }
      }, [startRecoBtn])

    useEffect(() => {
        if (soundOn) return speechSynthesis.pause()
        else return speechSynthesis.resume()
    }, [soundOn])

  return ( <div className="page bg-gif mx-auto">
        <CssBaseline />
        <Container fixed >
        <Grid container className={classes.root} style={{ minHeight: 'calc(100vh - 64px)', width: '100%'}}>
            <Grid container item xs={12} direction="column" justify="center" alignItems="center">
            <Box xs={6} position="absolute" display="grid" alignItems="center" style={{flexDirection:'colomn'}} flexGrow={1} top={10} spacing={2}>
                <br/><p>{!startRecoBtn ? '' : '?????????? ???????? ????????'}</p>   
                <Button 
                    onClick={handleRecognitionBtn}
                    disabled={isLoading}
                    variant="contained"
                    color="primary">{!startRecoBtn ? '??????????' : '??????????'}</Button> 
                <Button 
                    onClick={() => setSoundOn(sound=>!sound)}
                    disabled={!startRecoBtn}
                    color="primary">{!soundOn ? <VolumeUpIcon/> : <VolumeOffIcon/>}</Button> 
                </Box>
                <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
                </Backdrop>
                <Typography variant="h5"  component="h2" style={{textAlign: 'center',marginTop:'5rem'}}>
                    {interimTranscript}
                </Typography>
                <Typography variant="h3" component="h2" style={{textAlign: 'center',width:'80%',padding:'3rem'}}>
                    {textAnswer}
                </Typography>
            </Grid>
            <Box style={{zIndex:'3'}} xs={4} position="absolute" right={5} bottom={5}>
                <CheckBtn/>
            </Box>
            <Box style={{zIndex:'3'}} xs={4} position="absolute" style={{left:'50%'}} bottom={5}>
???????? ???????? "????????" ?????? ?????????? ???? ???????? ?????????? ???? "?????????? ?????? ????????" ?????? ?????????? ???? ??????????
            </Box>
        </Grid>
        </Container>
        </div>
  )
}
export default Recognition