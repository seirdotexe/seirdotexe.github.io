const p0 = { x: 100, y: 400 };
const p1 = { x: 200, y: 100 };
const p2 = { x: 600, y: 100 };
const p3 = { x: 700, y: 400 };

let t = 0;

const cubicBezier = (t, p0, p1, p2, p3) => {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;

  return {
    x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
    y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y
  };
}

const drawBezierCurve = () => {
  ctx.beginPath();
  ctx.moveTo(p0.x, p0.y);
  ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 2;
  ctx.stroke();
}

const drawBezierBall = ({ x, y }, color, radius = 15) => {
  // console.log(`x=${x}, y=${y}`);
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = '#000';
  ctx.stroke();
}

const animateBezier = () => {
  let speed = 0.002;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBezierCurve();
  drawBezierBall(cubicBezier(t, p0, p1, p2, p3), 'red');

  t += speed;
  if (t > 1) t = 0;

  animationId = requestAnimationFrame(animateBezier);
}