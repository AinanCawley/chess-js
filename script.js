// ENGINE STUFF

let engineConventionalBoard =  [["","","","","","","",""],
                                ["","","","","","","",""],
                                ["","","","","","","",""],
                                ["","","","","","","",""],
                                ["","","","","","","",""],
                                ["","","","","","","",""],
                                ["","","","","","","",""],
                                ["","","","","","","",""]];
let engineFEN = "";


const fenToConventionalBoard = function(fenString)
{
    let conventionalBoardArray =   [["","","","","","","",""],
                                    ["","","","","","","",""],
                                    ["","","","","","","",""],
                                    ["","","","","","","",""],
                                    ["","","","","","","",""],
                                    ["","","","","","","",""],
                                    ["","","","","","","",""],
                                    ["","","","","","","",""]];

    fenString = fenString.slice(0,(fenString.indexOf(" ")));
    //^^ Remove anything that isn't purely where pieces are

    let fenArray = Array.from(fenString);
    let currentRank = 0;
    let currentFile = 0;
    
    fenArray.forEach(function(element,index)
    {
        if( isNaN(Number(fenArray[index])) )
        {
            if(element=="/")
            {
                currentRank++; // we're going to the next rank
                currentFile = 0; // and starting from the first file of this next rank
            }
            else
            {
                if(element=="P")
                {  
                    conventionalBoardArray[currentRank][currentFile] = "P";
                    currentFile++;
                }
                if(element=="p")
                {
                    conventionalBoardArray[currentRank][currentFile] = "p";
                    currentFile++;
                }
                if(element=="N")
                {
                    conventionalBoardArray[currentRank][currentFile] = "N";
                    currentFile++;
                }
                if(element=="n")
                {
                    conventionalBoardArray[currentRank][currentFile] = "n";
                    currentFile++;
                }
                if(element=="B")
                {
                    conventionalBoardArray[currentRank][currentFile] = "B";
                    currentFile++;
                }
                if(element=="b")
                {
                    conventionalBoardArray[currentRank][currentFile] = "b";
                    currentFile++;
                }
                if(element=="R")
                {
                    conventionalBoardArray[currentRank][currentFile] = "R";
                    currentFile++;
                }
                if(element=="r")
                {
                    conventionalBoardArray[currentRank][currentFile] = "r";
                    currentFile++;
                }
                if(element=="Q")
                {
                    conventionalBoardArray[currentRank][currentFile] = "Q";
                    currentFile++;
                }
                if(element=="q")
                {
                    conventionalBoardArray[currentRank][currentFile] = "q";
                    currentFile++;
                }
                if(element=="K")
                {
                    conventionalBoardArray[currentRank][currentFile] = "K";
                    currentFile++;
                }
                if(element=="k")
                {
                    conventionalBoardArray[currentRank][currentFile] = "k";
                    currentFile++;
                }
            }
        }
        else
        {
            fenArray[index] = Number(fenArray[index]); // coerce the string to number so that the next line of code works
            currentFile += fenArray[index]; 
        }
    });

    return conventionalBoardArray;
}

const legalMovesFromConventionalBoard = function(conventionalBoardArray)
{ // TODO: everything
    return arrayOfLegalMoves;
}

const pseudolegalMovesFromConventionalBoard = function(conventionalBoardArray)
{ // TODO: everything
    return arrayOfPseudoLegalMoves;
}

const isTheSideNotToMoveInCheckChecker = function(conventionalBoardArray, booleanToMove)
{ // TODO: everything
    if( booleanToMove==true )
    { // ^^This means White to move, so check if Black is in check
        let blackKingCoordinates = findCoordinatesOfKing(conventionalBoardArray,false);

    }

    return Boolean;
}

