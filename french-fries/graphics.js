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
    interval(ShootLaser, 750);
    intervalSet = true;
  }
}

function StartPaint() {
  canvas = document.getElementById("Game");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvasContext = canvas.getContext("2d");
  
  canvasContext.font = "16px Segoe UI";
  canvasContext.fillText("Health: " + fryHealth, canvas.width - 300, canvas.height - 50);
  
  canvasContext.font = "16px Segoe UI";
  canvasContext.fillText("Points: " + points, canvas.width - 600, canvas.height - 50);
  
  canvasContext.font = "16px Segoe UI";
  canvasContext.fillText("A and D to move Fry around, W to add butter and S to attack robots.", canvas.width - 600, canvas.height - 25);
  
  InitFry();
  InitBots();
  InitKetchup();
  InitLasers();
  Update();
}

function Repaint() {
  StartPaint();
}

function ProcessKeys(event) {
  var key = event.keyCode;
  
  if (key == 87) { butter = "butter"; }
  else if (key == 83) { ShootBot(); }
  else if (key == 65 && fryCoords > -1) { fryCoords = fryCoords - 20; }
  else if (key == 68 && fryCoords < canvas.width) { fryCoords = fryCoords + 20; }
  else { /*Nothing*/ }
}

//Updating Stats
function Update() {
  //Update Laser and Ketchup positions
  var laserDrawn = 0, laserToDraw = lasers.length;
  
  while (laserToDraw > laserDrawn) {
    var currentLaser = lasers[laserDrawn];
    currentLaser.y = currentLaser.y + 25;
    laserDrawn++;
  }
  
  var ketchupDrawn = 0, ketchupToDraw = ketchups.length;
  
  while (ketchupToDraw > ketchupDrawn) {
    var currentKetchup = ketchups[ketchupDrawn];
    currentKetchup.y = currentKetchup.y - 25;
    ketchupDrawn++;
  }
  
  //Collisions
  var ketchupsChecked = 0, ketchupsToCheck = ketchups.length;
  
  while (ketchupsChecked < ketchupsToCheck) {
    var currentKetchup = ketchups[ketchupsChecked];
    var botsChecked = 0, botsToCheck = bots.length;
    
    while (botsChecked < botsToCheck) {
      var currentBot = bots[botsChecked];
      
      if ((currentKetchup.x > (currentBot.botCoords - 25)) && (currentKetchup.x < (currentBot.botCoords + 25)) && (currentKetchup.y < 20)) {
        points = points + 20;
        bots.splice(botsChecked - 1, 1);
      }
      else { /*No collisions*/ }
        
      botsChecked++;
    }
    
    ketchupsChecked++;
  }
}

function ShootLaser() {
  if (lasers.length == 20) {
    lasers.splice(0, 1);
    ShootLaser();
  }
  else {
    var random = Math.floor((Math.random() * 5) + 1);
  
    lasers[lasers.length] = {
      x: random * 90, y: 100
    };
  }
}

function AddKetchup() {
  if (ketchups.length == 20) {
    ketchups.splice(0, 1);
    AddKetchup();
  }
  else {
    var random = Math.floor((Math.random() * 5) + 1);
  
    ketchups[ketchups.length] = {
      x: fryCoords + 25, y: window.innerHeight - 25
    };
  }
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
    canvasContext.fillStyle = "lightgreen";
    canvasContext.fillRect(currentLaser.x, currentLaser.y, 5, 20);
    laserDrawn++;
  }
}

function InitKetchup() {
  var ketchupDrawn = 0, ketchupToDraw = ketchups.length;
  
  while (ketchupToDraw > ketchupDrawn) {
    var currentKetchup = ketchups[ketchupDrawn];
    canvasContext.fillStyle = "red";
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

