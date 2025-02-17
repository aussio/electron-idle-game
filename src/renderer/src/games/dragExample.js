import { Assets, Sprite } from 'pixi.js';
import { Game } from '../lib/Game';

export class DragExample extends Game {
    constructor(container) {
        super(container);
        this.dragTarget = null;
    }

    async loadAssets() {
        // Load the bunny texture
        this.texture = await Assets.load('https://pixijs.com/assets/bunny.png');
        this.texture.source.scaleMode = 'nearest';
    }

    createBunny(x, y) {
        const bunny = new Sprite(this.texture);
        bunny.eventMode = 'static';
        bunny.cursor = 'pointer';
        bunny.anchor.set(0.5);
        bunny.scale.set(3);
        bunny.on('pointerdown', this.onDragStart.bind(this));
        bunny.x = x;
        bunny.y = y;
        this.app.stage.addChild(bunny);
    }

    onDragMove(event) {
        if (this.dragTarget) {
            this.dragTarget.parent.toLocal(event.global, null, this.dragTarget.position);
        }
    }

    onDragStart(event) {
        const bunny = event.currentTarget;
        bunny.alpha = 0.5;
        this.dragTarget = bunny;
        this.app.stage.on('pointermove', this.onDragMove.bind(this));
    }

    onDragEnd() {
        if (this.dragTarget) {
            this.app.stage.off('pointermove', this.onDragMove.bind(this));
            this.dragTarget.alpha = 1;
            this.dragTarget = null;
        }
    }

    async start() {
        await super.start();

        // Create bunnies
        for (let i = 0; i < 12; i++) {
            this.createBunny(
                Math.floor(Math.random() * this.app.screen.width),
                Math.floor(Math.random() * this.app.screen.height)
            );
        }

        // Set up stage interactions
        this.app.stage.eventMode = 'static';
        this.app.stage.hitArea = this.app.screen;
        this.app.stage.on('pointerup', this.onDragEnd.bind(this));
        this.app.stage.on('pointerupoutside', this.onDragEnd.bind(this));

        return this.app;
    }
}