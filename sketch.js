let waves = [];
let waveDelay = 10;
let time = waveDelay;

function setup() {
    createCanvas(800, 800);
}

function draw() {    
    time++; 
    clear();
    ripple();
    
    if (time % waveDelay == 0) {
        createWave();    
    }    
}


// Grow or shrink the waves
function ripple() {
    for (let i = 0; i < waves.length - 1; i++) {
        fill(waves[i].color);
        noStroke();
        ellipse(waves[i].x, waves[i].y, waves[i].radius, waves[i].radius);

        if (waves.length >= 2 && !mouseIsPressed) {
            detectCollisions();
        }
        
        if (waves[i].radius < 1) {
            waves[i].direction = 1;
        } else if (waves[i].radius > 200) {
            waves[i].direction = -1;
        }

        waves[i].radius += 1 * waves[i].direction;
    }
}

function detectCollisions() {
    for (let i = 0; i < waves.length; i++) {
        for (let j = i + 1; j < waves.length - 1; j++) {
            let wave1 = waves[i];
            let wave2 = waves[j];

            let v1 = createVector(wave1.x, wave1.y);
            let v2 = createVector(wave2.x, wave2.y);
            
            if (v1.dist(v2) <= wave1.radius && !wave1.touched) {
                wave1.touched = true;                
                wave1.direction = wave1.direction * -1;            
                wave2.direction = wave2.direction * -1;            
            } else if (v1.dist(v2) > wave1.radius) {
                wave1.touched = false;
            }
        }
    }
}

function createWave() {
    if (mouseIsPressed) {       
        let wave = {
            x : mouseX,
            y : mouseY,
            radius: 1,
            color: color(Math.random() * 255, Math.random() * 255, Math.random() * 255),
            direction: 1,
            touched: false
        }
        waves.push(wave);
    } 
}