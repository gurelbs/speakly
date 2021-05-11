import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
// styles
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
// ui
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
// icons
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function CheckBtn() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(null);
  const [btnText, setBtnText] = React.useState(null);
  const checkIfSpeechRecoIsWork = () => SpeechRecognition.browserSupportsSpeechRecognition() ? true : false;
  const isWork = checkIfSpeechRecoIsWork();
    React.useEffect(() => {
        let timer;
        setBtnText('בודק דפדפן...')
        if (isWork) {
            timer = setTimeout(() => {
                setBtnText('יופי! הדפדפדן תומך בזיהוי קולי!')
                setSuccess(true)
                setLoading(false)
            }, 300);
        } else {
            timer = setTimeout(() => {
                setBtnText('נראה שהדפדפן הזה אינו תומך בזיהוי קולי...')
                setSuccess(false)
                setLoading(false)
            }, 300);
        }
        setBtnText('')
        return () => {
            clearTimeout(timer);
            return setBtnText('')
        }
    },[loading])
    React.useEffect(() => {
        setBtnText('')
    },[])
    const checkSupport = () => setLoading(true)
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Close me!
        </Alert>
      </Collapse>
      <Button
        disabled={open}
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
      >
        Re-open
      </Button>
        {/* <Button disabled={loading}color="secondary" onClick={checkSupport}>בדיקת דפדפן</Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        {btnText} */}
      </div>
    </div>
  );
}