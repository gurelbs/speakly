import React,{useEffect,useState} from 'react'
import './styles/page-animation.css'
import './styles/homepage.css'
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Container from '@material-ui/core/Container';
import ParticlesBG from './ParticlesBG';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
export default function HomePage() {
    const [imageLoad, setImageLoad] = useState(false)
    useEffect(() => setImageLoad(true), [])
    return ( 
    <>
        <Container style={{position:'relative'}} className='page text-center d-flex flex-column bg-gif mx-auto' style={{minWidth:'100%'}}>
        <ParticlesBG/>
            <div className="hero">
            <div className='jumbotron d-block' style={{zIndex:'2', minWidth:'calc("100% - 64px")'}}>
                <h1 className="wellcome-msg">
                    <span>ספיקלי</span>
                    <code className="wellcome-msg speakly-txt">Speakly.cf</code>
                </h1>
            </div>
            <div className='container'>
                <h4 className="cover-txt">עוזרת דיגיטלית <span>בעברית</span></h4>
            </div>
            </div>
            <div className="homepage-btns">
                <Button variant="text" size="large" style={{background: '#669'}}>מגרש משחקים</Button>
                <Button variant="outlined" size="large">איך זה עובד</Button>
            </div>
        </Container>
    </>
    )
}
