import { DEFAULT, ON, OFF, mousePos, data, colors } from './util.js';
import { radion, degree, isInsideArc, pointDegree } from './calc.js';


export class Gauge {
    constructor () {
        this.color  =   '#eee';
        this.percent    =   parseFloat(0.0).toFixed(1);
        this.limit  =   100.0;
        this.speed  =   1.1;

        this.resize();
    }

    resize (stageWidth, stageHeight) {
        //나중에 다시 정리
        this.stageWidth     =   stageWidth;
        this.stageHeight    =   stageHeight;

        this.x = Math.floor(this.stageWidth);
        this.y = Math.floor(this.stageHeight/1.3);

        this.circleX    =   Math.round(this.x/2);
        this.circleY    =   Math.round(this.y/2);
        this.radius     =   this.y/3;
    }

    draw (ctx) {
        ctx.beginPath();
        ctx.arc(this.circleX, this.circleY, this.radius, radion(135), radion(45), false);
        ctx.lineWidth = this.circleY/4;
        ctx.strokeStyle = '#eee';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.circleX, this.circleY, this.radius, radion(135), radion(135)+radion(degree(this.percent)), false);
        ctx.lineWidth = this.circleY/4;
        ctx.strokeStyle = this.color;
        ctx.stroke();

        ctx.closePath();

        //font 위치 맞춰야 함.
        ctx.textBaseline    =   "middle";
        ctx.textAlign   =   "center";
        
        ctx.font    =   `bold ${this.y/8}px Arial`;
        ctx.fillText(this.percent, this.x/2, this.y/2);

        ctx.font    =   `bold ${this.y/12}px Arial`;
        ctx.fillText('percent', this.x/2, this.y/1.5);

    }

}   