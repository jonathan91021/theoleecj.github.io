//Store computer's randomly generated series
var compSeries = ["lightgrey", "lightgrey", "lightgrey", "lightgrey"];

//Store results that computer returned for user's guess
var compsResults = {
  row1: ["none", "none", "none", "none"]
};

//Populate results object + array
var compsResultsPopulated = 0;

while (compsResultsPopulated < 12) {
  compsResultsPopulated++;
  compsResults["row" + compsResultsPopulated] = ["none", "none", "none", "none"];
}

//Start game as guesser
function StartAsGuesser() {
  document.getElementById("MainMenu").style.display = "none";
  document.getElementById("Board").style.display = "block";
  
  LoadComputerAsSetter();
  LoadDefaultPieces();
}

//Set computer's guesses
function LoadComputerAsSetter() {
  
}

//Place default blank pieces onto board
function LoadDefaultPieces() {
  var rows = 12, rowsRendered = 0;
  
  while (rowsRendered < rows) {
    rowsRendered++;
    
    //Generate 4 blank spaces for placement
    var blankSpaces = document.createElement("circle");
    blankSpaces.setAttribute("cx", (100 + (rowsRendered * 45)));
    blankSpaces.setAttribute("r", "20");
    
    blankSpaces.setAttribute("cy", "730");
    document.getElementById("Board-GuessPieces").appendChild(blankSpaces);
    
    blankSpaces.setAttribute("cy", "710");
    document.getElementById("Board-GuessPieces").appendChild(blankSpaces);
    
    blankSpaces.setAttribute("cy", "690");
    document.getElementById("Board-GuessPieces").appendChild(blankSpaces);
    
    blankSpaces.setAttribute("cy", "670");
    document.getElementById("Board-GuessPieces").appendChild(blankSpaces);
    
    //Generate spaces for computer to tell user result of their guess
  }
}
