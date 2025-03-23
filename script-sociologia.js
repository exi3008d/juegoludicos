let attempts = 5;
let word = "";
let hint = ""; // Nueva variable para la pista
let correctLetters = [];
let incorrectLetters = [];
const wordBank = [
    { word: "comunidad", hint: "Conjunto de individuos con intereses comunes" },
    { word: "cultura", hint: "Expresiones y costumbres de un grupo" },
    { word: "poblacion", hint: "Conjunto de habitantes de un lugar" },
    { word: "ciudadania", hint: "Personas con derechos y deberes en un país" },
    { word: "civilizacion", hint: "Sociedad con desarrollo cultural y tecnológico" },
    { word: "etnia", hint: "Grupo con rasgos culturales y lingüísticos comunes" },
    { word: "colectividad", hint: "Grupo unido con un propósito común" },
    { word: "nacion", hint: "Comunidad con identidad histórica y política" },
    { word: "grupo social", hint: "Personas organizadas con normas y roles" },
    { word: "red social", hint: "Interacciones y relaciones entre individuos" }
];

function startGame() {
    const randomIndex = Math.floor(Math.random() * wordBank.length);
    word = wordBank[randomIndex].word;
    hint = wordBank[randomIndex].hint; // Asigna la pista correspondiente
    updateDisplay();
}

function updateDisplay() {
    document.getElementById("hint").innerText = `Pista: ${hint}`; // Actualiza la pista
    document.getElementById("attempts").innerText = `Intentos restantes: ${attempts}`;
    document.getElementById("word-display").innerText = word
        .split("")
        .map(letter => (correctLetters.includes(letter) ? letter : "_"))
        .join(" ");
    document.getElementById("incorrect-letters").innerText = `Letras erradas: ${incorrectLetters.join(", ")}`;
    document.getElementById("hangman-image").src = `imagenes/ahorcado${5 - attempts}.png`;
}

function guessLetter(event) {
    if (event.key !== "Enter") return;
    const input = document.getElementById("guess-input");
    const guess = input.value.toLowerCase();
    input.value = "";

    if (!guess.match(/[a-z]|ñ/gi) || guess.length !== 1) {
        alert("Por favor, escribe una sola letra.");
        return;
    }

    if (correctLetters.includes(guess) || incorrectLetters.includes(guess)) {
        alert("Ya escribiste esa letra.");
        return;
    }

    if (word.includes(guess)) {
        correctLetters.push(guess);
    } else {
        incorrectLetters.push(guess);
        attempts--;
    }

    updateDisplay();

    if (correctLetters.length === new Set(word.replace(/\s/g, "")).size) {
        endGame(true);
    } else if (attempts === 0) {
        endGame(false);
    }
}

function endGame(win) {
    document.getElementById("game-over").style.display = "block";
    const message = win ? "¡Ganaste!" : `Perdiste, la palabra era: ${word}`;
    document.getElementById("game-over-message").innerText = message;
}

function restartGame() {
    location.reload();
}

function viewPodiumFromGame() {
    window.location.href = "index.html#podium";
}

function backToHome() {
    window.location.href = "index.html";
}

window.onload = startGame;
