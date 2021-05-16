import React from 'react'
import './styles/logo.css'
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import { Link } from 'react-router-dom';

export default function Logo() {
    return (<Link to="/" style={{ textDecoration:'none',color:'aqua'}}><div className='logo'>ספיקלי<span> <RecordVoiceOverIcon style={{ color: 'aqua' }}/> </span>Speakly</div></Link>
    )
}
