import React from 'react'
import './styles/logo.css'
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
export default function Logo() {
    return (<div className='logo'>ספיקלי<span> <RecordVoiceOverIcon style={{ color: 'aqua' }}/> </span>Speakly</div>
    )
}
