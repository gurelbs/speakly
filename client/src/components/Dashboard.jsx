import React,{useState} from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Profile from './Profile'
import {useAuth} from './../contexts/AuthContext'
export default function Dashboard() {
    const [error, setError] = useState()

    function Copyright() {
        return (
          <Typography variant="body2" style={{color:'white'}} align="center">
            {' © '}
            <Link color="inherit" href="https://speakly.cf/">
              Speakly
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
      }
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
        },
        content: {
          flexGrow: 1,
          maxHeight: '100vh',
          overflow: 'auto',
          width:'90%',
          marginLeft:'5rem'
        },
        container: {
          paddingTop: theme.spacing(4),
          paddingBottom: theme.spacing(4),
        },
        paper: {
          padding: theme.spacing(2),
          display: 'flex',
          overflow: 'auto',
          flexDirection: 'column',
        },
      }));
      const classes = useStyles();
      const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <div className="page bg-gif text-light">
           <main className={classes.content}>
           {error && <Alert severity="error">{error}</Alert>}
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item lg={4}>
              <Paper className={fixedHeightPaper}>
                <Profile/>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
        </div>
    )
}
