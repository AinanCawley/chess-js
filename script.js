// Perf test

// TODO

// ENGINE STUFF

let engineBoard = 
{
    board: [["","","","","","","",""],
            ["","","","","","","",""],
            ["","","","","","","",""],
            ["","","","","","","",""],
            ["","","","","","","",""],
            ["","","","","","","",""],
            ["","","","","","","",""],
            ["","","","","","","",""]],
    
    sideToMove: true, // true for White, false for Black
    enPassantSquare: "",
    castlingRights: [true,true,true,true], // White Kingside, White Queenside, Black Kingside, Black Queenside
}; // TODO: make functions implement this engineBoard object instead.

let engineConventionalBoard =  [["","","","","","","",""],
                                ["","","","","","","",""],
                                ["","","","","","","",""],
                                ["","","","","","","",""],
                                ["","","","","","","",""],
                                ["","","","","","","",""],
                                ["","","","","","","",""],
                                ["","","","","","","",""]];
let engineFEN = "";
let engineSideToMove = true;
let engineEnpassantSquare = "";
let engineCastlingRights = [true,true,true,true]; // White Kingside, White Queenside, Black Kingside, Black Queenside

// Might just make all these declarations within an engine function that takes in a FEN and outputs the move string 


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

const legalMovesFromConventionalBoard = function(conventionalBoardArray, booleanToMove, castlingRights, enpassantSquare)
{
    let arrayOfPseudoLegalMoves = pseudolegalMovesFromConventionalBoard(
                                    conventionalBoardArray,booleanToMove,castlingRights,enpassantSquare);
    let arrayOfLegalMoves = arrayOfPseudoLegalMoves.filter(function(element)
    {
        let newBoard = conventionalBoardProcessMove(conventionalBoardArray,element);
        return  !(isTheSideNotToMoveInCheckChecker(newBoard,!(booleanToMove)));
    });
    return arrayOfLegalMoves;
}

