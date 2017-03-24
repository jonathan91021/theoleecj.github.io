//Interactions
//Note that fighting and letting the other Countryball retain some health lets you force the other Countryball to give you an object they have (30% chance of teacher randomly confiscating one of your inventory items and getting scolded), whilst completely knocking out their health bar lets you take anything and everything from the other Countryball (90% chance of getting scolded and 2 random inventory items confiscated)
//Getting defeated in a fight means going to the sick bay, along with $1 less pocket-money for the next two days
//
//Getting scolded = long dialogue
var americaInteractions = {
  poland: {
    ball: "/polandball/poland",
    actions: [{ label: "TALK", activateFunction: "" }, { label: "FIGHT", activateFunction: "" }, { label: "CONTINUE WALKING", activateFunction: "" }],
    conversationData: {
      beginConversation: [
        { speech: "Sorry, but what was your name again?", speechId: "sorryNamePls" },
        { speech: "Any idea where Russia went?", toDo: "", speechId: "whereDidRussiaGo" },
        { speech: "Burger burger, bork bork", toDo: "", speechId: "burger" },
        { speech: "Goodbye!", toDo: "", speechId: "goodbye" }
      ],
      otherPartyResponse: {
        sorryNamePls: "My name's Poland.",
        whereDidRussiaGo: "Oh! I into seeings him headings to Sir England's History lesson of just now.",
        burger: "Stop into that, Murica!",
        goodbye: "Goodbye..."
      },
      misc: "Other conversation data can go here, and be referenced via a customSpeech object in a beginConversation entry. A customSpeech function can be something like what is shown below.",
      whereDidRussiaGo: { activateFunction: "ShowMap();", ball: "/polandball/poland", speech: "" }
    },
    fightingData: {
      otherPartyWeapons: [
        { name: "KurwaTank", damage: 20, effect: "attack", pp: 5 },
        { name: "BOOM", damage: 100, effect: "attack", pp: 1 },
        { name: "Vodka", hitpoints: 80, effect: "heal", pp: 10  }
      ],
      hitpoints: 500 
    }
  },
  russia: {
    ball: "russia/russia",
    actions: [{ label: "TALK", activateFunction: "" }, { label: "FIGHT", activateFunction: "" }, { label: "CONTINUE WALKING", activateFunction: "" }],
    conversationData: {
      beginConversation: [
        { speech: "Foolish Commie!", speechId: "commie" },
        { speech: "Please stop making those memes.", speechId: "polite" },
        { speech: "REMEMBER DECEMBER 26, 1991!!!", speechId: "remember" },
        { speech: "Bye.", speechId: "bye" }
      ],
      otherPartyResponse: {
        commie: { speech: "Foolish Western Capitalist Pig!", returnFunction: "" },
        polite: { speech: "Sure. XAXAXA", returnFunction: "" },
        remember: { speech: "You of losing in Vietnam yourself! XAXAXA", returnFunction: "" },
        bye: { speech: "Bye Capitalist Pig XAXAXA", returnFunction: "" }
      },
    },
    fightingData: {
      otherPartyWeapons: [
        { name: "XAXAXA", length: 2, effect: "confuse", pp: 5 },
        { name: "Russian Winter", damage: 100, pp: 5 },
        { name: "RUSSIAN WINTER", damage: 450, pp: 1 },
        { name: "Vodka", hitpoints: 20, effect: "heal", pp: 10 }
      ],
      hitpoints: 600
    }
  },
  ownFightingData: {
    weapons: [
      { name: "Burgers", hitpoints: 20, effect: "heal", pp: 10 },
      { name: "U.S Air Force", damage: 450, pp: 1 },
      { name: "Allies", damage: 200, pp: 5 },
      { name: "Coca-Cola Spray", length: 3, effect: "confuse", pp: 5 }
    ],
    hitpoints: 600
  }
};

//Backgrounds
var backgrounds = {
  boardingCorridor1: { image: "boarding-corridor-1", arrows: [
    { backgroundToLoad: "boardingCorridor2", x: 40, y: 450, direction: "up" }
  ]},
  boardingCorridor2: { image: "boarding-corridor-2", arrows: [
    { backgroundToLoad: "boardingCorridor1", x: 1400, y: 450, direction: "right" }
  ]}
};

function LoadBackgroundStorey1(background) {
  var toLoad = backgrounds[background];
  var arrowsRendered = 0;
  document.getElementById("Storey1-Background").setAttribute("xlink:href", "scenes/storey1/backgrounds/" + toLoad.image + ".png");
  document.getElementById("Storey1-Arrows").innerHTML = "";

  while (arrowsRendered < toLoad.arrows.length) {
    var currentArrow = toLoad.arrows[arrowsRendered], arrowSVG = document.createElement("image");
    arrowSVG.setAttribute("onclick", "LoadBackgroundStorey1('" + currentArrow.backgroundToLoad + "');");
    arrowSVG.setAttribute("x", currentArrow.x);
    arrowSVG.setAttribute("y", currentArrow.y);
    arrowSVG.setAttribute("xlink:href", "sprites/arrow.png");

    document.getElementById("Storey1-Arrows").appendChild(arrowSVG);
    arrowsRendered++;
  }

  //Add ball
}