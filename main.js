const letters = 'abcdefghijklmnopqrstuvwxyz';

let lettersArray = Array.from(letters);

let lettersContainer = document.querySelector('.letters');

lettersArray.forEach(letter => {
    let span = document.createElement('span');
    let theLetter = document.createTextNode(letter);
    span.appendChild(theLetter);
    span.className = "letter-box";
    lettersContainer.appendChild(span);
});

const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "roby", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
};

let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueName = randomPropValue[randomValueNumber];

document.querySelector(".game-info span").innerHTML = randomPropName;

let lettersGuessContainer = document.querySelector('.letters-guess');
let wordArray = Array.from(randomValueName.toLowerCase());

console.log(wordArray);

wordArray.forEach(letter => {
    let span = document.createElement('span');
    if (letter === " ") {
        span.classList.add('space');
    };
    lettersGuessContainer.appendChild(span);
});

let spanArray = document.querySelectorAll('.letters-guess span');

let wrongAttempts = 0;

let hangmanDraw = document.querySelector('.hangman-draw');

let wordLettersNumber = 0;

document.addEventListener("click", (e) => {
    let theStatus = false;
    if (e.target.className === "letter-box") {
        e.target.classList.add('clicked');
        let clickedLetter = e.target.innerHTML;
        wordArray.forEach((letter, letterIndex) => {
            if (clickedLetter === letter) {
                theStatus = true;
                spanArray.forEach((span, spanIndex) => {
                    if (letterIndex === spanIndex) {
                        span.innerHTML = letter;
                        wordLettersNumber++;
                    };
                });
            };
        });
        if (theStatus !== true) {
            wrongAttempts++;
            hangmanDraw.classList.add(`wrong-${wrongAttempts}`);
            document.getElementById("fail").play();
            if (wrongAttempts === 8) {
                endGameLose();
                lettersContainer.classList.add("finish");
            };
        } else {
            if (wordLettersNumber === randomValueName.length) {
                endGameWin();
            };
        };
    };
});

let overlay = document.querySelector(".overlay");

function endGameWin() {
    let div = document.createElement('div');
    let divText = document.createTextNode(`You Win With ${wrongAttempts} Wrongs`);
    if (wrongAttempts === 0) {
        divText = document.createTextNode(`Congratulation You Win With Out Wrongs`);
    };
    div.appendChild(divText);
    div.classList.add("popup");
    document.body.appendChild(div);
    overlay.classList.add('on');
    div.style.backgroundColor = "lime";
}

function endGameLose() {
    let div = document.createElement('div');
    let divText = document.createTextNode(`Game Over, The Word Is ${randomValueName.toUpperCase()}`);
    div.appendChild(divText);
    div.classList.add("popup");
    document.body.appendChild(div);
    overlay.classList.add('on');
};