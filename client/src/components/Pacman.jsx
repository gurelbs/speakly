import React from 'react'
import CardMedia from '@material-ui/core/CardMedia';

export default function Pacmen() {
    return (
        <CardMedia>
            <iframe width='100vw' height='100vh' className="container h-100 w-100 d-flex" src='./../pacman/PAC-MAN.html'></iframe>
        </CardMedia>
    )
}
