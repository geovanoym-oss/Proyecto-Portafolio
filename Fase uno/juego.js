// ===============================================
// Variables globales y elementos del DOM
// ===============================================
let numeroSecreto = 0;
let intentos = 0;
const maxIntentos = 3; // Límite de intentos

// Obtener referencias a los elementos del HTML
const inputNumero = document.getElementById("numeroUsuario");
const mensajeFeedback = document.getElementById("mensaje");
const btnIntentar = document.getElementById("btnIntentar");
const btnNuevoJuego = document.getElementById("btnNuevoJuego");

// ===============================================
// Funciones del juego
// ===============================================

/**
 * Genera un número entero aleatorio entre un mínimo y un máximo.
 * @param {number} min - El valor mínimo (incluido).
 * @param {number} max - El valor máximo (incluido).
 * @returns {number} El número secreto generado.
 */
function generarNumeroSecreto(min, max) {
  // Math.random() genera un número entre 0 (incluido) y 1 (excluido)
  // Se multiplica por el rango (max - min + 1) y se suma el min.
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Asigna un mensaje en el elemento de feedback con un color específico.
 * @param {string} texto - El mensaje a mostrar.
 * @param {string} color - El color del texto (ej: 'white', 'red', 'green').
 */
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
  inputNumero.value = ""; // Limpiar el campo de entrada
  inputNumero.disabled = false; // Habilitar la entrada
  btnIntentar.disabled = false; // Habilitar el botón de intentar
  btnNuevoJuego.disabled = true; // Deshabilitar el botón de nuevo juego

  // 3. Mostrar mensaje inicial
  mostrarMensaje("Indica un número del 1 al 10", "white");

  // DEBUG: Puedes descomentar la siguiente línea para ver el número secreto en consola
  // console.log("Número Secreto:", numeroSecreto);
}

/**
 * Procesa el intento del usuario al presionar el botón.
 */
function verificarIntento() {
  // 1. Obtener y validar la entrada
  const numeroUsuario = parseInt(inputNumero.value);

  // Validación básica
  if (isNaN(numeroUsuario) || numeroUsuario < 1 || numeroUsuario > 10) {
    mostrarMensaje(
      "❌ Por favor, ingresa un número válido entre 1 y 10.",
      "red"
    );
    return;
  }

  // 2. Incrementar intentos
  intentos++;

  // 3. Lógica del juego
  if (numeroUsuario === numeroSecreto) {
    // GANADOR (Adivinó el número)
    mostrarMensaje(
      `🎉 ¡Felicidades! Adivinaste el número secreto (${numeroSecreto}) en ${intentos} intentos.`,
      "red"
    );
    terminarJuego(true);
  } else {
    // NO GANADOR (El número es incorrecto)

    // Mensaje de pista
    const pista =
      numeroUsuario > numeroSecreto
        ? "El número secreto es MENOR"
        : "El número secreto es MAYOR";

    // Verificar si quedan intentos
    if (intentos >= maxIntentos) {
      // PERDEDOR (Se acabaron los intentos)
      mostrarMensaje(
        `💔 Te quedaste sin intentos. El número secreto era ${numeroSecreto}.`,
        "red"
      );
      terminarJuego(false);
    } else {
      // Intentos restantes
      const intentosRestantes = maxIntentos - intentos;
      mostrarMensaje(
        `Incorrecto. ${pista}. Te quedan ${intentosRestantes} intentos.`,
        "white"
      );
      inputNumero.value = ""; // Limpiar campo para el siguiente intento
    }
  }
}

/**
 * Finaliza la partida, ya sea por ganar o perder.
 * @param {boolean} esVictoria - True si el usuario ganó, False si perdió.
 */
function terminarJuego(esVictoria) {
  // Deshabilitar la interfaz de juego
  inputNumero.disabled = true;
  btnIntentar.disabled = true;

  // Habilitar el botón de nuevo juego
  btnNuevoJuego.disabled = false;

  // Opcional: Agregar una animación o estilo final
  if (esVictoria) {
    // Puedes agregar una clase CSS para resaltar la victoria
    document.querySelector(".interfaz-juego").classList.add("juego-ganado");
  } else {
    // Puedes agregar una clase CSS para el fin del juego
    document.querySelector(".interfaz-juego").classList.add("juego-perdido");
  }
}

// ===============================================
// Event Listeners (Conectar botones)
// ===============================================

// Evento para el botón "Intentar"
btnIntentar.addEventListener("click", verificarIntento);

// Evento para el botón "Nuevo Juego"
btnNuevoJuego.addEventListener("click", iniciarJuego);

// Opcional: Permite presionar Enter en el campo de entrada
inputNumero.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && !btnIntentar.disabled) {
    event.preventDefault(); // Previene el envío del formulario si existiera
    verificarIntento();
  }
});

// =undaciones (Llamada inicial)
// ===============================================
iniciarJuego();
