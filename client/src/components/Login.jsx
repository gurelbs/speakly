import React from 'react';
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
        <form className={classes.form} noValidate>
        <CssTextField type='text' fullWidth id="custom-css-standard-input" label="אימייל" />
        <CssTextField type='password' fullWidth id="custom-css-standard-input" label="סיסמה" />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
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
            <Grid item >
              <Link href="#" variant="body2">
                {"עוד אין לך חשבון? לחיצה להרשמה"}
              </Link>
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