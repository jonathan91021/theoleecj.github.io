function PlayMainMenu() {
  HideScene("Game-Intro");
  DisplayScene("Game-MainMenu");

  if ((localStorage.getItem("CurrentGame") === null) || (localStorage.getItem("CurrenGame") == "")) {
    document.getElementById("MainMenu-LoadGame").setAttribute("onclick", "");
    document.getElementById("MainMenu-LoadGame").setAttribute("title", "You don't seem to have a saved game to continue from.");
    document.getElementById("MainMenu-LoadGame-Text").setAttribute("fill", "white");
  }
}

function Quit() {
  HideScene("Game-MainMenu");
  DisplayScene("Game-StartScreen");
}