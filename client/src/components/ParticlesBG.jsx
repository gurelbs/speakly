import React from 'react'
import Particles from 'react-particles-js';

export default function ParticlesBG() {
    return (
        <Particles
	className='particles-bg'
    params={{
	    "particles": {
	        "number": {
	            "value": 200
	        },
	        "size": {
	            "value": 5
	        },
			"opacity": {
				value: 0.1,
			  },
			"move": {
				direction: "none",
				enable: true,
				outMode: "bounce",
				random: false,
				speed: 0.3,
				straight: false,
			  },
	    },
	    "interactivity": {
	        "events": {
	            "onhover": {
	                "enable": true,
	                "mode": "repulse"
	            }
	        }
	    }
	}} />
    )
}
