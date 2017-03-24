//Keep track of what has been loaded and what hasn't
var cutscenes = 2, cutscenesLoaded = 0;
var scenes = 1, scenesLoaded = 0;

//Loads cutscenes
function LoadCutscene(folder, SVG, hasScripts) {
  document.getElementById("Loader-CurrentPhase").innerHTML = "Cutscenes (" + cutscenesLoaded + " of " + cutscenes + ")";

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById(SVG).innerHTML = xhttp.responseText;

      if (hasScripts == true) { 
        var cutscenePlayer = document.createElement("script");
        cutscenePlayer.setAttribute("src", "cutscenes/" + folder + "/" + folder + ".js");

        document.getElementById("Scripts-Cutscenes").appendChild(cutscenePlayer);
      }
      else { /*Nothing*/ }

      cutscenesLoaded++;

      if (cutscenesLoaded == cutscenes) { document.getElementById("Loader-CurrentPhase").innerHTML = "Scenes"; }
      else { /*Nothing*/ }
    }
  };
  xhttp.open("GET", "cutscenes/" + folder + "/" + folder + ".html", true);
  xhttp.send();
}

//Load scenes
function LoadScene(folder, SVG, hasScripts) {
  document.getElementById("Loader-CurrentPhase").innerHTML = "Scenes (" + scenesLoaded + " of " + scenes + ")";

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById(SVG).innerHTML = xhttp.responseText;

      if (hasScripts == true) { 
        var sceneScript = document.createElement("script");
        sceneScript.setAttribute("src", "scenes/" + folder + "/" + folder + ".js");

        document.getElementById("Scripts-Scenes").appendChild(sceneScript);
      }
      else { /*Nothing*/ }

      scenesLoaded++;

      if (scenesLoaded == scenes) { document.getElementById("Overlay").style.display = "none"; }
      else { /*Nothing*/ }
    }
  };
  xhttp.open("GET", "scenes/" + folder + "/" + folder + ".html", true);
  xhttp.send();
}