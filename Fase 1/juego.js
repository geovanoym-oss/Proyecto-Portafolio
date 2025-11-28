
let numeroSecreto = 0;
let intentos = 0;
const maxIntentos = 3;

const inputNumero = document.getElementById("numeroUsuario");
const mensajeFeedback = document.getElementById("mensaje");
const btnIntentar = document.getElementById("btnIntentar");
const btnNuevoJuego = document.getElementById("btnNuevoJuego");

// ===============================================
// Funciones del juego
// ===============================================

/**
 * Genera un número entero aleatorio entre un mínimo y un máximo (1 a 10).
 */
function generarNumeroSecreto(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function mostrarMensaje(texto, color) {
  mensajeFeedback.textContent = texto;
  mensajeFeedback.style.color = color;
}

/**
 * Inicia o reinicia el juego.
 */
function iniciarJuego() {
  // 1. Reiniciar variables
  numeroSecreto = generarNumeroSecreto(1, 10);
  intentos = 0;

  // 2. Restablecer la interfaz
  inputNumero.value = "";
  inputNumero.disabled = false;
  btnIntentar.disabled = false;
  btnNuevoJuego.disabled = true;

  // 3. Mostrar mensaje inicial
  mostrarMensaje("Indica un número del 1 al 10", "white");

  // Remover clases de estado final
  const interfaz = document.querySelector(".interfaz-juego");
  interfaz.classList.remove("juego-ganado", "juego-perdido");
}

/**
 * Procesa el intento del usuario al presionar el botón.
 */
function verificarIntento() {
  // 1. Obtener y validar la entrada
  const numeroUsuario = parseInt(inputNumero.value);

  // Validar que sea un número válido entre 1 y 10
  if (isNaN(numeroUsuario) || numeroUsuario < 1 || numeroUsuario > 10) {
    // En lugar de alert(), mejor esto
    mostrarMensaje(
      "❌ Por favor, ingresa un número válido entre 1 y 10.",
      "yellow"
    );
    inputNumero.value = "";
    return;
  }

  // 2. Incrementar intentos
  intentos++;

  // 3. Lógica del juego
  if (numeroUsuario === numeroSecreto) {
    // GANADOR
    mostrarMensaje(
      `🎉 ¡Felicidades! Adivinaste el número secreto (${numeroSecreto}) en ${intentos} ${
        intentos === 1 ? "intento" : "intentos"
      }.`,
      "red"
    );
    terminarJuego(true);
  } else {
    // Pistas
    const pista =
      numeroUsuario > numeroSecreto
        ? "El número secreto es MENOR"
        : "El número secreto es MAYOR";

    if (intentos >= maxIntentos) {
      // PERDEDOR
      mostrarMensaje(
        `💔 Te quedaste sin intentos. El número secreto era ${numeroSecreto}.`,
        "red"
      );
      terminarJuego(false);
    } else {
      // Intentos restantes
      const intentosRestantes = maxIntentos - intentos;
      mostrarMensaje(
        `Incorrecto. ${pista}. Te quedan ${intentosRestantes} ${
          intentosRestantes === 1 ? "intento" : "intentos"
        }.`,
        "white"
      );
      inputNumero.value = "";
    }
  }
}

/**
 * Finaliza la partida.
 */
function terminarJuego(esVictoria) {
  inputNumero.disabled = true;
  btnIntentar.disabled = true;
  btnNuevoJuego.disabled = false;

  const interfaz = document.querySelector(".interfaz-juego");
  if (esVictoria) {
    interfaz.classList.add("juego-ganado");
  } else {
    interfaz.classList.add("juego-perdido");
  }
}



btnIntentar.addEventListener("click", verificarIntento);
btnNuevoJuego.addEventListener("click", iniciarJuego);

// Permite presionar Enter para intentar
inputNumero.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && !btnIntentar.disabled) {
    event.preventDefault();
    verificarIntento();
  }
});

// ===============================================
// Inicialización
// ===============================================
iniciarJuego();
