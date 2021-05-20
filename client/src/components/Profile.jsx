import React,{useRef,useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
// auth
import {Link as RouterLink, useHistory} from 'react-router-dom';
import {useAuth} from './../contexts/AuthContext'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    width: '80%',
    maxHeight: 435,
  },
}));

export default function Profile() {
  const {updateEmail,updatePassword,currentUser,logout} = useAuth()
  const classes = useStyles();
  const [errorMsg, setErrorMsg] = useState();
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const history = useHistory()
  async function handleUpdate(e){
    e.preventDefault()
    let userEmail = emailRef.current.value
    let userPassword = passwordRef.current.value
    let userPasswordRepeat = passwordConfirmRef.current.value
    if (userPassword !== userPasswordRepeat) return setErrorMsg('סיסמאות אינם תואמות')
    try {
      setErrorMsg('')
      if (userPassword !== currentUser.password) await updatePassword(userPassword)
      if (userEmail !== currentUser.email) await updateEmail(userEmail)
      await logout()
    } catch (error) {
      setErrorMsg('אופס... לא הצלחתי לעדכן את החשבון. אבל אפשר לנסות שוב.')
    }
    setLoading(false)
  }
  return (
    <div className={classes.root}>
      {currentUser.email && <Alert severity="info">הדואר האלקטרוני הנוכחי: {currentUser.email}</Alert>}
      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      {msg && <Alert severity="success">{msg}</Alert>}
      <List component="div" role="list">
        <ListItemText primary="עדכון הפרופיל" />
        <Paper component="form" onSubmit={handleUpdate}>
        <TextField inputRef={emailRef} style={{width:'100%'}} id="email" label="דואר אלקטרוני" />
        <TextField type='password' inputRef={passwordRef} style={{width:'100%'}} id="password" label="הזנת סיסמה חדשה" />
        <TextField type='password' inputRef={passwordConfirmRef} style={{width:'100%'}} id="repeat-password" label="הזנת סיסמה חדשה שנית" />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className='mt-2'>
        עדכון
        </Button>
        </Paper>
      </List>
    </div>
  );
}