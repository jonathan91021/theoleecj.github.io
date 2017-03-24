//Scripted dialogues
var americaDialogues = [
  { ball: "/america/america", speech: "WHAT? ANOTHER MEME BY RUSSIA ABOUT ME?" },
  { ball: "/america/america", speech: "THAT'S THE LAST STRAW! THE COMMIE PIG! HOW DARE HE!" },
  { ball: "/america/america", speech: "Well, I guess I'll have to confront him... again." },
  { ball: "later", speech: "later", toDo: "document.getElementById('Cutscene1-Background-America').setAttribute('xlink:href', 'cutscenes/cutscene1/backgrounds/america-2.png');" },
  { ball: "/america/america", speech: "I'M NOT A MEME! FOR THE LAST TIME, RUSSIA, I, AMERICA, AM NOT A MEME!" },
  { ball: "/russia/russia-happy", speech: "Says who? You?" },
  { ball: "/america/america", speech: "YES! Now shuttup before I get 20 inches of democracy up your commie a$$!" },
  { ball: "/russia/russia-happy", speech: "Of course... XAXAXA", toDo: "document.getElementById('Cutscene1-Background-America').setAttribute('xlink:href', 'cutscenes/cutscene1/backgrounds/america-3.png');"  },
  { ball: "/america/america", speech: "I've had enough with all this memes about me..." },
  { ball: "/america/america", speech: "What did I even do to deserve this?" },
  { ball: "/america/america", speech: "I think I should just escape school.", toDo: "FadeCutscene1();" },
  { ball: "end", speech: "end" }
];

//Dialogue things
var dialoguesPlayed = 0;
var currentGame = null;

//Cutscene Utilities
function PlayCutscene1() {
  currentGame = JSON.parse(localStorage.getItem("currentGame"))[0];

  document.getElementById("Game-StartScreen").style.display = "none";
  document.getElementById("Game-Cutscene1").style.display = "block";

  if (currentGame.ball == "usaball") {
    document.getElementById("Cutscene1-Background-America").style.display = "block";

    document.getElementById("Cutscene1-Dialogue-Character").setAttribute("xlink:href", "sprites/balls" + americaDialogues[dialoguesPlayed].ball + ".png");
    document.getElementById("Cutscene1-Dialogue-Text").innerHTML = americaDialogues[dialoguesPlayed].speech;
    dialoguesPlayed++;
  }
}

//Cutscene Utilities
function CutsceneNext() {
  if (currentGame.ball == "usaball") {
    if (americaDialogues[dialoguesPlayed].ball == "end") {
      document.getElementById("Cutscene1-Dialogue-Character").setAttribute("xlink:href", "");
      document.getElementById("Cutscene1-Dialogue-Text").innerHTML = "";
      dialoguesPlayed++;

      return;
    }
    else if (americaDialogues[dialoguesPlayed].ball == "later") {
      document.getElementById("Cutscene1-Dialogue-Character").setAttribute("xlink:href", "");
      document.getElementById("Cutscene1-Background-America").setAttribute("xlink:href", "sprites/a-while-later.png");
      document.getElementById("Cutscene1-Dialogue-Text").innerHTML = "";
  
      if (americaDialogues[dialoguesPlayed].toDo === null) { /*Don't add function*/ }
      else { document.getElementById("Cutscene1-Dialogue-Next").setAttribute("onclick", "CutsceneNext();" + americaDialogues[dialoguesPlayed].toDo); }

      dialoguesPlayed++;
      return;
    }
    else { /*Let message display*/ }
  
    if (americaDialogues[dialoguesPlayed].toDo === null) { /*Don't add function*/ }
    else { document.getElementById("Cutscene1-Dialogue-Next").setAttribute("onclick", "CutsceneNext();" + americaDialogues[dialoguesPlayed].toDo); }

    document.getElementById("Cutscene1-Dialogue-Character").setAttribute("xlink:href", "sprites/balls" + americaDialogues[dialoguesPlayed].ball + ".png");
    document.getElementById("Cutscene1-Dialogue-Text").innerHTML = americaDialogues[dialoguesPlayed].speech;
    dialoguesPlayed++;
  }
}

//Fade out
function FadeCutscene1() {
  var currentOpacity = 1, interval = null;

  interval = setInterval(function() {
    currentOpacity = currentOpacity - 0.05;
    document.getElementById("Game-Cutscene1").style.opacity = currentOpacity;

    document.getElementById("Game-Storey1").style.display = "block";
    document.getElementById("Game-Storey1").style.opacity = 1 - currentOpacity;

    LoadBackgroundStorey1("boardingCorridor1");
  }, 50);
  setTimeout(function() {
    clearInterval(interval);
  }, 1000);
}