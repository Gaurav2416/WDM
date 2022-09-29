var dx, dy;       /* displacement at every dt */
var x, y;         /* ball location */
var score = 0;    /* # of walls you have cleaned */
var tries = 0;    /* # of tries to clean the wall */
var started = false;  /* false means ready to kick the ball */
var ball, court, paddle, brick, msg;
var court_height, court_width, paddle_left;

var bricks = new Array(4);  // rows of bricks
var colors = ["red", "blue", "yellow", "green"];

/* get an element by id */
function id(s) { return document.getElementById(s); }

/* convert a string with px to an integer, eg "30px" -> 30 */
function pixels(pix) {
    pix = pix.replace("px", "");
    num = Number(pix);
    return num;
}

/* place the ball on top of the paddle */
function readyToKick() {
    x = pixels(paddle.style.left) + paddle.width / 2.0 - ball.width / 2.0;
    y = pixels(paddle.style.top) - 2 * ball.height;
    ball.style.left = x + "px";
    ball.style.top = y + "px";
    // console.log(paddle.style.left,x,paddle.style.top,y,'court wifth:',court_width,'court height:',court_height);
}

/* paddle follows the mouse movement left-right */
function movePaddle(e) {
    var ox = e.pageX - court.getBoundingClientRect().left;
    paddle.style.left = (ox < 0) ? "0px"
        : ((ox > court_width - paddle.width)
            ? court_width - paddle.width + "px"
            : ox + "px");
    if (!started)
        readyToKick();
}

function initialize() {
    court = id("court");
    ball = id("ball");
    paddle = id("paddle");
    wall = id("wall");
    msg = id("messages");
    brick = id("red");
    court_height = pixels(court.style.height);
    court_width = pixels(court.style.width);
    for (i = 0; i < 4; i++) {
        // each row has 20 bricks
        bricks[i] = new Array(20);
        var b = id(colors[i]);
        for (j = 0; j < 20; j++) {
            var x = b.cloneNode(true);
            bricks[i][j] = x;
            wall.appendChild(x);
        }
        b.style.visibility = "hidden";
    }
    started = false;
}

/* true if the ball at (x,y) hits the brick[i][j] */
function hits_a_brick(x, y, i, j) {
    var top = i * brick.height - 450;
    var left = j * brick.width;
    return (x >= left && x <= left + brick.width
        && y >= top && y <= top + brick.height);
}
var sX
var sY
function initializeBall() {
    sX = 0
    sY = 0
}
function movingBall() {
    if (reachedBottom) {
        started = true
        sY -= 10
        ball.style.top = sY + "px";
    }
    if (reachedLeftEnd) {
        sX += 10
        started = true
        ball.style.left = sX + "px";
    }
    checkCollision()
}
var reachedTop = false
var reachedLeftEnd = true
var reachedRighttEnd = false
var reachedBottom = true
function checkCollision() {
    if (-sY >= (court_height - 1 * ball.height)) {
        // started = false
        reachedTop = true
        reachedBottom = false
        // changeDirection()
    }
    if (reachedTop) {
        sY += 10
        ball.style.top = sY + "px";
        if (sY >= 0) {
            reachedTop = false
            reachedBottom = true
            movingBall()
        }
    }
    if (sX >= (court_width - ball.width - 10)) {
        reachedLeftEnd = false
        reachedRighttEnd = true
        // changeDirection()
    }
    if (reachedRighttEnd) {
        sX -= 10
        ball.style.left = sX + "px";
        if (sX <= 0) {
            reachedLeftEnd = true
            reachedRighttEnd = false
            movingBall()
        }
    }
}
function changeDirection() {
    console.log('Inside Change');
    if (-sY >= (court_height - 1 * ball.height)) {
        sY += 10
    }
}
function startGame(e) {
    if (!started)
        initializeBall()
    movingBall()
    if (started)
        setTimeout(startGame, 60)
}
function resetGame() {

}

