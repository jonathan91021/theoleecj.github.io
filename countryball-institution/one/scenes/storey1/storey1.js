function PlayStorey1() {
  //Reveal storey 1
  DisplayScene("Game-Storey1");
  var a = document.getElementById("Game-Storey1");

  a.style.animationName = "FadeIn";
  a.style.animationDuration = "1s";
  a.style.animationFillMode = "forwards";

  setTimeout(function() {
    HideScene("Game-PlayIn");
  }, 1000);
}

function SwitchScene_Storey1(sceneWanted) {
  HideScene("Game-Storey1");
  DisplayScene("Game-" + sceneWanted);
}

function SwitchBackdrop_Storey1(backdropWanted, backdropToThrow) {
  document.getElementById("Storey1-" + backdropWanted).style.display = "block";
  document.getElementById("Storey1-" + backdropToThrow).style.display = "none";
}