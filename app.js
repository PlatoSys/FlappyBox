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
let head = document.querySelector('.head');
let start = document.querySelector('#start');
let loseDiv = document.createElement('div');
let restartBtn = document.createElement('button');
restartBtn.classList.add('btn');
restartBtn.classList.add('btn-primary');
restartBtn.id = 'restart';
restartBtn.innerHTML = 'Restart';
loseDiv.appendChild(restartBtn);

const rect = {
    x: 100,
    y: 100,
    square: 50
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
        ctx.stroke();
        if(this.x < - 30 ){
            ObstaclesArray.shift();
        }
        // console.log(rect.y, thi)
        if(rect.x + rect.square > this.x  &&
            rect.x + rect.square < this.x + this.width &&
            rect.y < this.height &&
            this.height != canvas.height
            ){
                head.appendChild(loseDiv);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                gameLost = true;
                clearInterval();
                ctx.font = "30px Arial";
                ctx.fillText(`You Lost - ${Score} Point`,(canvas.width/2) - 70,canvas.height/2);
                ctx.stroke();
            }
        if(rect.x + rect.square > this.x &&
            rect.x + rect.square  < this.x + this.width &&
            rect.y + rect.square > this.y &&
            this.height == canvas.height){
                head.appendChild(loseDiv);

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                gameLost = true;
                clearInterval();
                ctx.font = "30px Arial";
                ctx.fillText(`You Lost - ${Score} Point`,(canvas.width/2) - 70,canvas.height/2);
                ctx.stroke();
            }
        if(rect.x > this.x &&
            rect.x < this.x + this.width &&
            rect.y < this.height &&
            this.height != canvas.height){
                head.appendChild(loseDiv);

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                gameLost = true;
                clearInterval();
                ctx.font = "30px Arial";
                ctx.fillText(`You Lost - ${Score} Point`,(canvas.width/2) - 70,canvas.height/2);
                ctx.stroke();
            }
        if(rect.x > this.x &&
            rect.x < this.x + this.width &&
            rect.y > this.y &&
            this.height == canvas.height){
                head.appendChild(loseDiv);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                gameLost = true;
                clearInterval();
                ctx.font = "30px Arial";
                ctx.fillText(`You Lost - ${Score} Point `,(canvas.width/2) - 70,canvas.height/2);
                ctx.stroke();
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
    ctx.stroke();
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

function updateScore(){
    ctx.font = "30px Arial";
    ctx.fillText(`${Score++}`,canvas.width- 100, 50 );
    ctx.stroke();
}


start.addEventListener('click', ev => {
    update();
    start.remove();
    setInterval(createObstacles, 5000);
})

restartBtn.addEventListener('click', ev => {
    location.reload();
})