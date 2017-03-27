function PlayMainMenu() {
  HideScene("Game-Intro");
  DisplayScene("Game-MainMenu");
}

function Quit() {
  HideScene("Game-MainMenu");
  DisplayScene("Game-StartScreen");
}