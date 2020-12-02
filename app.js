const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const UP = document.querySelector('#up');
const DOWN = document.querySelector('#down');
const LEFT = document.querySelector('#left');
const RIGHT = document.querySelector('#right');
const GAP = 100;
let Xspeed = 0;
let Yspeed = 0;
let ObstacleSpeed = 0.5;
let ObstaclesArray = []

const rect = {
    x: 100,
    y: 100,
    square: 50
};

const obst1 = {
    pos: canvas.width,
    up: 50,
    down: 70
}

const obst2 = {
    pos: canvas.width,
    up: 50,
    down: 70
}


function clear(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function drawRect() {
    clear();
    ctx.beginPath();
    if (rect.x == 0 || rect.x == canvas.width - rect.square) {
        Xspeed = Xspeed*(-1);
    }
    if (rect.y == 0 || rect.y == canvas.height - rect.square) {
        Yspeed = Yspeed*(-1);
    }

    ctx.rect(rect.x, rect.y, rect.square, rect.square);
    ctx.fillStyle = 'green'
    ctx.fill();

    rect.x += Xspeed;
    rect.y += Yspeed;
}






function createNewObstacle(){
    drawObstacle();
}

function drawObstacle(){
    obst1.pos -= ObstacleSpeed;
    ctx.beginPath();
    ctx.rect(obst1.pos, 0, 20, 150);
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(obst1.pos, 250, 20, 150);
    ctx.stroke();
    if(obst1.pos < 0){
        obst1.pos = canvas.width;
        ObstacleSpeed += 1;
    }
    return
    requestAnimationFrame(drawObstacle); 
}




function update() {
    drawRect();
    requestAnimationFrame(update);
}


setTimeout(createNewObstacle,5000)





document.addEventListener('keydown', function(ev) {
    if (ev.key === 'd') {
        Xspeed = 2;
    } else if (ev.key === 'a') {
        Xspeed = -2;
    } else if (ev.key === 'w') {
        Yspeed = -2;
    } else if (ev.key === 's') {
        Yspeed = 2;
    }
});


UP.addEventListener('mousedown', ev => {
    Yspeed = -2;
})
UP.addEventListener('mouseup', ev => {
    Yspeed = 0;
})
DOWN.addEventListener('mousedown', ev => {
    Yspeed = 2;
})
DOWN.addEventListener('mouseup', ev => {
    Yspeed = 0;
})
LEFT.addEventListener('mousedown', ev => {
    Xspeed = -2;
})
LEFT.addEventListener('mouseup', ev => {
    Xspeed = 0;
})
RIGHT.addEventListener('mousedown', ev => {
    Xspeed = 2;
})
RIGHT.addEventListener('mouseup', ev => {
    Xspeed = 0;
})

document.addEventListener('keyup', ev => {
    Xspeed = 0;
    Yspeed = 0;
});


update();

