import React,{useState} from 'react';
import clsx from 'clsx';
import { withRouter,Link } from 'react-router-dom';
// default
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
// custom
import Logo from './Logo'
import GamepadIcon from '@material-ui/icons/Gamepad';
import HomeIcon from '@material-ui/icons/Home';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';
import MessageIcon from '@material-ui/icons/Message';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
// auth
import {useHistory} from 'react-router-dom'

import {useAuth} from './../contexts/AuthContext'

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0,1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  loginBtn: {
    color:'white',
  }
}));

const FullMenu = () => {
  const {currentUser} = useAuth()
  const [error, setError] = useState()
  const history = useHistory()
  const {logout} = useAuth()
  const handleLogout = async () => {
    try {
        setError('')
        await logout()
        history.push('/login')
    } catch (error) {
        setError('אופס... לא הצלחתי להתנתק, אבל אפשר לנסות שוב.')
    }
}
  const [open, setOpen] = React.useState(false);
  const [toggleBtn, setToggleBtn] = React.useState(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const classes = useStyles();
  const handleClick = () => {
    history.push('/playground')
    setToggleBtn(!toggleBtn);
  }
    const itemList = [
        {
            text: 'בית', 
            icon: <HomeIcon/>,
            onClick: () => history.push('/')
        },
    ];
    const playGroundItemList = [
      {
        text: 'מתמלל מסמכים', 
        icon: <MessageIcon/>,
        onClick: () => history.push('/playground/transcriptor')
      },
      {
        text: 'עוזרת קולית', 
        icon: <SettingsVoiceIcon/>,
        onClick: () => history.push('/playground/recognition')
      },
      {
        text: 'סנייק', 
        icon: <SportsEsportsIcon/>,
        onClick: () => history.push('/playground/snake')
      },
    ]
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar  className={classes.navbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <Logo/>
          </Typography>
          {currentUser && currentUser.email
          ? <Button onClick={handleLogout} className={classes.loginBtn}><Link style={{textDecoration:'none',color:'white'}}>התנתקות</Link></Button>
          : <Button className={classes.loginBtn}><Link style={{textDecoration:'none',color:'white'}} to="/login">כניסה</Link></Button>
          }
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <List>
            {itemList.map((item, i) => {
                const {text, icon, onClick} = item
                return <ListItem button key={i} onClick={onClick}>
                    {icon && <ListItemIcon>{icon}</ListItemIcon>}
                  <ListItemText primary={text} />
                </ListItem>
            })}
              <ListItem button variant="outlined" onClick={handleClick}>
                <ListItemIcon>
                  <GamepadIcon/>
                </ListItemIcon>
                <ListItemText primary="מגרש משחקים" />
                {toggleBtn ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
            <Collapse in={toggleBtn} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {playGroundItemList.map((el,i) => {
                const {text,icon,onClick} = el
                return <ListItem key={i} button className={classes.nested} onClick={onClick}>
                    {icon && <ListItemIcon>{icon}</ListItemIcon>}
                  <ListItemText primary={text} />
                </ListItem>
              })}
        </List>
          </Collapse>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}

export default withRouter(FullMenu)