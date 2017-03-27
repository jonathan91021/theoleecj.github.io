var timers = [];

function PlayIntro() {
  var a, b, c, d, e;

  HideScene("Game-StartScreen");
  DisplayScene("Game-Intro");

  e = document.getElementById("Intro-Heehee"), a = document.getElementById("Intro-TheoLee"), b = document.getElementById("Intro-CJ"), c = document.getElementById("Intro-Logo"), d = document.getElementById("Intro-Presents");

  //Fade in 'TheoLee'
  timers[0] = setTimeout(function() {
    a.style.animationName = "FadeIn";
    a.style.animationDuration = "0.75s";
    a.style.animationFillMode = "forwards";

    //Fade in 'CJ'
    timers[1] = setTimeout(function() {
      a.style.opacity = "1";
      
      b.style.animationName = "FadeIn";
      b.style.animationDuration = "0.5s";
      b.style.animationFillMode = "forwards";

      //Wait
      timers[2] = setTimeout(function() {
        b.style.opacity = "1";

        //Fade out name
        timers[3] = setTimeout(function() {
          e.style.animationName = "FadeOut";
          e.style.animationDuration = "0.5s";
          e.style.animationFillMode = "forwards";

          //Fade in 'PRESENTS'
          timers[4] = setTimeout(function() {
            a.style.opacity = "0";
            b.style.opacity = "0";
            e.style.opacity = "0";

            d.style.animationName = "FadeIn";
            d.style.animationDuration = "0.25s";
            d.style.animationFillMode = "forwards";

            //Display logo
            timers[5] = setTimeout(function() {
              d.style.display = "none";
              c.style.display = "block";

              //Fade logo
              timers[6] = setTimeout(function() {
                c.style.animationName = "FadeOut";
                c.style.animationDuration = "0.25s";
                c.style.animationFillMode = "forwards";

                //Clean up
                timers[7] = setTimeout(function() {
                  ClearTimers();
                  PlayMainMenu();
                }, 750);
              }, 1000);
            }, 1000)
          }, 600);
        }, 500);
      }, 500);
    }, 750);
  }, 0);
}

function SkipIntro() {
  ClearTimers();
  PlayMainMenu();
}

function ClearTimers() {
  var timersCleared = 0;
  while (timersCleared < timers.length) {
    clearTimeout(timers[timersCleared]);
    timersCleared++;
  }
}