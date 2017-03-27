/*Load scenes and cutscenes into a variable, and only put scenes onto video game's SVG when they need to be displayed.*/
var scenes = {}, loaded = 0, canLoad = true, scenesToLoad = 3;

//Load cutscene into game
function LoadScene(folder, sceneName, hasScripts) {
  var cutsceneRequest = new XMLHttpRequest();

  //Set what to do when request is complete
  cutsceneRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      loaded++;
      
      //Add scene to scenes
      scenes[sceneName] = {
        scene: cutsceneRequest.responseText,
        sceneId: sceneName
      };

      //Update loader
      document.getElementById("Loader-CurrentPhase").innerHTML = "game assets (scene " + loaded + ")";

      //Add scene scripts
      if (hasScripts == true) {
        var sceneScript = document.createElement("script");
        sceneScript.setAttribute("src", "scenes/" + folder + "/" + folder + ".js");
        document.getElementById("Scripts-Scenes").appendChild(sceneScript);
      }
      
      //Hide loader if needed
      if (loaded == scenesToLoad) { document.getElementById("Overlay").style.display = "none"; }

      //Tell loader to continue loading
      canLoad = true;
    }
    else if (this.status == 404 || this.status == 500) {
      document.getElementById("Loader-CurrentPhase").innerHTML = "failed. A error occurred whilst loading an asset. Please reload this page to retry";
      canLoad = false;
    }
  }
          
  if (canLoad == true) {
    cutsceneRequest.open("GET", "scenes/" + folder + "/" + folder + ".svg", true);
    cutsceneRequest.send();
  }
  else {
    return;
  }
}

//Display scene
function DisplayScene(sceneName) {
  document.getElementById(sceneName).style.display = "block";
  document.getElementById(sceneName).innerHTML = scenes[sceneName].scene;
}

//Hide scene
function HideScene(sceneName) {
  document.getElementById(sceneName).style.display = "none";
  document.getElementById(sceneName).innerHTML = "";
}