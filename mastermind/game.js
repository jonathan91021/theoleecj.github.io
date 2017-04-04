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

var colourSelected = "none";
var piecesPlacedInThisRow = 0;
var currentColumn = 1;

//Numbers to colours
function NumberToColour(number) {
  switch (number) {
    case 0:
      return "red";
      break;
    case 1:
      return "green";
      break;
    case 2:
      return "lightblue";
      break;
    case 3:
      return "yellow";
      break;
    case 4:
      return "white";
      break;
    case 5:
      return "purple";
      break;
  }
}

//Place piece
function PlacePiece(pieceToChange) {
  if (pieceToChange.getAttribute("id").split(",")[0] == currentColumn) {
    if (colourSelected != "none") {
      if (pieceToChange.getAttribute("fill") != "lightgrey") { /*No need to add to colours selected for row*/ }
      else { piecesPlacedInThisRow++; }

      pieceToChange.setAttribute("fill", colourSelected);

      if (piecesPlacedInThisRow == 4) {
        document.getElementById("EvaluateButton").style.display = "block";
      }
    }
    else { /*No need to do stuff*/ }
  }
}

//Evaluate guess
function EvalGuess() {
  var piecesChecked = 1;
  
  while (piecesChecked < 5) {
    if (compSeries[piecesChecked - 1] == document.getElementById(currentColumn + "," + piecesChecked).getAttribute("fill")) {
      console.log("It's a match.");
    }
    else {
      console.log("No match.");
    }
    
    piecesChecked++;
  }
  
  currentColumn++;
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
  compSeries = [NumberToColour(Math.floor((Math.random() * 6))), NumberToColour(Math.floor((Math.random() * 6))), NumberToColour(Math.floor((Math.random() * 6))), NumberToColour(Math.floor((Math.random() * 6)))];
  console.log("Random series generated. Random series is " + compSeries);
}

//Show user what colour they have selected to place
function AttachColourToCursor(colour) {
  colourSelected = colour;
  document.getElementById("VideoGame").setAttribute("style", "cursor: url('" + colour + ".ico'), default");
}

//Place default blank pieces onto board
function LoadDefaultPieces() {
  var rows = 12, rowsRendered = 0;
  
  while (rowsRendered < rows) {
    rowsRendered++;
    
    //Generate 4 blank spaces for placement
    var blankSpaces = "<circle id='" + rowsRendered + ",1' cx='" + (100 + (rowsRendered * 100)) + "' r='20' cy='700' fill='lightgrey' onclick='PlacePiece(this);' />";
    document.getElementById("Board-GuessPieces").innerHTML = document.getElementById("Board-GuessPieces").innerHTML + blankSpaces;
    
    blankSpaces = "<circle id='" + rowsRendered + ",2' cx='" + (100 + (rowsRendered * 100)) + "' r='20' cy='620' fill='lightgrey' onclick='PlacePiece(this);' />";
    document.getElementById("Board-GuessPieces").innerHTML = document.getElementById("Board-GuessPieces").innerHTML + blankSpaces;
    
    blankSpaces = "<circle id='" + rowsRendered + ",3' cx='" + (100 + (rowsRendered * 100)) + "' r='20' cy='540' fill='lightgrey' onclick='PlacePiece(this);' />";
    document.getElementById("Board-GuessPieces").innerHTML = document.getElementById("Board-GuessPieces").innerHTML + blankSpaces;
    
    blankSpaces = "<circle id='" + rowsRendered + ",4' cx='" + (100 + (rowsRendered * 100)) + "' r='20' cy='460' fill='lightgrey' onclick='PlacePiece(this);' />";
    document.getElementById("Board-GuessPieces").innerHTML = document.getElementById("Board-GuessPieces").innerHTML + blankSpaces;
    
    //Generate spaces for computer to tell user result of their guess
  }
}