const createCoordinatesKnightAttack = function(coordinateArray)
{ // Takes in an array with two values: rank, file (conventional board)
    let arrayOfCoordinates = [];

    if(coordinateArray[0]>1)
    {
        if(coordinateArray[1]>0)
        {
            arrayOfCoordinates.push([(coordinateArray[0]-2),(coordinateArray[1]-1)]);
        }
        if(coordinateArray[1]<7)
        {
            arrayOfCoordinates.push([(coordinateArray[0]-2),(coordinateArray[1]+1)]);
        }
    }
    if(coordinateArray[0]<6)
    {
        if(coordinateArray[1]>0)
        {
            arrayOfCoordinates.push([(coordinateArray[0]+2),(coordinateArray[1]-1)]);
        }
        if(coordinateArray[1]<7)
        {
            arrayOfCoordinates.push([(coordinateArray[0]+2),(coordinateArray[1]+1)]);
        }
    }
    if(coordinateArray[1]<6)
    {
        if(coordinateArray[0]>0)
        {
            arrayOfCoordinates.push([(coordinateArray[0]-1),(coordinateArray[1]+2)]);
        }
        if(coordinateArray[0]<7)
        {
            arrayOfCoordinates.push([(coordinateArray[0]+1),(coordinateArray[1]+2)]);
        }
    }
    if(coordinateArray[1]>1)
    {
        if(coordinateArray[0]>0)
        {
            arrayOfCoordinates.push([(coordinateArray[0]-1),(coordinateArray[1]-2)]);
        }
        if(coordinateArray[0]<7)
        {
            arrayOfCoordinates.push([(coordinateArray[0]+1),(coordinateArray[1]-2)]);
        }
    }
    // vv outputs an array of arrays. Inner arrays are of the same format as the input array
    return arrayOfCoordinates; 
}

const findCoordinatesOfKing = function(conventionalBoardArray, booleanToMove)
{ // True is White, False is Black
    let arrayOfTwoNumbers = [0,0];

    if( booleanToMove == true )
    { // ^^If looking for the White King...
        for( let i = 7; i > -1; i-- )
        {
            for( let j = 7; j > -1; j-- )
            {
                if( conventionalBoardArray[i][j] == "K" )
                { // ...search for the White King...
                    arrayOfTwoNumbers[0] = i;
                    arrayOfTwoNumbers[1] = j;
                    break;
                }
            }
        }
    }
    else
    { // ^^...otherwise...
        for( let i = 0; i < 8; i++ )
        {
            for( let j = 0; j < 8; j++ )
            {
                if( conventionalBoardArray[i][j] == "k" )
                { // ...search for the Black King
                    arrayOfTwoNumbers[0] = i;
                    arrayOfTwoNumbers[1] = j;
                    break;
                }
            }
        }
    }

    return arrayOfTwoNumbers;
}

const conventionalBoardProcessMove = function(conventionalBoardArray, moveString)
{ // this assumes the move given is legal and executes it
    let startSquare = moveString.slice(0,2);
    let endSquare = moveString.slice(2);

    if((conventionalBoardArray[(8-(Number(startSquare.slice(1))))][(letterToNumber(startSquare.slice(0,1)))])=="P")
    { // ^^ If a White pawn move...
        if((8-(Number(endSquare.slice(1))))==2)
        { // ...goes to the 6th rank...
            if(conventionalBoardArray[(8-(Number(endSquare.slice(1))))][(letterToNumber(endSquare.slice(0,1)))]=="")
            {  // ...and goes to a square that was already empty...
                if(startSquare.slice(0,1) != endSquare.slice(0,1))
                { // and is a diagonal pawn move... then it's an en passant and the opponent pawn must be removed
                    conventionalBoardArray[3][(letterToNumber(endSquare.slice(0,1)))] = "";
                }
            }
        }
    }
    if((conventionalBoardArray[(8-(Number(startSquare.slice(1))))][(letterToNumber(startSquare.slice(0,1)))])=="p")
    { // ^^ If a Black pawn move...
        if((8-(Number(endSquare.slice(1))))==5)
        { // ...goes to the 3rd rank...
            if(conventionalBoardArray[(8-(Number(endSquare.slice(1))))][(letterToNumber(endSquare.slice(0,1)))]=="")
            {  // ...and goes to a square that was already empty...
                if(startSquare.slice(0,1) != endSquare.slice(0,1))
                { // and is a diagonal pawn move... then it's an en passant and the opponent pawn must be removed
                    conventionalBoardArray[4][(letterToNumber(endSquare.slice(0,1)))] = "";
                }
            }
        }
    }
    

    conventionalBoardArray[(8-(Number(endSquare.slice(1))))][(letterToNumber(endSquare.slice(0,1)))] = 
    conventionalBoardArray[(8-(Number(startSquare.slice(1))))][(letterToNumber(startSquare.slice(0,1)))];
    // ^^The piece moves to the new square

    conventionalBoardArray[(8-(Number(startSquare.slice(1))))][(letterToNumber(startSquare.slice(0,1)))] = "";
    // ^^The square the move leaves from will always be empty after the move is made

    if((conventionalBoardArray[(8-(Number(endSquare.slice(1))))][(letterToNumber(endSquare.slice(0,1)))])=="K")
    { // ^^ If a king move...
        if(startSquare=="e1")
        { // ...that starts on the starting square and goes to a castled square....
            if(endSquare=="g1")
            {
                conventionalBoardArray[7][7] = "";
                conventionalBoardArray[7][5] = "R";
            }
            if(endSquare=="c1")
            {
                conventionalBoardArray[7][0] = "";
                conventionalBoardArray[7][3] = "R";
            }
        }
    } // ^^ Move over White Rook when castling
    if((conventionalBoardArray[(8-(Number(endSquare.slice(1))))][(letterToNumber(endSquare.slice(0,1)))])=="k")
    { // ^^ If a king move...
        if(startSquare=="e8")
        { // ...that starts on the starting square and goes to a castled square....
            if(endSquare=="g8")
            {
                conventionalBoardArray[0][7] = "";
                conventionalBoardArray[0][5] = "r";
            }
            if(endSquare=="c8")
            {
                conventionalBoardArray[0][0] = "";
                conventionalBoardArray[0][3] = "r";
            }
        }
    } // ^^ Move over Black Rook when castling
    

    return conventionalBoardArray;
}

