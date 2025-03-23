function drawWaves() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  const amplitude = height / 15;
  const period = (2 * Math.PI) / width;
  const offsetY = (height * 3) / 4.1;
  const waves = 20;
  const heightShift = height / 50000;
  const phaseShift = 2.12 * Math.PI;
  const freqShift = 1 / 11;
  const amplitudeShift = 0.07;
  const totalPhaseShift = 2;

  ctx.clearRect(0, 0, width, height);

  for (let i = waves - 1; i >= 0; i--) {
    ctx.beginPath();
    let y = waves - i;

    for (let x = 0; x < canvas.width; x++) {
      let basicY =
        offsetY +
        amplitude *
          (i * amplitudeShift + 1) *
          Math.sin((1 + i * freqShift) * period * x - phaseShift * i - totalPhaseShift);
      let secondY = amplitude * Math.sin(5 * period * x * (1 + 0.2 * (i / waves)) - phaseShift * i);
      let thirdY = amplitude * Math.sin(1.2 * period * x * (1 + 1 * (y / waves)));
      let sumY = i * 4 + heightShift * (i * -x);

      ctx.lineTo(x, basicY + secondY + thirdY + sumY);
    }

    let rising = 255 * Math.min(i / (waves / 2), 1);
    let falling = 255 * Math.max(2 - (i / waves) * 2, 0);

    ctx.strokeStyle = `rgba(0, ${falling}, ${rising}, ${1 - i / (waves * 1.5)})`;
    ctx.lineWidth = 3;
    ctx.stroke();
  }
}

window.addEventListener("resize", drawWaves);
drawWaves();
