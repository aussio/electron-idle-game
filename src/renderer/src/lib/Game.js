import { Application } from 'pixi.js';
import 'pixi.js/unsafe-eval';

export class Game {
    constructor(container) {
        this.container = container;
        this.app = null;
    }

    async bootstrapApplication() {
        // Create a new application
        this.app = new Application();

        // Initialize the application
        await this.app.init({ resizeTo: window, background: 'rgba(16, 153, 187, 1)' });

        // Append the application canvas to the container
        this.container.appendChild(this.app.canvas);

        return this.app;
    }

    async loadAssets() {
        // Override this method in child classes to load game-specific assets
        return [];
    }

    async start() {
        await this.bootstrapApplication();
        try {
            await this.loadAssets();
        } catch (error) {
            console.error('Failed to load assets:', error);
        }
        // Override this method in child classes to add game-specific logic
        // Should return this.app


        return this.app;
    }
} 