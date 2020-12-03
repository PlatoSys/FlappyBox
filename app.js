const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const UP = document.querySelector('#up');
const DOWN = document.querySelector('#down');
const LEFT = document.querySelector('#left');
const RIGHT = document.querySelector('#right');
const GAP = 100;
let Xspeed = 0;
let Yspeed = 0;
let ObstacleSpeed = 1;
let Score = 0; 
let ObstaclesArray = []
let gameLost = false;
let timing = 2000;
let head = document.querySelector('.head');
let start = document.querySelector('#startDiv');
let loseDiv = document.createElement('div');
let restartBtn = document.createElement('button');
let startBtn = document.querySelector('#start');
let level = document.querySelector('#levelSet');
let size = 50;
restartBtn.classList.add('btn');
restartBtn.classList.add('btn-primary');
restartBtn.id = 'restart';
restartBtn.innerHTML = 'Restart';
loseDiv.appendChild(restartBtn);
console.log(window.innerWidth);
if(window.innerWidth < 600){
    timing = 3000;
}


startBtn.addEventListener('click', ev => {

    if(level.value == 'Easy'){
        size = 25;
    } 
    if( level.value == 'Imposible')  {
        size = 150;
    }

    rect.square = size;
    update();
    start.remove();
    if( level.value != 'Ana'){
        setInterval(createObstacles, timing);
    }
})


const rect = {
    x: 100,
    y: 100,
    square: size
}

class Obst {
    constructor(x,y,width,height){
        this.x = x,
        this.y = y,
        this.width = width,
        this.height = height;
    }

    update(){
        this.x -= ObstacleSpeed;
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.fillStyle = 'green'
        ctx.fill();
        if(this.x < - 30 ){
            ObstaclesArray.shift();
        }
        if(rect.x + rect.square > this.x  &&
            rect.x + rect.square < this.x + this.width &&
            rect.y < this.height &&
            this.height != canvas.height
            ){
                head.appendChild(loseDiv);
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "#000000";
                // ctx.clearRect(0, 0, canvas.width, canvas.height);
                gameLost = true;
                clearInterval();
                ctx.font = "30px Arial";
                ctx.fillText(`You Lost - ${Score} Point`,(canvas.width/2) - 120,canvas.height/2);
            }
        if(rect.x + rect.square > this.x &&
            rect.x + rect.square  < this.x + this.width &&
            rect.y + rect.square > this.y &&
            this.height == canvas.height){
                head.appendChild(loseDiv);
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "#000000";
                // ctx.clearRect(0, 0, canvas.width, canvas.height);
                gameLost = true;
                clearInterval();
                ctx.font = "30px Arial";
                ctx.fillText(`You Lost - ${Score} Point`,(canvas.width/2) - 120,canvas.height/2);
            }
        if(rect.x > this.x &&
            rect.x < this.x + this.width &&
            rect.y < this.height &&
            this.height != canvas.height){
                head.appendChild(loseDiv);
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "#000000";
                // ctx.clearRect(0, 0, canvas.width, canvas.height);
                gameLost = true;
                clearInterval();
                ctx.font = "30px Arial";
                ctx.fillText(`You Lost - ${Score} Point`,(canvas.width/2) - 120,canvas.height/2);
            }
        if(rect.x > this.x &&
            rect.x < this.x + this.width &&
            rect.y > this.y &&
            this.height == canvas.height){
                head.appendChild(loseDiv);
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "#000000";
                // ctx.clearRect(0, 0, canvas.width, canvas.height);
                gameLost = true;
                clearInterval();
                ctx.font = "30px Arial";
                ctx.fillText(`You Lost - ${Score} Point `,(canvas.width/2) - 120,canvas.height/2);
            }
    }


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



function createObstacles(){
    canvasX = canvas.width;
    upRandom = ((Math.random() * 1000)% 17)*23;
    if(canvas.height - upRandom < rect.square){
        upRandom -= 60;
    }
    downRandom = upRandom + GAP;

    ObstaclesArray.push(new Obst(canvasX, 0 ,20, upRandom));
    ObstaclesArray.push(new Obst(canvasX, downRandom,20,canvas.height));
}



// setInterval(createObstacles, 5000);

function updateScore(){
    ctx.font = "30px Arial";
    ctx.fillText(`${Score++}`,canvas.width- 100, 50 );
}



function update() {
    drawRect();
    ObstaclesArray.forEach(obstacle => {
        obstacle.update();
    });
    if(gameLost == true){
        return;
    }
    requestAnimationFrame(update);
    updateScore();
}





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


// update();

UP.addEventListener('touchstart', function (e) {
    Yspeed = -2;
})
UP.addEventListener('touchend', function (e) {
    Yspeed = 0;
})
DOWN.addEventListener('touchstart', function (e) {
    Yspeed = 2;
})
DOWN.addEventListener('touchend', function (e) {
    Yspeed = 0;
})
LEFT.addEventListener('touchstart', function (e) {
    Xspeed = -2;
})
LEFT.addEventListener('touchend', function (e) {
    Xspeed = 0;
})
RIGHT.addEventListener('touchstart', function (e) {
    Xspeed = 2;
})
RIGHT.addEventListener('touchend', function (e) {
    Xspeed = 0;
})




restartBtn.addEventListener('click', ev => {
    location.reload();
})