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
        column.appendChild(square);
    }

    boardFragment.appendChild(column);
}

chessboard.appendChild(boardFragment);
chessboard.classList.add("chessboard");
gameContainer.appendChild(chessboard);
