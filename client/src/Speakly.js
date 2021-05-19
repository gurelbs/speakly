import React from 'react'
import {BrowserRouter as Router, Route, Switch,Redirect } from "react-router-dom";
import {v4 as uuid} from 'uuid'
// components
import HomePage from './components/HomePage'
import NotFound from './components/NotFound'
import Recognition from './components/Recognition'
import Snake from './components/Snake'
import Transcriptor from './components/Transcriptor'
import Playground from './components/Playground'
import Dashboard from './components/Dashboard'
// login - singup components
import SignUpPage from './components/SignUpPage'
import Login from './components/Login'
// menu
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import FullMenu from './components/FullMenu'
import './components/styles/page-animation.css'
import { CSSTransition,TransitionGroup} from "react-transition-group";
// auth
import {AuthProvider} from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'
export default function Speakly() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(() => createMuiTheme({
      direction: 'rtl',
      palette: {
        type: prefersDarkMode ? 'dark' : 'light',
        primary: {
          light: '#757ce8',
          main: '#3f50b5',
          dark: '#002884',
          contrastText: '#fff',
        },
        secondary: {
          light: '#ff7961',
          main: '#f44336',
          dark: '#ba000d',
          contrastText: '#000',
        },
      },
    }),
    [prefersDarkMode],
  );
  const routes = [
    { path: '/signup', name: 'signup', Component: SignUpPage },
    { path: '/login', name: 'login', Component: Login },
    { path: '/playground/recognition', name: 'recognition', Component: Recognition },
    { path: '/playground/snake', name: 'snake', Component: Snake },
    { path: '/playground/transcriptor/:id', name: 'translator', Component: Transcriptor },
    { path: '/playground', name: 'playground', Component: Playground },
    { path: '/', name: 'homepage', Component: HomePage },
  ]
  const useStyles = makeStyles((theme) => ({
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));
  const classes = useStyles();
  
return (
  <ThemeProvider theme={theme}>
  <div className='App' dir="rtl">
    <Router>
    <AuthProvider>
      <FullMenu />
      <div className={classes.toolbar} />
      <Route render={({location}) => {
          return (
            <TransitionGroup>
            <CSSTransition
                key={location.key}
                timeout={200}
                classNames='page text-center bg-gif'
                unmountOnExit 
            >
            <Switch location={location}>
                  {routes.map(({path, Component}) => {
                      return <Route
                                  key={path}
                                  path={path} 
                                  component={Component}
                                  exact
                              />
                  })}
                  <Route exact path={`/playground/transcriptor`}>
                    <Redirect to={`/playground/transcriptor/${uuid()}`} />
                  </Route>
                  <PrivateRoute exact path='/dashboard' component={Dashboard}/>
                  <Route component={NotFound}/>
              </Switch>
              </CSSTransition> 
                </TransitionGroup>)
      }}/>
      </AuthProvider>
      </Router>
  </div>
  </ThemeProvider>
);
}

