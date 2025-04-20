let gameSeq = [];
let userSeq = [];

let btns = ['yellow', 'red', 'green', 'blue'];

let started = false;
let level = 0;      // initialise with level 0

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    // console.log("Game started");
    if (started == false) {
        console.log("Game started");
        started = true;
    }

    levelup();
});


//^^^^^^^ Flash Buttons & Level Up

function gameFlash(btn) {
    btn.classList.add('flash');
    setTimeout(function () {
        btn.classList.remove('flash');
    }, 300);
}

function userFlash(btn) {
    btn.classList.add('userflash');
    setTimeout(function () {
        btn.classList.remove('userflash');
    }, 300);
}


function levelup() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // Choose random button
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);

    //^^^^^^^^^^^^ Matching Sequence
    gameSeq.push(randColor);
    console.log(gameSeq);



    gameFlash(randBtn);
}


function checkAns(idx) {
    // console.log("Current level : ", level);
    // let idx = level - 1;

    if (userSeq[idx] === gameSeq[idx]) {
        // console.log("same value");
        if (userSeq.length == gameSeq.length) {
            // levelup();
            setTimeout(levelup, 1000);
        }
    }
    else {
        // h2.innerText = `Game Over! Press any key to start.`;
        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to start.`;

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 200)
        reset();
    }
}

//^^^^^^^ Button Event Listeners
function btnPress() {
    // console.log("Button was pressed");
    // console.log(this);

    let btn = this;
    userFlash(btn);

    //^^^^^^^^^^^^ Matching Sequence
    userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}


// ^^^^^^^ Reset Game
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

// ^^^^^^^ Display High Score