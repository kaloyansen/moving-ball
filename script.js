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
box.style.left = getJustNumber(screen.style.width) / 2 + "px";
box.style.width = getJustNumber(screen.style.width) / 5 + "px";//"80px";
box.style.height = getJustNumber(screen.style.height) / 3 + "px";//"333px";
box.style.backgroundColor = "#eae060";
box.style.border = "solid 2px #bbb44f";
box.style.borderRadius = "5px";

const pux = document.createElement('div');
pux.style.position = "absolute";
pux.style.bottom = "12px";
pux.style.width = box.style.width;
pux.style.height = getJustNumber(box.style.height) / 2 + "px";//"333px";
pux.style.left = getJustNumber(box.style.left) - getJustNumber(box.style.width) + "px";
pux.style.backgroundColor = "#ea60e0";
pux.style.border = "solid 2px #bbb44f";
pux.style.borderRadius = "5px";

const sujet = document.createElement('div');
sujet.style.position = "absolute";
sujet.style.bottom = "444px";
sujet.style.left = "100px";
sujet.style.width = "33px";
sujet.style.height = "30px";
sujet.style.backgroundColor = "cyan";
sujet.style.border = "solid 2px black";
sujet.style.borderRadius = "400px";

screen.appendChild(floor);
screen.appendChild(box);
screen.appendChild(pux);
screen.appendChild(sujet);

root.appendChild(screen);

function setPosition(element, lpos, bpos, zpos = null, tpos = null) {
    element.style.left = `${lpos}px`;
    element.style.bottom = `${bpos}px`;
    if (zpos) console.log('z-dimension not implementet');
    if (tpos) console.log('time dimension not implementet');
}

function getPosition(element, dimension = 'x') {
    lpos = getJustNumber(element.style.left);
    bpos = getJustNumber(element.style.bottom);
    wpos = getJustNumber(element.style.width);
    hpos = getJustNumber(element.style.height);

    if (dimension == 't') return null; // time not implemented
    else if (dimension == 'x') return lpos;
    else if (dimension == 'y') return bpos;
    else if (dimension == 'z') return null; // z not implemented
    else if (dimension == 'w') return wpos;
    else if (dimension == 'h') return hpos;
    else return null; // the fifth dimension
}

function movElement(element, direction, xmin = 0, xmax = getJustNumber(screen.style.width),
                    ymin = getJustNumber(floor.style.height), ymax = getJustNumber(screen.style.height))
{
    var left = getPosition(element, 'x');
    var bottom = getPosition(element, 'y');

    if (direction == 'jump') {
        element.style.bottom = `${bottom + 444}px`;
    } else if (direction == 'right') {
        element.style.left = `${left + 8}px`;
    } else if (direction == 'left') {
        element.style.left = `${left - 8}px`;
    } else if (direction == 'gravity') {
        element.style.bottom = `${bottom - 8}px`;
    } else if (direction == 'home') { //go to zero position
        element.style.left = "100px";
        element.style.bottom = "444px";
    } else {
        console.log('movElement else');
    }

    if (isFree(element)) { ; } else {
        console.log(`hit the box`);
        setPosition(element, left, bottom);
    }

    if (isInside(element, screen)) { ; } else {
        console.log(`hit the wall`);
        setPosition(element, left, bottom);
    }
}

function isFree(element) {// say 'yes' if occupied position 
    outofbox = !isIn(element, box); //isNotIn(element, box, 'x') + isNotIn(element, box, 'y');
    outofpux = !isIn(element, pux); //)isNotIn(element, pux, 'x') + isNotIn(element, pux, 'y');

    return outofpux * outofbox;
}

function isInside(element, eframe) {//want to know if the element is in the eframe
    
    let x = getJustNumber(element.style.left);
    let y = getJustNumber(element.style.bottom);
    let w = getJustNumber(element.style.width);
    let h = getJustNumber(element.style.height);

    let wf = getJustNumber(eframe.style.width);
    let hf = getJustNumber(eframe.style.height);
    
    if (x < 0) return false;
    if (x > wf - w) return false;
    if (y < 0) return false;
    if (y > hf - h) return false;
    
    return true;
}
    
function isIn(element, eframe) {

    let x = getJustNumber(element.style.left);
    let y = getJustNumber(element.style.bottom);
    let w = getJustNumber(element.style.width);
    let h = getJustNumber(element.style.height);

    let wf = getJustNumber(eframe.style.width);
    let hf = getJustNumber(eframe.style.height);
    let xf = getJustNumber(eframe.style.left);
    
    let xboxmax = xf + wf;

    if (x < xf - w) return false;
    if (x > xf + wf) return false;
    if (y > hf + h / 2) return false;

    return true;
}

function getJustNumber(eleparam, unit = 'px', hmm = 10) { return parseInt(eleparam.replace(unit, ''), hmm); }

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
    //console.log('falling ...');
    movElement(sujet, 'gravity');
}




document.addEventListener('keydown', function(e) {

    let ewi = e.which;
    console.log(ewi);
    
    switch (ewi) {

    case 32:/* <space> */
        movElement(sujet, 'jump');
        break;

    case 37:/* <left> */
        movElement(sujet, 'left');
        break;

    case 38:/* <up> */
        movElement(sujet, 'jump');
        break;

    case 39:/* <right> */
        movElement(sujet, 'right');
        break;

    case 40:/* <down> */
        movElement(sujet, 'gravity');
        break;

    case 72:/* <h> */
        movElement(sujet, 'home');
        break;

    default:
        console.log('this must not happen');
        break;
    }
    
});



setup();
