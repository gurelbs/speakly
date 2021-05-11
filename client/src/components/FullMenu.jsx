import React from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
// default
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
// custom
import Logo from './Logo'
import GamepadIcon from '@material-ui/icons/Gamepad';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
}));

const FullMenu = (props) => {
  const {history} = props
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
            icon: <GamepadIcon/>,
            onClick: () => history.push('/')
        },
    ];
    const playGroundItemList = [
      {
        text: 'תרגומון', 
        icon: <GamepadIcon/>,
        onClick: () => history.push('/playground/translator')
      },
      {
        text: 'עוזר קולי', 
        icon: <GamepadIcon/>,
        onClick: () => history.push('/playground/recognition')
      },
      {
        text: 'Pac-Man', 
        icon: <GamepadIcon/>,
        onClick: () => history.push('/playground/pacman')
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
        <Toolbar>
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
              <ListItem button onClick={handleClick}>
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