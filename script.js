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
}

const loadPosition = function(fenString)
{
    //TODO: save other board state features like E.P. square, castling rights, side to move 

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
            fenArray[index] = Number(fenArray[index]);
            currentSquare += fenArray[index]; 
        }
    });
}

//Board state STUFF

let currentFEN = "";

//DOM STUFF

const gameContainer = document.getElementById("gameContainer")

//VISUAL STUFF

const lightSquareColour = "hsl(80, 50%, 70%)";
const darkSquareColour = "hsl(110, 50%, 40%)";