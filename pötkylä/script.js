const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");

function drawWave() {
  const width = window.innerWidth * 2; // 2x leveämpi kuin ikkuna
  const height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  // Siniaallon asetukset
  const amplitude = height / 50; // Aallon amplitudi
  const frequency = 4; // Aaltojen määrä
  const centerY = height / 1.7; // Keskikohta (ylhäältä alas)
  const spread = height / 6; // Aallon paksuus (tuplakokoinen arvoon nähden)

  // Aallonpituuden säätö: #waveCanvas width ja transform: translateX .css-tiedostossa.

  ctx.clearRect(0, 0, width, height); // Tyhjentää elementin

  // Piirretään siniaalto yhden pikselin paksuinen sarake kerrallaan.
  // Tällä tavalla saadaan gradientti piirrettyä helposti aaltoon mukaan.
  ctx.beginPath();
  for (let x = 0; x < width; x++) {
    // Siniaallon laskeminen
    let y = Math.sin((x / width) * frequency * Math.PI) * amplitude + centerY;

    // Luodaan gradientti jokaiselle x-arvolle
    let gradient = ctx.createLinearGradient(x, y - spread, x, y + spread);
    gradient.addColorStop(0, "rgb(255, 75, 255)"); // Sininen reuna
    gradient.addColorStop(0.1, "rgba(255, 0, 255, 0.75)");
    gradient.addColorStop(0.4, "rgba(255, 0, 255, 0)"); // Läpinäkyvä keskikohta
    gradient.addColorStop(0.6, "rgba(255, 0, 255, 0)");
    gradient.addColorStop(0.9, "rgba(255, 0, 255, 0.75)");
    gradient.addColorStop(1, "rgb(255, 75, 255)"); // Sininen reuna

    ctx.fillStyle = gradient;
    ctx.fillRect(x, y - spread, 1, spread * 2); // Piirretään sarake
  }
}

window.addEventListener("resize", drawWave);
drawWave();
