

let container = document.querySelector('.container');
let game_box = document.querySelector('.game_box');
let boxes = document.querySelectorAll('.box');
let reset_btn = document.querySelector('#resetBtn');
let winner_box = document.querySelector('.winner_box')
let new_game = document.querySelector('#new_game');
let winner_name = document.querySelector('#msg');
let main = document.querySelector('.main');
// WIN COMBINATIONS

const win_combination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// CHECK WINNER

function checkWinner(player) {

    for (let pattern of win_combination) {

        let [a, b, c] = pattern;

        if (
            boxes[a].textContent === player &&
            boxes[b].textContent === player &&
            boxes[c].textContent === player
        ) {
            return true;
        }
    }

    return false;
}

// DRAW CHECK

function isDraw() {

    for (let box of boxes) {

        if (box.textContent === "") {
            return false;
        }
    }

    return true;
}

// Display winner 

function winner_visible(x) {
    setTimeout(() => {
        if (x === "draw") {
            winner_name.textContent = `GAME DRAW! TRY AGAIN`
        }
        else {
            winner_name.textContent = `${x} WON THE GAME!!!!!`
        }
        winner_box.classList.remove("hide");
        main.classList.add('hide');
    }, 100);

}



// PLAYER CLICK

game_box.addEventListener("click", (e) => {

    // PLAYER MOVE

    // make sure clicked item is button
    if (e.target.tagName !== "BUTTON") return;

    // stop clicking filled box
    if (e.target.textContent !== "") return;

    e.target.textContent = "X";
    e.target.disabled = true;


    // player win check
    if (checkWinner("X")) {
        winner_visible("Player");
        disableAllBoxes();
        return;
    }


    // draw check
    if (isDraw()) {
        winner_visible("draw");
        disableAllBoxes();
        return;
    }




    setTimeout(() => {

        // AI MOVE
        aiMove();

        // AI win check
        if (checkWinner("O")) {

            winner_visible("AI");
            disableAllBoxes();
            return;
        }


        // draw check
        if (isDraw()) {

            alert("Draw");
        }
    }, 300);

});



// AI LOGIC

function aiMove() {

    let bestScore = -Infinity;
    let bestMove;

    for (let i = 0; i < boxes.length; i++) {

        // check empty box
        if (boxes[i].textContent === "") {

            // try move
            boxes[i].textContent = "O";

            // get score
            let score = minimax(false);

            // undo move
            boxes[i].textContent = "";

            // best move check
            if (score > bestScore) {

                bestScore = score;
                bestMove = i;
            }
        }
    }

    // final move
    boxes[bestMove].textContent = "O";
    boxes[bestMove].disabled = true;
}

function minimax(isAI) {

    // AI win
    if (checkWinner("O")) {
        return 1;
    }

    // Player win
    if (checkWinner("X")) {
        return -1;
    }

    // Draw
    if (isDraw()) {
        return 0;
    }

    // AI TURN

    if (isAI) {

        let bestScore = -Infinity;

        for (let i = 0; i < boxes.length; i++) {

            if (boxes[i].textContent === "") {

                boxes[i].textContent = "O";

                let score = minimax(false);

                boxes[i].textContent = "";

                bestScore = Math.max(score, bestScore);
            }
        }

        return bestScore;
    }
    // PLAYER TURN

    else {

        let bestScore = Infinity;

        for (let i = 0; i < boxes.length; i++) {

            if (boxes[i].textContent === "") {

                boxes[i].textContent = "X";

                let score = minimax(true);

                boxes[i].textContent = "";

                bestScore = Math.min(score, bestScore);
            }
        }

        return bestScore;
    }
}





// DISABLE ALL BOXES

function disableAllBoxes() {

    boxes.forEach((box) => {

        box.disabled = true;
    });
}


// RESET BUTTON

reset_btn.addEventListener("click", () => {

    boxes.forEach((box) => {

        box.textContent = "";
        box.disabled = false;
    });
    winner_box.classList.add("hide");
    main.classList.remove('hide');

});

// NEW GAME 

new_game.addEventListener("click", () => {

    boxes.forEach((box) => {

        box.textContent = "";
        box.disabled = false;
    });
    winner_box.classList.add("hide");
    main.classList.remove('hide');
});
