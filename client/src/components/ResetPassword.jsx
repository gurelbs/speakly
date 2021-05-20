import React,{useRef,useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import {Link as RouterLink} from 'react-router-dom';
// auth
import {useAuth} from './../contexts/AuthContext'
import './styles/login.css'
function Copyright() {
  return (
    <Typography variant="body2" color="yellow" align="center">
      {' © '}
      <Link color="inherit" href="https://speakly.cf/">
        Speakly
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  checkbox:{
    color: 'white',
    fill: 'white'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    color:'white'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input:{
    borderColor:theme.palette.secondary.light,
  }
}));
const CssTextField = withStyles({
  root: {
    '& label': {
      color:'gray'
    },
    '& input': {
      color:'#eee'
    },
    '& label.Mui-focused': {
      color:'#D3D3D3 '
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'aqua',
      color:'white'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
})(TextField);

export default function ResetPassword() {
  const classes = useStyles();
  const emailRef = useRef();
  const {resetPassword} = useAuth()
  
  const [errorMsg, setErrorMsg] = useState()
  const [msg, setMsg] = useState()
  const [loading, setLoading] = useState(false)
  async function handleSubmit(e){
    let email = emailRef.current.value;
    e.preventDefault()
    if (email.trim() === ''){
      return setErrorMsg('דואר אלקטרוני לא תקין')
    }
    try {
      setMsg('')
      setErrorMsg('')
      setLoading(true)
      await resetPassword(email)
      setMsg(`הודעה לאיפוס הסיסמה נשלחה ל ${email}`)
    } catch (error) {
      setErrorMsg('אופס... לא הצלחתי לשלוח לך הודעה לאיפוס הסיסמה. אבל אפשר לנסות שוב.')
    }
    setLoading(false)
  }
  return (
    <Container className="page bg-gif mx-auto w-100 px-5 h-100 d-flex" component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          איפוס סיסמה
        </Typography>
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        {msg && <Alert severity="success">{msg}</Alert>}
        <form className={classes.form} onSubmit={handleSubmit}>
        <CssTextField  inputRef={emailRef} type='text' fullWidth id="custom-css-standard-input" label="דואר אלקטרוני" />
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            אפס סיסמה
          </Button>
            <Link className="text-center w-100 d-flex justify-content-center">
                <RouterLink className='text-decoration-none text-warning' to='/'>חזור לדף הבית</RouterLink>
            </Link>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}