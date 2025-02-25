let balls = [];

const fadeTime = 500; // Pallon fade aika
const ballDelay = 50; // Aikaero pallojen välillä

// Luodaan pallot, mutta ne ovat näkymättömiä
function createBalls() {
  // Pysäytetään vanhat animaatiot
  terminateAnimation();
  // Poistetaan vanhat HTML-elementit
  document.querySelectorAll(".ball").forEach((ball) => ball.remove());
  balls = []; // Tyhjennetään taulukko

  const container = document.getElementById("container");

  const ballSize = 60; // Pallon koko
  const margin = 2; // Väli pallojen välillä
  const spacing = ballSize + margin; // Pallojen väli keskikohdasta keskikohtaan

  // Työstettävän alueen koko
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  // Lasketaan kuinka paljon tarvitaan palloja
  const cols = Math.floor(containerWidth / (ballSize + margin));
  const rows = Math.floor(containerHeight / (ballSize + margin));

  // Lasketaan tyhjä tila ja keskitys
  const usedWidth = cols * spacing; // Käytetty leveys
  const usedHeight = rows * spacing; // Käytetty korkeus
  const offsetX = (containerWidth - usedWidth) / 2 - margin / 2;
  const offsetY = (containerHeight - usedHeight) / 2 - margin / 2;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const ball = document.createElement("div");
      ball.classList.add("ball");

      // Asetetaan keskitetyt koordinaatit
      ball.style.left = `${offsetX + j * spacing}px`;
      ball.style.top = `${offsetY + i * spacing}px`;

      container.appendChild(ball);
      balls.push(ball);
    }
  }
}

// Sekoitetaan taulukko satunnaiseen järjestykseen (Fisher-Yates shuffle)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Tallennetaan animaatio-ID:t ja timeout-ID:t,
// että voidaan keskeyttää aikaisempi animaatio,
// jos showBalls()-funktiota kutsutaan jatkuvasti.
let animationIds = new Map();
let timeoutIds = new Map();

// Peruuttaa kaikki käynnissä olevat animaatiot ja timeoutit
function terminateAnimation() {
  balls.forEach((ball) => {
    if (animationIds.has(ball)) {
      cancelAnimationFrame(animationIds.get(ball)); // Peruutetaan edellinen animaatio
      animationIds.delete(ball);
    }
    if (timeoutIds.has(ball)) {
      clearTimeout(timeoutIds.get(ball)); // Peruutetaan odottava ajastus
      timeoutIds.delete(ball);
    }
    ball.style.opacity = "0";
  });
}

// Pallot näkyviin satunnaisessa järjestyksessä
function showBalls() {
  terminateAnimation();

  shuffle(balls); // Sekoitetaan järjestys

  balls.forEach((ball, index) => {
    let timeoutId = setTimeout(() => {
      fadeIn(ball, fadeTime);
      timeoutIds.delete(ball);
    }, index * ballDelay);
    timeoutIds.set(ball, timeoutId); // Tallennetaan timeout-ID
  });
}

// Fade-in animaatio
function fadeIn(ball, duration) {
  let startTime = performance.now();

  function animate(time) {
    let elapsed = time - startTime;
    let progress = Math.min(elapsed / duration, 1);

    ball.style.opacity = progress; // Kasvatetaan opacitya

    if (progress < 1) {
      let animId = requestAnimationFrame(animate);
      animationIds.set(ball, animId); // Tallennetaan uusi animaatio-ID
    } else {
      animationIds.delete(ball); // Poistetaan, kun animaatio on valmis
    }
  }

  let animId = requestAnimationFrame(animate);
  animationIds.set(ball, animId);
}

window.addEventListener("resize", createBalls);
createBalls();
