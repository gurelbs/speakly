import React from 'react'
import './styles/page-animation.css'
import './styles/homepage.css'
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Container from '@material-ui/core/Container';

export default function HomePage() {
    return (
        <Container className='page container-fluid bg-gif text-light h-100 w-100 d-flex justify-content-center pt-3' style={{minWidth:'100%'}}>
            <div className=''style={{minWidth:'calc("100% - 64px")'}}>
            <h1 className="text-dark">ברוכים הבאים </h1>
            </div>
        </Container >
    )
}
