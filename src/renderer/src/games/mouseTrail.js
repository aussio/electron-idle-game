import { Assets, MeshRope, Point } from 'pixi.js';
import { Game } from '../lib/Game';

export class MouseTrail extends Game {
    constructor(container) {
        super(container);
        this.historyX = [];
        this.historyY = [];
        this.historySize = 20;
        this.ropeSize = 100;
        this.points = [];
        this.mouseposition = null;
    }

    async loadAssets() {
        this.trailTexture = await Assets.load('https://pixijs.com/assets/trail.png');
    }

    clipInput(k, arr) {
        if (k < 0) k = 0;
        if (k > arr.length - 1) k = arr.length - 1;
        return arr[k];
    }

    getTangent(k, factor, array) {
        return (factor * (this.clipInput(k + 1, array) - this.clipInput(k - 1, array))) / 2;
    }

    cubicInterpolation(array, t, tangentFactor = 1) {
        const k = Math.floor(t);
        const m = [
            this.getTangent(k, tangentFactor, array),
            this.getTangent(k + 1, tangentFactor, array)
        ];
        const p = [this.clipInput(k, array), this.clipInput(k + 1, array)];
        t -= k;
        const t2 = t * t;
        const t3 = t * t2;
        return (2 * t3 - 3 * t2 + 1) * p[0] + (t3 - 2 * t2 + t) * m[0] + (-2 * t3 + 3 * t2) * p[1] + (t3 - t2) * m[1];
    }

    async start() {
        await super.start();

        // Create history array
        for (let i = 0; i < this.historySize; i++) {
            this.historyX.push(0);
            this.historyY.push(0);
        }

        // Create rope points
        for (let i = 0; i < this.ropeSize; i++) {
            this.points.push(new Point(0, 0));
        }

        // Create the rope
        const rope = new MeshRope({ texture: this.trailTexture, points: this.points });
        rope.blendmode = 'add';
        this.app.stage.addChild(rope);

        // Set up stage interactions
        this.app.stage.eventMode = 'static';
        this.app.stage.hitArea = this.app.screen;
        this.app.stage.on('mousemove', (event) => {
            this.mouseposition = this.mouseposition || { x: 0, y: 0 };
            this.mouseposition.x = event.global.x;
            this.mouseposition.y = event.global.y;
        });

        // Set up animation
        this.app.ticker.add(() => {
            if (!this.mouseposition) return;

            // Update the mouse values to history
            this.historyX.pop();
            this.historyX.unshift(this.mouseposition.x);
            this.historyY.pop();
            this.historyY.unshift(this.mouseposition.y);

            // Update the points to correspond with history
            for (let i = 0; i < this.ropeSize; i++) {
                const p = this.points[i];
                const ix = this.cubicInterpolation(this.historyX, (i / this.ropeSize) * this.historySize);
                const iy = this.cubicInterpolation(this.historyY, (i / this.ropeSize) * this.historySize);
                p.x = ix;
                p.y = iy;
            }
        });

        return this.app;
    }
}

export function startMouseTrail(container) {
    const game = new MouseTrail(container);
    return game.start();
}
