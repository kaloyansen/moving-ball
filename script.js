// Create Scene
const root = document.getElementById('root');
root.style.display = 'flex';
root.style.justifyContent = 'left';
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
floor.style.width = screen.style.width;
floor.style.height = "10px";
floor.style.border = "solid 1px green";
floor.style.backgroundColor = "green";

const box = document.createElement('div');
box.style.position = "absolute";
box.style.bottom = "12px";
box.style.left = getStyleValue(screen.style.width) / 2 + "px";
box.style.width = getStyleValue(screen.style.width) / 5 + "px";//"80px";
box.style.height = getStyleValue(screen.style.height) / 3 + "px";//"333px";
box.style.backgroundColor = "#eae060";
box.style.border = "solid 2px #bbb44f";
box.style.borderRadius = "5px";

const pux = document.createElement('div');
pux.style.position = "absolute";
pux.style.bottom = "12px";
pux.style.width = box.style.width;
pux.style.height = getStyleValue(box.style.height) / 2 + "px";//"333px";
pux.style.left = getStyleValue(box.style.left) - getStyleValue(box.style.width) + "px";
pux.style.backgroundColor = "#ea60e0";
pux.style.border = "solid 2px #bbb44f";
pux.style.borderRadius = "5px";

const ball = document.createElement('div');
ball.style.position = "absolute";
ball.style.bottom = "12px";
ball.style.left = "100px";
ball.style.width = "33px";
ball.style.height = "30px";
ball.style.backgroundColor = "red";
ball.style.border = "solid 5px black";
ball.style.borderRadius = "20px";

screen.appendChild(floor);
screen.appendChild(box);
screen.appendChild(pux);
screen.appendChild(ball);

root.appendChild(screen);

function outsideBox(element) { return outside(element, 'x') + outside(element, 'y'); }
function outside(element, dimension) {
    let x = getStyleValue(element.style.left);
    let y = getStyleValue(element.style.bottom);
    let w = getStyleValue(element.style.width);

    let wbox = getStyleValue(box.style.width);
    let hbox = getStyleValue(box.style.height);
    let xboxmin = getStyleValue(box.style.left);
    let xboxmax = xboxmin + wbox;

    console.log('box ' + ' ' + hbox);
    console.log('ball ' + x + ' ' + y);

    if (dimension == 'x') {
        if (x < xboxmin - 1.1 * w) return 1;
        else if (x > xboxmax + w / 7.) return 2;
        else return 0;
    } else if (dimension == 'y') { 
        if (y > hbox + getStyleValue(ball.style.height) / 2) return 3;
        else return 0;
    } else {
        console.error('dimension = ' + dimension);
    }

    return 0;
}


function getStyleValue(eleparam) { return parseInt(eleparam.replace('px', ''), 10); }
function getX(element) { return getStyleValue(element.style.left); }
function getY(element) { return getStyleValue(element.style.bottom); }

// move right, move left, jump up and fall down with the gravity

var frameRate = 1/40; // Seconds
var frameDelay = frameRate * 1000; // ms
var loopTimer = false;
var setup = function()
{
    loopTimer = setInterval(loop, frameDelay);
}

var loop = function()
{
    console.log('falling ...');
    movElement(ball, 'gravity');
}

function movElement(element, direction, xmin = 0, xmax = getStyleValue(screen.style.width),
                 ymin = getStyleValue(floor.style.height), ymax = getStyleValue(screen.style.height))
{
    var left = getX(element);
    var bottom = getY(element);

    if (direction == 'jump' && bottom < ymin) {// || bottom > getStyleValue(box.style.height))) {//}< ymax) {
        element.style.bottom = `${bottom + 444}px`;
    } else if (direction == 'right' && left < xmax) {
        if (outsideBox(element) > 0) element.style.left = `${left + 8}px`;
        else element.style.left = `${left - 1}px`;
    } else if (direction == 'left' && left > xmin) {
        if (outsideBox(element) > 0) element.style.left = `${left - 8}px`;
        else element.style.left = `${left + 1}px`;
    } else if (direction == 'gravity' && bottom > ymin && outsideBox(element) > 0) {
        if (outsideBox(element) > 0) element.style.bottom = `${bottom - 9}px`;
        else element.style.bottom = `${bottom - 9}px`;
    } else {
        console.log('movElement else');
    }
}


document.addEventListener('keydown', function(e) {

    let ewi = e.which;
    console.log(ewi);
    
    switch (ewi) {

    case 37:
        movElement(ball, 'left');
        break;

    case 38:
        movElement(ball, 'jump');
        break;

    case 32:// space key code
        movElement(ball, 'jump');
        break;

    case 39:
        movElement(ball, 'right');
        break;

    case 40:
        movElement(ball, 'gravity');
        break;

    default:
        console.log('this must not happen');
        break;
    }
    
});



setup();
