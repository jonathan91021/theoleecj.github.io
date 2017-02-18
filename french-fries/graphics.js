var bots = [
  {
    botCoords: 0,
    botHealth: 10
  }
];
var fryHealth = 50, points = 0, fryCoords = 0;
var lasers = [];
var canvasContext = null, canvas = null, intervalSet = false;

//Basic
function StartGame() {
  document.getElementById("Overlay").style.display = "none";
  if (intervalSet == true) { /*Skip*/ }
  else {
    setInterval(Repaint, 75);
    setInterval(AddBot, 1000);
    intervalSet = true;
  }
}

function StartPaint() {
  canvas = document.getElementById("Game");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvasContext = canvas.getContext("2d");
  InitFry();
  InitBots();
}

function Repaint() {
  StartPaint();
}

//Updating Stats
function Update() {
  
}

function AddLaser() {
  
}

function AddBot() {
  var random = Math.floor((Math.random() * 7) + 1);
  
  if (random == 7) {
    bots[bots.length] = {
      botCoords: (bots[bots.length - 1].botCoords + 30),
      botHealth: 10
    };
  }
  else { /*Skip*/ }
}

//Asset Drawing
function InitLasers() {
  
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
  
  fryImage.src = "assets/Normal Fry.png";
}

