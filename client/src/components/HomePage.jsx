import React from 'react'
import './styles/page-animation.css'
import './styles/homepage.css'
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

export default function HomePage() {
    return (
        <Paper elevation={0}>
            <Container className='page text-center d-flex justify-content-center h-100 p-3 mx-auto flex-column bg-gif h-100 w-100 mx-auto' style={{minWidth:'100%'}}>
            <div className='jumbotron d-block' style={{minWidth:'calc("100% - 64px")'}}>
                <h1 className="wellcome-msg">ספיקלי</h1>
            </div>
            <div className='container'>
                <h4 className="cover-txt">מנוע לזיהוי וסינתוז קול <span>בעברית</span></h4>
            </div>
        </Container>
        </Paper> 
    )
}
