let temperature = 30; // COMECA EM GRAU
const minTemperature = 15;
const tempDropPerTree = 1.5;
let trees = [];

// POSIXAO FIXADA BOTAO
let gardener;

function setup() {
  createCanvas(350, 600);
  gardener = {
    x: width / 2,
    y: height - 70,
    size: 50,
  };

  textFont('Segoe UI');
  textAlign(CENTER, CENTER);
}

function draw() {
  background(58, 122, 87);

  drawGround();
  drawGardener();

  // Draw all trees
  for (let tree of trees) {
    drawTree(tree.x, tree.y, tree.size);
  }

  // DESENHAR DISPLAY TEMPERATURA (top center)
  fill(255, 255, 255, 230);
  stroke(0, 60);
  strokeWeight(1.5);
  rectMode(CENTER);
  rect(width / 2, 30, 180, 40, 15);

  noStroke();
  fill(15, 15, 50);
  textSize(20);
  text(`Temperatura: ${temperature.toFixed(1)}°C`, width / 2, 30);

  // ESCREVER INSTRUCAO DA TEMPERATURA
  textSize(14);
  fill(230);
  text("Clique para plantar uma arvore ", width / 2, 60);

  // PLANTADAS (top right)
  fill(255, 255, 255, 200);
  rect(width - 70, 30, 120, 30, 15);
  fill(20, 30, 20);
  textSize(16);
  text(`PLANTADAS: ${trees.length}`, width - 70, 30);
}

function mousePressed() {
  plantTree(mouseX, mouseY);
}

function touchStarted() {
  plantTree(touchX, touchY);
  return false;
}

function plantTree(x, y) {
  const groundLevel = height - 60;
  if (y > groundLevel) y = groundLevel;
  if (x < 20) x = 20;
  if (x > width - 20) x = width - 20;

  trees.push({ x: x, y: y, size: 40 + random(-10, 10) });

  temperature = max(minTemperature, temperature - tempDropPerTree);
}

function drawGround() {
  noStroke();
  fill('#6B8E23');
  rect(0, height - 60, width, 60);

  stroke('#497a1f');
  strokeWeight(2);
  for (let i = 0; i < width; i += 10) {
    let bladeHeight = random(10, 20);
    line(i, height - 60, i, height - 60 - bladeHeight);
  }
  noStroke();
}

function drawGardener() {
  push();
  translate(gardener.x, gardener.y);

  fill('#ff6f61');
  ellipse(0, -15, 40, 50); // CORPO

  fill('#f1c27d');
  ellipse(0, -45, 35, 35); // CABECA

  fill(0);
  circle(-7, -50, 6); // OIO
  circle(7, -50, 6);

  fill('#2a7a4f');
  arc(0, -65, 50, 30, PI, 0, CHORD); // HAT

  stroke('#ff6f61');
  strokeWeight(6);
  line(-10, 10, -15, 45); // PERNAS
  line(10, 10, 15, 45);

  stroke('#ff6f61');
  strokeWeight(5);
  line(-20, -10, -40, 10); // BRACOS
  line(20, -10, 40, 10); // BRACOS

  noStroke();
  fill('#555');
  rect(40, 10, 10, 25, 3); // Cabeca

  pop();
}

function drawTree(x, y, size) {
  push();
  translate(x, y);

  // trunk
  fill('#8B5A2B');
  rect(-size / 8, 0, size / 4, size / 2);

  // leaves
  fill('#228B22');
  ellipse(0, -size / 2, size * 0.7, size * 0.8);
  ellipse(-size / 4, -size / 3, size * 0.5, size * 0.6);
  ellipse(size / 4, -size / 3, size * 0.5, size * 0.6);

  pop();
}
