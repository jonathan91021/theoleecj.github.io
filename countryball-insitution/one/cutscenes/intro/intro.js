//Intervals
var bigNameReveal = null, smallNameReveal = null, gameName = null;
var a = null, b = null, c = null, d = null;

//Play
function PlayIntro() {
  //Hide previous screen and show intro
  document.getElementById("Game-AbsoluteStartScreen").style.display = "none";
  document.getElementById("Game-Intro").style.display = "block";

  //Intro
  a = 0;

  bigNameReveal = setInterval(function() {
    a += 0.05;
    document.getElementById("Intro-BigName").style.opacity = a;
  }, 50);
  b = setTimeout(function() {
    clearInterval(bigNameReveal);
    a = 0;

    smallNameReveal = setInterval(function() {
      a += 0.05;
      document.getElementById("Intro-SmallName").style.opacity = a;
    }, 50);

    c = setTimeout(function() {
      clearInterval(smallNameReveal);
    }, 1000);
  }, 1000);

  c = setTimeout(function() {
    document.getElementById("Intro-SmallName").style.display = "none";
    document.getElementById("Intro-BigName").style.display = "none";

    document.getElementById("Intro-Newgrounds").style.display = "block";
  }, 2300);

  d = setTimeout(function() {
    a = 1;

    gameName = setInterval(function() {
      a -= 0.1;
      document.getElementById("Intro-Newgrounds").style.opacity = a;
    }, 100);

    b = setTimeout(function() {
      clearInterval(gameName);

      c = setTimeout(function() {
        PlayMainMenu();
      }, 300);
    }, 1000);
  }, 2900);
}

//Skip
function SkipIntro() {
  clearInterval(bigNameReveal); clearInterval(smallNameReveal); clearInterval(gameName);
  clearTimeout(a); clearTimeout(b); clearTimeout(c); clearTimeout(d);

  a = 0;
  document.getElementById("Intro-SmallName").style.opacity = "0";
  document.getElementById("Intro-BigName").style.opacity = "0";
  document.getElementById("Intro-Newgrounds").style.opacity = "0";

  PlayMainMenu();
}