import { Application, Assets, Sprite, SCALE_MODES } from 'pixi.js';
import 'pixi.js/unsafe-eval';

export async function startdragExample(container) {
    // Create a new application
    const app = new Application();

    // Initialize the application
    await app.init({ background: '#1099bb', resizeTo: window });

    // Append the application canvas to the container
    container.appendChild(app.canvas);

    // Load the bunny texture
    const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

    // Set the texture's scale mode to nearest to preserve pixelation
    texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;

    for (let i = 0; i < 10; i++) {
        createBunny(
            Math.floor(Math.random() * app.screen.width),
            Math.floor(Math.random() * app.screen.height)
        );
    }

    function createBunny(x, y) {
        const bunny = new Sprite(texture);
        bunny.eventMode = 'static';
        bunny.cursor = 'pointer';
        bunny.anchor.set(0.5);
        bunny.scale.set(3);
        bunny.on('pointerdown', onDragStart, bunny);
        bunny.x = x;
        bunny.y = y;
        app.stage.addChild(bunny);
    }

    let dragTarget = null;

    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    app.stage.on('pointerup', onDragEnd);
    app.stage.on('pointerupoutside', onDragEnd);

    function onDragMove(event) {
        if (dragTarget) {
            dragTarget.parent.toLocal(event.global, null, dragTarget.position);
        }
    }

    function onDragStart() {
        this.alpha = 0.5;
        dragTarget = this;
        app.stage.on('pointermove', onDragMove);
    }

    function onDragEnd() {
        if (dragTarget) {
            app.stage.off('pointermove', onDragMove);
            dragTarget.alpha = 1;
            dragTarget = null;
        }
    }

    return app; // Return the app instance for cleanup if needed
} 