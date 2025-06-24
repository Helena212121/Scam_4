let dots = [];
let size = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(12);

  let spacing = width / 11;

  for (let i = 0; i < 10; i++) {
    let x = spacing * (i + 1);
    let y = height / 2;
    let r = random(255);
    let g = random(255);
    let b = random(255);
    dots.push({ x, y, r, g, b, number: i, selected: false });
  }
}

function draw() {
  background(255);

  fill(0);
  textSize(24);
  text("Wybierz 5 pierwszych cyfr Twojego peselu", width / 2, 20);
  textSize(12);

  for (let d of dots) {
    if (d.selected) {
      stroke(0);
      strokeWeight(3);
    } else if (dist(mouseX, mouseY, d.x, d.y) < size / 2) {
      stroke(100);
      strokeWeight(2);
    } else {
      noStroke();
    }

    fill(d.r, d.g, d.b);
    ellipse(d.x, d.y, size, size);
    fill(255);
    noStroke();
    text(d.number, d.x, d.y);
  }
}

function mousePressed() {
  for (let d of dots) {
    if (dist(mouseX, mouseY, d.x, d.y) < size / 2) {
      if (!d.selected && countSelected() < 5) {
        d.selected = true;
      } else if (d.selected) {
        d.selected = false;
      }
    }
  }
  if (countSelected() === 5) {
  window.location.href='https://helena212121.github.io/Scam5/';
    return;
  }
}

function countSelected() {
  let count = 0;
  for (let d of dots) {
    if (d.selected) count++;
  }
  return count;
}
