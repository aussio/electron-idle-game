import { Assets, Sprite, Spritesheet } from 'pixi.js';
import { Game } from '../lib/Game';

export class TileMap extends Game {
    constructor(container) {
        super(container);
    }

    async loadAssets() {

        const spritesheetData = await fetch('medievalRTS_spritesheet.json').then(res => res.json());
        const spritesheetPng = await Assets.load('medievalRTS_spritesheet.png');
        const spritesheet = new Spritesheet(spritesheetPng, spritesheetData);
        spritesheet.parse()

        for (const texture of Object.values(spritesheet.textures)) {
            const sprite = new Sprite(texture);
            sprite.x = texture.frame.x;
            sprite.y = texture.frame.y;
            this.app.stage.addChild(sprite);
        }
    }

    async start() {
        console.log('starting tilemap game');
        await super.start();
        return this.app;
    }
}
