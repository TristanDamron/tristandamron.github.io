let waves = [];
let waveDelay = 25;
let time = waveDelay;
let maxRadius = 200;

function setup() {
    createCanvas(800, 800);
}

function draw() {    
    time++; 
    clear();
    ripple();
    bounce();
    
    if (time % waveDelay == 0) {
        createWave();    
    }    
}

function keyPressed() {
    if (keyCode === 67) {
        waves = [];
    } 
}


// Grow or shrink the waves
function ripple() {
    for (let i = 0; i < waves.length - 1; i++) {
        fill(waves[i].color);
        noStroke();
        ellipse(waves[i].x, waves[i].y, waves[i].radius, waves[i].radius);

        if (waves.length >= 2) {
            detectCollisions();
        }
        
        if (waves[i].radius < 50) {
            waves[i].direction = 1;
        } else if (waves[i].radius > maxRadius) {
            waves[i].direction = -1;
        }

        waves[i].radius += 1 * waves[i].direction;
    }
}

function bounce() {
    for (let i = 0; i < waves.length; i++) {
        if (waves[i].velX > 0) {
            waves[i].x += waves[i].velX;
            waves[i].velX--;
        } else if (waves[i].velX > 0) {
            waves[i].x += waves[i].velX;
            waves[i].velX++;
        }
        
        if (waves[i].velY > 0) {
            waves[i].y += waves[i].velX;            
            waves[i].velY--;
        } else if (waves[i] < 0) {
            waves[i].y += waves[i].velX;
            waves[i].velY++;
        }     
    }    
}

function detectCollisions() {
    for (let i = 0; i < waves.length; i++) {
        for (let j = 0; j < waves.length - 1; j++) {
            let wave1 = waves[i];
            let wave2 = waves[j];

            let v1 = createVector(wave1.x, wave1.y);
            let v2 = createVector(wave2.x, wave2.y);
            
            if (v1.dist(v2) <= wave1.radius && wave1.direction != -1) {
                wave1.touched = true;                
                wave1.direction = wave1.direction * -1;            
                wave2.direction = wave2.direction * -1;     
                wave1.velX = Math.random() * 200;      
                wave1.velY = Math.random() * 200;    
            }
        }
    }
}

function createWave() {
    if (mouseIsPressed) {       
        let wave = {
            x : mouseX,
            y : mouseY,
            velX : 0,
            velY : 0,
            radius: 1,
            color: color(Math.random() * 255, Math.random() * 255, Math.random() * 255),
            direction: 1            
        }
        waves.push(wave);
    } 
}