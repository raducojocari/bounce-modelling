import React, { useState, useEffect } from 'react';
import { Ball } from "./Ball";
import { environemnt } from "./Environment";

import EnvironmentComponent from './EnvironmentComponents/EnvironmentComponent';
import './App.css';
import { generateRandomBallId, getRadiusWithOffset } from './randomGenerator';

export default () => {

  const balls: { [name: number]: Ball } = {};
  let friction: number = 0.98;
  let bounce: number = 0.9;
  let gravity: number = 0.25;

  const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D>();

  const getConfiguredCanvasContext = (): CanvasRenderingContext2D | undefined => {
    const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    const context = canvas && canvas.getContext('2d') as CanvasRenderingContext2D

    if (!context) {
      throw "Error: Failed to init layout";
    }

    canvas.width = environemnt.width;
    canvas.height = environemnt.height;
    return context;
  }

  const canvasContextCheck = (callback: (canvas: CanvasRenderingContext2D) => void, errorToThrow?: string): void => {
    if (!canvasContext && errorToThrow) {
      throw errorToThrow;
    }

    if (!canvasContext) {
      return;
    }

    callback(canvasContext);
  }

  var update = (): void =>
    canvasContextCheck(() => {
      window.requestAnimationFrame(() => update());
      draw();
    });

  useEffect(() => {
    setCanvasContext(getConfiguredCanvasContext());
    update();
  });

  const addBall = (yMouseCoordinate: number) =>
    canvasContextCheck((canvas) => {

      const id = generateRandomBallId();
      const radiusWithOffset = getRadiusWithOffset();
      const gravityWithOffset = gravity + radiusWithOffset/100;

      console.log('ball count: ',Object.entries(balls).length)

      balls[id] = new Ball(
        {
          index: id,
          x: 0,
          y: yMouseCoordinate,
          radius:radiusWithOffset,
          color: 'red',
          bounce,
          friction,
          gravity: gravityWithOffset
        },
        canvas,
        (index) => {
          console.log('index', index);
          delete balls[index];
        }
      );
    });

  const forEachBall = (callback: (ball: Ball) => void) => {
    for (const [key, value] of Object.entries(balls)) {
      callback(value);
    }
  }

  const draw = () => {
    canvasContextCheck((canvas) => {
      canvas.clearRect(0, 0, environemnt.width, environemnt.height)
      forEachBall(b => b.updatePosition());
    });
  }

  const onFrictionChange = (value: number) => {
    friction = value;
    forEachBall(b => b.setFriction(value));
  }

  const onBounceChange = (value: number) => {
    bounce = value;
    forEachBall(b => b.setBounce(value));
  }

  const onGravityChange = (value: number) => {
    gravity = value;
    forEachBall(b => b.setGravity(value));
  }

  return (
    <div id="gameContainer" >
      < canvas id="gameCanvas" onClick={e => addBall(e.pageY)}></canvas>

      <EnvironmentComponent
        onFrictionChange={onFrictionChange}
        onBounceChange={onBounceChange}
        onGravityChange={onGravityChange}
      />
    </div>
  );
}
