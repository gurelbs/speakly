import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
// styles
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

// ui
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
// icons
import CloseIcon from '@material-ui/icons/Close';

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
    flexGrow: 1,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}));

export default function CheckBtn() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(null);
  const [btnText, setBtnText] = React.useState(null);
  const checkIfSpeechRecoIsWork = () => SpeechRecognition.browserSupportsSpeechRecognition()
  const isWork = checkIfSpeechRecoIsWork();
  let timer;
    const handleCheck = () => {
        setOpen(true)
        if (isWork) {
            timer = setTimeout(() => {
                setBtnText('יופי! הדפדפדן תומך בזיהוי קולי!')
            }, 300);
        } else {
            timer = setTimeout(() => {
                setBtnText('נראה שהדפדפן הזה אינו תומך בזיהוי קולי...')
            }, 300);
        }
    }
    React.useEffect(() => {
        return () => clearTimeout(timer)
    }, [timer])
  return (
    <>
      <Collapse in={open}>
        <Alert severity={isWork ? "success" : "warning"}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setOpen(false)}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {btnText}
        </Alert>
      </Collapse>
      <Box alignItems="flex-end">
      <Button
      fullWidth
      style={{ width: '100%' }}
        disabled={open}
        variant="outlined"
        onClick={handleCheck}>
        בדיקת דפדפן
      </Button>
      </Box>
    </>
  );
}