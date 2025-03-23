function loadPodium() {
    const podiumList = document.getElementById("podium-list");
    podiumList.innerHTML = ""; // Limpia cualquier contenido previo

    // Datos simulados del podio. Puedes usar localStorage o una API para persistencia.
    const podiumData = [
        { name: "Jugador1", score: 100 },
        { name: "Jugador2", score: 80 },
        { name: "Jugador3", score: 60 },
    ];

    // Crea dinámicamente la lista de jugadores y sus puntajes
    podiumData.forEach(player => {
        const listItem = document.createElement("li");
        listItem.innerText = `${player.name}: ${player.score} puntos`;
        podiumList.appendChild(listItem);
    });
}

function backToMenu() {
    // Redirige al menú principal (index.html)
    window.location.href = "index.html";
}

// Carga automáticamente el podio al cargar la página
window.onload = loadPodium;
function loadPodium() {
    const podiumList = document.getElementById("podium-list");
    podiumList.innerHTML = ""; // Limpia cualquier contenido previo

    const podiumData = JSON.parse(localStorage.getItem("podium")) || []; // Obtén los datos del podio

    // Ordena los puntajes de mayor a menor
    podiumData.sort((a, b) => b.score - a.score);

    // Crea dinámicamente la lista de jugadores y sus puntajes
    podiumData.forEach(player => {
        const listItem = document.createElement("li");
        listItem.innerText = `${player.name}: ${player.score} puntos`;
        podiumList.appendChild(listItem);
    });
}

function backToMenu() {
    window.location.href = "index.html"; // Redirige al menú principal
}

window.onload = loadPodium;

function loadPodium() {
    const podiumList = document.getElementById("podium-list");
    podiumList.innerHTML = ""; // Limpia cualquier contenido previo

    const podiumData = JSON.parse(localStorage.getItem("podium")) || [];

    // Ordena los puntajes de mayor a menor
    podiumData.sort((a, b) => b.score - a.score);

    // Genera la lista de nombres y puntajes
    podiumData.forEach(player => {
        const listItem = document.createElement("li");
        listItem.innerText = `${player.name}: ${player.score} puntos`;
        podiumList.appendChild(listItem);
    });
}

function backToMenu() {
    window.location.href = "index.html";
}

window.onload = loadPodium;

