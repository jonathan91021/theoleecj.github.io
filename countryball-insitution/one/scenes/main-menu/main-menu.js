function PlayMainMenu() {
  document.getElementById("Game-Intro").style.display = "none";
  document.getElementById("Game-StartScreen").style.display = "block";
}

//New Game
function ChooseCharacter() { document.getElementById("MainMenu-ChooseCharacter").style.display = "block"; }
function CloseChooseCharacter() { document.getElementById("MainMenu-ChooseCharacter").style.display = "none"; }

//Start Game
function StartGame(ball) {
  localStorage.setItem("currentGame", '[{ "ball": "' + ball + '" }]'); //parsedJSONObject[0].ball;
  PlayCutscene1();
}
