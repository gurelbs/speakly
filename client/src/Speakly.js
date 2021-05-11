import React from 'react'
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
// components
import HomePage from './components/HomePage'
import NotFound from './components/NotFound'
import Recognition from './Recognition'
import Pacman from './components/Pacman'
import Translator from './components/Translator'
import Playground from './components/Playground'
// login - singup components
import SignUpPage from './components/SignUpPage'
import Login from './components/Login'
// menu
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import FullMenu from './components/FullMenu'
import './components/styles/page-animation.css'
import { CSSTransition,TransitionGroup} from "react-transition-group";
const theme = createMuiTheme({
  direction: 'rtl', 
});

export default function Speakly() {
  const routes = [
    { path: '/signup', name: 'signup', Component: SignUpPage },
    { path: '/login', name: 'login', Component: Login },
    { path: '/playground/recognition', name: 'recognition', Component: Recognition },
    { path: '/playground/pacman', name: 'pacman', Component: Pacman },
    { path: '/playground/translator', name: 'translator', Component: Translator },
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
      <FullMenu />
      <div className={classes.toolbar} />
      <Route render={({location}) => {
          return (
            <TransitionGroup>
            <CSSTransition
                key={location.key}
                timeout={200}
                classNames='page'
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
                  <Route component={NotFound}/>
              </Switch>
              </CSSTransition> 
                </TransitionGroup>)
      }}/>
      </Router>
  </div>
  </ThemeProvider>
);
}

