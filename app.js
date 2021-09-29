const playerOneScore = document.querySelector(".playerOneScore");
const playerTwoScore = document.querySelector(".playerTwoScore");
const playerOneButton = document.querySelector(".button1");
const playerTwoButton = document.querySelector(".button2");
const resetButton = document.querySelector(".button3");
const goal = document.querySelector("#goal");

/**
 * Everytime the playerOneButton has been clicked it runs
 * @function isWinner to check if the game is finished or not.
 * If it is, than it runs the 
 * @function finalizer
 */
playerOneButton.addEventListener('click', () => {
    playerOneScore.textContent++;
    firstReacher = playerOneScore;

    if (isWinner(playerOneScore.innerHTML)) {
        finalizer(playerOneScore, playerTwoScore);
    }
})

// Same as playerOneButton event listener but for playerTwoButton.
playerTwoButton.addEventListener('click', () => {
    playerTwoScore.textContent++;
    firstReacher = playerTwoScore;

    if (isWinner(playerTwoScore.innerHTML)) {
        finalizer(playerTwoScore, playerOneScore);
    }
})

/**
 * Everytime the goal is changed this code checks if a player has won 
 * the game or not and if they did it finishes the game by calling
 * @function finalizer
 * 
 * It also handles any bugs that can be generated when user changes 
 * the goal whilst playing the game. 
 * 
 * It handles when;
 * a: User lowered goal and the new goal is lower or equal to 
 * one of the players' score.
 * b: User lowered goal and the new goal is lower or equal to 
 * both players. (in this case program choses the player with the highest score)
 */
goal.addEventListener('change', () => {
    if (isWinner(playerOneScore.innerHTML) || isWinner(playerTwoScore.innerHTML)) {
        if (playerOneScore.innerHTML > playerTwoScore.innerHTML) {
            finalizer(playerOneScore, playerTwoScore);
        } else {
            finalizer(playerTwoScore, playerOneScore);
        }
    }
})

/**
 * Everytime resetButton gets clicked it sets both players scores to 0
 * enables the score incrementing buttons,
 * removes the winner and loser classes of the buttons.
 */
resetButton.addEventListener('click', () => {
    playerTwoScore.innerHTML = "0";
    playerOneScore.innerHTML = "0";

    playerOneButton.disabled = false;
    playerTwoButton.disabled = false;

    playerOneScore.classList.remove('winner', 'loser');
    playerTwoScore.classList.remove('winner', 'loser');
})

/**
 * @param {number} playerScore is the score of the player that is being checked
 * @returns whether the playerScore is higher then goal or not.
 */
function isWinner(playerScore) {
    return parseInt(playerScore) >= parseInt(goal.value)
}

/**
 * @function finalizer adds winner and loser classes to the 
 * players that is passed in as arguments.
 * Also disables the score incrementing buttons.
 * 
 * @param {Element} winner is the leading player 
 * @param {Element} loser is the losing player
 */
function finalizer(winner, loser) {
    winner.classList.add('winner');
    loser.classList.add('loser');

    playerOneButton.disabled = true;
    playerTwoButton.disabled = true;
}