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
import {Link as RouterLink, useHistory} from 'react-router-dom';
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
export default function SignIn() {
  const classes = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();

  const {signin} = useAuth()
  
  const [errorMsg, setErrorMsg] = useState()
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  async function handleSubmit(e){
    let email = emailRef.current.value;
    let password = passwordRef.current.value
    e.preventDefault()
    if (password.trim() === '' && email.trim() === ''){
      return setErrorMsg('סיסמה ודואר אלקטרוני לא יכולים להיות שדות ריקים')
    }
    if (password.trim() === ''){
      return setErrorMsg('לא הוזנה סיסמה')
    }
    if (password.length < 5){
      return setErrorMsg('הסיסמה שבחרת חלשה מידי')
    }
    if (email.trim() === ''){
      return setErrorMsg('לא הוזן דואר אלקטרוני')
    }
    try {
      setErrorMsg('')
      setLoading(true)
      await signin(email,password)
      history.push('/dashboard')
    } catch (error) {
      setErrorMsg('אופס... לא הצלחתי לאמת את החשבון. אבל אפשר לנסות שוב.')
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
          התחברות
        </Typography>
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        <form className={classes.form} onSubmit={handleSubmit}>
        <CssTextField  inputRef={emailRef} type='text' fullWidth id="custom-css-standard-input" label="דואר אלקטרוני" />
        <CssTextField inputRef={passwordRef} type='password' fullWidth id="custom-css-standard-input" label="סיסמה" />
          <FormControlLabel
            control={<Checkbox className={classes.checkbox} color="secondary" value="remember" />}
            label="זכור אותי"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            כניסה
          </Button>
          <Grid xs={12}
          container
          direction="row"
          justify="space-between"
          alignItems="center">
            <Grid item xs>
              <Link href="#" variant="body2">
                שכחת את הסיסמה?
              </Link>
            </Grid>
            <Grid item>
            <p>עוד אין לך חשבון?
            <Link  variant="body2">
                <RouterLink className='px-2 text-warning' to="/signup" >
                  הרשמה
                </RouterLink>
              </Link>
            </p>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}