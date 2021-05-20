import React from 'react'
import './styles/page-animation.css'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import Link from '@material-ui/core/Link';
import {Link as RouterLink} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    papar1Bg:{
        background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
    },
    papar2Bg:{
        background: 'linear-gradient(264deg, rgba(131,58,180,1) 0%, rgba(29,252,253,0.7763480392156863) 50%, rgba(252,176,69,1) 100%)',
    },
    papar3Bg:{
        background: 'linear-gradient(35deg, rgba(58,180,131.5) 0%, rgba(253,29,29,0.5858718487394958) 50%, rgba(252,176,69,1) 100%)',
    },
}));

export default function Playground() {
  const classes = useStyles();
  return (
      <div className="page bg-gif w-100 py-5 h-100 default-font">
          <Grid className='d-flex container-fluid'
          style={{overflow:'hidden',maxWidth:800}}
            container
            direction="column"
            justify="center"
            // alignItems="stratch"
            spacing={1}>
        <Grid item className='text-center' style={{backgroundColor: 'transparent'}}>
          <Paper>
          <Card className={classes.papar1Bg}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                מערכת זיהוי וסינתוז קול
                </Typography>
                <Typography variant="h5" component="h2">
                עוזרת אישית
                </Typography>
                <IconButton  className={classes.margin}>
                <SettingsVoiceIcon style={{color:'#669'}} fontSize="large"/>
                </IconButton>
                <Typography variant="body2" component="p" style={{maxWidth:'50%',margin:'0 auto'}}>
                'רותם' היא עוזרת אישית אינטרנטית שיכולה לתרגם מילים, להמיר מטבעות, להקריא חדשות ולענות על שאלות
                <br />
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" fullWidth>
                <Link  variant="body2">
                <RouterLink className='text-decoration-none px-2 text-dark p' to="/playground/recognition" >
                  מעבר לעמוד
                </RouterLink>
                </Link>
              </Button>
            </CardActions>
            </Card>
          </Paper>
        </Grid>
        <Grid item className='text-center' style={{backgroundColor: 'transparent'}}>
          <Paper >
          <Card className={classes.papar2Bg}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                מתמלל מסמכים אוטומטי
                </Typography>
                <Typography variant="h5" component="h2">
                כתבן קולי
                </Typography>
                <IconButton  className={classes.margin}>
                <SpellcheckIcon style={{color:'#669'}} fontSize="large"/>
                </IconButton>
                <Typography  variant="body2" component="p" style={{maxWidth:'50%',margin:'0 auto'}}>
                מתמלל המסמכים של Speakly הוא עורך טקסט רב עוצמה הניתן לשימוש גם ללא הקלדה, עם שמירה אוטומטית של מסמכים
                <br />
                </Typography>
            </CardContent>
            <CardActions>
            <Button variant="contained" fullWidth>
            <Link  variant="body2">
                <RouterLink className='text-decoration-none px-2 text-dark p' to="/playground/transcriptor" >
                  מעבר לעמוד
                </RouterLink>
                </Link>
            </Button>
            </CardActions>
            </Card>
          </Paper>
        </Grid>
        <Grid item className='text-center' style={{backgroundColor: 'transparent'}}>
          <Paper>
          <Card className={classes.papar3Bg}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                משחק קולי
                </Typography>
                <Typography variant="h5" component="h2">
                סנייק
                </Typography>
                <IconButton  className={classes.margin}>
                <SportsEsportsIcon style={{color:'#669'}} fontSize="large"/>
                </IconButton>
                <Typography variant="body2" component="p" style={{maxWidth:'50%',margin:'0 auto'}}>
                המשחק המוכר סנייק בגרסה בסיסית, המאפשר להזיז את הנחש בעזרת פקודות קוליות
                <br />
                </Typography>
            </CardContent>
            <CardActions>
            <Button variant="contained" fullWidth>
            <Link variant="body2">
                <RouterLink className='text-decoration-none px-2 text-dark p w-100' to="/playground/snake" >
                  מעבר לעמוד
                </RouterLink>
                </Link>
            </Button>
            </CardActions>
            </Card>
          </Paper>
        </Grid>
      </Grid>
      </div>
  );
}
