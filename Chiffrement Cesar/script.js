// Fonction de chiffrement ou déchiffrement d’un seul caractère
function caesarShift(char, shift, decrypt = false) {
  const code = char.charCodeAt(0); // Convertit la lettre en code ASCII

  // Traitement des lettres majuscules
  if (code >= 65 && code <= 90) {
    return String.fromCharCode(
      ((code - 65 + (decrypt ? -shift : shift) + 26) % 26) + 65
    );
  }
  // Traitement des lettres minuscules
  else if (code >= 97 && code <= 122) {
    return String.fromCharCode(
      ((code - 97 + (decrypt ? -shift : shift) + 26) % 26) + 97
    );
  }

  // Si ce n’est pas une lettre (espace, ponctuation), on ne change rien
  return char;
}

// Affiche chaque étape de transformation dans la zone #steps
function animateStep(original, shifted, index) {
  const step = document.createElement("div");
  step.className = "step-box";
  step.innerText = `"${original}" → "${shifted}"`;
  document.getElementById("steps").appendChild(step);
}

// Traite tout le texte : soit chiffrement soit déchiffrement
function processText(decrypt = false) {
  const message = document.getElementById("message").value;
  const key = parseInt(document.getElementById("key").value) || 0;
  const stepsContainer = document.getElementById("steps");
  const resultContainer = document.getElementById("result");

  stepsContainer.innerHTML = "";
  resultContainer.innerText = "";

  let result = "";

  // Boucle sur chaque caractère du message
  for (let i = 0; i < message.length; i++) {
    const origChar = message[i];
    const shiftedChar = caesarShift(origChar, key, decrypt); // décalage
    result += shiftedChar;
    animateStep(origChar, shiftedChar, i);
  }

  resultContainer.innerText = result;
}

// Fonction appelée au clic sur "Chiffrer"
function encrypt() {
  processText(false);
}

// Fonction appelée au clic sur "Déchiffrer"
function decrypt() {
  processText(true);
}

// Réinitialise tous les champs et les zones d’affichage
function reset() {
  document.getElementById("message").value = "";
  document.getElementById("steps").innerHTML = "";
  document.getElementById("result").innerText = "";
}

// ---------------------------------------------------------------------
// Effet Matrix
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

// Ajuster la taille du canvas à la fenêtre
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Caractères à afficher
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+";
const charArray = characters.split("");
const fontSize = 16;
const columns = canvas.width / fontSize;

// Tableau pour suivre la position des colonnes
const drops = Array(Math.floor(columns)).fill(1);

// Fonction pour dessiner l'effet
function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0"; // Couleur verte
  ctx.font = `${fontSize}px monospace`;

  drops.forEach((y, x) => {
    const text = charArray[Math.floor(Math.random() * charArray.length)];
    ctx.fillText(text, x * fontSize, y * fontSize);

    if (y * fontSize > canvas.height && Math.random() > 0.975) {
      drops[x] = 0;
    }

    drops[x]++;
  });

  requestAnimationFrame(drawMatrix);
}

// Lancer l'animation
drawMatrix();
