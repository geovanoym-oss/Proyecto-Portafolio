/* script.js - Comportamiento: menú móvil, carrusel, año en footer */

document.addEventListener("DOMContentLoaded", function () {
  // Menú móvil
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  menuToggle.addEventListener("click", () => {
    const visible = mainNav.style.display === "block";
    mainNav.style.display = visible ? "none" : "block";
  });

  // Carousel básico
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const nextBtn = document.querySelector(".carousel-btn.next");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const indicatorsContainer = document.getElementById("indicators");

  let currentIndex = 0;
  const slideCount = slides.length;

  // Crear indicadores
  slides.forEach((_, idx) => {
    const btn = document.createElement("button");
    if (idx === 0) btn.classList.add("active");
    btn.addEventListener("click", () => goToSlide(idx));
    indicatorsContainer.appendChild(btn);
  });

  function updateTrack() {
    track.style.transform = `translateX(-${currentIndex * 100}% )`;
    // update indicators
    const indicators = Array.from(indicatorsContainer.children);
    indicators.forEach((b, i) =>
      b.classList.toggle("active", i === currentIndex)
    );
  }

  function goToSlide(index) {
    currentIndex = (index + slideCount) % slideCount;
    updateTrack();
  }

  nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));
  prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));

  // autoplay suave
  let autoplay = setInterval(() => goToSlide(currentIndex + 1), 6000);
  // pausa hover
  const carousel = document.getElementById("carousel");
  carousel.addEventListener("mouseenter", () => clearInterval(autoplay));
  carousel.addEventListener(
    "mouseleave",
    () => (autoplay = setInterval(() => goToSlide(currentIndex + 1), 6000))
  );

  // Año en footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Ajuste inicial (por si es mobile)
  if (window.innerWidth <= 900) {
    mainNav.style.display = "none";
  } else {
    mainNav.style.display = "block";
  }
});
