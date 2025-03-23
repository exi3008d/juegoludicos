let score = 0; // Puntuación del jugador
let attempts = 5; // Intentos disponibles
let word = ""; // Palabra seleccionada
let hint = ""; // Pista seleccionada
let correctLetters = []; // Letras correctas
let incorrectLetters = []; // Letras incorrectas

// Banco de palabras y pistas
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

// Inicia el juego seleccionando una palabra y pista al azar
function startGame() {
    const randomIndex = Math.floor(Math.random() * wordBank.length);
    word = wordBank[randomIndex].word; // Selecciona una palabra aleatoria
    hint = wordBank[randomIndex].hint; // Asigna la pista correspondiente
    updateDisplay();
}

// Actualiza la interfaz de usuario del juego
function updateDisplay() {
    document.getElementById("hint").innerText = `Pista: ${hint}`; // Muestra la pista correctamente
    document.getElementById("score").innerText = `Puntuación: ${score}`; // Actualiza la puntuación
    document.getElementById("attempts").innerText = `Intentos restantes: ${attempts}`; // Actualiza los intentos
    document.getElementById("word-display").innerText = word
        .split("")
        .map(letter => (correctLetters.includes(letter) ? letter : "_"))
        .join(" ");
    document.getElementById("incorrect-letters").innerText = `Letras erradas: ${incorrectLetters.join(", ")}`;
    document.getElementById("hangman-image").src = `imagenes/ahorcado${5 - attempts}.png`; // Actualiza la imagen del ahorcado
}

// Controla la lógica cuando el jugador ingresa una letra
function guessLetter(event) {
    if (event.key !== "Enter") return; // Solo actúa si se presiona Enter
    const input = document.getElementById("guess-input");
    const guess = input.value.toLowerCase();
    input.value = ""; // Limpia el input

    // Valida la letra ingresada
    if (!guess.match(/[a-zñ]/) || guess.length !== 1) {
        alert("Por favor, escribe una sola letra válida.");
        return;
    }

    // Evita repetir letras
    if (correctLetters.includes(guess) || incorrectLetters.includes(guess)) {
        alert("Ya escribiste esa letra.");
        return;
    }

    // Verifica si la letra está en la palabra
    if (word.includes(guess)) {
        correctLetters.push(guess);
        score += 10; // Incrementa la puntuación por cada letra correcta
    } else {
        incorrectLetters.push(guess);
        attempts--; // Reduce los intentos por cada error
    }

    updateDisplay();

    // Verifica el estado del juego
    if (correctLetters.length === new Set(word.replace(/\s/g, "")).size) {
        endGame(true);
    } else if (attempts === 0) {
        endGame(false);
    }
}

// Maneja el final del juego
function endGame(win) {
    document.getElementById("game-over").style.display = "block";
    const message = win ? `¡Ganaste con ${score} puntos!` : `Perdiste. La palabra era: ${word}`;
    document.getElementById("game-over-message").innerText = message;
}

// Reinicia el juego
function restartGame() {
    location.reload();
}

// Vuelve al menú principal
function backToHome() {
    window.location.href = "index.html";
}

// Inicia el juego al cargar la página
window.onload = startGame;
