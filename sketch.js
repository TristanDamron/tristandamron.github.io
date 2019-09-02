let waves = [];
let waveDelay = 15;
let time = waveDelay;
let firstRemoved = false;
let piano;

function preload() {
    piano = [loadSound("/sfx/rain.mp3"), 
             loadSound("/sfx/rain.mp3"),
             loadSound("/sfx/rain.mp3"), 
             loadSound("/sfx/rain.mp3"), 
             loadSound("/sfx/wave1.wav"), 
             loadSound("/sfx/wave1.wav"), 
             loadSound("/sfx/bass1.mp3"), 
             loadSound("/sfx/bass1.mp3"), 
             loadSound("/sfx/bass1.mp3")];
}

function setup() {
    createCanvas(windowWidth, windowHeight);            
}

function draw() {    
    time++; 

    if (waves.length != 0) {
        for (let i = 0; i < piano.length; i++) {
            piano[i].setVolume(1 + (1 / waves.length));
        }
    }

    clear();
    ripple();    
    
    if (time % waveDelay == 0) {
        if (waves.length < 20) {
            createWave();        
        }
    }
    
    if (waves.length >= 20) {
        textSize(32);
        fill(255,255,255);
        textAlign(CENTER);
        text("Press C to start a new storm.", windowWidth / 2, windowHeight / 2);
    }
}

function keyPressed() {
    if (keyCode === 67) {
        for (let i = 0; i < waves.length; i++) {
            waves[i].sfx.stop();
        }
        waves = [];
    } 
}


// Grow or shrink the waves
function ripple() {
    for (let i = 0; i < waves.length; i++) {
        fill(waves[i].color);
        noStroke();
        ellipse(waves[i].x, waves[i].y, waves[i].radius, waves[i].radius);

        if (waves.length >= 2) {            
            detectCollisions();
            bounce();
        }
        
        if (waves[i].radius < 0) {
            waves[i].direction = 1;
            waves[i].canPlaySFX = true;
        }

        waves[i].radius += 1 * waves[i].direction;
    }
}

function bounce() {
    for (let i = 0; i < waves.length; i++) {        
        let v1 = createVector(waves[i].velX, waves[i].velY);
        let v2 = createVector(0, 0);

        let v3 = p5.Vector.lerp(v1, v2, 0.001);         
        waves[i].velX = v3.x;
        waves[i].velY = v3.y;        

        waves[i].x -= waves[i].velX;
        waves[i].y -= waves[i].velY;
    }
}

function detectCollisions() {
    for (let i = 0; i < waves.length; i++) {
        for (let j = 1; j < waves.length; j++) {
            let wave1 = waves[i];
            let wave2 = waves[j];

            let v1 = createVector(wave1.x, wave1.y);
            let v2 = createVector(wave2.x, wave2.y);                    

            if (v1.dist(v2) < (wave2.radius + wave1.radius) / 2
                && wave1.direction != -1
                && v1.dist(v2) > 0) {                 

                wave1.direction = -1;            
                wave2.direction = -1;  

                if (wave1.canPlaySFX && wave2.canPlaySFX) {
                    wave1.sfx.play();                
                    wave2.sfx.play();
                    wave1.canPlaySFX = false;
                    wave2.canPlaySFX = false;
                }
                wave1.velX = (Math.floor(Math.random() * (1 - (-1) + 1) + -1)) / 25;
                wave1.velY = (Math.floor(Math.random() * (1 - (-1) + 1) + -1)) / 25;
                wave2.velX = (Math.floor(Math.random() * (1 - (-1) + 1) + -1)) / 25;
                wave2.velY = (Math.floor(Math.random() * (1 - (-1) + 1) + -1)) / 25;
            }
        }
    }
}

function createWave() {
    if (mouseIsPressed) { 
        let waveColor = Math.random() * 255;      
        let wave = {
            x : mouseX,
            y : mouseY,
            velX : 0,
            velY : 0,
            radius: 1,
            color: color(waveColor, waveColor, waveColor),
            direction: 1, 
            sfx: piano[Math.floor(Math.random() * piano.length)], 
            canPlaySFX: true
        }

        wave.sfx.play();
        waves.push(wave);
    } 
}