const pseudolegalMovesFromConventionalBoard = function(conventionalBoardArray, booleanToMove, castlingRights, enpassantSquare)
{
    let arrayOfChecks = [];
    let arrayOfCaptures = [];
    let arrayOfSpecialMoves = []; // for promotion and castling
    let arrayOfOtherMoves = [];
    // ^ This will be primitive move-ordering to help the alpha-beta search

    if( booleanToMove==true )
    { // White to move
        for( let i = 7; i > -1; i-- )
        {
            for( let j = 7; j > -1; j-- )
            { // i and j stand for rank and file 
                if( conventionalBoardArray[i][j]=="Q" )
                {
                    for( let k = 1; k < 8; k++ )
                    { // SouthEast direction
                        if( (i+k < 8) && (j+k < 8) )
                        {
                            if( conventionalBoardArray[i+k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j+k) + (8-(i+k));
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i+k][j+k] == conventionalBoardArray[i+k][j+k].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j+k) + (8-(i+k));
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // NorthWest direction
                        if( (i-k > -1) && (j-k > -1) )
                        {
                            if( conventionalBoardArray[i-k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j-k) + (8-(i-k));
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i-k][j-k] == conventionalBoardArray[i-k][j-k].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j-k) + (8-(i-k));
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // NorthEast direction
                        if( (i-k > -1) && (j+k < 8) )
                        {
                            if( conventionalBoardArray[i-k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j+k) + (8-(i-k));
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i-k][j+k] == conventionalBoardArray[i-k][j+k].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j+k) + (8-(i-k));
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // SouthWest direction
                        if( (i+k < 8) && (j-k > -1) )
                        {
                            if( conventionalBoardArray[i+k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j-k) + (8-(i+k));
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i+k][j-k] == conventionalBoardArray[i+k][j-k].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j-k) + (8-(i+k));
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // South direction
                        if( i+k < 8 )
                        {
                            if( conventionalBoardArray[i+k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j) + (8-(i+k));
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i+k][j] == conventionalBoardArray[i+k][j].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j) + (8-(i+k));
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // North direction
                        if( i-k > -1 )
                        {
                            if( conventionalBoardArray[i-k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j) + (8-(i-k));
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i-k][j] == conventionalBoardArray[i-k][j].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j) + (8-(i-k));
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // West direction
                        if( j-k > -1 )
                        {
                            if( conventionalBoardArray[i][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j-k)) + (8-i);
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i][j-k] == conventionalBoardArray[i][j-k].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter((j-k)) + (8-i);
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // East direction
                        if( j+k < 8 )
                        {
                            if( conventionalBoardArray[i][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j+k)) + (8-i);
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i][j+k] == conventionalBoardArray[i][j+k].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter((j+k)) + (8-i);
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                }
                if( conventionalBoardArray[i][j]=="R" )
                {
                    for( let k = 1; k < 8; k++ )
                    { // South direction
                        if( i+k < 8 )
                        {
                            if( conventionalBoardArray[i+k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j) + (8-(i+k));
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i+k][j] == conventionalBoardArray[i+k][j].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j) + (8-(i+k));
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // North direction
                        if( i-k > -1 )
                        {
                            if( conventionalBoardArray[i-k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j) + (8-(i-k));
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i-k][j] == conventionalBoardArray[i-k][j].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j) + (8-(i-k));
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // West direction
                        if( j-k > -1 )
                        {
                            if( conventionalBoardArray[i][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j-k)) + (8-i);
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i][j-k] == conventionalBoardArray[i][j-k].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter((j-k)) + (8-i);
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // East direction
                        if( j+k < 8 )
                        {
                            if( conventionalBoardArray[i][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j+k)) + (8-i);
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i][j+k] == conventionalBoardArray[i][j+k].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter((j+k)) + (8-i);
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                }
                if( conventionalBoardArray[i][j]=="B" )
                {
                    for( let k = 1; k < 8; k++ )
                    { // SouthEast direction
                        if( (i+k < 8) && (j+k < 8) )
                        {
                            if( conventionalBoardArray[i+k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j+k) + (8-(i+k));
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i+k][j+k] == conventionalBoardArray[i+k][j+k].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j+k) + (8-(i+k));
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // NorthWest direction
                        if( (i-k > -1) && (j-k > -1) )
                        {
                            if( conventionalBoardArray[i-k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j-k) + (8-(i-k));
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i-k][j-k] == conventionalBoardArray[i-k][j-k].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j-k) + (8-(i-k));
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // NorthEast direction
                        if( (i-k > -1) && (j+k < 8) )
                        {
                            if( conventionalBoardArray[i-k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j+k) + (8-(i-k));
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i-k][j+k] == conventionalBoardArray[i-k][j+k].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j+k) + (8-(i-k));
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // SouthWest direction
                        if( (i+k < 8) && (j-k > -1) )
                        {
                            if( conventionalBoardArray[i+k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j-k) + (8-(i+k));
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i+k][j-k] == conventionalBoardArray[i+k][j-k].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j-k) + (8-(i+k));
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                }
                if( conventionalBoardArray[i][j]=="N" )
                {   
                    let knightSquares = createCoordinatesKnightAttack([i,j]);

                    for( let k = 0; k < knightSquares.length; k++ )
                    {
                        let m = knightSquares[k][0]; // m is rank of a Knight move
                        let n = knightSquares[k][1]; // n is file of a Knight move

                        if( conventionalBoardArray[m][n] == "" )
                        { // empty square (move is possible)
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter(n) + (8-m);
                            let move = startSquare + endSquare;

                            if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                            {   // if true then the move gives check
                                arrayOfChecks.push(move);
                            }
                            else
                            {
                                arrayOfOtherMoves.push(move);
                            }
                        }
                        else
                        {
                            if( conventionalBoardArray[m][n] == conventionalBoardArray[m][n].toLowerCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(n) + (8-m);
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                    }
                }
                if( conventionalBoardArray[i][j]=="P" )
                {
                    if( i == 3 )
                    { // White en passant is only possible if the pawn is on the 5th rank
                        if( enpassantSquare != "" )
                        { // if there even is an enpassant square to consider
                            let passantJ = letterToNumber(enpassantSquare.slice(0,1));

                            if( ((Number(passantJ) - j) == 1) || ((Number(passantJ) - j) == -1) )
                            { // if the currently checked pawn is 1 file away from the enpassant square
                                let startSquare = numberToLetter(j) + (8-i);
                                let move = startSquare + enpassantSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfCaptures.push(move);
                                }
                            }
                        }
                    }
                    if( i-1 > -1 )
                    {
                        if( conventionalBoardArray[i-1][j]=="" )
                        { // square in front of pawn is empty so it can be pushed
                            if( i == 1 )
                            { // means this pawn push will be to promote
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j) + (8-(i-1));
                                let moveArray = [(startSquare + endSquare + "Q"),
                                                 (startSquare + endSquare + "R"),
                                                 (startSquare + endSquare + "N"),
                                                 (startSquare + endSquare + "B")];
                                
                                for( let x = 0; x < 4; x++ )
                                {
                                    if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,moveArray[x]),true))
                                    {   // if true then the move gives check
                                        arrayOfChecks.unshift(moveArray[x]); // unshift since promotion is probably better than usual checks
                                    }
                                    else
                                    {
                                        arrayOfSpecialMoves.unshift(moveArray[x]); // unshift since promotion is probably better than castling
                                    }
                                }
                            }
                            else
                            {
                                if( i == 6 )
                                { // pawn is on its starting rank
                                    if( conventionalBoardArray[4][j]=="" )
                                    {
                                        let startSquare = numberToLetter(j) + "2";
                                        let endSquare = numberToLetter(j) + "4";
                                        let move = startSquare + endSquare;
    
                                        if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                        {   // if true then the move gives check
                                           arrayOfChecks.push(move);
                                        }
                                        else
                                        {
                                            arrayOfOtherMoves.push(move);
                                        }
                                    }
                                }
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j) + (8-(i-1));
                                let move = startSquare + endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                        }

                        if( j+1 < 8 )
                        { // pawn attack to the east
                            if( i == 1 )
                            {
                                if( (conventionalBoardArray[i-1][j+1] == conventionalBoardArray[i-1][j+1].toLowerCase()) 
                                && (conventionalBoardArray[i-1][j+1] != ""))
                                {
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j+1) + (8-(i-1));
                                    let moveArray = [(startSquare + endSquare + "Q"),
                                                     (startSquare + endSquare + "R"),
                                                     (startSquare + endSquare + "N"),
                                                     (startSquare + endSquare + "B")];

                                    for( let x = 0; x < 4; x++ )
                                    {
                                        if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,moveArray[x]),true))
                                        {   // if true then the move gives check
                                            arrayOfChecks.unshift(moveArray[x]); // unshift since promotion is probably better than usual checks
                                        }
                                        else
                                        {
                                            arrayOfCaptures.unshift(moveArray[x]); // unshift since promotion is probably better than usual captures
                                        }
                                    }
                                }
                            }
                            else
                            {
                                if( (conventionalBoardArray[i-1][j+1] == conventionalBoardArray[i-1][j+1].toLowerCase()) 
                                && (conventionalBoardArray[i-1][j+1] != ""))
                                { // means a capture is possible
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j+1) + (8-(i-1));
                                    let move = startSquare + endSquare;

                                    if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                    {   // if true then the move gives check
                                        arrayOfChecks.push(move);
                                    }
                                    else
                                    {
                                        arrayOfCaptures.unshift(move); // unshift because pawn captures are usually better
                                    }
                                }
                            }
                        }
                        if( j-1 > -1 )
                        { // pawn attack to the west
                            if( i == 1 )
                            {
                                if( (conventionalBoardArray[i-1][j-1] == conventionalBoardArray[i-1][j-1].toLowerCase()) 
                                && (conventionalBoardArray[i-1][j-1] != ""))
                                {
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j-1) + (8-(i-1));
                                    let moveArray = [(startSquare + endSquare + "Q"),
                                                     (startSquare + endSquare + "R"),
                                                     (startSquare + endSquare + "N"),
                                                     (startSquare + endSquare + "B")];

                                    for( let x = 0; x < 4; x++ )
                                    {
                                        if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,moveArray[x]),true))
                                        {   // if true then the move gives check
                                            arrayOfChecks.unshift(moveArray[x]); // unshift since promotion is probably better than usual checks
                                        }
                                        else
                                        {
                                            arrayOfCaptures.unshift(moveArray[x]); // unshift since promotion is probably better than usual captures
                                        }
                                    }
                                }
                            }
                            else
                            {
                                if( (conventionalBoardArray[i-1][j-1] == conventionalBoardArray[i-1][j-1].toLowerCase()) 
                                && (conventionalBoardArray[i-1][j-1] != ""))
                                { // means a capture is possible
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j-1) + (8-(i-1));
                                    let move = startSquare + endSquare;

                                    if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                    {   // if true then the move gives check
                                        arrayOfChecks.push(move);
                                    }
                                    else
                                    {
                                        arrayOfCaptures.unshift(move); // unshift because pawn captures are usually better
                                    }
                                }
                            }
                        }
                    }
                }
                if( conventionalBoardArray[i][j]=="K" )
                {
                    if( castlingRights[0] == true )
                    { // White can castle Kingside
                        if((conventionalBoardArray[7][7] == "R") && ((i==7) && (j==4)))
                        {
                            arrayOfSpecialMoves.push("e1g1");
                        }
                    }
                    if( castlingRights[1] == true )
                    { // White can castle Queenside
                        if((conventionalBoardArray[7][0] == "R") && ((i==7) && (j==4)))
                        {
                            arrayOfSpecialMoves.push("e1c1");
                        }
                    }

                    if( i+1 < 8 )
                    { // South direction
                        if( conventionalBoardArray[i+1][j]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter(j) + (8-(i+1));

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( conventionalBoardArray[i+1][j] == conventionalBoardArray[i+1][j].toLowerCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j) + (8-(i+1));
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                    if( i-1 > -1 )
                    { // North direction
                        if( conventionalBoardArray[i-1][j]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter(j) + (8-(i-1));

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( conventionalBoardArray[i-1][j] == conventionalBoardArray[i-1][j].toLowerCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j) + (8-(i-1));
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                    if( j+1 < 8 )
                    { // East direction
                        if( conventionalBoardArray[i][j+1]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter((j+1)) + (8-i);

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( conventionalBoardArray[i][j+1] == conventionalBoardArray[i][j+1].toLowerCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j+1)) + (8-i);
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                    if( j-1 > -1 )
                    { // West direction
                        if( conventionalBoardArray[i][j-1]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter((j-1)) + (8-i);

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( conventionalBoardArray[i][j-1] == conventionalBoardArray[i][j-1].toLowerCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j-1)) + (8-i);
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                    if( (i+1 < 8) && (j+1 < 8) )
                    { // SouthEast direction
                        if( conventionalBoardArray[i+1][j+1]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter((j+1)) + (8-(i+1));

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( conventionalBoardArray[i+1][j+1] == conventionalBoardArray[i+1][j+1].toLowerCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j+1)) + (8-(i+1));
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                    if( (i-1 > -1) && (j-1 > -1) )
                    { // NorthWest direction
                        if( conventionalBoardArray[i-1][j-1]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter((j-1)) + (8-(i-1));

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( conventionalBoardArray[i-1][j-1] == conventionalBoardArray[i-1][j-1].toLowerCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j-1)) + (8-(i-1));
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                    if( (i+1 < 8) && (j-1 > -1) )
                    { // SouthWest direction
                        if( conventionalBoardArray[i+1][j-1]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter((j-1)) + (8-(i+1));

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( conventionalBoardArray[i+1][j-1] == conventionalBoardArray[i+1][j-1].toLowerCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j-1)) + (8-(i+1));
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                    if( (i-1 > -1) && (j+1 < 8) )
                    { // NorthEast direction
                        if( conventionalBoardArray[i-1][j+1]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter((j+1)) + (8-(i-1));

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( conventionalBoardArray[i-1][j+1] == conventionalBoardArray[i-1][j+1].toLowerCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j+1)) + (8-(i-1));
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                }
            }
        }
    }
    else
    { // Black to move
        for( let i = 0; i < 8; i++ )
        {
            for( let j = 0; j < 8; j++ )
            {
                if( conventionalBoardArray[i][j]=="q" )
                {
                    for( let k = 1; k < 8; k++ )
                    { // SouthEast direction
                        if( (i+k < 8) && (j+k < 8) )
                        {
                            if( conventionalBoardArray[i+k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j+k) + (8-(i+k));
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i+k][j+k] == conventionalBoardArray[i+k][j+k].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j+k) + (8-(i+k));
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // NorthWest direction
                        if( (i-k > -1) && (j-k > -1) )
                        {
                            if( conventionalBoardArray[i-k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j-k) + (8-(i-k));
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i-k][j-k] == conventionalBoardArray[i-k][j-k].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j-k) + (8-(i-k));
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // NorthEast direction
                        if( (i-k > -1) && (j+k < 8) )
                        {
                            if( conventionalBoardArray[i-k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j+k) + (8-(i-k));
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i-k][j+k] == conventionalBoardArray[i-k][j+k].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j+k) + (8-(i-k));
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // SouthWest direction
                        if( (i+k < 8) && (j-k > -1) )
                        {
                            if( conventionalBoardArray[i+k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j-k) + (8-(i+k));
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i+k][j-k] == conventionalBoardArray[i+k][j-k].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j-k) + (8-(i+k));
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // South direction
                        if( i+k < 8 )
                        {
                            if( conventionalBoardArray[i+k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j) + (8-(i+k));
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i+k][j] == conventionalBoardArray[i+k][j].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j) + (8-(i+k));
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // North direction
                        if( i-k > -1 )
                        {
                            if( conventionalBoardArray[i-k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j) + (8-(i-k));
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i-k][j] == conventionalBoardArray[i-k][j].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j) + (8-(i-k));
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // West direction
                        if( j-k > -1 )
                        {
                            if( conventionalBoardArray[i][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j-k)) + (8-i);
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i][j-k] == conventionalBoardArray[i][j-k].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter((j-k)) + (8-i);
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // East direction
                        if( j+k < 8 )
                        {
                            if( conventionalBoardArray[i][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j+k)) + (8-i);
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i][j+k] == conventionalBoardArray[i][j+k].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter((j+k)) + (8-i);
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                }
                if( conventionalBoardArray[i][j]=="r" )
                {
                    for( let k = 1; k < 8; k++ )
                    { // South direction
                        if( i+k < 8 )
                        {
                            if( conventionalBoardArray[i+k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j) + (8-(i+k));
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i+k][j] == conventionalBoardArray[i+k][j].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j) + (8-(i+k));
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // North direction
                        if( i-k > -1 )
                        {
                            if( conventionalBoardArray[i-k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j) + (8-(i-k));
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i-k][j] == conventionalBoardArray[i-k][j].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j) + (8-(i-k));
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // West direction
                        if( j-k > -1 )
                        {
                            if( conventionalBoardArray[i][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j-k)) + (8-i);
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i][j-k] == conventionalBoardArray[i][j-k].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter((j-k)) + (8-i);
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // East direction
                        if( j+k < 8 )
                        {
                            if( conventionalBoardArray[i][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j+k)) + (8-i);
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i][j+k] == conventionalBoardArray[i][j+k].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter((j+k)) + (8-i);
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                }
                if( conventionalBoardArray[i][j]=="b" )
                {
                    for( let k = 1; k < 8; k++ )
                    { // SouthEast direction
                        if( (i+k < 8) && (j+k < 8) )
                        {
                            if( conventionalBoardArray[i+k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j+k) + (8-(i+k));
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i+k][j+k] == conventionalBoardArray[i+k][j+k].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j+k) + (8-(i+k));
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // NorthWest direction
                        if( (i-k > -1) && (j-k > -1) )
                        {
                            if( conventionalBoardArray[i-k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j-k) + (8-(i-k));
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i-k][j-k] == conventionalBoardArray[i-k][j-k].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j-k) + (8-(i-k));
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // NorthEast direction
                        if( (i-k > -1) && (j+k < 8) )
                        {
                            if( conventionalBoardArray[i-k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j+k) + (8-(i-k));
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i-k][j+k] == conventionalBoardArray[i-k][j+k].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j+k) + (8-(i-k));
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // SouthWest direction
                        if( (i+k < 8) && (j-k > -1) )
                        {
                            if( conventionalBoardArray[i+k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j-k) + (8-(i+k));
                                let move = startSquare+endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                            else
                            {
                                if( conventionalBoardArray[i+k][j-k] == conventionalBoardArray[i+k][j-k].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j-k) + (8-(i+k));
                                    arrayOfCaptures.unshift((startSquare+endSquare));
                                    break;
                                }
                            }
                        }
                    }
                }
                if( conventionalBoardArray[i][j]=="n" )
                {   
                    let knightSquares = createCoordinatesKnightAttack([i,j]);

                    for( let k = 0; k < knightSquares.length; k++ )
                    {
                        let m = knightSquares[k][0]; // m is rank of a Knight move
                        let n = knightSquares[k][1]; // n is file of a Knight move

                        if( conventionalBoardArray[m][n] == "" )
                        { // empty square (move is possible)
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter(n) + (8-m);
                            let move = startSquare + endSquare;

                            if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                            {   // if true then the move gives check
                                arrayOfChecks.push(move);
                            }
                            else
                            {
                                arrayOfOtherMoves.push(move);
                            }
                        }
                        else
                        {
                            if( conventionalBoardArray[m][n] == conventionalBoardArray[m][n].toUpperCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(n) + (8-m);
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                    }
                }
                if( conventionalBoardArray[i][j]=="p" )
                {
                    if( i == 4 )
                    { // Black en passant is only possible if the pawn is on the 4th rank
                        if( enpassantSquare != "" )
                        { // if there even is an enpassant square to consider
                            let passantJ = letterToNumber(enpassantSquare.slice(0,1));

                            if( ((Number(passantJ) - j) == 1) || ((Number(passantJ) - j) == -1) )
                            { // if the currently checked pawn is 1 file away from the enpassant square
                                let startSquare = numberToLetter(j) + (8-i);
                                let move = startSquare + enpassantSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfCaptures.push(move);
                                }
                            }
                        }
                    }
                    if( i+1 < 8 )
                    {
                        if( conventionalBoardArray[i+1][j]=="" )
                        { // square in front of pawn is empty so it can be pushed
                            if( i == 6 )
                            { // means this pawn push will be to promote
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j) + (8-(i+1));
                                let moveArray = [(startSquare + endSquare + "Q"),
                                                 (startSquare + endSquare + "R"),
                                                 (startSquare + endSquare + "N"),
                                                 (startSquare + endSquare + "B")];
                                
                                for( let x = 0; x < 4; x++ )
                                {
                                    if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,moveArray[x]),true))
                                    {   // if true then the move gives check
                                        arrayOfChecks.unshift(moveArray[x]); // unshift since promotion is probably better than usual checks
                                    }
                                    else
                                    {
                                        arrayOfSpecialMoves.unshift(moveArray[x]); // unshift since promotion is probably better than castling
                                    }
                                }
                            }
                            else
                            {
                                if( i == 1 )
                                { // pawn is on its starting rank
                                    if( conventionalBoardArray[3][j]=="" )
                                    {
                                        let startSquare = numberToLetter(j) + "7";
                                        let endSquare = numberToLetter(j) + "5";
                                        let move = startSquare + endSquare;
    
                                        if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                        {   // if true then the move gives check
                                           arrayOfChecks.push(move);
                                        }
                                        else
                                        {
                                            arrayOfOtherMoves.push(move);
                                        }
                                    }
                                }
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j) + (8-(i+1));
                                let move = startSquare + endSquare;

                                if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfOtherMoves.push(move);
                                }
                            }
                        }

                        if( j+1 < 8 )
                        { // pawn attack to the east
                            if( i == 6 )
                            {
                                if( (conventionalBoardArray[i+1][j+1] == conventionalBoardArray[i+1][j+1].toUpperCase()) 
                                && (conventionalBoardArray[i+1][j+1] != ""))
                                {
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j+1) + (8-(i+1));
                                    let moveArray = [(startSquare + endSquare + "Q"),
                                                     (startSquare + endSquare + "R"),
                                                     (startSquare + endSquare + "N"),
                                                     (startSquare + endSquare + "B")];

                                    for( let x = 0; x < 4; x++ )
                                    {
                                        if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,moveArray[x]),true))
                                        {   // if true then the move gives check
                                            arrayOfChecks.unshift(moveArray[x]); // unshift since promotion is probably better than usual checks
                                        }
                                        else
                                        {
                                            arrayOfCaptures.unshift(moveArray[x]); // unshift since promotion is probably better than usual captures
                                        }
                                    }
                                }
                            }
                            else
                            {
                                if( (conventionalBoardArray[i+1][j+1] == conventionalBoardArray[i+1][j+1].toUpperCase()) 
                                && (conventionalBoardArray[i+1][j+1] != ""))
                                { // means a capture is possible
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j+1) + (8-(i+1));
                                    let move = startSquare + endSquare;

                                    if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                    {   // if true then the move gives check
                                        arrayOfChecks.push(move);
                                    }
                                    else
                                    {
                                        arrayOfCaptures.unshift(move); // unshift because pawn captures are usually better
                                    }
                                }
                            }
                        }
                        if( j-1 > -1 )
                        { // pawn attack to the west
                            if( i == 6 )
                            {
                                if( (conventionalBoardArray[i+1][j-1] == conventionalBoardArray[i+1][j-1].toUpperCase()) 
                                && (conventionalBoardArray[i+1][j-1] != ""))
                                {
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j-1) + (8-(i+1));
                                    let moveArray = [(startSquare + endSquare + "Q"),
                                                     (startSquare + endSquare + "R"),
                                                     (startSquare + endSquare + "N"),
                                                     (startSquare + endSquare + "B")];

                                    for( let x = 0; x < 4; x++ )
                                    {
                                        if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,moveArray[x]),true))
                                        {   // if true then the move gives check
                                            arrayOfChecks.unshift(moveArray[x]); // unshift since promotion is probably better than usual checks
                                        }
                                        else
                                        {
                                            arrayOfCaptures.unshift(moveArray[x]); // unshift since promotion is probably better than usual captures
                                        }
                                    }
                                }
                            }
                            else
                            {
                                if( (conventionalBoardArray[i+1][j-1] == conventionalBoardArray[i+1][j-1].toUpperCase()) 
                                && (conventionalBoardArray[i+1][j-1] != ""))
                                { // means a capture is possible
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j-1) + (8-(i+1));
                                    let move = startSquare + endSquare;

                                    if( isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(conventionalBoardArray,move),true))
                                    {   // if true then the move gives check
                                        arrayOfChecks.push(move);
                                    }
                                    else
                                    {
                                        arrayOfCaptures.unshift(move); // unshift because pawn captures are usually better
                                    }
                                }
                            }
                        }
                    }
                }
                if( conventionalBoardArray[i][j]=="k" )
                {
                    if( castlingRights[2] == true )
                    { // Black can castle Kingside
                        if((conventionalBoardArray[0][7] == "R") && ((i==0) && (j==4)))
                        {
                            arrayOfSpecialMoves.push("e8g8");
                        }
                    }
                    if( castlingRights[3] == true )
                    { // Black can castle Queenside
                        if((conventionalBoardArray[0][0] == "R") && ((i==0) && (j==4)))
                        {
                            arrayOfSpecialMoves.push("e8c8");
                        }
                    }

                    if( i+1 < 8 )
                    { // South direction
                        if( conventionalBoardArray[i+1][j]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter(j) + (8-(i+1));

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( conventionalBoardArray[i+1][j] == conventionalBoardArray[i+1][j].toUpperCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j) + (8-(i+1));
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                    if( i-1 > -1 )
                    { // North direction
                        if( conventionalBoardArray[i-1][j]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter(j) + (8-(i-1));

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( conventionalBoardArray[i-1][j] == conventionalBoardArray[i-1][j].toUpperCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j) + (8-(i-1));
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                    if( j+1 < 8 )
                    { // East direction
                        if( conventionalBoardArray[i][j+1]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter((j+1)) + (8-i);

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( conventionalBoardArray[i][j+1] == conventionalBoardArray[i][j+1].toUpperCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j+1)) + (8-i);
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                    if( j-1 > -1 )
                    { // West direction
                        if( conventionalBoardArray[i][j-1]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter((j-1)) + (8-i);

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( conventionalBoardArray[i][j-1] == conventionalBoardArray[i][j-1].toUpperCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j-1)) + (8-i);
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                    if( (i+1 < 8) && (j+1 < 8) )
                    { // SouthEast direction
                        if( conventionalBoardArray[i+1][j+1]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter((j+1)) + (8-(i+1));

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( conventionalBoardArray[i+1][j+1] == conventionalBoardArray[i+1][j+1].toUpperCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j+1)) + (8-(i+1));
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                    if( (i-1 > -1) && (j-1 > -1) )
                    { // NorthWest direction
                        if( conventionalBoardArray[i-1][j-1]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter((j-1)) + (8-(i-1));

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( conventionalBoardArray[i-1][j-1] == conventionalBoardArray[i-1][j-1].toUpperCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j-1)) + (8-(i-1));
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                    if( (i+1 < 8) && (j-1 > -1) )
                    { // SouthWest direction
                        if( conventionalBoardArray[i+1][j-1]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter((j-1)) + (8-(i+1));

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( conventionalBoardArray[i+1][j-1] == conventionalBoardArray[i+1][j-1].toUpperCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j-1)) + (8-(i+1));
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                    if( (i-1 > -1) && (j+1 < 8) )
                    { // NorthEast direction
                        if( conventionalBoardArray[i-1][j+1]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter((j+1)) + (8-(i-1));

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( conventionalBoardArray[i-1][j+1] == conventionalBoardArray[i-1][j+1].toUpperCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j+1)) + (8-(i-1));
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                }
            }
        }
    }

    return arrayOfChecks.concat(arrayOfCaptures.concat(arrayOfSpecialMoves,arrayOfOtherMoves));
    // ^^ could instead return a multidimensional array to retain information of what moves are...
    // ...captures, checks, or otherwise
}

const isTheSideNotToMoveInCheckChecker = function(conventionalBoardArray, booleanToMove)
{
    if( booleanToMove==true )
    { // ^^This means White to move, so check if Black's King is in check
        let coordinatesArray = findCoordinatesOfKing(conventionalBoardArray,false);
        for( let i = 1; i < 8; i++ )
        { // Checking for raytracing attacks from the NE direction
            if( (coordinatesArray[0]-i > -1) && (coordinatesArray[1]+i < 8) )
            {
                if( (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "B") ||
                    (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "Q") )
                {
                    return true;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "p") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "n") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "b") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "r") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "q") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "P") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "N") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "R") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "K") )
                {
                    if( i == 1 )
                    {
                        return true;
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }
        for( let i = 1; i < 8; i++ )
        { // Checking for raytracing attacks from the SW direction
            if( (coordinatesArray[0]+i < 8) && (coordinatesArray[1]-i > -1) )
            {
                if( (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "B") ||
                    (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "Q") )
                {
                    return true;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "p") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "n") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "b") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "r") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "q") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "P") )
                {
                    if( i == 1 )
                    { //THIS IS A WHITE PAWN ATTACKING THE BLACK KING!
                        return true;
                    }
                    else
                    {
                        break;
                    }
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "N") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "R") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "K") )
                {
                    if( i == 1 )
                    {
                        return true;
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }
        for( let i = 1; i < 8; i++ )
        { // Checking for raytracing attacks from the NW direction
            if( (coordinatesArray[0]-i > -1) && (coordinatesArray[1]-i > -1) )
            {
                if( (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "B") ||
                    (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "Q") )
                {
                    return true;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "p") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "n") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "b") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "r") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "q") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "P") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "N") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "R") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "K") )
                {
                    if( i == 1 )
                    {
                        return true;
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }
        for( let i = 1; i < 8; i++ )
        { // Checking for raytracing attacks from the SE direction
            if( (coordinatesArray[0]+i < 8) && (coordinatesArray[1]+i < 8) )
            {
                if( (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "B") ||
                    (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "Q") )
                {
                    return true;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "p") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "n") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "b") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "r") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "q") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "P") )
                {
                    if( i == 1 )
                    { // THIS IS A WHITE PAWN ATTACKING THE BLACK KING!
                        return true;
                    }
                    else
                    {
                        break;
                    }
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "N") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "R") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "K") )
                {
                    if( i == 1 )
                    {
                        return true;
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }
        for( let i = 1; i < 8; i++ )
        { // Checking for raytracing attacks from the 9 o clock direction
            if( (coordinatesArray[1]-i) > -1 )
            {
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]-i)] == "Q") ||
                    (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]-i)] == "R"))
                {
                    return true;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]-i)] == "p") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]-i)] == "n") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]-i)] == "b") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]-i)] == "r") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]-i)] == "q") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]-i)] == "P") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]-i)] == "N") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]-i)] == "B") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]-i)] == "K") )
                {
                    if( i == 1 )
                    {
                        return true;
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }
        for( let i = 1; i < 8; i++ )
        { // Checking for raytracing attacks from the 3 o clock direction
            if( (coordinatesArray[1]+i) < 8 )
            {
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]+i)] == "Q") ||
                    (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]+i)] == "R"))
                {
                    return true;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]+i)] == "p") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]+i)] == "n") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]+i)] == "b") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]+i)] == "r") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]+i)] == "q") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]+i)] == "P") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]+i)] == "N") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]+i)] == "B") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]+i)] == "K") )
                {
                    if( i == 1 )
                    {
                        return true;
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }
        for( let i = 1; i < 8; i++ )
        {
            if( (coordinatesArray[0]+i) < 8)
            { // Checking for raytracing attacks from the 6 o clock direction
                if( (conventionalBoardArray[(coordinatesArray[0]+i)][coordinatesArray[1]] == "Q") || 
                    (conventionalBoardArray[(coordinatesArray[0]+i)][coordinatesArray[1]] == "R") )
                {
                    return true;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]+i)][coordinatesArray[1]] == "p") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]+i)][coordinatesArray[1]] == "n") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]+i)][coordinatesArray[1]] == "b") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]+i)][coordinatesArray[1]] == "r") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]+i)][coordinatesArray[1]] == "q") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]+i)][coordinatesArray[1]] == "P") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]+i)][coordinatesArray[1]] == "N") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]+i)][coordinatesArray[1]] == "B") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]+i)][coordinatesArray[1]] == "K") )
                {
                    if( i == 1 )
                    {
                        return true;
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }
        for( let i = 1; i < 8; i++ )
        {
            if( (coordinatesArray[0]-i) > -1)
            { // Checking for raytracing attacks from the 12 o clock direction
                if( (conventionalBoardArray[(coordinatesArray[0]-i)][coordinatesArray[1]] == "Q") || 
                    (conventionalBoardArray[(coordinatesArray[0]-i)][coordinatesArray[1]] == "R") )
                {
                    return true;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]-i)][coordinatesArray[1]] == "p") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]-i)][coordinatesArray[1]] == "n") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]-i)][coordinatesArray[1]] == "b") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]-i)][coordinatesArray[1]] == "r") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]-i)][coordinatesArray[1]] == "q") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]-i)][coordinatesArray[1]] == "P") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]-i)][coordinatesArray[1]] == "N") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]-i)][coordinatesArray[1]] == "B") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]-i)][coordinatesArray[1]] == "K") )
                {
                    if( i == 1 )
                    {
                        return true;
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }
        let coordinatesToSearchForKnights = createCoordinatesKnightAttack(findCoordinatesOfKing(conventionalBoardArray,false));
        
        for( let i = 0; i < coordinatesToSearchForKnights.length; i++ )
        {
            if( conventionalBoardArray[coordinatesToSearchForKnights[i][0]][coordinatesToSearchForKnights[i][1]] == "N" )
            { // ^^ Search for White Knights since we're checking for a Black King
                return true;
            }
        }
    }
    else
    { // ^^ else means Black to move, so check if White's King is in check
        let coordinatesArray = findCoordinatesOfKing(conventionalBoardArray,true);
        for( let i = 1; i < 8; i++ )
        { // Checking for raytracing attacks from the NE direction
            if( (coordinatesArray[0]-i > -1) && (coordinatesArray[1]+i < 8) )
            {
                if( (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "b") ||
                    (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "q") )
                {
                    return true;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "P") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "N") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "B") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "R") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "Q") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "p") )
                {
                    if( i == 1 )
                    { // THIS IS A BLACK PAWN ATTACKING THE WHITE KING!
                        return true;
                    }
                    else
                    {
                        break;
                    }
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "n") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "r") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "k") )
                {
                    if( i == 1 )
                    {
                        return true;
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }
        for( let i = 1; i < 8; i++ )
        { // Checking for raytracing attacks from the SW direction
            if( (coordinatesArray[0]+i < 8) && (coordinatesArray[1]-i > -1) )
            {
                if( (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "b") ||
                    (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "q") )
                {
                    return true;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "P") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "N") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "B") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "R") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "Q") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "p") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "n") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "r") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "k") )
                {
                    if( i == 1 )
                    {
                        return true;
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }
        for( let i = 1; i < 8; i++ )
        { // Checking for raytracing attacks from the NW direction
            if( (coordinatesArray[0]-i > -1) && (coordinatesArray[1]-i > -1) )
            {
                if( (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "b") ||
                    (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "q") )
                {
                    return true;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "P") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "N") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "B") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "R") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "Q") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "p") )
                {
                    if( i == 1 )
                    { // THIS IS A BLACK PAWN ATTACKING THE WHITE KING!
                        return true;
                    }
                    else
                    {
                        break;
                    }
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "n") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "r") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "k") )
                {
                    if( i == 1 )
                    {
                        return true;
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }
        for( let i = 1; i < 8; i++ )
        { // Checking for raytracing attacks from the SE direction
            if( (coordinatesArray[0]+i < 8) && (coordinatesArray[1]+i < 8) )
            {
                if( (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "b") ||
                    (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "q") )
                {
                    return true;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "P") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "N") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "B") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "R") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "Q") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "p") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "n") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "r") )
                {
                    break;
                }
                if(  (conventionalBoardArray[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "k") )
                {
                    if( i == 1 )
                    {
                        return true;
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }
        for( let i = 1; i < 8; i++ )
        { // Checking for raytracing attacks from the 9 o clock direction
            if( (coordinatesArray[1]-i) > -1 )
            {
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]-i)] == "q") ||
                    (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]-i)] == "r"))
                {
                    return true;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]-i)] == "P") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]-i)] == "N") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]-i)] == "B") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]-i)] == "R") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]-i)] == "Q") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]-i)] == "p") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]-i)] == "n") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]-i)] == "b") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]-i)] == "k") )
                {
                    if( i == 1 )
                    {
                        return true;
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }
        for( let i = 1; i < 8; i++ )
        { // Checking for raytracing attacks from the 3 o clock direction
            if( (coordinatesArray[1]+i) < 8 )
            {
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]+i)] == "q") ||
                    (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]+i)] == "r"))
                {
                    return true;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]+i)] == "P") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]+i)] == "N") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]+i)] == "B") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]+i)] == "R") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]+i)] == "Q") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]+i)] == "p") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]+i)] == "n") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]+i)] == "b") )
                {
                    break;
                }
                if( (conventionalBoardArray[coordinatesArray[0]][(coordinatesArray[1]+i)] == "k") )
                {
                    if( i == 1 )
                    {
                        return true;
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }
        for( let i = 1; i < 8; i++ )
        {
            if( (coordinatesArray[0]+i) < 8)
            { // Checking for raytracing attacks from the 6 o clock direction
                if( (conventionalBoardArray[(coordinatesArray[0]+i)][coordinatesArray[1]] == "q") || 
                    (conventionalBoardArray[(coordinatesArray[0]+i)][coordinatesArray[1]] == "r") )
                {
                    return true;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]+i)][coordinatesArray[1]] == "P") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]+i)][coordinatesArray[1]] == "N") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]+i)][coordinatesArray[1]] == "B") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]+i)][coordinatesArray[1]] == "R") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]+i)][coordinatesArray[1]] == "Q") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]+i)][coordinatesArray[1]] == "p") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]+i)][coordinatesArray[1]] == "n") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]+i)][coordinatesArray[1]] == "b") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]+i)][coordinatesArray[1]] == "k") )
                {
                    if( i == 1 )
                    {
                        return true;
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }
        for( let i = 1; i < 8; i++ )
        {
            if( (coordinatesArray[0]-i) > -1)
            { // Checking for raytracing attacks from the 12 o clock direction
                if( (conventionalBoardArray[(coordinatesArray[0]-i)][coordinatesArray[1]] == "q") || 
                    (conventionalBoardArray[(coordinatesArray[0]-i)][coordinatesArray[1]] == "r") )
                {
                    return true;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]-i)][coordinatesArray[1]] == "P") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]-i)][coordinatesArray[1]] == "N") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]-i)][coordinatesArray[1]] == "B") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]-i)][coordinatesArray[1]] == "R") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]-i)][coordinatesArray[1]] == "Q") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]-i)][coordinatesArray[1]] == "p") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]-i)][coordinatesArray[1]] == "n") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]-i)][coordinatesArray[1]] == "b") )
                {
                    break;
                }
                if( (conventionalBoardArray[(coordinatesArray[0]-i)][coordinatesArray[1]] == "k") )
                {
                    if( i == 1 )
                    {
                        return true;
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }
        let coordinatesToSearchForKnights = createCoordinatesKnightAttack(findCoordinatesOfKing(conventionalBoardArray,true));
        
        for( let i = 0; i < coordinatesToSearchForKnights.length; i++ )
        {
            if( conventionalBoardArray[coordinatesToSearchForKnights[i][0]][coordinatesToSearchForKnights[i][1]] == "n" )
            { // ^^ Search for Black Knights since we're checking for a White King
                return true;
            }
        }
    }

    return false;
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

