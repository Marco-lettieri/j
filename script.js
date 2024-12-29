// Funzione per estrarre un numero casuale dalla tombola (da 1 a 90)
let estratti = []; // Array per tenere traccia dei numeri già estratti

// Funzione per creare il tabellone con numeri da 1 a 90
function createTabellone() {
    const tabelloneContainer = document.getElementById("tabellone");

    for (let i = 1; i <= 90; i++) {
        const div = document.createElement("div");
        div.textContent = i < 10 ? '0' + i : i;
        div.id = "num-" + i;
        tabelloneContainer.appendChild(div);
    }
}

// Funzione per far "parlare" il numero estratto
function leggiNumero(numero) {
    const utterance = new SpeechSynthesisUtterance(numero);
    utterance.lang = 'it-IT';  // Impostiamo la lingua italiana
    speechSynthesis.speak(utterance);
}

document.getElementById("draw-button").addEventListener("click", function() {
    if (estratti.length === 90) {
        document.getElementById("message").textContent = "Tutti i numeri sono stati estratti!";
        return;
    }
    
    let numero;
    
    // Genera un numero casuale tra 1 e 90 che non sia già stato estratto
    do {
        numero = Math.floor(Math.random() * 90) + 1;
    } while (estratti.includes(numero));
    
    estratti.push(numero);
    
    // Mostra il numero estratto
    document.getElementById("number-display").textContent = numero < 10 ? '0' + numero : numero;

    // Messaggio di conferma
    document.getElementById("message").textContent = "Numero estratto: " + numero;

    // Legge il numero ad alta voce
    leggiNumero(numero);

    // Evidenzia il numero estratto nel tabellone
    const numDiv = document.getElementById("num-" + numero);
    if (numDiv) {
        numDiv.classList.add("estratto");
    }
});

// Inizializza il tabellone quando la pagina è caricata
window.onload = function() {
    createTabellone();
};
