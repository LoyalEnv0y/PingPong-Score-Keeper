const p1 = {
    score: document.querySelector(".playerOneScore"),
    button: document.querySelector(".playerOneBtn"),
}
const p2 = {
    score: document.querySelector(".playerTwoScore"),
    button: document.querySelector(".playerTwoBtn"),
}

const resetButton = document.querySelector(".resetBtn");
const goal = document.querySelector("#goal");

/**
 * Whenever p1.button or p2.button gets clicked
 * @function addScoreAndCheck runs.
 */
p1.button.addEventListener('click', () => addScoreAndCheck(p1, p2));
p2.button.addEventListener('click', () => addScoreAndCheck(p2, p1));

/**
 * When resetButton gets clicked both players' scores will
 * be set to 0 and classes will be removed
 * Also both players' buttons will be re enabled.
 */
resetButton.addEventListener('click', () => {
    p1.score.innerHTML = "0";
    p2.score.innerHTML = "0";

    p1.button.disabled = false;
    p2.button.disabled = false;

    p1.score.classList.remove('winner', 'loser', 'tie');
    p2.score.classList.remove('winner', 'loser', 'tie');
})

/**
 * Everytime the goal is changed this code checks if a player has won 
 * the game or not and if they did, It checks who is the winner
 * and if the game is a tie or not. It finishes the game by calling
 * @function endGame
 */
goal.addEventListener('change', () => {
    let p1ScoreInt = parseInt(p1.score.textContent)
    let p2ScoreInt = parseInt(p2.score.textContent)

    if (isWinner(p1) || isWinner(p2)) {
        if (p1ScoreInt > p2ScoreInt) {
            endGame(p1, p2)
        } else if (p2ScoreInt > p1ScoreInt) {
            endGame(p2, p1)
        } else {
            endGame(p1, p2, true)
        }
    }
})

/**
 * here we increment the pressed button's player's score and check
 * if the game is finished or not.
 * 
 * @param {Element} scoringPlayer is the clicked buttons player.
 * @param {Element} otherPlayer is the opposing player.
 */
function addScoreAndCheck(scoringPlayer, otherPlayer) {
    scoringPlayer.score.textContent++;

    if (isWinner(scoringPlayer)) {
        endGame(scoringPlayer, otherPlayer)
    }
}

/**
 * @param {Element} player is the player who is being checked.
 * @returns {boolean} whether the playerScore is higher then goal or not.
 */
function isWinner(player) {
    return parseInt(player.score.textContent) >= parseInt(goal.value)
}

/**
 * finishes the game by disabling the buttons and adding classes
 * to winners and losers. Adds tie class if the game is a tie.
 * 
 * @param {Element} winner is the leading player.
 * @param {Element} loser is the fallowing player.
 * @param {Boolean} isTie is the identifier for if the game is tie or not.
 */
function endGame(winner, loser, isTie = false) {
    if (isTie) {
        winner.score.classList.add('tie')
        loser.score.classList.add('tie')
    } else {
        winner.score.classList.add('winner');
        loser.score.classList.add('loser');
    }
    p1.button.disabled = true;
    p2.button.disabled = true;
}
