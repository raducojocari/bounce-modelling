import { environemnt } from "./Environment";
import {getRandomVelocity} from './randomGenerator';

export interface BallProps {
    index: number;
    x: number;
    y: number;
    radius: number;
    bounce: number;
    friction: number;
    gravity: number;
    color: string;
}

export class Ball {
    private velocityX = 0;
    private velocityY = 0;
    constructor(
        private props: BallProps,
        private canvas: CanvasRenderingContext2D,
        private deleteCallback: (index: number) => void) {

        this.velocityX = getRandomVelocity();
        this.velocityY = getRandomVelocity();
    }

    public setFriction(value: number) {
        this.props.friction = value;
    }

    public setBounce(value: number) {
        this.props.bounce = value;
    }

    public setGravity(value: number) {
        this.props.gravity = value;
    }

    public updatePosition() {
        this.update();
        this.paint();
    }

    paint() {
        if (!this.canvas) {
            return;
        }
        this.canvas.save()
        this.canvas.beginPath()
        this.canvas.fillStyle = this.props.color
        this.canvas.arc(
            this.props.x,
            this.props.y,
            this.props.radius,
            0, Math.PI * 2
        )
        this.canvas.fill()
        this.canvas.restore()
    }

    update() {

        if (this.props.y - this.props.radius <= 0) {
            this.velocityY *= -this.props.bounce;
            this.props.y = this.props.radius;
            this.velocityX *= this.props.friction;
        }

        if (this.props.y + this.props.radius >= environemnt.height) {
            this.velocityY *= -this.props.bounce;
            this.props.y = environemnt.height - this.props.radius;
            this.velocityX *= this.props.friction;
        }

        if (this.props.x - this.props.radius <= 0) {
            this.velocityX *= -this.props.bounce;
            this.props.x = this.props.radius;
        }
        if (this.props.x + this.props.radius >= environemnt.width) {
            this.deleteCallback(this.props.index);
            return;
            // this.velocityX *= -this.props.bounce;
            // this.props.x = environemnt.width - this.props.radius;
        }

        // reset insignificant amounts to 0
        if (this.velocityX < 0.01 && this.velocityX > -0.01) {
            this.velocityX = 0;
        }
        if (this.velocityY < 0.01 && this.velocityY > -0.01) {
            this.velocityY = 0;
        }

        // update position
        this.velocityY += this.props.gravity;
        this.props.x += this.velocityX;
        this.props.y += this.velocityY;
    }
}