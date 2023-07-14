const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const lessThanAllowed = document.getElementById('less-than-allowed');
const greaterThanAllowed = document.getElementById('greater-than-allowed');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
let maxNumberOfAttempts = 5;


// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
    // Get value from guess input element
    const guess = parseInt(guessInput.value, 10);
    attempts = attempts + 1;
    guessInput.value = '';
    resetButton.style.display = '';

    hideAllMessages();

    if (guessInput.value === '') {
        submitButton.disabled = true;
    }

    if (guess === targetNumber) {
        numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;
        numberOfGuessesMessage.style.display = '';
        correctMessage.style.display = '';
        submitButton.disabled = true;
        guessInput.disabled = true;
    }

    if (guess !== targetNumber) {
        if (guess < targetNumber) {
            tooLowMessage.style.display = ''
            if (attempts !== maxNumberOfAttempts) {
                tooLowMessage.style.display = '';
            } else {
                tooLowMessage.innerText = 'You guessed too low.';
                tooLowMessage.style.display = ''
            }
        } else {
            if (attempts !== maxNumberOfAttempts) {
                tooHighMessage.style.display = '';
            } else {
                tooHighMessage.innerText = 'You guessed too high.';
                tooHighMessage.style.display = '';
            }
        }
        let remainingAttempts = maxNumberOfAttempts - attempts;
        numberOfGuessesMessage.style.display = '';
        let remainingAttemptsMessage = remainingAttempts === 1 ? `${remainingAttempts} guess` : `${remainingAttempts} guesses`;
        numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttemptsMessage} remaining.`;
    }

    if (attempts === maxNumberOfAttempts) {
        maxGuessesMessage.style.display = '';
        submitButton.disabled = true;
        guessInput.disabled = true;
    }
}

function hideAllMessages() {
    for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
        messages[elementIndex].style.display = 'none';
    }
}

function setup() {
    // Get random number
    targetNumber = getRandomNumber(1, 100);
    console.log(`target number: ${targetNumber}`);

    // Reset number of attempts
    attempts = 0;

    // Enable the input and submit button
    submitButton.disabled = false;
    guessInput.disabled = false;

    hideAllMessages();
    resetButton.style.display = 'none';
}

guessInput.addEventListener('input', e => {
    hideAllMessages();
    if (e.target.value <= 0) {
        lessThanAllowed.style.display = '';
        submitButton.disabled = true;
    } else if (e.target.value >= 100) {
        greaterThanAllowed.style.display = '';
        submitButton.disabled = true;
    } else submitButton.disabled = false;
})

window.addEventListener('DOMContentLoaded', e => {
    if (guessInput.value === '') {
        submitButton.disabled = true;
    }
})

resetButton.addEventListener('click', setup);
submitButton.addEventListener('click', checkGuess);

setup();
