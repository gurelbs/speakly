import React,{useRef} from 'react';
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
// auth
import {useAuth} from '../contexts/AuthContext'
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
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const {signUpUser} = useAuth()

  function handleSubmit(e){
    e.preventDefault()
    signUpUser(emailRef.current.value,passwordRef.current.value)
  }
  return (
    <Container className="page bg-gif mx-auto w-100 px-0 mx-0 h-100 d-flex" component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          הרשמה
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <CssTextField 
              fullWidth
              autoFocus
              required
              type='text' 
              id="custom-css-standard-input" 
              label="שם פרטי" 
              ref={firstNameRef}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <CssTextField 
              fullWidth
              required
              type='text' 
              id="custom-css-standard-input" 
              label="שם משפחה" 
              ref={lastNameRef}
            />
            </Grid>
            <Grid item xs={12}>
              <CssTextField 
              autoComplete="email"
              fullWidth
              required
              type='text' 
              id="custom-css-standard-input" 
              label="דואר אלקטרוני"
              ref={emailRef}
            />
            </Grid>
            <Grid item xs={12}>
            <CssTextField 
              type='password' 
              fullWidth 
              id="custom-css-standard-input" 
              label="סיסמה"
              ref={passwordRef}
            />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="אני רוצה לקבל עדכונים לכתובת המייל"
              />
            </Grid>
          </Grid>
          <Button
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
              <Link href="#" variant="body2">
                כבר יש לך חשבון? 
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}