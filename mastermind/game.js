//Store computer's randomly generated series
var compSeries = ["10", "10", "10", "10"];

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
    case "red":
      return 0;
      break;
    case "green":
      return 1;
      break;
    case "lightblue":
      return 2;
      break;
    case "yellow":
      return 3;
      break;
    case "white":
      return 4;
      break;
    case "purple":
      return 5;
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
      pieceToChange.setAttribute("data-colour", NumberToColour(colourSelected));

      if (piecesPlacedInThisRow == 4) {
        document.getElementById("EvaluateButton").style.display = "block";
      }
    }
    else { /*No need to do stuff*/ }
  }
}

//Evaluate guess
function EvalGuess() {
  var piecesChecked = 1, thisColumn = 0;
  piecesPlacedInThisRow = 0;
  document.getElementById("EvaluateButton").style.display = "none";
  
  while (piecesChecked < 5) {
    if (compSeries[piecesChecked - 1] == document.getElementById(currentColumn + "," + piecesChecked).getAttribute("data-colour")) {
      thisColumn++;
      document.getElementById("Mark-" + currentColumn + "," + piecesChecked).setAttribute("fill", "red");
      
      if (thisColumn == 4) {
        document.getElementById("GameStatus").innerHTML = "You win!";
      }
    }
    else {
      thisColumn = 0;
      document.getElementById("Mark-" + currentColumn + "," + piecesChecked).setAttribute("fill", "yellow");
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
  compSeries = [Math.floor((Math.random() * 6)), Math.floor((Math.random() * 6)), Math.floor((Math.random() * 6)), Math.floor((Math.random() * 6))];
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
    blankSpaces = "<circle id='Mark-" + rowsRendered + ",1' cx='" + (100 + (rowsRendered * 100)) + "' r='15' cy='400' fill='lightgrey' />";
    document.getElementById("Board-ComputerMarkingPieces").innerHTML = document.getElementById("Board-ComputerMarkingPieces").innerHTML + blankSpaces;
    
    blankSpaces = "<circle id='Mark-" + rowsRendered + ",2' cx='" + (100 + (rowsRendered * 100)) + "' r='15' cy='340' fill='lightgrey' />";
    document.getElementById("Board-ComputerMarkingPieces").innerHTML = document.getElementById("Board-ComputerMarkingPieces").innerHTML + blankSpaces;
    
    blankSpaces = "<circle id='Mark-" + rowsRendered + ",3' cx='" + (100 + (rowsRendered * 100)) + "' r='15' cy='280' fill='lightgrey' />";
    document.getElementById("Board-ComputerMarkingPieces").innerHTML = document.getElementById("Board-ComputerMarkingPieces").innerHTML + blankSpaces;
    
    blankSpaces = "<circle id='Mark-" + rowsRendered + ",4' cx='" + (100 + (rowsRendered * 100)) + "' r='15' cy='220' fill='lightgrey' />";
    document.getElementById("Board-ComputerMarkingPieces").innerHTML = document.getElementById("Board-ComputerMarkingPieces").innerHTML + blankSpaces;
  }
}
