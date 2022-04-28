import React from 'react';
import { Link } from 'react-router-dom';
import './styles/LandingPage.css';
import imgLandingPage from '../img/LandingPage.jpg';

export default function LandingPage(){
    return(
        <div className="landing-box">
            <h1>¡Bienvenidx a pokeid.!</h1>
            <Link to = '/home'>
                <button>Ingresar</button>
            </Link>
            <img src={imgLandingPage} alt="imagen de inicio" />
        </div>
    )
}