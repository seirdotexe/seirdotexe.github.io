let tCatmullRom = 0;
const controlPoints = [
  [80, 550], [200, 550], [400, 550], [600, 550],

  [650, 480], [650, 350], [650, 250], [650, 150],

  [600, 100], [450, 100], [350, 100], [200, 100],

  [180, 150], [180, 250], [180, 350], [180, 450],

  [200, 480], [300, 480], [400, 480], [500, 480],

  [600, 480], [650, 480], [650, 550], [600, 550]
];

const catmullRom = (t, p0, p1, p2, p3) => {
  const t2 = t * t;
  const t3 = t2 * t;

  const interpolate = (a, b, c, d) =>
    0.5 * (
      (2 * b) +
      (-a + c) * t +
      (2 * a - 5 * b + 4 * c - d) * t2 +
      (-a + 3 * b - 3 * c + d) * t3
    );

  return p0.map((_, i) => interpolate(p0[i], p1[i], p2[i], p3[i]));
}

const getPathPoints = (controlPoints, samplesPerSegment = 20) => {
  const points = [];

  for (let i = 0; i <= controlPoints.length - 4; i++) {
    const [p0, p1, p2, p3] = controlPoints.slice(i, i + 4);

    for (let j = 0; j < samplesPerSegment; j++) {
      const t = j / samplesPerSegment;
      points.push(catmullRom(t, p0, p1, p2, p3));
    }
  }

  points.push(controlPoints[controlPoints.length - 2]);

  return points;
}

const drawCatmullRomPath = () => {
  ctx.beginPath();
  ctx.moveTo(pathPoints[0][0], pathPoints[0][1]);

  for (let i = 1; i < pathPoints.length; i++) {
    ctx.lineTo(pathPoints[i][0], pathPoints[i][1]);
  }

  ctx.strokeStyle = '#888';
  ctx.lineWidth = 2;
  ctx.stroke();
}

const pathPoints = getPathPoints(controlPoints, 30);

const drawCatmullRomBall = ([x, y], color, radius = 15) => {
  // console.log(`x=${x}, y=${y}`);
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = '#000';
  ctx.stroke();
}

const animateCatmullRom = () => {
  let speed = 0.5;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawCatmullRomPath();
  drawCatmullRomBall(pathPoints[Math.floor(tCatmullRom)], 'red');

  tCatmullRom += speed;
  if (tCatmullRom >= pathPoints.length) tCatmullRom = 0;

  animationId = requestAnimationFrame(animateCatmullRom);
}