let dots = [];
let size = 30;
let chosen = [];
let startTime;
let timeLimit = 10000; 
let timeOver = false;
let restartDelay = 2000; 
let restartTime = null;
let database;
let firebaseConfig;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(12);
  firebaseConfig = {
  apiKey: "AIzaSyA1jvrzvxclRkIuum9esmOfoXdPHKRY8FY",
  authDomain: "scam-2b8b2.firebaseapp.com",
  projectId: "scam-2b8b2",
  storageBucket: "scam-2b8b2.firebasestorage.app",
  messagingSenderId: "687137609047",
  appId: "1:687137609047:web:1b186a62144c3e9b969a12",
    databaseURL:"https://scam-2b8b2-default-rtdb.europe-west1.firebasedatabase.app/"
};
   firebase.initializeApp(firebaseConfig);
 database = firebase.database();


  let spacing = width / 11;

  for (let i = 0; i < 10; i++) {
    let x = spacing * (i + 1);
    let y = height / 2;
    let r = random(255);
    let g = random(255);
    let b = random(255);
    dots.push({ x, y, r, g, b, number: i, selected: false });
  }
    startTime = millis();
}

function draw() {
  background(255);

  let elapsed = millis() - startTime;
  if (elapsed >= timeLimit && !timeOver) {
    timeOver = true;
    restartTime = millis();  
  }
  
  if (timeOver && chosen.length < 5) {
    fill('#DA1E1E');
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Czas minął!", windowWidth / 2, windowHeight / 2);
    
    if (millis() - restartTime > restartDelay) {
      resetGame();
    }
    return; 
  }

  if (chosen.length >= 5) {
    fill(0);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Wybrałeś cyfry:", windowWidth / 2, windowHeight / 2 - 20);
    
    fill('#45C207')
    textSize(32);
    text(chosen.join(" "), windowWidth / 2, windowHeight / 2 + 20);
     zapiszLiczba(chosen.join(''));
    return;
  }

  fill(0);
  textSize(24);
  textAlign(CENTER, TOP);
  text("Wybierz 5 pierwszych cyfr Twojego peselu", windowWidth / 2, windowHeight / 30);
  
  let timeLeft = max(0, ceil((timeLimit - elapsed) / 1000));
  textSize(18);
  textAlign(RIGHT, TOP);
  text(timeLeft, windowWidth / 2, windowHeight / 10);

  textAlign(CENTER, CENTER);
  textSize(12);

  for (let d of dots) {
    if (dist(mouseX, mouseY, d.x, d.y) < size / 2) {
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

function zapiszLiczba(liczba) {
  database.ref("mojaLiczba").set(liczba);
  print("Zapisano: " + liczba);
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

function resetGame() {
  chosen = [];
  timeOver = false;
  startTime = millis();
  restartTime = null;
}