const conventionalBoardProcessMove = function(conventionalBoard, moveString)
{ // this assumes the move given is legal and executes it. TODO: Make this function return enpassant and castling information
    let conventionalBoardArray = copyConventionalBoard(conventionalBoard);
    // ^^ Operate on a copy of the inputted Board so that the inputted board isn't modified
    let startSquare = moveString.slice(0,2);
    let endSquare = moveString.slice(2);
    let promoteToPiece = "";

    if(moveString.length == 5)
    { // ^^ If move is a pawn promoting
        promoteToPiece = endSquare.slice(2);
        endSquare = endSquare.slice(0,2);
    }

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

        promoteToPiece = promoteToPiece.toUpperCase();
        // ^^ So that the promoted piece is White if the pawn promoting is White
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

        promoteToPiece = promoteToPiece.toLowerCase();
        // ^^ So that the promoted piece is Black if the pawn promoting is Black
    }
    
    if(moveString.length == 5)
    { // ^^ If move is a pawn promotion
        conventionalBoardArray[(8-(Number(endSquare.slice(1))))][(letterToNumber(endSquare.slice(0,1)))] = promoteToPiece;
    }
    else
    {
        conventionalBoardArray[(8-(Number(endSquare.slice(1))))][(letterToNumber(endSquare.slice(0,1)))] = 
        conventionalBoardArray[(8-(Number(startSquare.slice(1))))][(letterToNumber(startSquare.slice(0,1)))];
        // ^^The piece moves to the new square
    }
    
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

const copyConventionalBoard = function(multidimensionalArray)
{
    let copy = [["","","","","","","",""],
                ["","","","","","","",""],
                ["","","","","","","",""],
                ["","","","","","","",""],
                ["","","","","","","",""],
                ["","","","","","","",""],
                ["","","","","","","",""],
                ["","","","","","","",""]];
    
    for( let i = 0; i < 8; i++ )
    {
        for( let j = 0; j < 8; j++ )
        {
            copy[i][j] = multidimensionalArray[i][j];
        }
    }
    return copy;
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