// GUI BACKEND

const letterToNumber = function(letter)
{ // for converting a letter to a number between 0 and 7
    if(letter=="a")
    {
        return 0;
    }
    if(letter=="b")
    {
        return 1;
    }
    if(letter=="c")
    {
        return 2;
    }
    if(letter=="d")
    {
        return 3;
    }
    if(letter=="e")
    {
        return 4;
    }
    if(letter=="f")
    {
        return 5;
    }
    if(letter=="g")
    {
        return 6;
    }
    if(letter=="h")
    {
        return 7;
    }
}

const numberToLetter = function(number)
{ //for converting a number between "0" and "7" to a letter between "a" and "h"
    if(number==0)
    {
        return "a";
    }
    if(number==1)
    {
        return "b";
    }
    if(number==2)
    {
        return "c";
    }
    if(number==3)
    {
        return "d";
    }
    if(number==4)
    {
        return "e";
    }
    if(number==5)
    {
        return "f";
    }
    if(number==6)
    {
        return "g";
    }
    if(number==7)
    {
        return "h";
    }
}

const numberToCoordinate = function(number)
{ //For taking a number between 0 and 63 and turning it into a coordinate. 0 is a8, 7 is h8, 63 is h1.
    return numberToLetter(number % 8) + "" + (8 - Math.floor(number/8));
}

const createWhiteChessboard = function()
{
    let chessboard = document.createElement('div');
    let boardFragment = document.createDocumentFragment();
    
    for( let i = 0; i < 8; i++ ) //This creates a chessboard from WHITE's perspective
    {
        let column = document.createElement("div");
        column.classList.add("chessboardColumn");
        for( let j = 0; j < 8; j++ )
        {
            let square = document.createElement('div');
            square.classList.add("chessboardSquare");
    
            square.setAttribute("id", numberToLetter(i) + "" + (8-j) );
            //^^To give each square its standard coordinate name as id

            if( (i+j)%2==0 )
            {
                square.style.backgroundColor = lightSquareColour;
            }
            else
            {
                square.style.backgroundColor = darkSquareColour;
            }
    
            column.appendChild(square);
        }
    
        boardFragment.appendChild(column);
    }
    chessboard.replaceChildren();
    chessboard.appendChild(boardFragment);
    chessboard.setAttribute("class", "chessboard");
    gameContainer.replaceChildren();
    gameContainer.appendChild(chessboard);

    boardPerspective = true;
}

