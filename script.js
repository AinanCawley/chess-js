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

//DOM STUFF

const gameContainer = document.getElementById("gameContainer")
const chessboard = document.createElement('div');
const boardFragment = document.createDocumentFragment();

for( let i = 0; i < 8; i++ )
{
    let column = document.createElement("div");
    column.classList.add("chessboardColumn");
    for( let j = 0; j < 8; j++ )
    {
        let square = document.createElement('div');
        square.classList.add("chessboardSquare");

        square.setAttribute("id", numberToLetter(i) + "" + (8-j) );
        //^^To give each square its standard coordinate name as id

        square.innerText = square.id; //FOR CHECKING PURPOSES

        column.appendChild(square);
    }

    boardFragment.appendChild(column);
}

chessboard.appendChild(boardFragment);
chessboard.classList.add("chessboard");
gameContainer.appendChild(chessboard);
