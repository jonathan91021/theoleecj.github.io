var bots = [
  {
    botCoords: 0,
    botHealth: 10
  }
];
var fryHealth = 50, points = 0, fryCoords = 0, butter = "naked";
var lasers = [];
var ketchups = [];
var canvasContext = null, canvas = null, intervalSet = false;

//Basic
function StartGame() {
  document.getElementById("Overlay").style.display = "none";
  if (intervalSet == true) { /*Skip*/ }
  else {
    interval(Repaint, 100);
    interval(AddBot, 1000);
    interval(ShootLaser, 500);
    intervalSet = true;
  }
}

function StartPaint() {
  canvas = document.getElementById("Game");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvasContext = canvas.getContext("2d");
  
  canvasContext.font = "16px Segoe UI";
  canvasContext.fillText("Health: " + fryHealth, canvas.width - 200, canvas.height - 50);
  
  canvasContext.font = "16px Segoe UI";
  canvasContext.fillText("Points: " + points, canvas.width - 400, canvas.height - 50);
  
  canvasContext.font = "16px Segoe UI";
  canvasContext.fillText("A and D to move Fry around, W to add butter and S to attack robots. " + points, canvas.width - 400, canvas.height - 25);
  
  InitFry();
  InitBots();
}

function Repaint() {
  StartPaint();
}

function ProcessKeys(event) {
  var key = event.keyCode;
  
  if (key == 87) { butter = "butter"; }
  else if (key == 83) { ShootBot(); }
  else if (key == 65 && fryCoords > -1) { fryCoords = fryCoords - 2.5; }
  else if (key == 68 && fryCoords < canvas.width) { fryCoords = fryCoords + 2.5; }
  else { /*Nothing*/ }
}

//Updating Stats
function Update() {
  
}

function ShootLaser() {
  
}

function AddKetchup() {
}

function ShootBot() {
  if (butter == "weapon") { AddKetchup(); }
  else { butter = "weapon"; }
}

function AddBot() {
  var random = Math.floor((Math.random() * 7) + 1);
  
  if (random == 7 && (bots.length < 5)) {
    bots[bots.length] = {
      botCoords: (bots[bots.length - 1].botCoords + 100),
      botHealth: 10
    };
  }
  else { /*Skip*/ }
}

//Asset Drawing
function InitLasers() {
  var laserDrawn = 0, laserToDraw = lasers.length;
  
  while (laserToDraw > laserDrawn) {
    var currentLaser = lasers[laserDrawn];
    canvasContext.fillRect(currentLaser.x, currentLaser.y, 5, 20);
    laserDrawn++;
  }
}

function InitKetchup() {
  var ketchupDrawn = 0, ketchupToDraw = ketchups.length;
  
  while (ketchupToDraw > ketchupDrawn) {
    var currentKetchup = ketchups[ketchupDrawn];
    canvasContext.fillRect(currentKetchup.x, currentKetchup.y, 10, 70);
    ketchupDrawn++;
  }
}

function InitBots() {
  var botsDrawn = 0, botsToDraw = bots.length;
  var botImage = new Image();
  botImage.onload = function() {
   while (botsToDraw > botsDrawn) {
      var currentBot = bots[botsDrawn];
      canvasContext.drawImage(botImage, currentBot.botCoords + 10, -15, 150, 170);
      botsDrawn++;
    }
  };
  
  botImage.src = "assets/Normal.png";
}

function InitFry() {
  var fryImage = new Image();
  fryImage.onload = function() {
    canvasContext.drawImage(fryImage, fryCoords + 10, canvas.height - 200, 200, 200);
  };
  
  if (butter == "naked") {
    fryImage.src = "assets/Normal Fry.png";
  }
  else if (butter == "weapon") {
    fryImage.src = "assets/Ketchup Fry.png";
  }
  else if (butter == "hurt") {
    fryImage.src = "assets/Hurt Fry.png";
  }
  else if (butter == "butter") {
    fryImage.src = "assets/Butter Fry.png";
  }
}

