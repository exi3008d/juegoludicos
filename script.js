function goToSubjectSelection() {
    const playerName = document.getElementById("player-name").value;
    if (!playerName) {
        alert("Por favor, ingresa tu nombre.");
        return;
    }
    localStorage.setItem("playerName", playerName); // Guardamos el nombre
    document.getElementById("menu").style.display = "none";
    document.getElementById("subject-selection").style.display = "block";
    document.getElementById("player-greeting").innerText = `Hola, ${playerName}. Elige una materia para jugar:`;
}

function startSociology() {
    window.location.href = "sociologia.html"; // Redirige a Sociología
}

function startStatistics() {
    window.location.href = "estadistica.html"; // Redirige a Estadística
}

function viewPodium() {
    document.getElementById("subject-selection").style.display = "none";
    document.getElementById("podium").style.display = "block"; // Muestra el podio
    updatePodium(); // Si tienes una función para cargar datos al podio
}

function backToMenu() {
    document.getElementById("podium").style.display = "none";
    document.getElementById("subject-selection").style.display = "block"; // Vuelve al menú de selección
}

// Función opcional para actualizar dinámicamente el podio
function updatePodium() {
    const podiumList = document.getElementById("podium-list");
    podiumList.innerHTML = ""; // Limpia el contenido previo
    const podiumData = [
        { name: "Jugador1", score: 100 },
        { name: "Jugador2", score: 80 },
        { name: "Jugador3", score: 60 },
    ];

    podiumData.forEach(player => {
        const listItem = document.createElement("li");
        listItem.innerText = `${player.name}: ${player.score} puntos`;
        podiumList.appendChild(listItem);
    });
}
