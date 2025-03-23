let score = 0; // Variable para almacenar la puntuación
let attempts = 5; // Intentos disponibles
let word = ""; // Palabra actual
let hint = ""; // Pista actual
let correctLetters = []; // Letras correctas
let incorrectLetters = []; // Letras incorrectas
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
    word = wordBank[randomIndex].word; // Selecciona una palabra aleatoria
    hint = wordBank[randomIndex].hint; // Asigna la pista correspondiente
    updateDisplay();
}

function updateDisplay() {
    document.getElementById("hint").innerText = `Pista: ${hint}`; // Muestra la pista
    document.getElementById("score").innerText = `Puntuación: ${score}`; // Muestra la puntuación
    document.getElementById("attempts").innerText = `Intentos restantes: ${attempts}`; // Muestra los intentos
    document.getElementById("word-display").innerText = word
        .split("")
        .map(letter => (correctLetters.includes(letter) ? letter : "_"))
        .join(" ");
    document.getElementById("incorrect-letters").innerText = `Letras erradas: ${incorrectLetters.join(", ")}`;
    document.getElementById("hangman-image").src = `imagenes/ahorcado${5 - attempts}.png`; // Cambia la imagen del ahorcado
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
        score += 10; // Incrementa la puntuación por cada letra correcta
    } else {
        incorrectLetters.push(guess);
        attempts--; // Reduce los intentos por cada error
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
    const message = win ? `¡Ganaste con ${score} puntos!` : `Perdiste. La palabra era: ${word}`;
    document.getElementById("game-over-message").innerText = message;

    // Guarda la puntuación en el podio (usando localStorage)
    const playerName = localStorage.getItem("playerName") || "Jugador desconocido";
    const podium = JSON.parse(localStorage.getItem("podium")) || [];
    podium.push({ name: playerName, score: score });
    localStorage.setItem("podium", JSON.stringify(podium));
}

function restartGame() {
    location.reload(); // Reinicia el juego
}

function backToHome() {
    window.location.href = "index.html"; // Redirige al menú principal
}

window.onload = startGame;
