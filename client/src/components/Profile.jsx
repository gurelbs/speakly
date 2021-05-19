import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// auth
import {useAuth} from './../contexts/AuthContext'
import { Typography } from '@material-ui/core';

function ConfirmationDialogRaw(props) {
    const {currentUser} = useAuth()
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">דואר אלקטרוני</DialogTitle>
      <DialogContent dividers>
      <Grid container>
            <TextField style={{width:'100%'}} id="standard-basic" label="הזן דואר קלטרוני חדש" />
      </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          ביטול
        </Button>
        <Button onClick={handleOk} variant="contained"  color="primary">
          אישור
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

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
  
  const {currentUser} = useAuth()

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(currentUser?.email);
  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <div className={classes.root}>
      <List component="div" role="list">
        <ListItem button divider disabled role="listitem">
          <ListItemText primary="הפרופיל שלך" />
        </ListItem>
        <ListItem
          button
          divider
          aria-haspopup="true"
          aria-controls="ringtone-menu"
          aria-label="דואר אלקטרוני"
          onClick={handleClickListItem}
          role="listitem"
        >
          <ListItemText primary="דואר אלקטרוני" secondary={value} />
        </ListItem>
        <ConfirmationDialogRaw
          classes={{
            paper: classes.paper,
          }}
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
        />
      </List>
    </div>
  );
}