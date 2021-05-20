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

function Copyright() {
  return (
    <Typography variant="body2" align="center">
      {' © '}
      <Link color="inherit" href="https://speakly.cf/">
        Speakly
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}
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
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  checkbox:{
    color: 'white',
    fill: 'white'
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const history = useHistory()
  const {signup} = useAuth()

  const [errorMsg, setErrorMsg] = useState()
  const [loading, setLoading] = useState(false)
  async function handleSubmit(e){
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setErrorMsg('סיסמה אינה תואמת')
    }
    console.log(emailRef.current.value,passwordRef.current.value);
    try {
      setErrorMsg('')
      setLoading(true)
      await signup(emailRef.current.value,passwordRef.current.value)
      history.push('/dashboard')

    } catch (error) {
      setErrorMsg('אופס... לא הצלחתי ליצור את החשבון. אבל אפשר לנסות שוב.')
    }
    setLoading(false)
  }
  return (
    <Container className="page bg-gif mx-auto w-100 h-100 d-flex" component="main">
      <CssBaseline />
      <div className={classes.paper} style={{maxWidth:'500px'}}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          הרשמה
        </Typography>
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <CssTextField 
              fullWidth
              autoFocus
              required
              type='text' 
              id="firstNameRef" 
              label="שם פרטי"
              inputRef={firstNameRef}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <CssTextField 
              fullWidth
              type='text' 
              id="lastNameRef" 
              label="שם משפחה" 
              inputRef={lastNameRef}
            />
            </Grid>
            <Grid item xs={12}>
              <CssTextField 
              autoComplete="email"
              fullWidth
              required
              type='text' 
              id="emailRef" 
              label="דואר אלקטרוני"
              inputRef={emailRef}
            />
            </Grid>
            <Grid item xs={12}>
            <CssTextField 
              type='password' 
              fullWidth
              required
              id="passwordRef" 
              label="סיסמה"
              autoComplete="true"
              inputRef={passwordRef}
            />
            </Grid>
            <Grid item xs={12}>
            <CssTextField 
              type='password' 
              fullWidth
              required 
              id="passwordConfirmRef" 
              autoComplete="true"
              label="הזנת הסיסמה שנית"
              inputRef={passwordConfirmRef}
            />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox className={classes.checkbox}value="allowExtraEmails" color="secondary" />}
                label="אני רוצה לקבל עדכונים לכתובת המייל"
              />
            </Grid>
          </Grid>
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
          התחברות
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
                כבר יש לך חשבון? 
              <Link  variant="body2">
                <RouterLink className='text-decoration-none px-2 text-warning' to="/login" >
                  כניסה
                </RouterLink>
              </Link>
            </Grid>
          </Grid>
        </form >
      </div>
      <Box>
        <Copyright />
      </Box>
    </Container>
  );
}