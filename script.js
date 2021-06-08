// Create Scene
const root = document.getElementById('root');
root.style.display = 'flex';
root.style.justifyContent = 'center';
root.style.alignItems = 'center';

const screen = document.createElement('div');
screen.style.position = "relative";
screen.style.width = "800px";
screen.style.height = "600px";
screen.style.border = "solid 1px black";
screen.style.background = "linear-gradient(to bottom, #94c5f8 1%,#a6e6ff 70%,#b1b5ea 100%)";

const floor = document.createElement('div');
floor.style.position = "absolute";
floor.style.bottom = 0;
floor.style.width = "800px";
floor.style.height = "10px";
floor.style.border = "solid 1px green";
floor.style.backgroundColor = "green";

const box = document.createElement('div');
box.style.position = "absolute";
box.style.bottom = "12px";
box.style.right = "125px";
box.style.width = "80px";
box.style.height = "120px";
box.style.backgroundColor = "#eae060";
box.style.border = "solid 2px #bbb44f";
box.style.borderRadius = "5px";

const ball = document.createElement('div');
ball.style.position = "absolute";
ball.style.bottom = "12px";
ball.style.left = "25px";
ball.style.width = "30px";
ball.style.height = "30px";
ball.style.backgroundColor = "red";
ball.style.border = "solid 2px black";
ball.style.borderRadius = "20px";

screen.appendChild(floor);
screen.appendChild(box);
screen.appendChild(ball);

root.appendChild(screen);

// move any direction

function moveBall(direction) {
    var leftNumbers = ball.style.left.replace('px', '');
    var topNumbers = ball.style.top.replace('px', '');
    var rightNumbers = ball.style.right.replace('px', '');
    var bottomNumbers = ball.style.bottom.replace('px', '');
    var left = parseInt(leftNumbers, 10);
    var top = parseInt(topNumbers, 10);
    var right = parseInt(rightNumbers, 10);
    var bottom = parseInt(bottomNumbers, 10);

    if (direction == 'up' && bottom < 600) {
        ball.style.bottom = `${bottom + 33}px`;
    }

    if (direction == 'right' && left < 800) {
        ball.style.left = `${left + 33}px`
    }

    if (direction == 'down' && bottom > 0) {
        ball.style.bottom = `${bottom - 33}px`;
    }

    if (direction == 'left' && left > 0) {
        ball.style.left = `${left - 33}px`
    }
}

document.addEventListener('keydown', function(e) {

    switch (e.which) {

    case 37:
        moveBall('left');
        break;

    case 38:
        moveBall('up');
        break;

    case 39:
        moveBall('right');
        break;

    case 40:
        moveBall('down');
        break;

    default:
        break;
    }
    
});