const createBlackChessboard = function()
{
    let chessboard = document.createElement('div');
    let boardFragment = document.createDocumentFragment();
    
    for( let i = 0; i < 8; i++ ) //This creates a chessboard from BLACK's perspective
    {
        let column = document.createElement("div");
        column.classList.add("chessboardColumn");
        for( let j = 0; j < 8; j++ )
        {
            let square = document.createElement('div');
            square.classList.add("chessboardSquare");
    
            square.setAttribute("id", numberToLetter(7-i) + "" + (j+1) );
            //^^To give each square its standard coordinate name as id

            if( (i+j)%2==0 )
            {
                square.style.backgroundColor = lightSquareColour;
            }
            else
            {
                square.style.backgroundColor = darkSquareColour;
            }
    
            column.appendChild(square);
        }
    
        boardFragment.appendChild(column);
    }
    chessboard.replaceChildren();
    chessboard.appendChild(boardFragment);
    chessboard.setAttribute("class", "chessboard");
    gameContainer.replaceChildren();
    gameContainer.appendChild(chessboard);

    boardPerspective = false;
}

const loadPosition = function(fenString)
{
    currentFEN = fenString;

    let fenSlice = fenString.slice(fenString.indexOf(" ") + 1);
    if( fenSlice.slice(0,1) == "w")
    {
        sideToMove = true; // white to move
    }
    else
    {
        sideToMove = false; // black to move
    }

    fenSlice = fenSlice.slice(fenSlice.indexOf(" ") + 1);
    fullMoveNumber = fenSlice.slice(-1);
    fenSlice = fenSlice.slice(0,-2);
    halfMoveClock = fenSlice.slice(-1);
    fenSlice = fenSlice.slice(0,-2);
    enPassantSquare = fenSlice.slice(fenSlice.indexOf(" ") + 1); // will be "-" if no en passant square
    fenSlice = fenSlice.slice(0,fenSlice.indexOf(" "));

    whiteCastleKingside = false;    //
    whiteCastleQueenside = false;   // Set all to false so that later so that... 
    blackCastleKingside = false;    // ...only the true values need to be changed to true
    blackCastleQueenside = false;   //
    if( fenSlice.includes("-") == true )
    {
        // Do nothing as all the castling values are already false
    }
    else
    {
        if( fenSlice.includes("K"))
        {
            whiteCastleKingside = true;
        }
        if( fenSlice.includes("Q"))
        {
            whiteCastleQueenside = true;
        }
        if( fenSlice.includes("k"))
        {
            blackCastleKingside = true;
        }
        if( fenSlice.includes("q"))
        {
            blackCastleQueenside = true;
        }
    }

    gameHistoryArray = []; // start anew
    gameHistoryArray.push(fenString);


    if(boardPerspective=="white")
    { //To remove all previous piece classes from the board and to start anew
        createWhiteChessboard(); 
    }
    if(boardPerspective=="black")
    { //To remove all previous piece classes from the board and to start anew
        createBlackChessboard();
    }

    fenString = fenString.slice(0,(fenString.indexOf(" ")));
    //^^ Remove anything that isn't purely where pieces are

    let fenArray = Array.from(fenString);
    let currentSquare = 0;
    
    fenArray.forEach(function(element,index)
    {
        if( isNaN(Number(fenArray[index])) )
        {
            if(element=="/")
            {
                //Do nothing with slashes
            }
            else
            {
                if(element=="P")
                {
                    document.getElementById(numberToCoordinate(currentSquare)).classList.add("whitePawn");
                    currentSquare++;
                }
                if(element=="p")
                {
                    document.getElementById(numberToCoordinate(currentSquare)).classList.add("blackPawn");
                    currentSquare++;
                }
                if(element=="N")
                {
                    document.getElementById(numberToCoordinate(currentSquare)).classList.add("whiteKnight");
                    currentSquare++;
                }
                if(element=="n")
                {
                    document.getElementById(numberToCoordinate(currentSquare)).classList.add("blackKnight");
                    currentSquare++;
                }
                if(element=="B")
                {
                    document.getElementById(numberToCoordinate(currentSquare)).classList.add("whiteBishop");
                    currentSquare++;
                }
                if(element=="b")
                {
                    document.getElementById(numberToCoordinate(currentSquare)).classList.add("blackBishop");
                    currentSquare++;
                }
                if(element=="R")
                {
                    document.getElementById(numberToCoordinate(currentSquare)).classList.add("whiteRook");
                    currentSquare++;
                }
                if(element=="r")
                {
                    document.getElementById(numberToCoordinate(currentSquare)).classList.add("blackRook");
                    currentSquare++;
                }
                if(element=="Q")
                {
                    document.getElementById(numberToCoordinate(currentSquare)).classList.add("whiteQueen");
                    currentSquare++;
                }
                if(element=="q")
                {
                    document.getElementById(numberToCoordinate(currentSquare)).classList.add("blackQueen");
                    currentSquare++;
                }
                if(element=="K")
                {
                    document.getElementById(numberToCoordinate(currentSquare)).classList.add("whiteKing");
                    currentSquare++;
                }
                if(element=="k")
                {
                    document.getElementById(numberToCoordinate(currentSquare)).classList.add("blackKing");
                    currentSquare++;
                }
            }
        }
        else
        {
            fenArray[index] = Number(fenArray[index]); // coerce the string to number so that the next line of code works
            currentSquare += fenArray[index]; 
        }
    });

    updateVisuals();
}

