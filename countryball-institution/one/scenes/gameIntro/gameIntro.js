//Dialogue
var dialoguesPlayed = 0;

var dialogues = [
  { ball: "none", speech: "<tspan style='font-family: monospace'>KOREAN PENINSULA, YEAR 1950</tspan>", toDo: "PlayGameIntro();" },
  { ball: "america/america", speech: "No, Soviet Russia. Korea should take up my democratic ways." },
  { ball: "soviet/soviet", speech: "NO! STUPID CAPITALIST PIG! KOREA IS MINE!", toDo: "AmericaTaller();" },
  { ball: "america/america", speech: "DEMOCRACY SHALL REIGN!!!", toDo: "SovietTaller();" },
  { ball: "soviet/soviet", speech: "COMMUNISM SHALL REIGN!!!", toDo: "PeekIn_PlayIn();" },
  { ball: "korea/korea", speech: "Sigh... They're fighting over me again! Can't they just stop?", toDo: "AmericaTaller();" },
  { ball: "america/america", speech: "KOREA IS MINE!!!", toDo: "SovietTaller();" },
  { ball: "soviet/soviet", speech: "NO!!! KOREA IS MINE!!!", toDo: "Pullback_PlayIn();" },
  { ball: "korea/korea", speech: "Oh well.", toDo: "Decision_PlayIn();" },
  { ball: "korea/korea", speech: "I don't want to get caught in the crossfire, do I?" },
  { ball: "korea/korea", speech: "Looks like the best solution to all of this..." },
  { ball: "korea/korea", speech: "Would be to escape school.", toDo: "PlayStorey1();" },
  { ball: "korea/korea", speech: "Would be to escape school.", toDo: "" }
];

function Decision_PlayIn() {
  document.getElementById("PlayIn-Pullback").style.display = "none";
  document.getElementById("PlayIn-Decision").style.display = "block";
}

function Pullback_PlayIn() {
  document.getElementById("PlayIn-AmericaTaller").style.display = "none";
  document.getElementById("PlayIn-SovietTaller").style.display = "none";
  document.getElementById("PlayIn-Pullback").style.display = "block";
}

function PeekIn_PlayIn() {
  document.getElementById("PlayIn-AmericaTaller").style.display = "none";
  document.getElementById("PlayIn-SovietTaller").style.display = "none";
  document.getElementById("PlayIn-Peek").style.display = "block";
}

function AmericaTaller() {
  document.getElementById("PlayIn-Peek").style.display = "none";
  document.getElementById("PlayIn-AmericaTaller").style.display = "block";
  document.getElementById("PlayIn-SovietTaller").style.display = "none";
}

function SovietTaller() {
  document.getElementById("PlayIn-Peek").style.display = "none";
  document.getElementById("PlayIn-AmericaTaller").style.display = "none";
  document.getElementById("PlayIn-SovietTaller").style.display = "block";
}

function StartGame() {
  DisplayScene("Game-PlayIn");
  var a = document.getElementById("Game-MainMenu");

  a.style.animationName = "FadeOut";
  a.style.animationDuration = "1s";
  a.style.animationFillMode = "forwards";

  setTimeout(function() {
    HideScene("Game-MainMenu");
    FadeIn_PlayIn();

    setTimeout(function() {
      CutsceneNext_PlayIn();
    }, 500)
  }, 1000);
}

function FadeIn_PlayIn() {
  var a = document.getElementById("PlayIn-Location");

  a.style.animationName = "FadeIn";
  a.style.animationDuration = "0.5s";
  a.style.animationFillMode = "forwards";

  setTimeout(function() {
    a.style.display = "block";
  }, 500);
}

function PlayGameIntro() {
  var a = document.getElementById("PlayIn-Location"), b = document.getElementById("PlayIn-Initial");

  a.style.animationName = "FadeOut";
  a.style.animationDuration = "1s";
  a.style.animationFillMode = "forwards";

  b.style.animationName = "FadeIn";
  b.style.animationDuration = "1s";
  b.style.animationFillMode = "forwards";

  setTimeout(function() {
    a.style.display = "none";
    b.style.opacity = "1";
  }, 1000);
}

//Cutscene Utilities
function CutsceneNext_PlayIn() {
  if (dialogues[dialoguesPlayed].speech == "end") {
    document.getElementById("PlayIn-Dialogue-Character").setAttribute("xlink:href", "");
    document.getElementById("PlayIn-Dialogue-Text").innerHTML = "";
    dialoguesPlayed++;

    return;
  }
  else { /*Let message display*/ }

  if (dialogues[dialoguesPlayed].toDo === null) { document.getElementById("PlayIn-Dialogue-Next").setAttribute("onclick", "CutsceneNext_PlayIn();"); }
  else { document.getElementById("PlayIn-Dialogue-Next").setAttribute("onclick", "CutsceneNext_PlayIn();" + dialogues[dialoguesPlayed].toDo); }

  if (dialogues.length > (dialoguesPlayed + 1)) {
    document.getElementById("PlayIn-Dialogue-Character").setAttribute("xlink:href", "sprites/countryballs/" + dialogues[dialoguesPlayed].ball + ".png");
    document.getElementById("PlayIn-Dialogue-Text").innerHTML = dialogues[dialoguesPlayed].speech;
    dialoguesPlayed++;
  }
}