var dx, dy;       /* displacement at every dt */
var x, y;         /* ball location */
var score = 0;    /* # of walls you have cleaned */
var tries = 0;    /* # of tries to clean the wall */
var started = false;  /* false means ready to kick the ball */
var ball, court, paddle, brick, msg;
var court_height, court_width, paddle_left;
var bricks = new Array(4);  // rows of bricks
var colors = ["red", "blue", "yellow", "green"];
var speed = 1
var dt = 0
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
    chanceCount = id("tries")
    scores = id('score')
    scores.innerHTML = score
    court_height = pixels(court.style.height);
    court_width = pixels(court.style.width);
    chanceCount.innerHTML = tries
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
function checkSpeed() {
    speed = id("level").value
    speed = speed * 10
}
function initializeBall() {
    x = pixels(ball.style.left)
    y = pixels(ball.style.top)

}
function movingBall() {
    if (reachedBottom) {
        started = true
        y -= speed
        ball.style.top = y + "px";
    }
    if (reachedLeftEnd) {
        x += speed
        started = true
        ball.style.left = x + "px";
    }
    checkCollision()
}

var reachedTop = false
var reachedLeftEnd = true
var reachedRighttEnd = false
var reachedBottom = true
function checkCollision() {

    for (i = bricks.length - 1; i >= 0; i--) {
        for (j = 0; j < 20; j++) {
            if (hits_a_brick(x, y, i, j)) {
                if (bricks[i][j].style.visibility != 'hidden') {
                    var top = i * brick.height - 450;
                    var left = j * brick.width;

                    if (x >= left && x <= left + brick.width
                        && y >= top && y <= top + brick.height) {
                        reachedTop = true
                        reachedBottom = false
                        reachedRighttEnd = true
                        reachedLeftEnd = false
                    }
                    else {
                        reachedTop = false
                        reachedBottom = true
                        reachedLeftEnd = true
                        reachedRighttEnd = false
                    }
                    reachedRighttEnd = true
                    score = score + 1
                    scores.innerHTML = score
                    if (score == 80) {
                        msg.innerHTML = "You Won!!!!!"
                    }
                }
                bricks[i][j].style.visibility = 'hidden'

            }
        }
    }
    if (-y >= (court_height - 1 * ball.height)) {
        reachedTop = true
        reachedBottom = false
    }
    if (reachedTop) {
        y += speed
        ball.style.top = y + "px";
        if (x > pixels(paddle.style.left) && x < (pixels(paddle.style.left) + paddle.width)
            && y < pixels(paddle.style.top) && y > (pixels(paddle.style.top) - 2 * ball.height)) {
            reachedTop = false
            reachedBottom = true
            movingBall()

        }
        if (y >= 0) {
            msg.innerHTML = "You Died,Better Luck Next Time"
            tries = tries + 1
            chanceCount.innerHTML = tries
            started = false
            reachedTop = false
            reachedBottom = true
            clearTimeout(dt)
            initializeBall()
        }
    }
    if (x >= (court_width - ball.width - 10)) {
        reachedLeftEnd = false
        reachedRighttEnd = true
    }
    if (reachedRighttEnd) {
        x -= speed
        ball.style.left = x + "px";
        if (x <= 0) {
            reachedLeftEnd = true
            reachedRighttEnd = false
            movingBall()
        }
    }
}
function startGame(e) {
    checkSpeed()
    initializeBall()
    movingBall()
    if (started) {
        msg.innerHTML = ""
        dt = setTimeout(startGame, 60)
    }
}
function resetGame() {
    window.location.reload()
    // bricks = new Array(4);  // rows of bricks
    // colors = ["red", "blue", "yellow", "green"];
    // score = 0;
    // tries = 0;
    // speed = 1
    // dt = 0
    // msg.innerHTML = ""
    // initialize()

}

