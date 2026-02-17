// Palabras básicas del SGSI
const words = [
    {
        word: "confidencialidad",
        hint: "Propiedad que asegura que solo personas autorizadas acceden a la información."
    },
    {
        word: "integridad",
        hint: "Propiedad que garantiza que los datos no sean alterados sin autorización."
    },
    {
        word: "disponibilidad",
        hint: "Propiedad que permite el acceso a la información cuando sea requerida."
    },
    {
        word: "cifrado",
        hint: "Técnica para transformar datos y proteger su contenido."
    },
    {
        word: "autenticacion",
        hint: "Proceso para verificar la identidad de un usuario."
    },
    {
        word: "respaldo",
        hint: "Copia de seguridad que permite recuperar datos."
    },
    {
        word: "firewall",
        hint: "Barrera de seguridad que controla el tráfico de red."
    },
    {
        word: "malware",
        hint: "Software malicioso diseñado para dañar sistemas."
    }
];

let selectedWord = "";
let guessedLetters = [];
let errors = 0;
let progress = 0;

const wordDisplay = document.getElementById("word-display");
const hintDisplay = document.getElementById("hint");
const keyboard = document.getElementById("keyboard");
const progressFill = document.getElementById("progress-fill");
const svg = document.getElementById("hangman-svg");

function initKeyboard() {
    keyboard.innerHTML = "";
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    letters.forEach(letter => {
        const btn = document.createElement("button");
        btn.textContent = letter;
        btn.onclick = () => handleGuess(letter.toLowerCase(), btn);
        keyboard.appendChild(btn);
    });
}

function drawHangman() {
    const parts = [
        '<line x1="10" y1="190" x2="150" y2="190" stroke="white" stroke-width="4"/>',
        '<line x1="40" y1="190" x2="40" y2="20" stroke="white" stroke-width="4"/>',
        '<line x1="40" y1="20" x2="120" y2="20" stroke="white" stroke-width="4"/>',
        '<line x1="120" y1="20" x2="120" y2="50" stroke="white" stroke-width="4"/>',
        '<circle cx="120" cy="60" r="10" stroke="white" stroke-width="3" fill="none"/>',
        '<line x1="120" y1="70" x2="120" y2="120" stroke="white" stroke-width="3"/>',
        '<line x1="120" y1="90" x2="100" y2="110" stroke="white" stroke-width="3"/>',
        '<line x1="120" y1="90" x2="140" y2="110" stroke="white" stroke-width="3"/>',
        '<line x1="120" y1="120" x2="110" y2="150" stroke="white" stroke-width="3"/>',
        '<line x1="120" y1="120" x2="130" y2="150" stroke="white" stroke-width="3"/>'
    ];

    svg.innerHTML = parts.slice(0, errors).join("");
}

function updateWordDisplay() {
    wordDisplay.textContent = selectedWord
        .split("")
        .map(letter => guessedLetters.includes(letter) ? letter : "_")
        .join(" ");
}

function handleGuess(letter, btn) {
    btn.disabled = true;

    if (selectedWord.includes(letter)) {
        guessedLetters.push(letter);
        updateWordDisplay();

        if (!wordDisplay.textContent.includes("_")) {
            progress += 100 / words.length;
            progressFill.style.width = progress + "%";
            setTimeout(startGame, 1200);
        }
    } else {
        errors++;
        drawHangman();

        if (errors >= 10) {
            alert("Has perdido. La palabra era: " + selectedWord);
            startGame();
        }
    }
}

function startGame() {
    errors = 0;
    guessedLetters = [];

    const random = words[Math.floor(Math.random() * words.length)];
    selectedWord = random.word;
    hintDisplay.textContent = random.hint;

    svg.innerHTML = "";
    updateWordDisplay();
    initKeyboard();
}

document.getElementById("reset-btn").onclick = () => {
    progress = 0;
    progressFill.style.width = "0%";
    startGame();
};

const progressText  = document.getElementById("progress-text");
const progressCount = document.getElementById("progress-count"); // si usas el contador opcional


// Inicializa el total de palabras en el contador (si usas el contador)
if (progressCount) {
  progressCount.textContent = `0 / ${words.length}`;
};

startGame();