const updateVisuals = function()
{
    let whitePawns = document.querySelectorAll(".whitePawn");
    whitePawns.forEach(function(piece)
    {
        piece.innerText = "\u2659";
    });
    let blackPawns = document.querySelectorAll(".blackPawn");
    blackPawns.forEach(function(piece)
    {
        piece.innerText = "\u265F";
    });
    let whiteKnight = document.querySelectorAll(".whiteKnight");
    whiteKnight.forEach(function(piece)
    {
        piece.innerText = "\u2658";
    });
    let blackKnights = document.querySelectorAll(".blackKnight");
    blackKnights.forEach(function(piece)
    {
        piece.innerText = "\u265E";
    });
    let whiteBishops = document.querySelectorAll(".whiteBishop");
    whiteBishops.forEach(function(piece)
    {
        piece.innerText = "\u2657";
    });
    let blackBishops = document.querySelectorAll(".blackBishop");
    blackBishops.forEach(function(piece)
    {
        piece.innerText = "\u265D";
    });
    let whiteRooks = document.querySelectorAll(".whiteRook");
    whiteRooks.forEach(function(piece)
    {
        piece.innerText = "\u2656";
    });
    let blackRooks = document.querySelectorAll(".blackRook");
    blackRooks.forEach(function(piece)
    {
        piece.innerText = "\u265C";
    });
    let whiteQueens = document.querySelectorAll(".whiteQueen");
    whiteQueens.forEach(function(piece)
    {
        piece.innerText = "\u2655";
    });
    let blackQueens = document.querySelectorAll(".blackQueen");
    blackQueens.forEach(function(piece)
    {
        piece.innerText = "\u265B";
    });
    let whiteKings = document.querySelectorAll(".whiteKing");
    whiteKings.forEach(function(piece)
    {
        piece.innerText = "\u2654";
    });
    let blackKings = document.querySelectorAll(".blackKing");
    blackKings.forEach(function(piece)
    {
        piece.innerText = "\u265A";
    });
}

const guiProcessMove = function(moveString) // will check if move is legal before changing anything
{ // move is in long algebraic notation. For example: "e2e4" or "g1f3"

    // TODO: everything
    updateVisuals();
}

//Game state STUFF

let currentFEN = ""; // current board position represented in FEN
let boardPerspective = true; // true for white and false for black
let sideToMove = true;       // true for white and false for black
let whiteCastleKingside = false;  //
let whiteCastleQueenside = false; // true for castling rights in that direction
let blackCastleKingside = false;  // false for no castling rights in that direction
let blackCastleQueenside = false; //
let enPassantSquare = ""; // the coordinate behind a pawn that was pushed 2 squares. For en passant moves. Will be "-" for null
let halfMoveClock = ""; // number of halfmoves (plies) since a capture or a pawn move was made. For the 50-move draw rule.
let fullMoveNumber = ""; // number of fullmoves. Increments after every Black turn. Starts at 1.
let gameHistoryArray = []; // array of FENs to keep track of repetition. For the draw by repetition rule.

//DOM STUFF

const gameContainer = document.getElementById("gameContainer")

//VISUAL STUFF

let lightSquareColour = "hsl(80, 50%, 80%)";
let darkSquareColour = "hsl(110, 50%, 50%)";