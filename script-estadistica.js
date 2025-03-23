let attempts = 5;
let word = "";
let hint = ""; // Nueva variable para la pista
let correctLetters = [];
let incorrectLetters = [];
const wordBank = [
    { word: "media", hint: "Promedio de un conjunto de datos" },
    { word: "mediana", hint: "Valor central cuando los datos están ordenados" },
    { word: "moda", hint: "Número que más se repite en un conjunto de datos" },
    { word: "varianza", hint: "Mide la dispersión de los datos respecto a la media" },
    { word: "desviacion estandar", hint: "Raíz cuadrada de la varianza" },
    { word: "poblacion", hint: "Conjunto total de elementos en un estudio" },
    { word: "muestra", hint: "Subconjunto representativo de una población" },
    { word: "frecuencia", hint: "Número de veces que aparece un dato" },
    { word: "correlacion", hint: "Relación entre dos variables" },
    { word: "histograma", hint: "Gráfico de barras que representa datos agrupados" }
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
