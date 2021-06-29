
import React, { useState, useEffect } from 'react';

import './EnvironmentComponent.css'

export default (
    { onFrictionChange, onBounceChange, onGravityChange }:
        {
            onFrictionChange: (value: number) => void,
            onBounceChange: (value: number) => void,
            onGravityChange: (value:number) => void
        }) => {
    const [friction, setFriction] = useState(0.98);
    const [bounce, setBounce] = useState(0.9);
    const [gravity, setGravity] = useState(0.25);

    const updateFriction = (value: number) => {
        setFriction(value);
        onFrictionChange(value);
    }

    const updateBounce = (value: number) => {
        setBounce(value);
        onBounceChange(value);
    }

    const updateGravity = (value: number) => {
        setGravity(value);
        onGravityChange(value);
    }

    return (
        <div className="container">
            <label htmlFor="friction">Friction rate: {friction}</label>
            <input type="range" min="0" max="1" step="0.02" value={friction} onChange={(e) => updateFriction(e.target.valueAsNumber)} className="slider" id="friction"></input>
            
            <label htmlFor="bounce">Bounce rate: {bounce}</label>
            <input type="range" min="0" max="1" step="0.02" value={bounce} onChange={(e) => updateBounce(e.target.valueAsNumber)} className="slider" id="bounce"></input>
            
            <label htmlFor="gravity">Gravity: {gravity}</label>
            <input type="range" min="0" max="1" step="0.02" value={gravity} onChange={(e) => updateGravity(e.target.valueAsNumber)} className="slider" id="gravity"></input>
            
        </div>
    );
}