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
    var blankSpaces = "<circle cx='" + (100 + (rowsRendered * 45)) + "' r='20' cy='720' fill='lightgrey' />";
    document.getElementById("Board-GuessPieces").innerHTML = document.getElementById("Board-GuessPieces").innerHTML + blankSpaces;
    
    blankSpaces = "<circle cx='" + (100 + (rowsRendered * 45)) + "' r='20' cy='680' fill='lightgrey' />";
    document.getElementById("Board-GuessPieces").innerHTML = document.getElementById("Board-GuessPieces").innerHTML + blankSpaces;
    
    blankSpaces = "<circle cx='" + (100 + (rowsRendered * 45)) + "' r='20' cy='640' fill='lightgrey' />";
    document.getElementById("Board-GuessPieces").innerHTML = document.getElementById("Board-GuessPieces").innerHTML + blankSpaces;
    
    blankSpaces = "<circle cx='" + (100 + (rowsRendered * 45)) + "' r='20' cy='600' fill='lightgrey' />";
    document.getElementById("Board-GuessPieces").innerHTML = document.getElementById("Board-GuessPieces").innerHTML + blankSpaces;
    
    //Generate spaces for computer to tell user result of their guess
  }
}
