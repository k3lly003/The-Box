"use strict";
// Game constants
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 600;
const GRAVITY = 0.5;
const JUMP_FORCE = -9;
const BIRD_SIZE = 30;
const PIPE_WIDTH = 60;
const PIPE_GAP = 150;
const PIPE_SPEED = 2;
const GROUND_HEIGHT = 180;
// Game state enum
var GameState;
(function (GameState) {
    GameState[GameState["START"] = 0] = "START";
    GameState[GameState["PLAYING"] = 1] = "PLAYING";
    GameState[GameState["GAMEOVER"] = 2] = "GAMEOVER";
})(GameState || (GameState = {}));
// Bird class
class Bird {
    constructor() {
        this.x = 80;
        this.y = CANVAS_HEIGHT / 2;
        this.velocity = 0;
        this.size = BIRD_SIZE;
    }
    flap() {
        this.velocity = JUMP_FORCE;
    }
    update() {
        this.velocity += GRAVITY;
        this.y += this.velocity;
        // Ground collision
        if (this.y + this.size > CANVAS_HEIGHT - GROUND_HEIGHT) {
            this.y = CANVAS_HEIGHT - GROUND_HEIGHT - this.size;
            this.velocity = 0;
        }
        // Ceiling collision
        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    }
    draw(ctx) {
        // Bird body (retro pixel style)
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(this.x, this.y, this.size, this.size);
        // Bird outline
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.size, this.size);
        // Eye
        ctx.fillStyle = '#000';
        ctx.fillRect(this.x + 20, this.y + 8, 5, 5);
        // Beak
        ctx.fillStyle = '#FF6347';
        ctx.fillRect(this.x + this.size, this.y + 12, 8, 6);
    }
    reset() {
        this.y = CANVAS_HEIGHT / 2;
        this.velocity = 0;
    }
}
// Pipe class
class Pipe {
    constructor(x) {
        this.x = x;
        this.width = PIPE_WIDTH;
        this.topHeight = Math.random() * (CANVAS_HEIGHT - GROUND_HEIGHT - PIPE_GAP - 100) + 50;
        this.bottomY = this.topHeight + PIPE_GAP;
        this.passed = false;
    }
    update() {
        this.x -= PIPE_SPEED;
    }
    draw(ctx) {
        // Top pipe
        ctx.fillStyle = '#228B22';
        ctx.fillRect(this.x, 0, this.width, this.topHeight);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.strokeRect(this.x, 0, this.width, this.topHeight);
        // Top pipe cap
        ctx.fillStyle = '#32CD32';
        ctx.fillRect(this.x - 5, this.topHeight - 20, this.width + 10, 20);
        ctx.strokeRect(this.x - 5, this.topHeight - 20, this.width + 10, 20);
        // Bottom pipe
        ctx.fillStyle = '#228B22';
        ctx.fillRect(this.x, this.bottomY, this.width, CANVAS_HEIGHT - GROUND_HEIGHT - this.bottomY);
        ctx.strokeRect(this.x, this.bottomY, this.width, CANVAS_HEIGHT - GROUND_HEIGHT - this.bottomY);
        // Bottom pipe cap
        ctx.fillStyle = '#32CD32';
        ctx.fillRect(this.x - 5, this.bottomY, this.width + 10, 20);
        ctx.strokeRect(this.x - 5, this.bottomY, this.width + 10, 20);
    }
    isOffScreen() {
        return this.x + this.width < 0;
    }
    collidesWith(bird) {
        const birdLeft = bird.x;
        const birdRight = bird.x + bird.size;
        const birdTop = bird.y;
        const birdBottom = bird.y + bird.size;
        const pipeLeft = this.x;
        const pipeRight = this.x + this.width;
        // Check horizontal overlap
        if (birdRight > pipeLeft && birdLeft < pipeRight) {
            // Check vertical collision with top or bottom pipe
            if (birdTop < this.topHeight || birdBottom > this.bottomY) {
                return true;
            }
        }
        return false;
    }
}
// Game class
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.bird = new Bird();
        this.pipes = [];
        this.score = 0;
        this.bestScore = parseInt(localStorage.getItem('bestScore') || '0');
        this.state = GameState.START;
        this.frameCount = 0;
        // Get UI elements
        this.startScreen = document.getElementById('startScreen');
        this.gameOverScreen = document.getElementById('gameOverScreen');
        this.scoreDisplay = document.getElementById('scoreDisplay');
        this.finalScoreEl = document.getElementById('finalScore');
        this.bestScoreEl = document.getElementById('bestScore');
        this.setupControls();
        this.gameLoop();
    }
    setupControls() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.handleInput();
            }
        });
        // Mouse/touch controls
        this.canvas.addEventListener('click', () => {
            this.handleInput();
        });
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.handleInput();
        });
    }
    handleInput() {
        if (this.state === GameState.START) {
            this.startGame();
        }
        else if (this.state === GameState.PLAYING) {
            this.bird.flap();
        }
        else if (this.state === GameState.GAMEOVER) {
            this.resetGame();
        }
    }
    startGame() {
        this.state = GameState.PLAYING;
        this.startScreen.classList.add('hidden');
        this.scoreDisplay.classList.remove('hidden');
        this.bird.flap();
    }
    resetGame() {
        this.bird.reset();
        this.pipes = [];
        this.score = 0;
        this.frameCount = 0;
        this.state = GameState.START;
        this.gameOverScreen.classList.add('hidden');
        this.startScreen.classList.remove('hidden');
        this.scoreDisplay.classList.add('hidden');
    }
    gameOver() {
        this.state = GameState.GAMEOVER;
        // Update best score
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem('bestScore', this.bestScore.toString());
        }
        // Show game over screen
        this.finalScoreEl.textContent = this.score.toString();
        this.bestScoreEl.textContent = this.bestScore.toString();
        this.gameOverScreen.classList.remove('hidden');
        this.scoreDisplay.classList.add('hidden');
    }
    update() {
        if (this.state !== GameState.PLAYING)
            return;
        this.frameCount++;
        this.bird.update();
        // Spawn pipes
        if (this.frameCount % 90 === 0) {
            this.pipes.push(new Pipe(CANVAS_WIDTH));
        }
        // Update pipes
        for (let i = this.pipes.length - 1; i >= 0; i--) {
            this.pipes[i].update();
            // Check collision
            if (this.pipes[i].collidesWith(this.bird)) {
                this.gameOver();
                return;
            }
            // Update score
            if (!this.pipes[i].passed && this.pipes[i].x + this.pipes[i].width < this.bird.x) {
                this.pipes[i].passed = true;
                this.score++;
                this.scoreDisplay.textContent = this.score.toString();
            }
            // Remove off-screen pipes
            if (this.pipes[i].isOffScreen()) {
                this.pipes.splice(i, 1);
            }
        }
        // Check ground collision
        if (this.bird.y + this.bird.size >= CANVAS_HEIGHT - GROUND_HEIGHT) {
            this.gameOver();
        }
    }
    drawBackground() {
        // Sky
        const skyGradient = this.ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT - GROUND_HEIGHT);
        skyGradient.addColorStop(0, '#87CEEB');
        skyGradient.addColorStop(1, '#E0F6FF');
        this.ctx.fillStyle = skyGradient;
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_HEIGHT);
        // Ground
        this.ctx.fillStyle = '#8B7355';
        this.ctx.fillRect(0, CANVAS_HEIGHT - GROUND_HEIGHT, CANVAS_WIDTH, GROUND_HEIGHT);
        // Ground pattern
        this.ctx.fillStyle = '#654321';
        for (let i = 0; i < CANVAS_WIDTH; i += 20) {
            this.ctx.fillRect(i, CANVAS_HEIGHT - GROUND_HEIGHT, 10, 10);
            this.ctx.fillRect(i + 10, CANVAS_HEIGHT - GROUND_HEIGHT + 10, 10, 10);
        }
        // Grass line
        this.ctx.fillStyle = '#228B22';
        this.ctx.fillRect(0, CANVAS_HEIGHT - GROUND_HEIGHT, CANVAS_WIDTH, 5);
    }
    draw() {
        this.drawBackground();
        // Draw pipes
        this.pipes.forEach(pipe => pipe.draw(this.ctx));
        // Draw bird
        this.bird.draw(this.ctx);
    }
    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}
// Start game when page loads
window.addEventListener('DOMContentLoaded', () => {
    new Game();
});
