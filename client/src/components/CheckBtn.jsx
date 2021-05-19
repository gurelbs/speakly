import React from 'react';
import SpeechRecognition from 'react-speech-recognition'
// styles
import Box from '@material-ui/core/Box';
// ui
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
// icons
import CloseIcon from '@material-ui/icons/Close';

export default function CheckBtn() {
  const [open, setOpen] = React.useState(false);
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
        color="primary"
        onClick={handleCheck}>
        בדיקת דפדפן
      </Button>
      </Box>
    </>
  );
}