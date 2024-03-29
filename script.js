// TODO: handle insufficient material situations
// TODO: improve move-ordering to make AI faster (iterative deepening?)
// TODO: make fenToConventionalBoard handle multiple digit move numbers
// TODO: fix bug where checkmate caused by promotion doesn't show the play again screen
// TODO: make the AI stop repeating positions (recognise a draw by repetition)
// TODO: make move extensions have a limit so that endgames don't crash by infinite recursion.

// AI stuff

const chosenAI = function(fenString,choice)
{
    if( choice == "random" )
    {
        if( checkGameState(currentFEN) )
        {
            let randomMS = Math.floor(Math.random() * 800 );
            randomMS += 200; // Create a random amount of time between 200 and 1000 milliseconds to delay the AI move by
            setTimeout(() =>
            {
                loadPosition(randomAI(fenString));
                highlightLastMove();
                playerTurn = true;
            },randomMS);

            checkGameState(currentFEN); // check the game again since the AI has made a move

            highlightLastMove();
        }
    }
    if( choice == "robot" )
    {
        if( checkGameState(currentFEN) )
        {
            loadPosition(robotAI(fenString));
            playerTurn = true;

            checkGameState(currentFEN); // check the game again since the AI has made a move

            highlightLastMove();
        }
    }
    if( choice == "robotAlphaBeta" )
    {
        if( checkGameState(currentFEN) )
        {
            loadPosition(robotAIAlphaBeta(fenString));
            playerTurn = true;

            checkGameState(currentFEN); // check the game again since the AI has made a move

            highlightLastMove();
        }
    }
    if( choice == "robotAlphaBetaNega" )
    {
        if( checkGameState(currentFEN) )
        {
            loadPosition(robotAIAlphaBetaNega(fenString));
            playerTurn = true;

            checkGameState(currentFEN); // check the game again since the AI has made a move

            highlightLastMove();
        }
    }
    if( choice == "freedom" )
    {
        if( checkGameState(currentFEN) )
        {
            loadPosition(freedomAI(fenString));
            playerTurn = true;

            checkGameState(currentFEN); // check the game again since the AI has made a move

            highlightLastMove();
        }
    }
    if( choice == "hybrid" )
    {
        if( checkGameState(currentFEN) )
        {
            loadPosition(robotAIAlphaBetaNegaHybrid(fenString));
            playerTurn = true;

            checkGameState(currentFEN); // check the game again since the AI has made a move

            highlightLastMove();
        }
    }
    if( choice == "negaExtension" )
    {
        if( checkGameState(currentFEN) )
        {
            loadPosition(robotAIAlphaBetaNegaExtension(fenString));
            playerTurn = true;

            checkGameState(currentFEN); // check the game again since the AI has made a move

            highlightLastMove();
        }
    }
    if( choice == "kingSafe")
    {
        if( checkGameState(currentFEN) )
        {
            if(inBook)
            {
                let bookResult = openingBook();
                if(bookResult == false)
                {
                    loadPosition(robotAIAlphaBetaKingSafe(fenString));
                    playerTurn = true;
        
                    checkGameState(currentFEN); // check the game again since the AI has made a move
        
                    highlightLastMove();

                    inBook = false;
                }
                else
                {
                    let randomMS = Math.random() * 500 + 200;
                    setTimeout(() =>
                    {
                        gameHistoryArray.push(bookResult);
                        loadPosition(boardToFEN(conventionalBoardProcessMove(fenToConventionalBoard(fenString),bookResult)));
                        playerTurn = true;

                        checkGameState(currentFEN); // check the game again since the AI has made a move

                        highlightLastMove();

                        inBook = true;
                    },randomMS);
                }
            }
            else
            {
                loadPosition(robotAIAlphaBetaKingSafe(fenString));
                playerTurn = true;
    
                checkGameState(currentFEN); // check the game again since the AI has made a move
    
                highlightLastMove();
            }
        }
    }
}

const openingBook = function()
{
    let moves = "";

    for(let i = 0; i < gameHistoryArray.length; i++)
    {
        if(i % 2 == 1)
        {
            moves += gameHistoryArray[i] + " ";
        }
        else
        {
            moves += (i/2+1) + ". " + gameHistoryArray[i] + " ";
        }
    }

    // moves will be of the form "1. e2e4 c7c5 2. g1f3 b8c6 " or "1. e2e4 e7e5 2. g1f3 b8c6 3. f1c4 " for example

    if(moves=="")
    {
        let r = Math.random() * 2;
        if( r > 0.9 )
        {
            return "e2e4";
        }
        else
        {
            return "d2d4";
        }
    }
    ////
    if(moves=="1. e2e4 ")
    {
        let r = Math.random() * 2;
        if( r > 0.9 )
        {
            return "e7e5";
        }
        else
        {
            return "c7c5";
        }
    }
    if(moves=="1. d2d4 ")
    {
        let r = Math.random() * 2;
        if( r > 0.9 )
        {
            return "d7d5";
        }
        else
        {
            return "g8f6";
        }
    }
    if(moves=="1. g1f3 ")
    {
        return "d7d5";
    }
    if(moves=="1. c2c4 ")
    {
        return "e7e5";
    }
    if(moves=="1. b2b3 ")
    {
        return "d7d5";
    }
    if(moves=="1. g2g3 ")
    {
        return "d7d5";
    }
    ////
    if(moves=="1. e2e4 e7e5 ")
    {
        return "g1f3";
    }
    if(moves=="1. d2d4 d7d5 ")
    {
        return "c2c4";
    }
    if(moves=="1. d2d4 g8f6 ")
    {
        return "c2c4";
    }
    if(moves=="1. e2e4 e7e6 ")
    {
        return "d2d4";
    }
    if(moves=="1. e2e4 c7c6 ")
    {
        return "d2d4";
    }
    if(moves=="1. e2e4 c7c5 ")
    {
        return "g1f3";
    }
    if(moves=="1. e2e4 b7b6 ")
    {
        return "d2d4";
    }
    if(moves=="1. e2e4 g7g6 ")
    {
        return "d2d4";
    }
    if(moves=="1. e2e4 d7d6 ")
    {
        return "d2d4";
    }
    if(moves=="1. e2e4 g8f6 ")
    {
        return "e4e5";
    }
    if(moves=="1. d2d4 b7b6 ")
    {
        return "c2c4";
    }
    if(moves=="1. d2d4 g7g6 ")
    {
        return "c2c4";
    }
    if(moves=="1. d2d4 d7d6 ")
    {
        return "c2c4";
    }
    ////
    if(moves=="1. e2e4 e7e5 2. g1f3 ")
    {
        return "b8c6";
    }
    if(moves=="1. e2e4 c7c5 2. g1f3 ")
    {
        return "b8c6";
    }
    if(moves=="1. e2e4 e7e5 2. d2d4 ")
    {
        return "e5d4";
    }
    if(moves=="1. e2e4 e7e5 2. f2f4 ")
    {
        return "d7d5";
    }
    if(moves=="1. e2e4 e7e5 2. b1c3 ")
    {
        return "g8f6";
    }
    if(moves=="1. d2d4 d7d5 2. c2c4 ")
    {
        return "e7e6";
    }
    if(moves=="1. d2d4 d7d5 2. g1f3 ")
    {
        return "c7c5";
    }
    if(moves=="1. d2d4 g8f6 2. c2c4 ")
    {
        return "g7g6";
    }
    if(moves=="1. d2d4 g8f6 2. g1f3 ")
    {
        return "g7g6";
    }
    ////
    if(moves=="1. e2e4 g8f6 2. e4e5 f6d5 ")
    {
        return "d2d4";
    }
    if(moves=="1. e2e4 e7e5 2. g1f3 d7d6 ")
    {
        return "d2d4";
    }
    if(moves=="1. e2e4 e7e5 2. g1f3 f7f6 ")
    {
        return "f3e5";
    }
    if(moves=="1. e2e4 e7e5 2. g1f3 f7f6 3. f3e5 f6e5 ")
    {
        return "d1h5";
    }
    if(moves=="1. e2e4 e7e5 2. g1f3 b8c6 ")
    {
        return "f1c4";
    }
    if(moves=="1. e2e4 e7e5 2. g1f3 g8f6 ")
    {
        return "d2d4";
    }
    if(moves=="1. d2d4 d7d5 2. c2c4 d5c4 ")
    {
        return "e2e4";
    }
    if(moves=="1. d2d4 d7d5 2. c2c4 e7e6 ")
    {
        return "b1c3";
    }
    if(moves=="1. d2d4 d7d5 2. c2c4 c7c6 ")
    {
        return "b1c3";
    }
    if(moves=="1. d2d4 d7d5 2. c2c4 g8f6 ")
    {
        return "c4d5";
    }
    if(moves=="1. d2d4 g8f6 2. c2c4 g7g6 ")
    {
        return "b1c3";
    }
    if(moves=="1. d2d4 g8f6 2. c2c4 e7e6 ")
    {
        return "g1f3";
    }
    if(moves=="1. d2d4 g8f6 2. c2c4 c7c6 ")
    {
        return "b1c3";
    }
    if(moves=="1. d2d4 e7e6 2. c2c4 d7d5 ")
    {
        return "b1c3";
    }
    if(moves=="1. d2d4 c7c6 2. c2c4 d7d5 ")
    {
        return "b1c3";
    }
    if(moves=="1. d2d4 g7g6 2. c2c4 g8f6 ")
    {
        return "b1c3";
    }
    if(moves=="1. e2e4 c7c5 2. g1f3 b8c6 ")
    {
        return "d2d4";
    }
    if(moves=="1. e2e4 c7c5 2. g1f3 d7d6 ")
    {
        return "d2d4";
    }
    if(moves=="1. e2e4 c7c5 2. g1f3 e7e6 ")
    {
        return "d2d4";
    }
    if(moves=="1. e2e4 c7c5 2. g1f3 g7g6 ")
    {
        return "d2d4";
    }
    if(moves=="1. e2e4 c7c6 2. d2d4 d7d5 ")
    {
        return "b1c3";
    }
    if(moves=="1. e2e4 e7e6 2. d2d4 d7d5 ")
    {
        return "b1c3";
    }
    if(moves=="1. e2e4 d7d5 2. e4d5 d8d5 ")
    {
        return "b1c3";
    }
    ////
    if(moves=="1. e2e4 e7e5 2. g1f3 b8c6 3. f1b5 ")
    {
        return "f7f5";
    }
    if(moves=="1. e2e4 e7e5 2. g1f3 b8c6 3. f1c4 ")
    {
        return "g8f6";
    }
    if(moves=="1. e2e4 e7e5 2. g1f3 b8c6 3. d2d4 ")
    {
        return "e5d4";
    }
    if(moves=="1. e2e4 e7e5 2. g1f3 b8c6 3. b1c3 ")
    {
        return "g8f6";
    }
    if(moves=="1. e2e4 c7c5 2. g1f3 b8c6 3. d2d4 ")
    {
        return "c5d4";
    }
    if(moves=="1. d2d4 d7d5 2. c2c4 e7e6 3. b1c3 ")
    {
        return "g8f6";
    }
    if(moves=="1. d2d4 d7d5 2. c2c4 e7e6 3. g1f3 ")
    {
        return "g8f6";
    }
    if(moves=="1. d2d4 g8f6 2. c2c4 g7g6 3. b1c3 ")
    {
        return "d7d5";
    }
    if(moves=="1. d2d4 g8f6 2. c2c4 g7g6 3. g1f3 ")
    {
        return "f8g7";
    }
    ////
    if(moves=="1. e2e4 e7e5 2. g1f3 d7d6 3. d2d4 c8g4 ")
    {
        return "d4e5";
    }
    if(moves=="1. e2e4 e7e5 2. g1f3 d7d6 3. d2d4 b8d7 ")
    {
        return "f1c4";
    }
    if(moves=="1. e2e4 e7e5 2. g1f3 g8f6 3. d2d4 f6e4 ")
    {
        return "f1d3";
    }
    if(moves=="1. e2e4 e7e5 2. g1f3 g8f6 3. d2d4 e5d4 ")
    {
        return "e4e5";
    }
    if(moves=="1. e2e4 g8f6 2. e4e5 f6d5 3. d2d4 d7d6 ")
    {
        return "g1f3";
    }
    if(moves=="1. e2e4 e7e5 2. g1f3 b8c6 3. f1c4 g8f6 ")
    {
        return "f3g5";
    }
    if(moves=="1. e2e4 e7e5 2. g1f3 b8c6 3. f1c4 f8c5 ")
    {
        return "b2b4";
    }
    if(moves=="1. e2e4 c7c5 2. g1f3 b8c6 3. d2d4 c5d4 ")
    {
        return "f3d4";
    }
    if(moves=="1. e2e4 c7c5 2. g1f3 e7e6 3. d2d4 c5d4 ")
    {
        return "f3d4";
    }
    if(moves=="1. e2e4 c7c5 2. g1f3 d7d6 3. d2d4 c5d4 ")
    {
        return "f3d4";
    }
    if(moves=="1. e2e4 c7c6 2. d2d4 d7d5 3. b1c3 d5e4 ")
    {
        return "c3e4";
    }
    if(moves=="1. e2e4 e7e6 2. d2d4 d7d5 3. b1c3 d5e4 ")
    {
        return "c3e4";
    }
    if(moves=="1. e2e4 e7e6 2. d2d4 d7d5 3. b1c3 g8f6 ")
    {
        return "c1g5";
    }
    if(moves=="1. e2e4 e7e6 2. d2d4 d7d5 3. b1c3 f8b4 ")
    {
        return "e4e5";
    }
    if(moves=="1. d2d4 d7d5 2. c2c4 e7e6 3. b1c3 g8f6 ")
    {
        return "c1g5";
    }
    if(moves=="1. d2d4 d7d5 2. c2c4 e7e6 3. b1c3 f8e7 ")
    {
        return "g1f3";
    }
    if(moves=="1. d2d4 d7d5 2. c2c4 e7e6 3. b1c3 d5c4 ")
    {
        return "e2e4";
    }
    if(moves=="1. d2d4 d7d5 2. c2c4 e7e6 3. b1c3 c7c6 ")
    {
        return "e2e4";
    }
    if(moves=="1. d2d4 d7d5 2. c2c4 d5c4 3. e2e4 e7e5 ")
    {
        return "g1f3";
    }
    if(moves=="1. d2d4 d7d5 2. c2c4 d5c4 3. e2e4 e7e6 ")
    {
        return "f1c4";
    }
    if(moves=="1. d2d4 d7d5 2. c2c4 d5c4 3. e2e4 g8f6 ")
    {
        return "e4e5";
    }
    if(moves=="1. d2d4 g8f6 2. c2c4 e7e6 3. g1f3 d7d5 ")
    {
        return "b1c3";
    }
    if(moves=="1. d2d4 g8f6 2. c2c4 g7g6 3. b1c3 d7d5 ")
    {
        return "c4d5";
    }
    if(moves=="1. d2d4 g8f6 2. c2c4 g7g6 3. b1c3 f8g7 ")
    {
        return "e2e4";
    }
    ////
    if(moves=="1. e2e4 e7e5 2. g1f3 b8c6 3. f1b5 f7f5 4. e4f5 ")
    {
        return "e5e4";
    }
    if(moves=="1. e2e4 e7e5 2. g1f3 b8c6 3. f1b5 f7f5 4. b1c3 ")
    {
        return "f5e4";
    }
    if(moves=="1. e2e4 e7e5 2. g1f3 b8c6 3. f1b5 f7f5 4. d2d3 ")
    {
        return "f5e4";
    }
    if(moves=="1. e2e4 e7e5 2. g1f3 b8c6 3. f1b5 f7f5 4. b5c6 ")
    {
        return "d7c6";
    }
    if(moves=="1. e2e4 c7c5 2. g1f3 b8c6 3. d2d4 c5d4 4. f3d4 ")
    {
        return "g8f6";
    }
    if(moves=="1. e2e4 e7e5 2. b1c3 g8f6 3. f2f4 d7d5 4. f4e5 ")
    {
        return "f6e4";
    }
    if(moves=="1. e2e4 e7e5 2. b1c3 g8f6 3. f2f4 d7d5 4. e4d5 ")
    {
        return "f6d5";
    }
    if(moves=="1. d2d4 d7d5 2. c2c4 e7e6 3. b1c3 g8f6 4. g1f3 ")
    {
        return "f8e7";
    }
    if(moves=="1. d2d4 d7d5 2. c2c4 e7e6 3. b1c3 g8f6 4. c1g5 ")
    {
        return "f8e7";
    }
    if(moves=="1. d2d4 d7d5 2. c2c4 e7e6 3. b1c3 g8f6 4. c4d5 ")
    {
        return "e6d5";
    }
    if(moves=="1. d2d4 g8f6 2. c2c4 g7g6 3. b1c3 d7d5 4. g1f3 ")
    {
        return "f8g7";
    }
    if(moves=="1. d2d4 g8f6 2. c2c4 g7g6 3. b1c3 d7d5 4. c4d5 ")
    {
        return "f6d5";
    }

    return false;
}

const openingBookOld = function()
{   // TODO: redo this shit, there must be an easier way
    if(boardPerspective == true)
    { // means book should be for black
        if(gameHistoryArray.length == 1)
        {
            if(gameHistoryArray[0] == "e2e4")
            {
                let r = Math.random() * 2;

                if( r > 0.7 )
                {
                    return "e7e5";
                }
                else
                {
                    return "c7c5";
                }
            }
            if(gameHistoryArray[0] == "d2d4")
            {
                let r = Math.random() * 2;

                if( r > 0.7 )
                {
                    return "d7d5";
                }
                else
                {
                    return "g8f6";
                }
            }
            if(gameHistoryArray[0] == "c2c4")
            {
                return "e7e5";
            }
            if(gameHistoryArray[0] == "g1f3")
            {
                return "d7d5";
            }
        }
        if(gameHistoryArray.length == 3)
        {
            if(gameHistoryArray[0] == "e2e4")
            {
                if(gameHistoryArray[1] == "e7e5")
                {
                    if(gameHistoryArray[2] == "g1f3")
                    {
                        return "b8c6";
                    }
                }
                if(gameHistoryArray[1] == "c7c5")
                {
                    if(gameHistoryArray[2] == "g1f3")
                    {
                        return "b8c6";
                    }
                }
            }
            if(gameHistoryArray[0] == "d2d4")
            {
                if(gameHistoryArray[1] == "d7d5")
                {
                    if(gameHistoryArray[2] == "c2c4")
                    {
                        return "e7e6";
                    }
                }
                if(gameHistoryArray[1] == "g8f6")
                {
                    if(gameHistoryArray[2] == "c2c4")
                    {
                        return "g7g6";
                    }
                }
            }
        }
        if(gameHistoryArray.length == 5)
        {

        }
    }
    else
    { // means book should be for white
        if(gameHistoryArray.length == 0)
        { // opening move
            let r = Math.random() * 2;

            if(r > 0.7)
            {
                return "e2e4";
            }
            else
            {
                return "d2d4";
            }
        }
        else
        {
            if(gameHistoryArray.length == 2)
            {
                if(gameHistoryArray[0] == "e2e4")
                {
                    if(gameHistoryArray[1] == "e7e5")
                    {
                        return "g1f3";
                    }
                    if(gameHistoryArray[1] == "e7e6")
                    {
                        return "d2d4";
                    }
                    if(gameHistoryArray[1] == "c7c6")
                    {
                        return "d2d4";
                    }
                    if(gameHistoryArray[1] == "c7c5")
                    {
                        return "g1f3";
                    }
                    if(gameHistoryArray[1] == "b7b6")
                    {
                        return "d2d4";
                    }
                    if(gameHistoryArray[1] == "g7g6")
                    {
                        return "d2d4";
                    }
                    if(gameHistoryArray[1] == "d7d6")
                    {
                        return "d2d4";
                    }
                    if(gameHistoryArray[1] == "g8f6")
                    {
                        return "e4e5";
                    }
                }
                if(gameHistoryArray[0] == "d2d4")
                {
                    if(gameHistoryArray[1] == "d7d5")
                    {
                        return "c2c4";
                    }
                    if(gameHistoryArray[1] == "g8f6")
                    {
                        return "c2c4";
                    }
                    if(gameHistoryArray[1] == "e7e6")
                    {
                        return "c2c4";
                    }
                    if(gameHistoryArray[1] == "c7c6")
                    {
                        return "c2c4";
                    }
                    if(gameHistoryArray[1] == "d7d6")
                    {
                        return "c2c4";
                    }
                    if(gameHistoryArray[1] == "g7g6")
                    {
                        return "c2c4";
                    }
                    if(gameHistoryArray[1] == "b7b6")
                    {
                        return "c2c4";
                    }
                }
            }
            if(gameHistoryArray.length == 4)
            {
                if(gameHistoryArray[0] == "e2e4")
                {
                    if(gameHistoryArray[1] == "e7e5")
                    {
                        if(gameHistoryArray[2] == "g1f3")
                        {
                            if(gameHistoryArray[3] == "d7d6")
                            {
                                return "d2d4";
                            }
                            if(gameHistoryArray[3] == "g8f6")
                            {
                                return "d2d4";
                            }
                            if(gameHistoryArray[3] == "b8c6");
                            {
                                return "f1c4";
                            }
                        }
                    }
                }
            }
            if(gameHistoryArray.length == 6)
            {

            }
        }
    }

    return false;
}

const robotAI = function(fenString)
{
    let depth = 3;
    let aiBoard = fenToConventionalBoard(fenString);
    let moveArray = legalMovesFromConventionalBoard(aiBoard);
    let bestEval = -99999999; // so that any move is better than the initial value
    let bestMoveArray = [];

    nodeCount = 0; // debugging

    moveArray.forEach( move =>
    {   
        let newAIBoard = conventionalBoardProcessMove(aiBoard, move);
        let thisMoveEval = -1 * vanillaMiniMax(newAIBoard, depth-1 );

        if( thisMoveEval >= bestEval )
        {
            if( thisMoveEval == bestEval )
            {
                bestMoveArray.push(move);
            }
            else
            {
                bestEval = thisMoveEval;
                bestMoveArray = [move];
            }
            
        }
    })

    console.log(bestMoveArray); // debugging
    console.log("Eval is: " + bestEval + " centipawns"); // debugging
    console.log("Nodecount is: " + nodeCount); // debugging

    let bestMove = bestMoveArray[(Math.floor(Math.random() * bestMoveArray.length))];

    console.log("move chosen: " + bestMove);

    gameHistoryArray.push(bestMove);

    return boardToFEN(conventionalBoardProcessMove(aiBoard,bestMove));
}

const freedomAI = function(fenString)
{
    let depth = 2;
    let aiBoard = fenToConventionalBoard(fenString);
    let moveArray = legalMovesFromConventionalBoard(aiBoard);
    let bestEval = -9999999; // so that any evaluation is better than the initial value
    let bestMoveArray = [];

    nodeCount = 0; // debugging

    moveArray.forEach( move =>
    {   
        let newAIBoard = conventionalBoardProcessMove(aiBoard, move);
        let thisMoveEval = -1 * alphaBetaMaxFreedom(newAIBoard, depth-1, -9999999, 9999999 );

        if( thisMoveEval >= bestEval )
        {
            if( thisMoveEval == bestEval )
            {
                bestMoveArray.push(move);
            }
            else
            {
                bestEval = thisMoveEval;
                bestMoveArray = [move];
            }
            
        }
    })

    console.log(bestMoveArray); // debugging
    console.log("Eval is: " + bestEval + " legal move difference"); // debugging
    console.log("Nodecount is: " + nodeCount); // debugging

    let bestMove = bestMoveArray[(Math.floor(Math.random() * bestMoveArray.length))];

    console.log("move chosen: " + bestMove);

    gameHistoryArray.push(bestMove);

    return boardToFEN(conventionalBoardProcessMove(aiBoard,bestMove));
}

const robotAIAlphaBetaNega = function(fenString)
{
    let depth = 3;
    let aiBoard = fenToConventionalBoard(fenString);
    let moveArray = legalMovesFromConventionalBoard(aiBoard);
    let bestEval = -9999999; // so that any evaluation is better than the initial value
    let bestMoveArray = [];

    nodeCount = 0; // debugging

    moveArray.forEach( move =>
    {   
        let newAIBoard = conventionalBoardProcessMove(aiBoard, move);
        let thisMoveEval = -1 * alphaBetaMiniMax(newAIBoard, depth-1, -9999999, 9999999 );

        if( thisMoveEval >= bestEval )
        {
            if( thisMoveEval == bestEval )
            {
                bestMoveArray.push(move);
            }
            else
            {
                bestEval = thisMoveEval;
                bestMoveArray = [move];
            }
            
        }
    })

    console.log(bestMoveArray); // debugging
    console.log("Eval is: " + bestEval + " centipawns"); // debugging
    console.log("Nodecount is: " + nodeCount); // debugging

    let bestMove = bestMoveArray[(Math.floor(Math.random() * bestMoveArray.length))];

    console.log("move chosen: " + bestMove);

    gameHistoryArray.push(bestMove);

    return boardToFEN(conventionalBoardProcessMove(aiBoard,bestMove));
}

const robotAIAlphaBetaKingSafe = function(fenString)
{
    let depth = 3;
    let aiBoard = fenToConventionalBoard(fenString);
    let moveArray = legalMovesFromConventionalBoard(aiBoard);
    let bestEval = -9999999; // so that any evaluation is better than the initial value
    let bestMoveArray = [];

    nodeCount = 0; // debugging

    moveArray.forEach( move =>
    {   
        let newAIBoard = conventionalBoardProcessMove(aiBoard, move);
        let thisMoveEval = -1 * alphaBetaMiniMaxKingSafe(newAIBoard, depth-1, -9999999, 9999999 );

        if(move=="e8g8")
        {
            thisMoveEval += 35;
        }
        if(move=="e8c8")
        {
            thisMoveEval += 45;
        }
        if(move=="e1g1")
        {
            thisMoveEval += 35;
        }
        if(move=="e1c1")
        {
            thisMoveEval += 45;
        }

        if( thisMoveEval >= bestEval )
        {
            if( thisMoveEval == bestEval )
            {
                bestMoveArray.push(move);
            }
            else
            {
                bestEval = thisMoveEval;
                bestMoveArray = [move];
            }
            console.log(move+" "+thisMoveEval);//debugging
        }
    })

    if(bestMoveArray.includes("e1g1"))
    {
        bestMoveArray = ["e1g1"];
    }
    if(bestMoveArray.includes("e1c1"))
    {
        bestMoveArray = ["e1c1"];
    }
    if(bestMoveArray.includes("e8g8"))
    {
        bestMoveArray = ["e8g8"];
    }
    if(bestMoveArray.includes("e8c8"))
    {
        bestMoveArray = ["e8c8"];
    }

    console.log(bestMoveArray); // debugging
    console.log("Eval is: " + (bestEval/2) + " centipawns"); // debugging // eval is halved because of piece activity inclusion
    console.log("Nodecount is: " + nodeCount); // debugging

    
    let bestMove = bestMoveArray[(Math.floor(Math.random() * bestMoveArray.length))];

    console.log("move chosen: " + bestMove);

    gameHistoryArray.push(bestMove);

    return boardToFEN(conventionalBoardProcessMove(aiBoard,bestMove));
}

const robotAIAlphaBetaNegaExtension = function(fenString)
{
    let depth = 3;
    let aiBoard = fenToConventionalBoard(fenString);
    let moveArray = legalMovesFromConventionalBoard(aiBoard);
    let bestEval = -9999999; // so that any evaluation is better than the initial value
    let bestMoveArray = [];

    nodeCount = 0; // debugging

    moveArray.forEach( move =>
    {   
        let newAIBoard = conventionalBoardProcessMove(aiBoard, move);
        let thisMoveEval = -1 * alphaBetaMiniMaxExtension(newAIBoard, depth-1, -9999999, 9999999 );

        if( thisMoveEval >= bestEval )
        {
            if( thisMoveEval == bestEval )
            {
                bestMoveArray.push(move);
            }
            else
            {
                bestEval = thisMoveEval;
                bestMoveArray = [move];
            }
            console.log(move+" "+thisMoveEval);//debugging
        }
    })

    console.log(bestMoveArray); // debugging
    console.log("Eval is: " + (bestEval/2) + " centipawns"); // debugging // eval is halved because of piece activity inclusion
    console.log("Nodecount is: " + nodeCount); // debugging

    let bestMove = bestMoveArray[(Math.floor(Math.random() * bestMoveArray.length))];

    console.log("move chosen: " + bestMove);

    gameHistoryArray.push(bestMove);

    return boardToFEN(conventionalBoardProcessMove(aiBoard,bestMove));
}

const robotAIAlphaBetaNegaHybrid = function(fenString)
{
    let depth = 3;
    let aiBoard = fenToConventionalBoard(fenString);
    let moveArray = legalMovesFromConventionalBoard(aiBoard);
    let bestEval = -9999999; // so that any evaluation is better than the initial value
    let bestMoveArray = [];

    nodeCount = 0; // debugging

    moveArray.forEach( move =>
    {   
        let newAIBoard = conventionalBoardProcessMove(aiBoard, move);
        let thisMoveEval = -1 * alphaBetaMiniMaxHybrid(newAIBoard, depth-1, -9999999, 9999999 );

        if( thisMoveEval >= bestEval )
        {
            if( thisMoveEval == bestEval )
            {
                bestMoveArray.push(move);
            }
            else
            {
                bestEval = thisMoveEval;
                bestMoveArray = [move];
            }
            
        }
    })

    console.log(bestMoveArray); // debugging
    console.log("Eval is: " + (bestEval/2) + " centipawns"); // debugging // eval is halved because of piece freedom inclusion
    console.log("Nodecount is: " + nodeCount); // debugging

    let bestMove = bestMoveArray[(Math.floor(Math.random() * bestMoveArray.length))];

    console.log("move chosen: " + bestMove);

    gameHistoryArray.push(bestMove);

    return boardToFEN(conventionalBoardProcessMove(aiBoard,bestMove));
}

const robotAIAlphaBetaNegaMove = function(fenString)
{ //TODO implement alphaBetaMiniMaxMove
    let depth = 3;
    let aiBoard = fenToConventionalBoard(fenString);
    let moveArray = legalMovesFromConventionalBoard(aiBoard);
    let bestEval = -9999999; // so that any evaluation is better than the initial value
    let bestMoveArray = [];

    nodeCount = 0; // debugging

    moveArray.forEach( move =>
    {   
        let newAIBoard = conventionalBoardProcessMove(aiBoard, move);
        let thisMoveEval = -1 * alphaBetaMiniMax(newAIBoard, depth-1, -9999999, 9999999 );

        if( thisMoveEval >= bestEval )
        {
            if( thisMoveEval == bestEval )
            {
                bestMoveArray.push(move);
            }
            else
            {
                bestEval = thisMoveEval;
                bestMoveArray = [move];
            }
            
        }
    })

    console.log(bestMoveArray); // debugging
    console.log("Eval is: " + bestEval + " centipawns"); // debugging
    console.log("Nodecount is: " + nodeCount); // debugging

    let bestMove = bestMoveArray[(Math.floor(Math.random() * bestMoveArray.length))];

    console.log("move chosen: " + bestMove);

    return boardToFEN(conventionalBoardProcessMove(aiBoard,bestMove));
}

const robotAIAlphaBetaNegaQ = function(fenString)
{
    let depth = 1;
    let aiBoard = fenToConventionalBoard(fenString);
    let moveArray = legalMovesFromConventionalBoard(aiBoard);
    let bestEval = -9999999; // so that any evaluation is better than the initial value
    let bestMoveArray = [];

    nodeCount = 0; // debugging

    moveArray.forEach( move =>
    {   
        let newAIBoard = conventionalBoardProcessMove(aiBoard, move);
        let thisMoveEval = -1 * alphaBetaMiniMaxQ(newAIBoard, depth-1, -9999999, 9999999 );

        if( thisMoveEval >= bestEval )
        {
            if( thisMoveEval == bestEval )
            {
                bestMoveArray.push(move);
            }
            else
            {
                bestEval = thisMoveEval;
                bestMoveArray = [move];
            }
            
        }
    })

    console.log(bestMoveArray); // debugging
    console.log("Eval is: " + bestEval + " centipawns"); // debugging
    console.log("Nodecount is: " + nodeCount); // debugging

    let bestMove = bestMoveArray[(Math.floor(Math.random() * bestMoveArray.length))];

    console.log("move chosen: " + bestMove);

    return boardToFEN(conventionalBoardProcessMove(aiBoard,bestMove));
}

const robotAIAlphaBetaNegaVariableDepth = function(fenString,vDepth)
{
    let depth = vDepth;
    let aiBoard = fenToConventionalBoard(fenString);
    let moveArray = legalMovesFromConventionalBoard(aiBoard);
    let bestEval = -9999999; // so that any evaluation is better than the initial value
    let bestMoveArray = [];

    nodeCount = 0; // debugging

    moveArray.forEach( move =>
    {   
        let newAIBoard = conventionalBoardProcessMove(aiBoard, move);
        let thisMoveEval = -1 * alphaBetaMiniMax(newAIBoard, depth-1, -9999999, 9999999 );

        if( thisMoveEval >= bestEval )
        {
            if( thisMoveEval == bestEval )
            {
                bestMoveArray.push(move);
            }
            else
            {
                bestEval = thisMoveEval;
                bestMoveArray = [move];
            }
            
        }
    })

    console.log(bestMoveArray); // debugging
    console.log("Eval is: " + bestEval + " centipawns"); // debugging
    console.log("Nodecount is: " + nodeCount); // debugging

    let bestMove = bestMoveArray[(Math.floor(Math.random() * bestMoveArray.length))];

    console.log("move chosen: " + bestMove);

    return boardToFEN(conventionalBoardProcessMove(aiBoard,bestMove));
}



const robotAIAlphaBeta = function(fenString)
{
    let depth = 3;
    let aiBoard = fenToConventionalBoard(fenString);
    let moveArray = legalMovesFromConventionalBoard(aiBoard);
    let bestEval = -9999999; // so that any evaluation is better than the initial value
    let bestMoveArray = [];

    nodeCount = 0; // debugging

    moveArray.forEach( move =>
    {   
        let newAIBoard = conventionalBoardProcessMove(aiBoard, move);
        let thisMoveEval = -1 * alphaBetaMax(newAIBoard, depth-1, -9999999, 9999999 );

        if( thisMoveEval >= bestEval )
        {
            if( thisMoveEval == bestEval )
            {
                bestMoveArray.push(move);
            }
            else
            {
                bestEval = thisMoveEval;
                bestMoveArray = [move];
            }
            
        }
    })

    console.log(bestMoveArray); // debugging
    console.log("Eval is: " + bestEval + " centipawns"); // debugging
    console.log("Nodecount is: " + nodeCount); // debugging

    let bestMove = bestMoveArray[(Math.floor(Math.random() * bestMoveArray.length))];

    console.log("move chosen: " + bestMove);

    gameHistoryArray.push(bestMove);

    return boardToFEN(conventionalBoardProcessMove(aiBoard,bestMove));
}

const freedomMiniMax = function(board)
{
    let evaluation = -9999999; // so that any evaluation is better than the initial value

    if(depth==0)
    {
        console.log("vanillaMiniMax"); //debugging

        let gameStateCheck = checkmateOrStaleMateChecker(board);

        if( gameStateCheck == false ) // there's no checkmate or stalemate so resort to material count
        {
            evaluation = simpleFreedom(board); // a number
        }
        else
        {
            evaluation = gameStateCheck;
        }
    }
    else
    {
        let gameStateCheck = checkmateOrStaleMateChecker(board);

        if( gameStateCheck == false ) // there's no checkmate or stalemate so resort to material count
        {
            let moveArray = legalMovesFromConventionalBoard(board);
            moveArray.forEach( move => 
            {
                let newBoard = conventionalBoardProcessMove(board,move);
                let evalNewBoard = -1 * freedomMiniMax(newBoard,depth-1);

                if( evalNewBoard > evaluation )
                {
                    evaluation = evalNewBoard;
                }
            })
        }
        else
        {
            evaluation = gameStateCheck;
        }
    }

    return evaluation;
}

const alphaBetaMiniMax = function(board,depth,alpha,beta)
{
    let eval;

    if(depth==0)
    {
        //debugging
        nodeCount++;

        let gameStateCheck = checkmateOrStaleMateChecker(board);

        if( gameStateCheck == false ) // there's no checkmate or stalemate so resort to material count
        {
            eval = simpleMaterial(board); // a number
        }
        else
        {
            eval = gameStateCheck;
        }
    }
    else
    {
        let gameStateCheck = checkmateOrStaleMateChecker(board);

        if( gameStateCheck == false ) // there's no checkmate or stalemate so resort to material count
        {
            let moveArray = legalMovesFromConventionalBoard(board);
            for( let i = 0; i < moveArray.length; i++ )
            {
                let newBoard = conventionalBoardProcessMove(board,moveArray[i]);
                let evalNewBoard = -1 * alphaBetaMiniMax(newBoard,depth-1,-beta,-alpha);

                if( evalNewBoard >= beta )
                {
                    eval = beta;
                    break;
                }
                if( evalNewBoard > alpha )
                {
                    alpha = evalNewBoard;
                    eval = alpha;
                }
            }
        }
        else
        {
            alpha = gameStateCheck;
            eval = alpha;
        }
    }

    return eval;
}

const alphaBetaMiniMaxKingSafe = function(board,depth,alpha,beta)
{
    let eval;

    if(depth==0)
    {
        //debugging
        nodeCount++;

        let gameStateCheck = checkmateOrStaleMateChecker(board);

        if( gameStateCheck == false ) // there's no checkmate or stalemate so resort to material count
        {
            eval = simpleMaterial(board); // a number
            eval += pieceActivityEval(board)*50; //probably float number
            eval += kingSafetyEval(board)*110;
        }
        else
        {
            eval = gameStateCheck;
        }
    }
    else
    {
        let gameStateCheck = checkmateOrStaleMateChecker(board);

        if( gameStateCheck == false ) // there's no checkmate or stalemate so resort to material count
        {
            let moveArray = legalMovesFromConventionalBoard(board);


            if((moveArray.length) < 6) // move extension check
            {
                for( let i = 0; i < moveArray.length; i++ )
                {
                    let newBoard = conventionalBoardProcessMove(board,moveArray[i]);
                    let evalNewBoard = -1 * alphaBetaMiniMaxExtension(newBoard,depth,-beta,-alpha);

                    if( evalNewBoard >= beta )
                    {
                        eval = beta;
                        break;
                    }
                    if( evalNewBoard > alpha )
                    {
                        alpha = evalNewBoard;
                        eval = alpha;
                    }
                }
            }
            else
            {
                for( let i = 0; i < moveArray.length; i++ )
                {
                    let newBoard = conventionalBoardProcessMove(board,moveArray[i]);
                    let evalNewBoard = -1 * alphaBetaMiniMaxExtension(newBoard,depth-1,-beta,-alpha);
    
                    if( evalNewBoard >= beta )
                    {
                        eval = beta;
                        break;
                    }
                    if( evalNewBoard > alpha )
                    {
                        alpha = evalNewBoard;
                        eval = alpha;
                    }
                }
            }
        }
        else
        {
            alpha = gameStateCheck;
            eval = alpha;
        }
    }

    return eval;
}

const alphaBetaMiniMaxExtension = function(board,depth,alpha,beta)
{
    let eval;

    if(depth==0)
    {
        //debugging
        nodeCount++;

        let gameStateCheck = checkmateOrStaleMateChecker(board);

        if( gameStateCheck == false ) // there's no checkmate or stalemate so resort to material count
        {
            eval = simpleMaterial(board); // a number
            eval += pieceActivityEval(board)*50; //proabably float number
            eval += Math.random()*4-2; //to add some variety into moves
        }
        else
        {
            eval = gameStateCheck;
        }
    }
    else
    {
        let gameStateCheck = checkmateOrStaleMateChecker(board);

        if( gameStateCheck == false ) // there's no checkmate or stalemate so resort to material count
        {
            let moveArray = legalMovesFromConventionalBoard(board);


            if((moveArray.length) < 6) // move extension check
            {
                for( let i = 0; i < moveArray.length; i++ )
                {
                    let newBoard = conventionalBoardProcessMove(board,moveArray[i]);
                    let evalNewBoard = -1 * alphaBetaMiniMaxExtension(newBoard,depth,-beta,-alpha);

                    if( evalNewBoard >= beta )
                    {
                        eval = beta;
                        break;
                    }
                    if( evalNewBoard > alpha )
                    {
                        alpha = evalNewBoard;
                        eval = alpha;
                    }
                }
            }
            else
            {
                for( let i = 0; i < moveArray.length; i++ )
                {
                    let newBoard = conventionalBoardProcessMove(board,moveArray[i]);
                    let evalNewBoard = -1 * alphaBetaMiniMaxExtension(newBoard,depth-1,-beta,-alpha);
    
                    if( evalNewBoard >= beta )
                    {
                        eval = beta;
                        break;
                    }
                    if( evalNewBoard > alpha )
                    {
                        alpha = evalNewBoard;
                        eval = alpha;
                    }
                }
            }
        }
        else
        {
            alpha = gameStateCheck;
            eval = alpha;
        }
    }

    return eval;
}

const alphaBetaMiniMaxHybrid = function(board,depth,alpha,beta)
{
    let eval;

    if(depth==0)
    {
        //debugging
        nodeCount++;

        let gameStateCheck = checkmateOrStaleMateChecker(board);

        if( gameStateCheck == false ) // there's no checkmate or stalemate so resort to material count
        {
            eval = simpleMaterial(board); // a number
            eval = eval + ((simpleFreedom(board))*29);// a number
        }
        else
        {
            eval = gameStateCheck;
        }
    }
    else
    {
        let gameStateCheck = checkmateOrStaleMateChecker(board);

        if( gameStateCheck == false ) // there's no checkmate or stalemate so resort to material count
        {
            let moveArray = legalMovesFromConventionalBoard(board);
            for( let i = 0; i < moveArray.length; i++ )
            {
                let newBoard = conventionalBoardProcessMove(board,moveArray[i]);
                let evalNewBoard = -1 * alphaBetaMiniMaxHybrid(newBoard,depth-1,-beta,-alpha);

                if( evalNewBoard >= beta )
                {
                    eval = beta;
                    break;
                }
                if( evalNewBoard > alpha )
                {
                    alpha = evalNewBoard;
                    eval = alpha;
                }
            }
        }
        else
        {
            alpha = gameStateCheck;
            eval = alpha;
        }
    }

    return eval;
}

const alphaBetaMiniMaxMove = function(board,depth,alphaTHIS,betaTHIS,evalAndMove)
{ //TODO: figure out why it's suicidal (doesn't work)
    let alpha = alphaTHIS;
    let beta = betaTHIS;
    let eval;
    let moveToConsiderFirst = evalAndMove[1];
    let bestMove;

    if(depth==0)
    {
        //debugging
        nodeCount++;

        let gameStateCheck = checkmateOrStaleMateChecker(board);

        if( gameStateCheck == false ) // there's no checkmate or stalemate so resort to material count
        {
            eval = simpleMaterial(board); // a number
        }
        else
        {
            eval = gameStateCheck;
        }

        bestMove = "";
    }
    else
    {
        let gameStateCheck = checkmateOrStaleMateChecker(board);

        if( gameStateCheck == false ) // there's no checkmate or stalemate so resort to material count
        {
            let moveArray = legalMovesFromConventionalBoard(board);

            bestMove = moveArray[0]; //to initialise bestMove with a move from the array

            if(moveToConsiderFirst != "")
            {

                console.log(moveArray); //debugging
                moveArray.splice(moveArray.indexOf(moveToConsiderFirst),1);
                moveArray.unshift(moveToConsiderFirst);
                console.log(moveArray); //debugging

                for( let i = 0; i < moveArray.length; i++ )
                {
                    let newBoard = conventionalBoardProcessMove(board,moveArray[i]);
                    let evalNewBoard = -1 * alphaBetaMiniMaxMove(newBoard,depth-1,-beta,-alpha,[0,""])[0];

                    if( evalNewBoard >= beta )
                    {
                        eval = beta;
                        break;
                    }
                    if( evalNewBoard > alpha )
                    {
                        alpha = evalNewBoard;
                        eval = alpha;
                        bestMove = moveArray[i];
                    }
                }
            }
            else
            {
                for( let i = 0; i < moveArray.length; i++ )
                {
                    let newBoard = conventionalBoardProcessMove(board,moveArray[i]);
                    let evalNewBoard = -1 * alphaBetaMiniMaxMove(newBoard,depth-1,-beta,-alpha,[0,""])[0];
    
                    if( evalNewBoard >= beta )
                    {
                        eval = beta;
                        break;
                    }
                    if( evalNewBoard > alpha )
                    {
                        alpha = evalNewBoard;
                        eval = alpha;
                        bestMove = moveArray[i];
                    }
                }
            }
        }
        else
        {
            alpha = gameStateCheck;
            eval = alpha;

            bestMove = "";
        }
    }

    return [eval,bestMove];
}

const alphaBetaMiniMaxQ = function(board,depth,alpha,beta)
{
    let eval;

    if(depth==0)
    {
        let gameStateCheck = checkmateOrStaleMateChecker(board);

        if( gameStateCheck == false ) // there's no checkmate or stalemate so resort to material count
        {
            let captureArray = whatCapturesAreLegal(board);

            if(captureArray.length == 0)
            { // there are no captures. Position is quiet
                eval = simpleMaterial(board);

                //debugging
                nodeCount++;
            }
            else
            { // there are captures 
                    for( let i = 0; i < captureArray.length; i++ )
                    {
                        let newBoard = conventionalBoardProcessMove(board,captureArray[i]);
                        let evalNewBoard = -1 * alphaBetaMiniMaxQ(newBoard,0,-beta,-alpha);

                        if( evalNewBoard >= beta )
                        {
                            eval = beta;
                            break;
                        }
                        if( evalNewBoard > alpha )
                        {
                            alpha = evalNewBoard;
                            eval = alpha;
                        }
                    }
            }
        }
        else
        {
            eval = gameStateCheck;
            //debugging
            nodeCount++;
        }
    }
    else
    {
        let gameStateCheck = checkmateOrStaleMateChecker(board);

        if( gameStateCheck == false ) // there's no checkmate or stalemate so resort to material count
        {
            let moveArray = whatCapturesAreLegal(board);
            for( let i = 0; i < moveArray.length; i++ )
            {
                let newBoard = conventionalBoardProcessMove(board,moveArray[i]);
                let evalNewBoard = -1 * alphaBetaMiniMaxQ(newBoard,depth-1,-beta,-alpha);

                if( evalNewBoard >= beta )
                {
                    eval = beta;
                    break;
                }
                if( evalNewBoard > alpha )
                {
                    alpha = evalNewBoard;
                    eval = alpha;
                }
            }
        }
        else
        {
            alpha = gameStateCheck;
            eval = alpha;
        }
    }

    return eval;
}

const alphaBetaMaxFreedom = function(board,depth,alpha,beta)
{
    let eval;

    if(depth==0)
    {
        nodeCount++; // debugging

        let gameStateCheck = checkmateOrStaleMateChecker(board);

        if( gameStateCheck == false ) // there's no checkmate or stalemate so resort to material count
        {
            return simpleFreedom(board); // a number
        }
        else
        {
            return gameStateCheck;
        }
    }
    else
    {
        let gameStateCheck = checkmateOrStaleMateChecker(board);

        if( gameStateCheck == false )
        {
            let moveArray = legalMovesFromConventionalBoard(board);
            for( let i = 0; i < moveArray.length; i++ )
            {
                let newBoard = conventionalBoardProcessMove(board,moveArray[i]);
                let newEval = alphaBetaMinFreedom(newBoard,depth-1,alpha,beta);
    
                if( newEval >= beta )
                {   
                    eval = beta;
                    break;
                }
                if( newEval > alpha )
                {
                    alpha = newEval;
                    eval = alpha;
                }
            }
        }
        else
        {
            alpha = gameStateCheck;
            eval = alpha;
        }
    }

    return eval;
}

const alphaBetaMinFreedom = function(board,depth,alpha,beta)
{
    let eval;

    if(depth==0)
    {
        nodeCount++;

        let gameStateCheck = checkmateOrStaleMateChecker(board);

        if( gameStateCheck == false ) // there's no checkmate or stalemate so resort to material count
        {
            return -1 * simpleFreedom(board); // a number
        }
        else
        {
            return -1 * gameStateCheck;
        }
    }
    else
    {
        let gameStateCheck = checkmateOrStaleMateChecker(board);

        if(gameStateCheck == false)
        {
            let moveArray = legalMovesFromConventionalBoard(board);
            for( let i = 0; i < moveArray.length; i++ )
            {
                let newBoard = conventionalBoardProcessMove(board,moveArray[i]);
                let newEval = alphaBetaMaxFreedom(newBoard,depth-1,alpha,beta);
    
                if( newEval <= alpha )
                {   
                    eval = alpha;
                    break;
                }
                if( newEval < beta )
                {
                    beta = newEval;
                    eval = beta;
                }
            }
        }
        else
        {
            beta = gameStateCheck;
            eval = beta;
        }
    }

    return eval;
}

const alphaBetaMax = function(board,depth,alpha,beta)
{
    let eval;

    if(depth==0)
    {
        nodeCount++; // debugging

        let gameStateCheck = checkmateOrStaleMateChecker(board);

        if( gameStateCheck == false ) // there's no checkmate or stalemate so resort to material count
        {
            return simpleMaterial(board); // a number
        }
        else
        {
            return gameStateCheck;
        }
    }
    else
    {
        let gameStateCheck = checkmateOrStaleMateChecker(board);

        if( gameStateCheck == false )
        {
            let moveArray = legalMovesFromConventionalBoard(board);
            for( let i = 0; i < moveArray.length; i++ )
            {
                let newBoard = conventionalBoardProcessMove(board,moveArray[i]);
                let newEval = alphaBetaMin(newBoard,depth-1,alpha,beta);
    
                if( newEval >= beta )
                {   
                    eval = beta;
                    break;
                }
                if( newEval > alpha )
                {
                    alpha = newEval;
                    eval = alpha;
                }
            }
        }
        else
        {
            alpha = gameStateCheck;
            eval = alpha;
        }
        
    }

    return eval;
}

const alphaBetaMin = function(board,depth,alpha,beta)
{
    let eval;

    if(depth==0)
    {
        nodeCount++;

        let gameStateCheck = checkmateOrStaleMateChecker(board);

        if( gameStateCheck == false ) // there's no checkmate or stalemate so resort to material count
        {
            return -1 * simpleMaterial(board); // a number
        }
        else
        {
            return -1 * gameStateCheck;
        }
    }
    else
    {
        let gameStateCheck = checkmateOrStaleMateChecker(board);

        if( gameStateCheck == false )
        {
            let moveArray = legalMovesFromConventionalBoard(board);
            for( let i = 0; i < moveArray.length; i++ )
            {
                let newBoard = conventionalBoardProcessMove(board,moveArray[i]);
                let newEval = alphaBetaMax(newBoard,depth-1,alpha,beta);
    
                if( newEval <= alpha )
                {   
                    eval = alpha;
                    break;
                }
                if( newEval < beta )
                {
                    beta = newEval;
                    eval = beta;
                }
            }
        }
        else
        {
            beta = gameStateCheck;
            eval = beta;
        }
    }

    return eval;
}

const vanillaMiniMax = function(board,depth)
{  
    let evaluation = -9999999; // so that any evaluation is better than the initial value

    if(depth==0)
    {
        //debugging
        nodeCount++;

        let gameStateCheck = checkmateOrStaleMateChecker(board);

        if( gameStateCheck == false ) // there's no checkmate or stalemate so resort to material count
        {
            evaluation = simpleMaterial(board); // a number
        }
        else
        {
            evaluation = gameStateCheck;
        }
    }
    else
    {
        let gameStateCheck = checkmateOrStaleMateChecker(board);

        if( gameStateCheck == false ) // there's no checkmate or stalemate so resort to material count
        {
            let moveArray = legalMovesFromConventionalBoard(board);
            moveArray.forEach( move => 
            {
                let newBoard = conventionalBoardProcessMove(board,move);
                let evalNewBoard = -1 * vanillaMiniMax(newBoard,depth-1);

                if( evalNewBoard > evaluation )
                {
                    evaluation = evalNewBoard;
                }
            })
        }
        else
        {
            evaluation = gameStateCheck;
        }
    }

    return evaluation;
}

const whatCapturesAreLegal = function(board)
{
    let arrayOfPseudoLegalCaptures = whatCapturesArePseudolegal(board);
    let arrayOfLegalCaptures = arrayOfPseudoLegalCaptures.filter(function(element)
    {
        let newBoard = conventionalBoardProcessMove(board,element);
        return !isTheSideNotToMoveInCheckChecker(newBoard);
    });
    return arrayOfLegalCaptures;
}

const whatCapturesArePseudolegal = function(objectBoard)
{
    let arrayOfCaptures = [];

    if( objectBoard.sideToMove==true )
    { // White to move
        for( let i = 7; i > -1; i-- )
        {
            for( let j = 7; j > -1; j-- )
            { // i and j stand for rank and file 
                if( objectBoard.board[i][j]=="Q" )
                {
                    for( let k = 1; k < 8; k++ )
                    { // SouthEast direction
                        if( (i+k < 8) && (j+k < 8) )
                        {
                            if( objectBoard.board[i+k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i+k][j+k] == objectBoard.board[i+k][j+k].toUpperCase() )
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
                            if( objectBoard.board[i-k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i-k][j-k] == objectBoard.board[i-k][j-k].toUpperCase() )
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
                            if( objectBoard.board[i-k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                               
                            }
                            else
                            {
                                if( objectBoard.board[i-k][j+k] == objectBoard.board[i-k][j+k].toUpperCase() )
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
                            if( objectBoard.board[i+k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i+k][j-k] == objectBoard.board[i+k][j-k].toUpperCase() )
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
                            if( objectBoard.board[i+k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i+k][j] == objectBoard.board[i+k][j].toUpperCase() )
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
                            if( objectBoard.board[i-k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i-k][j] == objectBoard.board[i-k][j].toUpperCase() )
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
                            if( objectBoard.board[i][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i][j-k] == objectBoard.board[i][j-k].toUpperCase() )
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
                            if( objectBoard.board[i][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i][j+k] == objectBoard.board[i][j+k].toUpperCase() )
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
                if( objectBoard.board[i][j]=="R" )
                {
                    for( let k = 1; k < 8; k++ )
                    { // South direction
                        if( i+k < 8 )
                        {
                            if( objectBoard.board[i+k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i+k][j] == objectBoard.board[i+k][j].toUpperCase() )
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
                            if( objectBoard.board[i-k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i-k][j] == objectBoard.board[i-k][j].toUpperCase() )
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
                            if( objectBoard.board[i][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i][j-k] == objectBoard.board[i][j-k].toUpperCase() )
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
                            if( objectBoard.board[i][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i][j+k] == objectBoard.board[i][j+k].toUpperCase() )
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
                if( objectBoard.board[i][j]=="B" )
                {
                    for( let k = 1; k < 8; k++ )
                    { // SouthEast direction
                        if( (i+k < 8) && (j+k < 8) )
                        {
                            if( objectBoard.board[i+k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i+k][j+k] == objectBoard.board[i+k][j+k].toUpperCase() )
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
                            if( objectBoard.board[i-k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i-k][j-k] == objectBoard.board[i-k][j-k].toUpperCase() )
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
                            if( objectBoard.board[i-k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i-k][j+k] == objectBoard.board[i-k][j+k].toUpperCase() )
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
                            if( objectBoard.board[i+k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i+k][j-k] == objectBoard.board[i+k][j-k].toUpperCase() )
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
                if( objectBoard.board[i][j]=="N" )
                {   
                    let knightSquares = createCoordinatesKnightAttack([i,j]);

                    for( let k = 0; k < knightSquares.length; k++ )
                    {
                        let m = knightSquares[k][0]; // m is rank of a Knight move
                        let n = knightSquares[k][1]; // n is file of a Knight move

                        if( objectBoard.board[m][n] == "" )
                        { // empty square (move is possible)
                            
                        }
                        else
                        {
                            if( objectBoard.board[m][n] == objectBoard.board[m][n].toLowerCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(n) + (8-m);
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                    }
                }
                if( objectBoard.board[i][j]=="P" )
                {
                    if( i == 3 )
                    { // White en passant is only possible if the pawn is on the 5th rank
                        if( objectBoard.enPassantSquare != "" )
                        { // if there even is an enpassant square to consider
                            let passantJ = letterToNumber(objectBoard.enPassantSquare.slice(0,1));

                            if( ((Number(passantJ) - j) == 1) || ((Number(passantJ) - j) == -1) )
                            { // if the currently checked pawn is 1 file away from the enpassant square
                                let startSquare = numberToLetter(j) + (8-i);
                                let move = startSquare + objectBoard.enPassantSquare;

                                
                                    arrayOfCaptures.push(move);
                                
                            }
                        }
                    }
                    if( i-1 > -1 )
                    {
                        

                        if( j+1 < 8 )
                        { // pawn attack to the east
                            if( i == 1 )
                            {
                                if( (objectBoard.board[i-1][j+1] == objectBoard.board[i-1][j+1].toLowerCase()) 
                                && (objectBoard.board[i-1][j+1] != ""))
                                {
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j+1) + (8-(i-1));
                                    let moveArray = [(startSquare + endSquare + "Q"),
                                                     (startSquare + endSquare + "R"),
                                                     (startSquare + endSquare + "N"),
                                                     (startSquare + endSquare + "B")];

                                    for( let x = 0; x < 4; x++ )
                                    {
                                        
                                            arrayOfCaptures.unshift(moveArray[x]); // unshift since promotion is probably better than usual captures
                                        
                                    }
                                }
                            }
                            else
                            {
                                if( (objectBoard.board[i-1][j+1] == objectBoard.board[i-1][j+1].toLowerCase()) 
                                && (objectBoard.board[i-1][j+1] != ""))
                                { // means a capture is possible
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j+1) + (8-(i-1));
                                    let move = startSquare + endSquare;

                                    
                                        arrayOfCaptures.unshift(move); // unshift because pawn captures are usually better
                                    
                                }
                            }
                        }
                        if( j-1 > -1 )
                        { // pawn attack to the west
                            if( i == 1 )
                            {
                                if( (objectBoard.board[i-1][j-1] == objectBoard.board[i-1][j-1].toLowerCase()) 
                                && (objectBoard.board[i-1][j-1] != ""))
                                {
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j-1) + (8-(i-1));
                                    let moveArray = [(startSquare + endSquare + "Q"),
                                                     (startSquare + endSquare + "R"),
                                                     (startSquare + endSquare + "N"),
                                                     (startSquare + endSquare + "B")];

                                    for( let x = 0; x < 4; x++ )
                                    {
                                        
                                            arrayOfCaptures.unshift(moveArray[x]); // unshift since promotion is probably better than usual captures
                                        
                                    }
                                }
                            }
                            else
                            {
                                if( (objectBoard.board[i-1][j-1] == objectBoard.board[i-1][j-1].toLowerCase()) 
                                && (objectBoard.board[i-1][j-1] != ""))
                                { // means a capture is possible
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j-1) + (8-(i-1));
                                    let move = startSquare + endSquare;

                                    
                                        arrayOfCaptures.unshift(move); // unshift because pawn captures are usually better
                                    
                                }
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
                if( objectBoard.board[i][j]=="q" )
                {
                    for( let k = 1; k < 8; k++ )
                    { // SouthEast direction
                        if( (i+k < 8) && (j+k < 8) )
                        {
                            if( objectBoard.board[i+k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i+k][j+k] == objectBoard.board[i+k][j+k].toLowerCase() )
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
                            if( objectBoard.board[i-k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i-k][j-k] == objectBoard.board[i-k][j-k].toLowerCase() )
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
                            if( objectBoard.board[i-k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i-k][j+k] == objectBoard.board[i-k][j+k].toLowerCase() )
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
                            if( objectBoard.board[i+k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i+k][j-k] == objectBoard.board[i+k][j-k].toLowerCase() )
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
                            if( objectBoard.board[i+k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i+k][j] == objectBoard.board[i+k][j].toLowerCase() )
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
                            if( objectBoard.board[i-k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i-k][j] == objectBoard.board[i-k][j].toLowerCase() )
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
                            if( objectBoard.board[i][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i][j-k] == objectBoard.board[i][j-k].toLowerCase() )
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
                            if( objectBoard.board[i][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i][j+k] == objectBoard.board[i][j+k].toLowerCase() )
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
                if( objectBoard.board[i][j]=="r" )
                {
                    for( let k = 1; k < 8; k++ )
                    { // South direction
                        if( i+k < 8 )
                        {
                            if( objectBoard.board[i+k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i+k][j] == objectBoard.board[i+k][j].toLowerCase() )
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
                            if( objectBoard.board[i-k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i-k][j] == objectBoard.board[i-k][j].toLowerCase() )
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
                            if( objectBoard.board[i][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i][j-k] == objectBoard.board[i][j-k].toLowerCase() )
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
                            if( objectBoard.board[i][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i][j+k] == objectBoard.board[i][j+k].toLowerCase() )
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
                if( objectBoard.board[i][j]=="b" )
                {
                    for( let k = 1; k < 8; k++ )
                    { // SouthEast direction
                        if( (i+k < 8) && (j+k < 8) )
                        {
                            if( objectBoard.board[i+k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i+k][j+k] == objectBoard.board[i+k][j+k].toLowerCase() )
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
                            if( objectBoard.board[i-k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i-k][j-k] == objectBoard.board[i-k][j-k].toLowerCase() )
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
                            if( objectBoard.board[i-k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i-k][j+k] == objectBoard.board[i-k][j+k].toLowerCase() )
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
                            if( objectBoard.board[i+k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                
                            }
                            else
                            {
                                if( objectBoard.board[i+k][j-k] == objectBoard.board[i+k][j-k].toLowerCase() )
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
                if( objectBoard.board[i][j]=="n" )
                {   
                    let knightSquares = createCoordinatesKnightAttack([i,j]);

                    for( let k = 0; k < knightSquares.length; k++ )
                    {
                        let m = knightSquares[k][0]; // m is rank of a Knight move
                        let n = knightSquares[k][1]; // n is file of a Knight move

                        if( objectBoard.board[m][n] == "" )
                        { // empty square (move is possible)
                            
                        }
                        else
                        {
                            if( objectBoard.board[m][n] == objectBoard.board[m][n].toUpperCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(n) + (8-m);
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                    }
                }
                if( objectBoard.board[i][j]=="p" )
                {
                    if( i == 4 )
                    { // Black en passant is only possible if the pawn is on the 4th rank
                        if( objectBoard.enPassantSquare != "" )
                        { // if there even is an enpassant square to consider
                            let passantJ = letterToNumber(objectBoard.enPassantSquare.slice(0,1));

                            if( ((Number(passantJ) - j) == 1) || ((Number(passantJ) - j) == -1) )
                            { // if the currently checked pawn is 1 file away from the enpassant square
                                let startSquare = numberToLetter(j) + (8-i);
                                let move = startSquare + objectBoard.enPassantSquare;

                                
                                    arrayOfCaptures.push(move);
                                
                            }
                        }
                    }
                    if( i+1 < 8 )
                    {
                        

                        if( j+1 < 8 )
                        { // pawn attack to the east
                            if( i == 6 )
                            {
                                if( (objectBoard.board[i+1][j+1] == objectBoard.board[i+1][j+1].toUpperCase()) 
                                && (objectBoard.board[i+1][j+1] != ""))
                                {
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j+1) + (8-(i+1));
                                    let moveArray = [(startSquare + endSquare + "Q"),
                                                     (startSquare + endSquare + "R"),
                                                     (startSquare + endSquare + "N"),
                                                     (startSquare + endSquare + "B")];

                                    for( let x = 0; x < 4; x++ )
                                    {
                                        
                                            arrayOfCaptures.unshift(moveArray[x]); // unshift since promotion is probably better than usual captures
                                        
                                    }
                                }
                            }
                            else
                            {
                                if( (objectBoard.board[i+1][j+1] == objectBoard.board[i+1][j+1].toUpperCase()) 
                                && (objectBoard.board[i+1][j+1] != ""))
                                { // means a capture is possible
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j+1) + (8-(i+1));
                                    let move = startSquare + endSquare;

                                    
                                        arrayOfCaptures.unshift(move); // unshift because pawn captures are usually better
                                    
                                }
                            }
                        }
                        if( j-1 > -1 )
                        { // pawn attack to the west
                            if( i == 6 )
                            {
                                if( (objectBoard.board[i+1][j-1] == objectBoard.board[i+1][j-1].toUpperCase()) 
                                && (objectBoard.board[i+1][j-1] != ""))
                                {
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j-1) + (8-(i+1));
                                    let moveArray = [(startSquare + endSquare + "Q"),
                                                     (startSquare + endSquare + "R"),
                                                     (startSquare + endSquare + "N"),
                                                     (startSquare + endSquare + "B")];

                                    for( let x = 0; x < 4; x++ )
                                    {
                                        
                                            arrayOfCaptures.unshift(moveArray[x]); // unshift since promotion is probably better than usual captures
                                        
                                    }
                                }
                            }
                            else
                            {
                                if( (objectBoard.board[i+1][j-1] == objectBoard.board[i+1][j-1].toUpperCase()) 
                                && (objectBoard.board[i+1][j-1] != ""))
                                { // means a capture is possible
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j-1) + (8-(i+1));
                                    let move = startSquare + endSquare;

                                    
                                        arrayOfCaptures.unshift(move); // unshift because pawn captures are usually better
                                    
                                }
                            }
                        }
                    }
                }
                
            }
        }
    }

    return arrayOfCaptures;
    // ^^ could instead return an object to retain information of what moves are...
    // ...captures, checks, or otherwise
}

const checkmateOrStaleMateChecker = function(board)
{ // takes a board and returns a negative infinity for checkmate and 0 for draw

    let legalMoveArray = legalMovesFromConventionalBoard(board);

    if( legalMoveArray.length == 0 )
    { // If there are no legal moves
        if( isTheSideToMoveInCheckChecker(board) == true )
        { // means side to move is checkmated
            return -100000; // super low value to indicate this is undesirable for the side to move
        }
        else
        { // means side to move is stalemated
            return 0; // it's a draw, neutral result for the side to move
        }
    }

    return false; // there are legal moves, continue playing
}

const simpleFreedom = function(board) // Gives the difference in number of legal moves
{
    let copyOfBoardB = structuredClone(board);

    copyOfBoardB.sideToMove = !copyOfBoardB.sideToMove;

    let sideToMoveCount = legalMovesFromConventionalBoard(board).length;
    let sideNotToMoveCount = legalMovesFromConventionalBoard(copyOfBoardB).length;

    return sideToMoveCount - sideNotToMoveCount;
}

const simplePseudoFreedom = function(board) // Gives the difference in number of legal moves
{
    let copyOfBoardB = structuredClone(board);

    copyOfBoardB.sideToMove = !copyOfBoardB.sideToMove;

    let sideToMoveCount = pseudolegalMovesFromConventionalBoard(board).length;
    let sideNotToMoveCount = pseudolegalMovesFromConventionalBoard(copyOfBoardB).length;

    return sideToMoveCount - sideNotToMoveCount;
}

const pieceActivityEval = function(board) // Gives the difference in piece activity
{
    let copyOfBoard = structuredClone(board);

    copyOfBoard.sideToMove = !copyOfBoard.sideToMove;

    return pieceActivityFromBoard(board) - pieceActivityFromBoard(copyOfBoard);
}

const simpleMaterial = function(board) // Classic 1, 3, 3, 5, 9 material eval
{
    let materialCount = 0;

        board.board.forEach(row =>
        {
            row.forEach( piece => 
            {
                if( piece == "P" )
                {
                    materialCount += 100;
                }
                if( piece == "N" )
                {
                    materialCount += 300;
                }
                if( piece == "B" )
                {
                    materialCount += 300;
                }
                if( piece == "R" )
                {
                    materialCount += 500;
                }
                if( piece == "Q" )
                {
                    materialCount += 900;
                }
    
                if( piece == "p" )
                {
                    materialCount -= 100;
                }
                if( piece == "n" )
                {
                    materialCount -= 300;
                }
                if( piece == "b" )
                {
                    materialCount -= 300;
                }
                if( piece == "r" )
                {
                    materialCount -= 500;
                }
                if( piece == "q" )
                {
                    materialCount -= 900;
                }
            })
        });
    
    if( board.sideToMove == false )
    {
        materialCount = materialCount * -1;
    }

    return materialCount;
}

const randomAI = function(fenString)
{ // takes FEN and returns new FEN
    let array = legalMovesFromFEN(fenString);
    let arraySize = array.length;
    let randomNumber = Math.floor(Math.random() * arraySize );
    let chosenMove = array[randomNumber];
    gameHistoryArray.push(chosenMove);

    return boardToFEN(conventionalBoardProcessMove(fenToConventionalBoard(fenString),chosenMove));
}

const checkGameState = function(currentFEN)
{ // Takes the current FEN and checks if it's stalemate or checkmate. Returns false if the game is over.
    let currentBoard = fenToConventionalBoard(currentFEN);

    let legalMoveArray = legalMovesFromConventionalBoard(currentBoard);

    if( legalMoveArray.length == 0 )
    { // If there are no legal moves
        if( isTheSideToMoveInCheckChecker(currentBoard) == true )
        { // means player to move is checkmated
            if( playerTurn == true )
            {
                playerLoses();
                return false;
            }
            else
            {
                playerWins();
                return false;
            }
        }
        else
        { // means player to move is stalemated
            playerStalemate();
            return false;
        }
    }

    return true;
}

// Perf test

const perfTest = function(board,depth)
{
    let numberOfMoves = 0;
    
    if( depth==1 )
    {
        let moveList = legalMovesFromConventionalBoard(board);
        return moveList.length;
    }
    else
    {
        let moveList = legalMovesFromConventionalBoard(board);

        for( let i = 0; i < moveList.length; i++ )
        {
            let newBoard = conventionalBoardProcessMove(board,moveList[i]);
            numberOfMoves += perfTest(newBoard,(depth-1));
        }
    }

    return numberOfMoves;
};

const perfTestVerbose = function(board,depth)
{
    let moveList = legalMovesFromConventionalBoard(board);
    let total = 0;

    for( let i = 0; i < moveList.length; i++ )
    {
        let newBoard = conventionalBoardProcessMove(board,moveList[i]);
        let newBoardCount = perfTest(newBoard,(depth-1));
        console.log(moveList[i] + ": " + newBoardCount + " nodes");
        total += newBoardCount;
    }

    return "Total is: " + total + " nodes";
};
// ENGINE STUFF
//vv also referred to as objectBoard vv
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
    canWhiteCastleKingside: true,
    canWhiteCastleQueenside: true,
    canBlackCastleKingside: true,
    canBlackCastleQueenside: true,
    enPassantSquare: "",
    castlingRights: [true,true,true,true], // White Kingside, White Queenside, Black Kingside, Black Queenside
    halfMoveClock: 0,
    fullMoveNumber: 1,
};

const fenToConventionalBoard = function(fenString)
{
    let objectBoard = 
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
            canWhiteCastleKingside: true,
            canWhiteCastleQueenside: true,
            canBlackCastleKingside: true,
            canBlackCastleQueenside: true,
            enPassantSquare: "",
            halfMoveClock: 0,
            fullMoveNumber: 1,
    };

    objectBoard.fullMoveNumber = fenString.slice(-1);
    fenString = fenString.slice(0,-2);

    objectBoard.halfMoveClock = fenString.slice(-1);
    fenString = fenString.slice(0,-2);

    objectBoard.enPassantSquare = fenString.slice(-1);
    if( fenString.slice(-1) == "-" )
    {
        objectBoard.enPassantSquare = "";
        fenString = fenString.slice(0,-2);
    }
    else
    {
        objectBoard.enPassantSquare = fenString.slice(-2);
        fenString = fenString.slice(0,-3);
    }
    

    let sideAndCastling = fenString.slice(1+fenString.indexOf(" "));
    if( sideAndCastling.slice(0,1)=="w")
    {
        objectBoard.sideToMove = true;
    }
    else
    {
        objectBoard.sideToMove = false;
    }
    sideAndCastling = sideAndCastling.slice(1+sideAndCastling.indexOf(" "));

    if(sideAndCastling.indexOf("K") == -1)
    {
        objectBoard.canWhiteCastleKingside = false;
    }
    if(sideAndCastling.indexOf("Q") == -1)
    {
        objectBoard.canWhiteCastleQueenside = false;
    }
    if(sideAndCastling.indexOf("k") == -1)
    {
        objectBoard.canBlackCastleKingside = false;
    }
    if(sideAndCastling.indexOf("q") == -1)
    {
        objectBoard.canBlackCastleQueenside = false;
    }

    fenString = fenString.slice(0,fenString.indexOf(" "));


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
                    objectBoard.board[currentRank][currentFile] = "P";
                    currentFile++;
                }
                if(element=="p")
                {
                    objectBoard.board[currentRank][currentFile] = "p";
                    currentFile++;
                }
                if(element=="N")
                {
                    objectBoard.board[currentRank][currentFile] = "N";
                    currentFile++;
                }
                if(element=="n")
                {
                    objectBoard.board[currentRank][currentFile] = "n";
                    currentFile++;
                }
                if(element=="B")
                {
                    objectBoard.board[currentRank][currentFile] = "B";
                    currentFile++;
                }
                if(element=="b")
                {
                    objectBoard.board[currentRank][currentFile] = "b";
                    currentFile++;
                }
                if(element=="R")
                {
                    objectBoard.board[currentRank][currentFile] = "R";
                    currentFile++;
                }
                if(element=="r")
                {
                    objectBoard.board[currentRank][currentFile] = "r";
                    currentFile++;
                }
                if(element=="Q")
                {
                    objectBoard.board[currentRank][currentFile] = "Q";
                    currentFile++;
                }
                if(element=="q")
                {
                    objectBoard.board[currentRank][currentFile] = "q";
                    currentFile++;
                }
                if(element=="K")
                {
                    objectBoard.board[currentRank][currentFile] = "K";
                    currentFile++;
                }
                if(element=="k")
                {
                    objectBoard.board[currentRank][currentFile] = "k";
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

    return objectBoard;
}

const legalMovesFromConventionalBoard = function(objectBoard)
{   
    let arrayOfPseudoLegalMoves = pseudolegalMovesFromConventionalBoard(objectBoard);
    let arrayOfLegalMoves = arrayOfPseudoLegalMoves.filter(function(element)
    {
        let newBoard = conventionalBoardProcessMove(objectBoard,element);
        return !isTheSideNotToMoveInCheckChecker(newBoard);
    });
    return arrayOfLegalMoves;
}

const legalMovesFromFEN = function(fenString)
{
    return legalMovesFromConventionalBoard(fenToConventionalBoard(fenString));
}

const legalPromotionMovesFromFEN = function(fenString)
{
    return legalPromotionMovesFromBoard(fenToConventionalBoard(fenString));
}

const legalPromotionMovesFromBoard = function( board )
{
    let moveArray = legalMovesFromConventionalBoard(board);

    return moveArray.filter( a => a.length > 4 );
}

const legalPromotionMovesFromFENTruncated = function( fenString )
{
    let array = legalPromotionMovesFromFEN( fenString );
    return array.map( a => a.slice(0,-1) );
}

const legalStartingSquaresFromFEN = function(fenString)
{
    let array = legalMovesFromFEN(fenString);
    return array.map( x => x.slice(0,2));
}

const pseudolegalMovesFromConventionalBoard = function(objectBoard)
{
    let arrayOfChecks = [];
    let arrayOfPawnCaptures = [];
    let arrayOfCaptures = [];
    let arrayOfSpecialMoves = []; // for promotion and castling
    let arrayOfOtherMoves = [];
    // ^ This will be primitive move-ordering to help the alpha-beta search

    if( objectBoard.sideToMove==true )
    { // White to move
        for( let i = 7; i > -1; i-- )
        {
            for( let j = 7; j > -1; j-- )
            { // i and j stand for rank and file 
                if( objectBoard.board[i][j]=="Q" )
                {
                    for( let k = 1; k < 8; k++ )
                    { // SouthEast direction
                        if( (i+k < 8) && (j+k < 8) )
                        {
                            if( objectBoard.board[i+k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j+k) + (8-(i+k));
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i+k][j+k] == objectBoard.board[i+k][j+k].toUpperCase() )
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
                            if( objectBoard.board[i-k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j-k) + (8-(i-k));
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i-k][j-k] == objectBoard.board[i-k][j-k].toUpperCase() )
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
                            if( objectBoard.board[i-k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j+k) + (8-(i-k));
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i-k][j+k] == objectBoard.board[i-k][j+k].toUpperCase() )
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
                            if( objectBoard.board[i+k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j-k) + (8-(i+k));
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i+k][j-k] == objectBoard.board[i+k][j-k].toUpperCase() )
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
                            if( objectBoard.board[i+k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j) + (8-(i+k));
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i+k][j] == objectBoard.board[i+k][j].toUpperCase() )
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
                            if( objectBoard.board[i-k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j) + (8-(i-k));
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i-k][j] == objectBoard.board[i-k][j].toUpperCase() )
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
                            if( objectBoard.board[i][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j-k)) + (8-i);
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i][j-k] == objectBoard.board[i][j-k].toUpperCase() )
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
                            if( objectBoard.board[i][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j+k)) + (8-i);
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i][j+k] == objectBoard.board[i][j+k].toUpperCase() )
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
                if( objectBoard.board[i][j]=="R" )
                {
                    for( let k = 1; k < 8; k++ )
                    { // South direction
                        if( i+k < 8 )
                        {
                            if( objectBoard.board[i+k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j) + (8-(i+k));
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i+k][j] == objectBoard.board[i+k][j].toUpperCase() )
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
                            if( objectBoard.board[i-k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j) + (8-(i-k));
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i-k][j] == objectBoard.board[i-k][j].toUpperCase() )
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
                            if( objectBoard.board[i][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j-k)) + (8-i);
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i][j-k] == objectBoard.board[i][j-k].toUpperCase() )
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
                            if( objectBoard.board[i][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j+k)) + (8-i);
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i][j+k] == objectBoard.board[i][j+k].toUpperCase() )
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
                if( objectBoard.board[i][j]=="B" )
                {
                    for( let k = 1; k < 8; k++ )
                    { // SouthEast direction
                        if( (i+k < 8) && (j+k < 8) )
                        {
                            if( objectBoard.board[i+k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j+k) + (8-(i+k));
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i+k][j+k] == objectBoard.board[i+k][j+k].toUpperCase() )
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
                            if( objectBoard.board[i-k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j-k) + (8-(i-k));
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i-k][j-k] == objectBoard.board[i-k][j-k].toUpperCase() )
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
                            if( objectBoard.board[i-k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j+k) + (8-(i-k));
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i-k][j+k] == objectBoard.board[i-k][j+k].toUpperCase() )
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
                            if( objectBoard.board[i+k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j-k) + (8-(i+k));
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i+k][j-k] == objectBoard.board[i+k][j-k].toUpperCase() )
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
                if( objectBoard.board[i][j]=="N" )
                {   
                    let knightSquares = createCoordinatesKnightAttack([i,j]);

                    for( let k = 0; k < knightSquares.length; k++ )
                    {
                        let m = knightSquares[k][0]; // m is rank of a Knight move
                        let n = knightSquares[k][1]; // n is file of a Knight move

                        if( objectBoard.board[m][n] == "" )
                        { // empty square (move is possible)
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter(n) + (8-m);
                            let move = startSquare + endSquare;

                            if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                            if( objectBoard.board[m][n] == objectBoard.board[m][n].toLowerCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(n) + (8-m);
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                    }
                }
                if( objectBoard.board[i][j]=="P" )
                {
                    if( i == 3 )
                    { // White en passant is only possible if the pawn is on the 5th rank
                        if( objectBoard.enPassantSquare != "" )
                        { // if there even is an enpassant square to consider
                            let passantJ = letterToNumber(objectBoard.enPassantSquare.slice(0,1));

                            if( ((Number(passantJ) - j) == 1) || ((Number(passantJ) - j) == -1) )
                            { // if the currently checked pawn is 1 file away from the enpassant square
                                let startSquare = numberToLetter(j) + (8-i);
                                let move = startSquare + objectBoard.enPassantSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfPawnCaptures.push(move);
                                }
                            }
                        }
                    }
                    if( i-1 > -1 )
                    {
                        if( objectBoard.board[i-1][j]=="" )
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
                                    if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,moveArray[x])))
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
                                    if( objectBoard.board[4][j]=="" )
                                    {
                                        let startSquare = numberToLetter(j) + "2";
                                        let endSquare = numberToLetter(j) + "4";
                                        let move = startSquare + endSquare;
    
                                        if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( (objectBoard.board[i-1][j+1] == objectBoard.board[i-1][j+1].toLowerCase()) 
                                && (objectBoard.board[i-1][j+1] != ""))
                                {
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j+1) + (8-(i-1));
                                    let moveArray = [(startSquare + endSquare + "Q"),
                                                     (startSquare + endSquare + "R"),
                                                     (startSquare + endSquare + "N"),
                                                     (startSquare + endSquare + "B")];

                                    for( let x = 0; x < 4; x++ )
                                    {
                                        if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,moveArray[x])))
                                        {   // if true then the move gives check
                                            arrayOfChecks.unshift(moveArray[x]); // unshift since promotion is probably better than usual checks
                                        }
                                        else
                                        {
                                            arrayOfPawnCaptures.unshift(moveArray[x]); // unshift since promotion is probably better than usual captures
                                        }
                                    }
                                }
                            }
                            else
                            {
                                if( (objectBoard.board[i-1][j+1] == objectBoard.board[i-1][j+1].toLowerCase()) 
                                && (objectBoard.board[i-1][j+1] != ""))
                                { // means a capture is possible
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j+1) + (8-(i-1));
                                    let move = startSquare + endSquare;

                                    if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
                                    {   // if true then the move gives check
                                        arrayOfChecks.push(move);
                                    }
                                    else
                                    {
                                        arrayOfPawnCaptures.unshift(move); // unshift because pawn captures are usually better
                                    }
                                }
                            }
                        }
                        if( j-1 > -1 )
                        { // pawn attack to the west
                            if( i == 1 )
                            {
                                if( (objectBoard.board[i-1][j-1] == objectBoard.board[i-1][j-1].toLowerCase()) 
                                && (objectBoard.board[i-1][j-1] != ""))
                                {
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j-1) + (8-(i-1));
                                    let moveArray = [(startSquare + endSquare + "Q"),
                                                     (startSquare + endSquare + "R"),
                                                     (startSquare + endSquare + "N"),
                                                     (startSquare + endSquare + "B")];

                                    for( let x = 0; x < 4; x++ )
                                    {
                                        if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,moveArray[x])))
                                        {   // if true then the move gives check
                                            arrayOfChecks.unshift(moveArray[x]); // unshift since promotion is probably better than usual checks
                                        }
                                        else
                                        {
                                            arrayOfPawnCaptures.unshift(moveArray[x]); // unshift since promotion is probably better than usual captures
                                        }
                                    }
                                }
                            }
                            else
                            {
                                if( (objectBoard.board[i-1][j-1] == objectBoard.board[i-1][j-1].toLowerCase()) 
                                && (objectBoard.board[i-1][j-1] != ""))
                                { // means a capture is possible
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j-1) + (8-(i-1));
                                    let move = startSquare + endSquare;

                                    if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
                                    {   // if true then the move gives check
                                        arrayOfChecks.push(move);
                                    }
                                    else
                                    {
                                        arrayOfPawnCaptures.unshift(move); // unshift because pawn captures are usually better
                                    }
                                }
                            }
                        }
                    }
                }
                if( objectBoard.board[i][j]=="K" )
                {
                    if( objectBoard.canWhiteCastleKingside == true )
                    { // White can castle Kingside
                        if( !isTheSideToMoveInCheckChecker(objectBoard))
                        {
                            if((objectBoard.board[7][7] == "R") && ((i==7) && (j==4)) &&
                            (objectBoard.board[7][6] == "") && (objectBoard.board[7][5] == ""))
                            {
                                if( !isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard, "e1f1")))
                                {
                                    arrayOfSpecialMoves.push("e1g1");
                                }
                            }
                        }
                    }
                    if( objectBoard.canWhiteCastleQueenside == true )
                    { // White can castle Queenside
                        if( !isTheSideToMoveInCheckChecker(objectBoard))
                        {
                            if((objectBoard.board[7][0] == "R") && ((i==7) && (j==4)) && 
                            (objectBoard.board[7][1] == "") && (objectBoard.board[7][2] == "")
                            && (objectBoard.board[7][3] == ""))
                            {
                                if( !isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard, "e1d1")))
                                {
                                    arrayOfSpecialMoves.push("e1c1");
                                }
                            }
                        }
                    }

                    if( i+1 < 8 )
                    { // South direction
                        if( objectBoard.board[i+1][j]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter(j) + (8-(i+1));

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( objectBoard.board[i+1][j] == objectBoard.board[i+1][j].toLowerCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j) + (8-(i+1));
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                    if( i-1 > -1 )
                    { // North direction
                        if( objectBoard.board[i-1][j]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter(j) + (8-(i-1));

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( objectBoard.board[i-1][j] == objectBoard.board[i-1][j].toLowerCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j) + (8-(i-1));
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                    if( j+1 < 8 )
                    { // East direction
                        if( objectBoard.board[i][j+1]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter((j+1)) + (8-i);

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( objectBoard.board[i][j+1] == objectBoard.board[i][j+1].toLowerCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j+1)) + (8-i);
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                    if( j-1 > -1 )
                    { // West direction
                        if( objectBoard.board[i][j-1]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter((j-1)) + (8-i);

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( objectBoard.board[i][j-1] == objectBoard.board[i][j-1].toLowerCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j-1)) + (8-i);
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                    if( (i+1 < 8) && (j+1 < 8) )
                    { // SouthEast direction
                        if( objectBoard.board[i+1][j+1]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter((j+1)) + (8-(i+1));

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( objectBoard.board[i+1][j+1] == objectBoard.board[i+1][j+1].toLowerCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j+1)) + (8-(i+1));
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                    if( (i-1 > -1) && (j-1 > -1) )
                    { // NorthWest direction
                        if( objectBoard.board[i-1][j-1]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter((j-1)) + (8-(i-1));

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( objectBoard.board[i-1][j-1] == objectBoard.board[i-1][j-1].toLowerCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j-1)) + (8-(i-1));
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                    if( (i+1 < 8) && (j-1 > -1) )
                    { // SouthWest direction
                        if( objectBoard.board[i+1][j-1]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter((j-1)) + (8-(i+1));

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( objectBoard.board[i+1][j-1] == objectBoard.board[i+1][j-1].toLowerCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j-1)) + (8-(i+1));
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                    if( (i-1 > -1) && (j+1 < 8) )
                    { // NorthEast direction
                        if( objectBoard.board[i-1][j+1]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter((j+1)) + (8-(i-1));

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( objectBoard.board[i-1][j+1] == objectBoard.board[i-1][j+1].toLowerCase() )
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
                if( objectBoard.board[i][j]=="q" )
                {
                    for( let k = 1; k < 8; k++ )
                    { // SouthEast direction
                        if( (i+k < 8) && (j+k < 8) )
                        {
                            if( objectBoard.board[i+k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j+k) + (8-(i+k));
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i+k][j+k] == objectBoard.board[i+k][j+k].toLowerCase() )
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
                            if( objectBoard.board[i-k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j-k) + (8-(i-k));
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i-k][j-k] == objectBoard.board[i-k][j-k].toLowerCase() )
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
                            if( objectBoard.board[i-k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j+k) + (8-(i-k));
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i-k][j+k] == objectBoard.board[i-k][j+k].toLowerCase() )
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
                            if( objectBoard.board[i+k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j-k) + (8-(i+k));
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i+k][j-k] == objectBoard.board[i+k][j-k].toLowerCase() )
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
                            if( objectBoard.board[i+k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j) + (8-(i+k));
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i+k][j] == objectBoard.board[i+k][j].toLowerCase() )
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
                            if( objectBoard.board[i-k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j) + (8-(i-k));
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i-k][j] == objectBoard.board[i-k][j].toLowerCase() )
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
                            if( objectBoard.board[i][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j-k)) + (8-i);
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i][j-k] == objectBoard.board[i][j-k].toLowerCase() )
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
                            if( objectBoard.board[i][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j+k)) + (8-i);
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i][j+k] == objectBoard.board[i][j+k].toLowerCase() )
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
                if( objectBoard.board[i][j]=="r" )
                {
                    for( let k = 1; k < 8; k++ )
                    { // South direction
                        if( i+k < 8 )
                        {
                            if( objectBoard.board[i+k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j) + (8-(i+k));
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i+k][j] == objectBoard.board[i+k][j].toLowerCase() )
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
                            if( objectBoard.board[i-k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j) + (8-(i-k));
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i-k][j] == objectBoard.board[i-k][j].toLowerCase() )
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
                            if( objectBoard.board[i][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j-k)) + (8-i);
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i][j-k] == objectBoard.board[i][j-k].toLowerCase() )
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
                            if( objectBoard.board[i][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j+k)) + (8-i);
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i][j+k] == objectBoard.board[i][j+k].toLowerCase() )
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
                if( objectBoard.board[i][j]=="b" )
                {
                    for( let k = 1; k < 8; k++ )
                    { // SouthEast direction
                        if( (i+k < 8) && (j+k < 8) )
                        {
                            if( objectBoard.board[i+k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j+k) + (8-(i+k));
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i+k][j+k] == objectBoard.board[i+k][j+k].toLowerCase() )
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
                            if( objectBoard.board[i-k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j-k) + (8-(i-k));
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i-k][j-k] == objectBoard.board[i-k][j-k].toLowerCase() )
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
                            if( objectBoard.board[i-k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j+k) + (8-(i-k));
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i-k][j+k] == objectBoard.board[i-k][j+k].toLowerCase() )
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
                            if( objectBoard.board[i+k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j-k) + (8-(i+k));
                                let move = startSquare+endSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( objectBoard.board[i+k][j-k] == objectBoard.board[i+k][j-k].toLowerCase() )
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
                if( objectBoard.board[i][j]=="n" )
                {   
                    let knightSquares = createCoordinatesKnightAttack([i,j]);

                    for( let k = 0; k < knightSquares.length; k++ )
                    {
                        let m = knightSquares[k][0]; // m is rank of a Knight move
                        let n = knightSquares[k][1]; // n is file of a Knight move

                        if( objectBoard.board[m][n] == "" )
                        { // empty square (move is possible)
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter(n) + (8-m);
                            let move = startSquare + endSquare;

                            if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                            if( objectBoard.board[m][n] == objectBoard.board[m][n].toUpperCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(n) + (8-m);
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                    }
                }
                if( objectBoard.board[i][j]=="p" )
                {
                    if( i == 4 )
                    { // Black en passant is only possible if the pawn is on the 4th rank
                        if( objectBoard.enPassantSquare != "" )
                        { // if there even is an enpassant square to consider
                            let passantJ = letterToNumber(objectBoard.enPassantSquare.slice(0,1));

                            if( ((Number(passantJ) - j) == 1) || ((Number(passantJ) - j) == -1) )
                            { // if the currently checked pawn is 1 file away from the enpassant square
                                let startSquare = numberToLetter(j) + (8-i);
                                let move = startSquare + objectBoard.enPassantSquare;

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
                                {   // if true then the move gives check
                                    arrayOfChecks.push(move);
                                }
                                else
                                {
                                    arrayOfPawnCaptures.push(move);
                                }
                            }
                        }
                    }
                    if( i+1 < 8 )
                    {
                        if( objectBoard.board[i+1][j]=="" )
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
                                    if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,moveArray[x])))
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
                                    if( objectBoard.board[3][j]=="" )
                                    {
                                        let startSquare = numberToLetter(j) + "7";
                                        let endSquare = numberToLetter(j) + "5";
                                        let move = startSquare + endSquare;
    
                                        if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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

                                if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
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
                                if( (objectBoard.board[i+1][j+1] == objectBoard.board[i+1][j+1].toUpperCase()) 
                                && (objectBoard.board[i+1][j+1] != ""))
                                {
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j+1) + (8-(i+1));
                                    let moveArray = [(startSquare + endSquare + "Q"),
                                                     (startSquare + endSquare + "R"),
                                                     (startSquare + endSquare + "N"),
                                                     (startSquare + endSquare + "B")];

                                    for( let x = 0; x < 4; x++ )
                                    {
                                        if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,moveArray[x])))
                                        {   // if true then the move gives check
                                            arrayOfChecks.unshift(moveArray[x]); // unshift since promotion is probably better than usual checks
                                        }
                                        else
                                        {
                                            arrayOfPawnCaptures.unshift(moveArray[x]); // unshift since promotion is probably better than usual captures
                                        }
                                    }
                                }
                            }
                            else
                            {
                                if( (objectBoard.board[i+1][j+1] == objectBoard.board[i+1][j+1].toUpperCase()) 
                                && (objectBoard.board[i+1][j+1] != ""))
                                { // means a capture is possible
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j+1) + (8-(i+1));
                                    let move = startSquare + endSquare;

                                    if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
                                    {   // if true then the move gives check
                                        arrayOfChecks.push(move);
                                    }
                                    else
                                    {
                                        arrayOfPawnCaptures.unshift(move); // unshift because pawn captures are usually better
                                    }
                                }
                            }
                        }
                        if( j-1 > -1 )
                        { // pawn attack to the west
                            if( i == 6 )
                            {
                                if( (objectBoard.board[i+1][j-1] == objectBoard.board[i+1][j-1].toUpperCase()) 
                                && (objectBoard.board[i+1][j-1] != ""))
                                {
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j-1) + (8-(i+1));
                                    let moveArray = [(startSquare + endSquare + "Q"),
                                                     (startSquare + endSquare + "R"),
                                                     (startSquare + endSquare + "N"),
                                                     (startSquare + endSquare + "B")];

                                    for( let x = 0; x < 4; x++ )
                                    {
                                        if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,moveArray[x])))
                                        {   // if true then the move gives check
                                            arrayOfChecks.unshift(moveArray[x]); // unshift since promotion is probably better than usual checks
                                        }
                                        else
                                        {
                                            arrayOfPawnCaptures.unshift(moveArray[x]); // unshift since promotion is probably better than usual captures
                                        }
                                    }
                                }
                            }
                            else
                            {
                                if( (objectBoard.board[i+1][j-1] == objectBoard.board[i+1][j-1].toUpperCase()) 
                                && (objectBoard.board[i+1][j-1] != ""))
                                { // means a capture is possible
                                    let startSquare = numberToLetter(j) + (8-i);
                                    let endSquare = numberToLetter(j-1) + (8-(i+1));
                                    let move = startSquare + endSquare;

                                    if( isTheSideToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard,move)))
                                    {   // if true then the move gives check
                                        arrayOfChecks.push(move);
                                    }
                                    else
                                    {
                                        arrayOfPawnCaptures.unshift(move); // unshift because pawn captures are usually better
                                    }
                                }
                            }
                        }
                    }
                }
                if( objectBoard.board[i][j]=="k" )
                {
                    if( objectBoard.canBlackCastleKingside == true )
                    { // Black can castle Kingside
                        if( !isTheSideToMoveInCheckChecker(objectBoard))
                        {
                            if((objectBoard.board[0][7] == "r") && ((i==0) && (j==4)) &&
                            (objectBoard.board[0][6] == "") && (objectBoard.board[0][5] == ""))
                            {   
                                if( !isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard, "e8f8")))
                                {
                                    arrayOfSpecialMoves.push("e8g8");
                                }
                            }
                        }
                    }
                    if( objectBoard.canBlackCastleQueenside == true )
                    { // Black can castle Queenside
                        if( !isTheSideToMoveInCheckChecker(objectBoard))
                        {
                            if((objectBoard.board[0][0] == "r") && ((i==0) && (j==4)) &&
                            (objectBoard.board[0][1] == "") && (objectBoard.board[0][2] == "")
                            && (objectBoard.board[0][3] == ""))
                            {
                                if( !isTheSideNotToMoveInCheckChecker(conventionalBoardProcessMove(objectBoard, "e8d8")))
                                {
                                    arrayOfSpecialMoves.push("e8c8");
                                }
                            }
                        }
                    }

                    if( i+1 < 8 )
                    { // South direction
                        if( objectBoard.board[i+1][j]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter(j) + (8-(i+1));

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( objectBoard.board[i+1][j] == objectBoard.board[i+1][j].toUpperCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j) + (8-(i+1));
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                    if( i-1 > -1 )
                    { // North direction
                        if( objectBoard.board[i-1][j]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter(j) + (8-(i-1));

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( objectBoard.board[i-1][j] == objectBoard.board[i-1][j].toUpperCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter(j) + (8-(i-1));
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                    if( j+1 < 8 )
                    { // East direction
                        if( objectBoard.board[i][j+1]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter((j+1)) + (8-i);

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( objectBoard.board[i][j+1] == objectBoard.board[i][j+1].toUpperCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j+1)) + (8-i);
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                    if( j-1 > -1 )
                    { // West direction
                        if( objectBoard.board[i][j-1]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter((j-1)) + (8-i);

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( objectBoard.board[i][j-1] == objectBoard.board[i][j-1].toUpperCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j-1)) + (8-i);
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                    if( (i+1 < 8) && (j+1 < 8) )
                    { // SouthEast direction
                        if( objectBoard.board[i+1][j+1]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter((j+1)) + (8-(i+1));

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( objectBoard.board[i+1][j+1] == objectBoard.board[i+1][j+1].toUpperCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j+1)) + (8-(i+1));
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                    if( (i-1 > -1) && (j-1 > -1) )
                    { // NorthWest direction
                        if( objectBoard.board[i-1][j-1]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter((j-1)) + (8-(i-1));

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( objectBoard.board[i-1][j-1] == objectBoard.board[i-1][j-1].toUpperCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j-1)) + (8-(i-1));
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                    if( (i+1 < 8) && (j-1 > -1) )
                    { // SouthWest direction
                        if( objectBoard.board[i+1][j-1]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter((j-1)) + (8-(i+1));

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( objectBoard.board[i+1][j-1] == objectBoard.board[i+1][j-1].toUpperCase() )
                            { // this means a capture of an enemy piece
                                let startSquare = numberToLetter(j) + (8-i);
                                let endSquare = numberToLetter((j-1)) + (8-(i+1));
    
                                arrayOfCaptures.unshift((startSquare+endSquare));
                            }
                        }
                        
                    }
                    if( (i-1 > -1) && (j+1 < 8) )
                    { // NorthEast direction
                        if( objectBoard.board[i-1][j+1]=="" )
                        { // empty square means a move is possible
                            let startSquare = numberToLetter(j) + (8-i);
                            let endSquare = numberToLetter((j+1)) + (8-(i-1));

                            arrayOfOtherMoves.push((startSquare+endSquare));
                        }
                        else
                        {
                            if( objectBoard.board[i-1][j+1] == objectBoard.board[i-1][j+1].toUpperCase() )
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

    return arrayOfPawnCaptures.concat(arrayOfCaptures.concat(arrayOfChecks.concat(arrayOfSpecialMoves,arrayOfOtherMoves)));
    // ^^ could instead return an object to retain information of what moves are...
    // ...captures, checks, or otherwise
}

const kingSafetyEval = function(objectBoard)
{
    let clone = structuredClone(objectBoard);
    clone.sideToMove = !clone.sideToMove;

    return (kingSafetyFromBoard(objectBoard))-(kingSafetyFromBoard(clone));
}

const kingSafetyFromBoard = function(objectBoard)
{
    if(objectBoard.sideToMove==true)
    {//white to move
        if(isThereAnEnemyQueen(objectBoard))
        {
            if((objectBoard.canWhiteCastleKingside==true)||(objectBoard.canWhiteCastleQueenside==true))
            {
                return 0; //king still in centre but can castle so it's not bad
            }
            else
            { //King can't castle... is it because King HAS castled?
                let coor = findCoordinatesOfKing(objectBoard,true);
                if(coor[0]==7)
                {
                    if((coor[1]==0)
                    ||(coor[1]==1)
                    ||(coor[1]==7))
                    {
                        return 1; //king castled! Good
                    }
                    else
                    {
                        return -1; //king is in the centre and can't castle and there are queens. Bad.
                    }
                }
                else
                {
                    return -1; //King can't castle and is in the centre with Queens on the board; bad.
                }
            }
        }
        else
        { //no enemy queen
            return 0; // no enemy queen so King isn't in danger (simplistic)
        }
    }
    else
    {//black to move
        if(isThereAnEnemyQueen(objectBoard))
        {
            if((objectBoard.canBlackCastleKingside==true)||(objectBoard.canBlackCastleQueenside==true))
            {
                return 0; //king still in centre but can castle so it's not bad
            }
            else
            { //King can't castle... is it because King HAS castled?
                let coor = findCoordinatesOfKing(objectBoard,false);
                if(coor[0]==0)
                {
                    if((coor[1]==0)
                    ||(coor[1]==1)
                    ||(coor[1]==7))
                    {
                        return 1; //king castled! Good
                    }
                    else
                    {
                        return -1; //king is in the centre and can't castle and there are queens. Bad.
                    }
                }
                else
                {
                    return -1; //King can't castle and is in the centre with Queens on the board; bad.
                }
            }
        }
        else
        { //no enemy queen
            return 0; // no enemy queen so King isn't in danger (simplistic)
        }
    }
}

const isThereAnEnemyQueen = function(objectBoard)
{
    if(objectBoard.sideToMove==true)
    { //white's perspective so look for Black Queen
        for(let x = 0; x < 8; x++)
        {
            for(let y = 0; y < 8; y++)
            {
                if(objectBoard.board[x][y]=="q")
                {
                    return true;
                }
            }
        }
    }
    else
    { //black's perspective so look for White Queen
        for(let x = 0; x < 8; x++)
        {
            for(let y = 0; y < 8; y++)
            {
                if(objectBoard.board[x][y]=="Q")
                {
                    return true;
                }
            }
        }
    }

    return false;
}

const pieceActivityFromBoard = function(objectBoard)
{
    let pawnMoves = 0;
    let knightMoves = 0;
    let bishopMoves = 0;
    let rookMoves = 0;
    let queenMoves = 0;

    let pawnAttacks = 0;
    let knightAttacks = 0;
    let bishopAttacks = 0;
    let rookAttacks = 0;
    let queenAttacks = 0;

    let numberKnights = 0; //Keep track of number of minor pieces so that eval...
    let numberBishops = 0; //...doesn't over-prioritise making a single piece super "active"
    let numberRooks = 0;
    let numberQueens = 0;
    let numberPawns = 0;

    if( objectBoard.sideToMove==true )
    { // White to move
        for( let i = 7; i > -1; i-- )
        {
            for( let j = 7; j > -1; j-- )
            { // i and j stand for rank and file 
                if( objectBoard.board[i][j]=="Q" )
                {
                    numberQueens++;

                    for( let k = 1; k < 8; k++ )
                    { // SouthEast direction
                        if( (i+k < 8) && (j+k < 8) )
                        {
                            if( objectBoard.board[i+k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                queenMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i+k][j+k] == objectBoard.board[i+k][j+k].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    queenAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // NorthWest direction
                        if( (i-k > -1) && (j-k > -1) )
                        {
                            if( objectBoard.board[i-k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                queenMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i-k][j-k] == objectBoard.board[i-k][j-k].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    queenAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // NorthEast direction
                        if( (i-k > -1) && (j+k < 8) )
                        {
                            if( objectBoard.board[i-k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                queenMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i-k][j+k] == objectBoard.board[i-k][j+k].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    queenAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // SouthWest direction
                        if( (i+k < 8) && (j-k > -1) )
                        {
                            if( objectBoard.board[i+k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                queenMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i+k][j-k] == objectBoard.board[i+k][j-k].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    queenAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // South direction
                        if( i+k < 8 )
                        {
                            if( objectBoard.board[i+k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                queenMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i+k][j] == objectBoard.board[i+k][j].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    queenAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // North direction
                        if( i-k > -1 )
                        {
                            if( objectBoard.board[i-k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                queenMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i-k][j] == objectBoard.board[i-k][j].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    queenAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // West direction
                        if( j-k > -1 )
                        {
                            if( objectBoard.board[i][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                queenMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i][j-k] == objectBoard.board[i][j-k].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    queenAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // East direction
                        if( j+k < 8 )
                        {
                            if( objectBoard.board[i][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                queenMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i][j+k] == objectBoard.board[i][j+k].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    queenAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                }
                if( objectBoard.board[i][j]=="R" )
                {
                    numberRooks++;

                    for( let k = 1; k < 8; k++ )
                    { // South direction
                        if( i+k < 8 )
                        {
                            if( objectBoard.board[i+k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                rookMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i+k][j] == objectBoard.board[i+k][j].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    rookAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // North direction
                        if( i-k > -1 )
                        {
                            if( objectBoard.board[i-k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                rookMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i-k][j] == objectBoard.board[i-k][j].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    rookAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // West direction
                        if( j-k > -1 )
                        {
                            if( objectBoard.board[i][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                rookMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i][j-k] == objectBoard.board[i][j-k].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    rookAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // East direction
                        if( j+k < 8 )
                        {
                            if( objectBoard.board[i][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                rookMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i][j+k] == objectBoard.board[i][j+k].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    rookAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                }
                if( objectBoard.board[i][j]=="B" )
                {

                    numberBishops++;

                    for( let k = 1; k < 8; k++ )
                    { // SouthEast direction
                        if( (i+k < 8) && (j+k < 8) )
                        {
                            if( objectBoard.board[i+k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                bishopMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i+k][j+k] == objectBoard.board[i+k][j+k].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    bishopAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // NorthWest direction
                        if( (i-k > -1) && (j-k > -1) )
                        {
                            if( objectBoard.board[i-k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                bishopMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i-k][j-k] == objectBoard.board[i-k][j-k].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    bishopAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // NorthEast direction
                        if( (i-k > -1) && (j+k < 8) )
                        {
                            if( objectBoard.board[i-k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                bishopMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i-k][j+k] == objectBoard.board[i-k][j+k].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    bishopAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // SouthWest direction
                        if( (i+k < 8) && (j-k > -1) )
                        {
                            if( objectBoard.board[i+k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                bishopMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i+k][j-k] == objectBoard.board[i+k][j-k].toUpperCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    bishopAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                }
                if( objectBoard.board[i][j]=="N" )
                {   

                    numberKnights++;

                    let knightSquares = createCoordinatesKnightAttack([i,j]);

                    for( let k = 0; k < knightSquares.length; k++ )
                    {
                        let m = knightSquares[k][0]; // m is rank of a Knight move
                        let n = knightSquares[k][1]; // n is file of a Knight move

                        if( objectBoard.board[m][n] == "" )
                        { // empty square (move is possible)
                            knightMoves++;
                        }
                        else
                        {
                            if( objectBoard.board[m][n] == objectBoard.board[m][n].toLowerCase() )
                            { // this means a capture of an enemy piece
                                knightAttacks++;
                            }
                        }
                    }
                }
                if( objectBoard.board[i][j]=="P" )
                {
                    numberPawns++;

                    if( i == 3 )
                    { // White en passant is only possible if the pawn is on the 5th rank
                        if( objectBoard.enPassantSquare != "" )
                        { // if there even is an enpassant square to consider
                            let passantJ = letterToNumber(objectBoard.enPassantSquare.slice(0,1));

                            if( ((Number(passantJ) - j) == 1) || ((Number(passantJ) - j) == -1) )
                            { // if the currently checked pawn is 1 file away from the enpassant square
                                pawnAttacks++;
                            }
                        }
                    }
                    if( i-1 > -1 )
                    {
                        if( objectBoard.board[i-1][j]=="" )
                        { // square in front of pawn is empty so it can be pushed
                            if( i == 1 )
                            { // means this pawn push will be to promote
                                pawnAttacks++;
                            }
                            else
                            {
                                if( i == 6 )
                                { // pawn is on its starting rank
                                    if( objectBoard.board[4][j]=="" )
                                    {
                                        pawnMoves++;
                                    }
                                }
                                pawnMoves++;
                            }
                        }

                        if( j+1 < 8 )
                        { // pawn attack to the east
                            if( i == 1 )
                            {
                                if( (objectBoard.board[i-1][j+1] == objectBoard.board[i-1][j+1].toLowerCase()) 
                                && (objectBoard.board[i-1][j+1] != ""))
                                {
                                    pawnAttacks++;
                                }
                            }
                            else
                            {
                                if( (objectBoard.board[i-1][j+1] == objectBoard.board[i-1][j+1].toLowerCase()) 
                                && (objectBoard.board[i-1][j+1] != ""))
                                { // means a capture is possible
                                    pawnAttacks++;
                                }
                            }
                        }
                        if( j-1 > -1 )
                        { // pawn attack to the west
                            if( i == 1 )
                            {
                                if( (objectBoard.board[i-1][j-1] == objectBoard.board[i-1][j-1].toLowerCase()) 
                                && (objectBoard.board[i-1][j-1] != ""))
                                {
                                    pawnAttacks++;
                                }
                            }
                            else
                            {
                                if( (objectBoard.board[i-1][j-1] == objectBoard.board[i-1][j-1].toLowerCase()) 
                                && (objectBoard.board[i-1][j-1] != ""))
                                { // means a capture is possible
                                    pawnAttacks++;
                                }
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
                if( objectBoard.board[i][j]=="q" )
                {
                    numberQueens++;

                    for( let k = 1; k < 8; k++ )
                    { // SouthEast direction
                        if( (i+k < 8) && (j+k < 8) )
                        {
                            if( objectBoard.board[i+k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                queenMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i+k][j+k] == objectBoard.board[i+k][j+k].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    queenAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // NorthWest direction
                        if( (i-k > -1) && (j-k > -1) )
                        {
                            if( objectBoard.board[i-k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                queenMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i-k][j-k] == objectBoard.board[i-k][j-k].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    queenAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // NorthEast direction
                        if( (i-k > -1) && (j+k < 8) )
                        {
                            if( objectBoard.board[i-k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                queenMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i-k][j+k] == objectBoard.board[i-k][j+k].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    queenAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // SouthWest direction
                        if( (i+k < 8) && (j-k > -1) )
                        {
                            if( objectBoard.board[i+k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                queenMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i+k][j-k] == objectBoard.board[i+k][j-k].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    queenAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // South direction
                        if( i+k < 8 )
                        {
                            if( objectBoard.board[i+k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                queenMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i+k][j] == objectBoard.board[i+k][j].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    queenAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // North direction
                        if( i-k > -1 )
                        {
                            if( objectBoard.board[i-k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                queenMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i-k][j] == objectBoard.board[i-k][j].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    queenAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // West direction
                        if( j-k > -1 )
                        {
                            if( objectBoard.board[i][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                queenMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i][j-k] == objectBoard.board[i][j-k].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    queenAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // East direction
                        if( j+k < 8 )
                        {
                            if( objectBoard.board[i][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                queenMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i][j+k] == objectBoard.board[i][j+k].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    queenAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                }
                if( objectBoard.board[i][j]=="r" )
                {
                    numberRooks++;

                    for( let k = 1; k < 8; k++ )
                    { // South direction
                        if( i+k < 8 )
                        {
                            if( objectBoard.board[i+k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                rookMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i+k][j] == objectBoard.board[i+k][j].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    rookAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // North direction
                        if( i-k > -1 )
                        {
                            if( objectBoard.board[i-k][j] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                rookMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i-k][j] == objectBoard.board[i-k][j].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    rookAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // West direction
                        if( j-k > -1 )
                        {
                            if( objectBoard.board[i][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                rookMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i][j-k] == objectBoard.board[i][j-k].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    rookAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // East direction
                        if( j+k < 8 )
                        {
                            if( objectBoard.board[i][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                rookMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i][j+k] == objectBoard.board[i][j+k].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    rookAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                }
                if( objectBoard.board[i][j]=="b" )
                {

                    numberBishops++;

                    for( let k = 1; k < 8; k++ )
                    { // SouthEast direction
                        if( (i+k < 8) && (j+k < 8) )
                        {
                            if( objectBoard.board[i+k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                bishopMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i+k][j+k] == objectBoard.board[i+k][j+k].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    bishopAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // NorthWest direction
                        if( (i-k > -1) && (j-k > -1) )
                        {
                            if( objectBoard.board[i-k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                bishopMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i-k][j-k] == objectBoard.board[i-k][j-k].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    bishopAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // NorthEast direction
                        if( (i-k > -1) && (j+k < 8) )
                        {
                            if( objectBoard.board[i-k][j+k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                bishopMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i-k][j+k] == objectBoard.board[i-k][j+k].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    bishopAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                    for( let k = 1; k < 8; k++ )
                    { // SouthWest direction
                        if( (i+k < 8) && (j-k > -1) )
                        {
                            if( objectBoard.board[i+k][j-k] == "" )
                            { // empty square means a move is possible and not to break because the raytrace can continue
                                bishopMoves++;
                            }
                            else
                            {
                                if( objectBoard.board[i+k][j-k] == objectBoard.board[i+k][j-k].toLowerCase() )
                                { // This means the move will be to a friendly piece, which blocks further moves
                                    break;
                                }
                                else
                                { // This means a capture of an enemy piece
                                    bishopAttacks++;
                                    break;
                                }
                            }
                        }
                    }
                }
                if( objectBoard.board[i][j]=="n" )
                {   

                    numberKnights++;

                    let knightSquares = createCoordinatesKnightAttack([i,j]);

                    for( let k = 0; k < knightSquares.length; k++ )
                    {
                        let m = knightSquares[k][0]; // m is rank of a Knight move
                        let n = knightSquares[k][1]; // n is file of a Knight move

                        if( objectBoard.board[m][n] == "" )
                        { // empty square (move is possible)
                            knightMoves++;
                        }
                        else
                        {
                            if( objectBoard.board[m][n] == objectBoard.board[m][n].toUpperCase() )
                            { // this means a capture of an enemy piece
                                knightAttacks++;
                            }
                        }
                    }
                }
                if( objectBoard.board[i][j]=="p" )
                {
                    numberPawns++;

                    if( i == 4 )
                    { // Black en passant is only possible if the pawn is on the 4th rank
                        if( objectBoard.enPassantSquare != "" )
                        { // if there even is an enpassant square to consider
                            let passantJ = letterToNumber(objectBoard.enPassantSquare.slice(0,1));

                            if( ((Number(passantJ) - j) == 1) || ((Number(passantJ) - j) == -1) )
                            { // if the currently checked pawn is 1 file away from the enpassant square
                                pawnAttacks++;
                            }
                        }
                    }
                    if( i+1 < 8 )
                    {
                        if( objectBoard.board[i+1][j]=="" )
                        { // square in front of pawn is empty so it can be pushed
                            if( i == 6 )
                            { // means this pawn push will be to promote
                                pawnAttacks++;
                            }
                            else
                            {
                                if( i == 1 )
                                { // pawn is on its starting rank
                                    if( objectBoard.board[3][j]=="" )
                                    {
                                        pawnMoves++;
                                    }
                                }
                                pawnMoves++;
                            }
                        }

                        if( j+1 < 8 )
                        { // pawn attack to the east
                            if( i == 6 )
                            {
                                if( (objectBoard.board[i+1][j+1] == objectBoard.board[i+1][j+1].toUpperCase()) 
                                && (objectBoard.board[i+1][j+1] != ""))
                                {
                                    pawnAttacks++;
                                }
                            }
                            else
                            {
                                if( (objectBoard.board[i+1][j+1] == objectBoard.board[i+1][j+1].toUpperCase()) 
                                && (objectBoard.board[i+1][j+1] != ""))
                                { // means a capture is possible
                                    pawnAttacks++;
                                }
                            }
                        }
                        if( j-1 > -1 )
                        { // pawn attack to the west
                            if( i == 6 )
                            {
                                if( (objectBoard.board[i+1][j-1] == objectBoard.board[i+1][j-1].toUpperCase()) 
                                && (objectBoard.board[i+1][j-1] != ""))
                                {
                                    pawnAttacks++;
                                }
                            }
                            else
                            {
                                if( (objectBoard.board[i+1][j-1] == objectBoard.board[i+1][j-1].toUpperCase()) 
                                && (objectBoard.board[i+1][j-1] != ""))
                                { // means a capture is possible
                                    pawnAttacks++;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    if(numberKnights>0)
    {
        knightMoves /= numberKnights;
        knightAttacks /= numberKnights;
    }
    if(numberBishops>0)
    {
        bishopMoves /= numberBishops;
        bishopAttacks /= numberBishops;
    }
    if(numberRooks>0)
    {
        rookMoves /= numberRooks;
        rookAttacks /= numberRooks;
    }
    if(numberQueens>0)
    {
        queenMoves /= numberQueens;
        queenAttacks /= numberQueens;
    }
    if(numberPawns>0)
    {
        pawnMoves /= numberPawns; //pawnMoves should now range between 0 to 2.
        //pawnAttacks isn't normalised for number of pawns because having an edge of 1 or 2 pawn attacks is indication of a good position
    }

    let knightActivity = knightMoves/8 + knightAttacks/4; //max moves = 1, max attacks = 2
    let bishopActivity = bishopMoves/13 + bishopAttacks/(52/17); //max moves = 1, max attacks = 2
    let rookActivity = rookMoves/14 + rookAttacks/(28/9); //max moves = 1, max attacks = 2
    let queenActivity = queenMoves/27 + queenAttacks/(216/35); //max moves = 1, max attacks = 2

    //knight having 0.625 is fine.
    //bishop having 0.5 is fine.
    //rook having 0.1 is fine.
    //queen having 0.1 is fine.

    //knight having 1 is excellent.
    //bishop having 0.8 is excellent.
    //rook having 0.5 is excellent.
    //queen having 0.5 is excellent.



    if(bishopActivity>0.5)
    {
        if(bishopActivity>0.8)
        {
            bishopActivity = 1.5+(bishopActivity-0.8)/4.8; //up to 1.75
        }
        else
        {
            bishopActivity = 1+(bishopActivity-0.5)*(1.6666); //up to 1.5
        }
    }
    else
    {
        bishopActivity *= 2; //up to 1
    }

    if(knightActivity>0.625)
    {
        if(knightActivity>1)
        {
            knightActivity = 1.5+(knightActivity-1)/4; //up to 1.75
        }
        else
        {
            knightActivity = 1+(knightActivity-0.625)*(1.3333); //up to 1.5
        }
    }
    else
    {
        knightActivity *= 1.6; //up to 1
    }

    if(queenActivity>0.1)
    {
        if(queenActivity>0.5)
        {
            queenActivity = 1.5+(queenActivity-0.5)/6; //up to 1.75
        }
        else
        {
            queenActivity = 1+(queenActivity-0.1)*(1.25); //up to 1.5
        }
    }
    else
    {
        queenActivity *= 10; //up to 1
    }

    if(rookActivity>0.1)
    {
        if(rookActivity>0.5)
        {
            rookActivity = 1.5+(rookActivity-0.5)/6; //up to 1.75
        }
        else
        {
            rookActivity = 1+(rookActivity-0.1)*(1.25); //up to 1.5
        }
    }
    else
    {
        rookActivity *= 10; //up to 1
    }
    
    
    //...pawnMoves should be weighted high and pawnAttacks very high to evaluate pawn forks as almost winning a piece
    //piece activities now sum from 0 to 7.

    
    //console.log(bishopActivity+" is Bishop activity");
    //console.log(knightActivity+" is Knight activity");
    //console.log(rookActivity+" is Rook activity");
    //console.log(queenActivity+" is Queen activity");
    //console.log(pawnMoves+" is Pawn activity");
    //console.log(pawnAttacks+" is pawn attacks");
   // debugging

    
    //console.log(numberPawns);
    //console.log(numberKnights);
    //console.log(numberBishops);
    //console.log(numberRooks);
    //console.log(numberQueens);//debugging


    return (knightActivity+bishopActivity+rookActivity*0.75+queenActivity/16)+(pawnMoves+pawnAttacks*4);
}

const isTheSideNotToMoveInCheckChecker = function(objectBoard)
{
    if( objectBoard.sideToMove==true )
    { // ^^This means White to move, so check if Black's King is in check
        let coordinatesArray = findCoordinatesOfKing(objectBoard,false);
        for( let i = 1; i < 8; i++ )
        { // Checking for raytracing attacks from the NE direction
            if( (coordinatesArray[0]-i > -1) && (coordinatesArray[1]+i < 8) )
            {
                if( (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "B") ||
                    (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "Q") )
                {
                    return true;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "p") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "n") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "b") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "r") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "q") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "P") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "N") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "R") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "K") )
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
                if( (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "B") ||
                    (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "Q") )
                {
                    return true;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "p") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "n") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "b") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "r") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "q") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "P") )
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
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "N") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "R") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "K") )
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
                if( (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "B") ||
                    (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "Q") )
                {
                    return true;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "p") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "n") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "b") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "r") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "q") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "P") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "N") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "R") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "K") )
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
                if( (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "B") ||
                    (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "Q") )
                {
                    return true;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "p") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "n") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "b") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "r") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "q") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "P") )
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
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "N") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "R") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "K") )
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
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "Q") ||
                    (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "R"))
                {
                    return true;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "p") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "n") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "b") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "r") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "q") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "P") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "N") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "B") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "K") )
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
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "Q") ||
                    (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "R"))
                {
                    return true;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "p") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "n") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "b") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "r") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "q") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "P") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "N") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "B") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "K") )
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
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "Q") || 
                    (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "R") )
                {
                    return true;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "p") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "n") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "b") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "r") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "q") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "P") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "N") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "B") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "K") )
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
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "Q") || 
                    (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "R") )
                {
                    return true;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "p") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "n") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "b") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "r") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "q") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "P") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "N") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "B") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "K") )
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
        let coordinatesToSearchForKnights = createCoordinatesKnightAttack(findCoordinatesOfKing(objectBoard,false));
        
        for( let i = 0; i < coordinatesToSearchForKnights.length; i++ )
        {
            if( objectBoard.board[coordinatesToSearchForKnights[i][0]][coordinatesToSearchForKnights[i][1]] == "N" )
            { // ^^ Search for White Knights since we're checking for a Black King
                return true;
            }
        }
    }
    else
    { // ^^ else means Black to move, so check if White's King is in check
        let coordinatesArray = findCoordinatesOfKing(objectBoard,true);
        for( let i = 1; i < 8; i++ )
        { // Checking for raytracing attacks from the NE direction
            if( (coordinatesArray[0]-i > -1) && (coordinatesArray[1]+i < 8) )
            {
                if( (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "b") ||
                    (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "q") )
                {
                    return true;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "P") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "N") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "B") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "R") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "Q") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "p") )
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
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "n") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "r") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "k") )
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
                if( (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "b") ||
                    (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "q") )
                {
                    return true;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "P") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "N") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "B") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "R") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "Q") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "p") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "n") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "r") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "k") )
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
                if( (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "b") ||
                    (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "q") )
                {
                    return true;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "P") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "N") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "B") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "R") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "Q") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "p") )
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
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "n") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "r") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "k") )
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
                if( (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "b") ||
                    (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "q") )
                {
                    return true;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "P") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "N") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "B") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "R") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "Q") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "p") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "n") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "r") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "k") )
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
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "q") ||
                    (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "r"))
                {
                    return true;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "P") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "N") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "B") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "R") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "Q") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "p") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "n") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "b") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "k") )
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
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "q") ||
                    (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "r"))
                {
                    return true;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "P") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "N") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "B") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "R") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "Q") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "p") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "n") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "b") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "k") )
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
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "q") || 
                    (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "r") )
                {
                    return true;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "P") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "N") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "B") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "R") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "Q") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "p") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "n") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "b") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "k") )
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
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "q") || 
                    (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "r") )
                {
                    return true;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "P") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "N") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "B") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "R") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "Q") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "p") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "n") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "b") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "k") )
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
        let coordinatesToSearchForKnights = createCoordinatesKnightAttack(findCoordinatesOfKing(objectBoard,true));
        
        for( let i = 0; i < coordinatesToSearchForKnights.length; i++ )
        {
            if( objectBoard.board[coordinatesToSearchForKnights[i][0]][coordinatesToSearchForKnights[i][1]] == "n" )
            { // ^^ Search for Black Knights since we're checking for a White King
                return true;
            }
        }
    }

    return false;
}

const isTheSideToMoveInCheckChecker = function(objectBoard)
{
    if( objectBoard.sideToMove==false )
    { // ^^This means Black to move, so check if Black's King is in check
        let coordinatesArray = findCoordinatesOfKing(objectBoard,false);
        for( let i = 1; i < 8; i++ )
        { // Checking for raytracing attacks from the NE direction
            if( (coordinatesArray[0]-i > -1) && (coordinatesArray[1]+i < 8) )
            {
                if( (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "B") ||
                    (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "Q") )
                {
                    return true;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "p") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "n") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "b") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "r") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "q") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "P") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "N") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "R") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "K") )
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
                if( (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "B") ||
                    (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "Q") )
                {
                    return true;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "p") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "n") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "b") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "r") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "q") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "P") )
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
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "N") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "R") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "K") )
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
                if( (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "B") ||
                    (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "Q") )
                {
                    return true;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "p") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "n") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "b") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "r") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "q") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "P") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "N") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "R") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "K") )
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
                if( (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "B") ||
                    (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "Q") )
                {
                    return true;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "p") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "n") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "b") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "r") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "q") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "P") )
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
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "N") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "R") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "K") )
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
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "Q") ||
                    (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "R"))
                {
                    return true;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "p") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "n") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "b") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "r") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "q") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "P") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "N") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "B") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "K") )
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
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "Q") ||
                    (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "R"))
                {
                    return true;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "p") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "n") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "b") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "r") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "q") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "P") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "N") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "B") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "K") )
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
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "Q") || 
                    (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "R") )
                {
                    return true;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "p") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "n") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "b") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "r") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "q") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "P") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "N") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "B") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "K") )
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
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "Q") || 
                    (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "R") )
                {
                    return true;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "p") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "n") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "b") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "r") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "q") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "P") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "N") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "B") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "K") )
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
        let coordinatesToSearchForKnights = createCoordinatesKnightAttack(findCoordinatesOfKing(objectBoard,false));
        
        for( let i = 0; i < coordinatesToSearchForKnights.length; i++ )
        {
            if( objectBoard.board[coordinatesToSearchForKnights[i][0]][coordinatesToSearchForKnights[i][1]] == "N" )
            { // ^^ Search for White Knights since we're checking for a Black King
                return true;
            }
        }
    }
    else
    { // ^^ else means White to move, so check if White's King is in check
        let coordinatesArray = findCoordinatesOfKing(objectBoard,true);
        for( let i = 1; i < 8; i++ )
        { // Checking for raytracing attacks from the NE direction
            if( (coordinatesArray[0]-i > -1) && (coordinatesArray[1]+i < 8) )
            {
                if( (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "b") ||
                    (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "q") )
                {
                    return true;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "P") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "N") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "B") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "R") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "Q") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "p") )
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
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "n") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "r") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]+i)] == "k") )
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
                if( (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "b") ||
                    (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "q") )
                {
                    return true;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "P") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "N") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "B") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "R") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "Q") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "p") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "n") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "r") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]-i)] == "k") )
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
                if( (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "b") ||
                    (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "q") )
                {
                    return true;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "P") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "N") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "B") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "R") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "Q") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "p") )
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
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "n") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "r") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]-i)][(coordinatesArray[1]-i)] == "k") )
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
                if( (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "b") ||
                    (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "q") )
                {
                    return true;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "P") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "N") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "B") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "R") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "Q") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "p") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "n") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "r") )
                {
                    break;
                }
                if(  (objectBoard.board[(coordinatesArray[0]+i)][(coordinatesArray[1]+i)] == "k") )
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
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "q") ||
                    (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "r"))
                {
                    return true;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "P") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "N") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "B") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "R") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "Q") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "p") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "n") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "b") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]-i)] == "k") )
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
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "q") ||
                    (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "r"))
                {
                    return true;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "P") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "N") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "B") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "R") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "Q") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "p") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "n") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "b") )
                {
                    break;
                }
                if( (objectBoard.board[coordinatesArray[0]][(coordinatesArray[1]+i)] == "k") )
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
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "q") || 
                    (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "r") )
                {
                    return true;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "P") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "N") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "B") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "R") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "Q") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "p") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "n") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "b") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]+i)][coordinatesArray[1]] == "k") )
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
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "q") || 
                    (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "r") )
                {
                    return true;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "P") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "N") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "B") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "R") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "Q") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "p") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "n") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "b") )
                {
                    break;
                }
                if( (objectBoard.board[(coordinatesArray[0]-i)][coordinatesArray[1]] == "k") )
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
        let coordinatesToSearchForKnights = createCoordinatesKnightAttack(findCoordinatesOfKing(objectBoard,true));
        
        for( let i = 0; i < coordinatesToSearchForKnights.length; i++ )
        {
            if( objectBoard.board[coordinatesToSearchForKnights[i][0]][coordinatesToSearchForKnights[i][1]] == "n" )
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

const findCoordinatesOfKing = function(engineBoard, booleanToMove)
{ // True is White, False is Black
    let arrayOfTwoNumbers = [0,0];

    if( booleanToMove == true )
    { // ^^If looking for the White King...
        for( let i = 7; i > -1; i-- )
        {
            for( let j = 7; j > -1; j-- )
            {
                if( engineBoard.board[i][j] == "K" )
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
                if( engineBoard.board[i][j] == "k" )
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

const conventionalBoardProcessMove = function(objectBoard, moveString)
{ // this assumes the move given is legal and executes it.
    let copyOfObjectBoard = structuredClone(objectBoard);

    copyOfObjectBoard.enPassantSquare = "";

    let startSquare = moveString.slice(0,2);
    let endSquare = moveString.slice(2);
    let promoteToPiece = "";

    if(moveString.length == 5)
    { // ^^ If move is a pawn promoting
        promoteToPiece = endSquare.slice(2);
        endSquare = endSquare.slice(0,2);
    }

    if((copyOfObjectBoard.board[(8-(Number(startSquare.slice(1))))][(letterToNumber(startSquare.slice(0,1)))])=="P")
    { // ^^ If a White pawn move...
        if((8-(Number(endSquare.slice(1))))==2)
        { // ...goes to the 6th rank...
            if(copyOfObjectBoard.board[(8-(Number(endSquare.slice(1))))][(letterToNumber(endSquare.slice(0,1)))]=="")
            {  // ...and goes to a square that was already empty...
                if(startSquare.slice(0,1) != endSquare.slice(0,1))
                { // and is a diagonal pawn move... then it's an en passant and the opponent pawn must be removed
                    copyOfObjectBoard.board[3][(letterToNumber(endSquare.slice(0,1)))] = "";
                }
            }
        }
        if( startSquare.slice(1) == "2" )
        {   // ...starts from the starting rank...
            if( endSquare.slice(1) == "4" )
            { //...and moves two squares...
                copyOfObjectBoard.enPassantSquare = startSquare.slice(0,1) + "3";
                //...then there is an enpassant Square behind where it ends up
            }
        }

        promoteToPiece = promoteToPiece.toUpperCase();
        // ^^ So that the promoted piece is White if the pawn promoting is White
    }
    if((copyOfObjectBoard.board[(8-(Number(startSquare.slice(1))))][(letterToNumber(startSquare.slice(0,1)))])=="p")
    { // ^^ If a Black pawn move...
        if((8-(Number(endSquare.slice(1))))==5)
        { // ...goes to the 3rd rank...
            if(copyOfObjectBoard.board[(8-(Number(endSquare.slice(1))))][(letterToNumber(endSquare.slice(0,1)))]=="")
            {  // ...and goes to a square that was already empty...
                if(startSquare.slice(0,1) != endSquare.slice(0,1))
                { // and is a diagonal pawn move... then it's an en passant and the opponent pawn must be removed
                    copyOfObjectBoard.board[4][(letterToNumber(endSquare.slice(0,1)))] = "";
                }
            }
        }
        if( startSquare.slice(1) == "7" )
        {   // ...starts from the starting rank...
            if( endSquare.slice(1) == "5" )
            { //...and moves two squares...
                copyOfObjectBoard.enPassantSquare = startSquare.slice(0,1) + "6";
                //...then there is an enpassant Square behind where it ends up
            }
        }

        promoteToPiece = promoteToPiece.toLowerCase();
        // ^^ So that the promoted piece is Black if the pawn promoting is Black
    }
    
    if(moveString.length == 5)
    { // ^^ If move is a pawn promotion
        copyOfObjectBoard.board[(8-(Number(endSquare.slice(1))))][(letterToNumber(endSquare.slice(0,1)))] = promoteToPiece;
    }
    else
    {
        copyOfObjectBoard.board[(8-(Number(endSquare.slice(1))))][(letterToNumber(endSquare.slice(0,1)))] = 
        copyOfObjectBoard.board[(8-(Number(startSquare.slice(1))))][(letterToNumber(startSquare.slice(0,1)))];
        // ^^The piece moves to the new square
    }
    
    copyOfObjectBoard.board[(8-(Number(startSquare.slice(1))))][(letterToNumber(startSquare.slice(0,1)))] = "";
    // ^^The square the move leaves from will always be empty after the move is made

    if((copyOfObjectBoard.board[(8-(Number(endSquare.slice(1))))][(letterToNumber(endSquare.slice(0,1)))])=="K")
    { // ^^ If a king move...
        if(startSquare=="e1")
        { // ...that starts on the starting square and goes to a castled square....
            if(endSquare=="g1")
            {
                copyOfObjectBoard.board[7][7] = "";
                copyOfObjectBoard.board[7][5] = "R";
            }
            if(endSquare=="c1")
            {
                copyOfObjectBoard.board[7][0] = "";
                copyOfObjectBoard.board[7][3] = "R";
            }
        }
        copyOfObjectBoard.canWhiteCastleKingside = false;
        copyOfObjectBoard.canWhiteCastleQueenside = false;
    } // ^^ Move over White Rook when castling
    if((copyOfObjectBoard.board[(8-(Number(endSquare.slice(1))))][(letterToNumber(endSquare.slice(0,1)))])=="k")
    { // ^^ If a king move...
        if(startSquare=="e8")
        { // ...that starts on the starting square and goes to a castled square....
            if(endSquare=="g8")
            {
                copyOfObjectBoard.board[0][7] = "";
                copyOfObjectBoard.board[0][5] = "r";
            }
            if(endSquare=="c8")
            {
                copyOfObjectBoard.board[0][0] = "";
                copyOfObjectBoard.board[0][3] = "r";
            }
        }
        copyOfObjectBoard.canBlackCastleKingside = false;
        copyOfObjectBoard.canBlackCastleQueenside = false;
    } // ^^ Move over Black Rook when castling

    if( copyOfObjectBoard.canWhiteCastleKingside == true )
    { 
        if((copyOfObjectBoard.board[(8-(Number(endSquare.slice(1))))][(letterToNumber(endSquare.slice(0,1)))])=="R")
        {
            if( startSquare == "h1" )
            {
                copyOfObjectBoard.canWhiteCastleKingside = false;
            }
        }
    }
    if( copyOfObjectBoard.canWhiteCastleQueenside == true )
    { 
        if((copyOfObjectBoard.board[(8-(Number(endSquare.slice(1))))][(letterToNumber(endSquare.slice(0,1)))])=="R")
        {
            if( startSquare == "a1" )
            {
                copyOfObjectBoard.canWhiteCastleQueenside = false;
            }
        }
    }
    if( copyOfObjectBoard.canBlackCastleKingside == true )
    { 
        if((copyOfObjectBoard.board[(8-(Number(endSquare.slice(1))))][(letterToNumber(endSquare.slice(0,1)))])=="r")
        {
            if( startSquare == "h8" )
            {
                copyOfObjectBoard.canBlackCastleKingside = false;
            }
        }
    }
    if( copyOfObjectBoard.canBlackCastleQueenside == true )
    { 
        if((copyOfObjectBoard.board[(8-(Number(endSquare.slice(1))))][(letterToNumber(endSquare.slice(0,1)))])=="r")
        {
            if( startSquare == "a8" )
            {
                copyOfObjectBoard.canBlackCastleQueenside = false;
            }
        }
    }
    
    copyOfObjectBoard.sideToMove = !(copyOfObjectBoard.sideToMove); // Change who's side it is to move because a move was made

    return copyOfObjectBoard;
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

const makeBoardLight = function()
{
    let lightSquares = document.querySelectorAll(".lightSquare");
    let darkSquares = document.querySelectorAll(".darkSquare");

    lightSquares.forEach(function(square)
    {
        square.style.backgroundColor = lightSquareThinkingColour;
    });
    darkSquares.forEach(function(square)
    {
        square.style.backgroundColor = darkSquareThinkingColour;
    });
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
                square.classList.add("lightSquare");
                square.style.backgroundColor = lightSquareColour;
            }
            else
            {   
                square.classList.add("darkSquare");
                square.style.backgroundColor = darkSquareColour;
            }

            square.addEventListener("click", function()
            {
                if( playerTurn == true )
                {
                    if( firstSelectedSquare == "" )
                    { // means user hasn't selected a piece to move yet
                        if( legalStartingSquaresFromFEN(currentFEN).includes(square.getAttribute("id")))
                        {
                            firstSelectedSquare = square.getAttribute("id");

                            if( (i+j)%2==0 )   
                            { // To change the colour of the selected square differently for light or dark squares
                                square.style.backgroundColor = lightSquareSelectedColour;
                            }
                            else
                            {
                                square.style.backgroundColor = darkSquareSelectedColour;
                            }
                        }
                    }
                    else
                    { // means user has selected a piece to move
                        if( thirdSelectedSquare == "" )
                        {
                            secondSelectedSquare = square.getAttribute("id");
                            userMove = firstSelectedSquare + secondSelectedSquare;
                        }

                        if( legalMovesFromFEN(currentFEN).includes(userMove) )
                        {
                            playerTurn = false;
                            let newFEN = boardToFEN(conventionalBoardProcessMove(fenToConventionalBoard(currentFEN),userMove));
                            gameHistoryArray.push(userMove);
                            loadPosition( newFEN );
                            makeBoardLight();
                            highlightLastMove();

                            setTimeout(() =>
                            {
                                chosenAI( newFEN, choice );
                                firstSelectedSquare = "";
                                secondSelectedSquare = "";
                                thirdSelectedSquare = "";
                            },50);
                        }
                        else
                        {   
                            if( legalPromotionMovesFromFENTruncated(currentFEN).includes(userMove) )
                            {
                                thirdSelectedSquare == "promoting!";
                                pawnPromotionSelection();
                            }
                            else
                            {
                                loadPosition(currentFEN);
                                firstSelectedSquare = "";
                                secondSelectedSquare = "";
                                thirdSelectedSquare = "";
                            }
                        }
                    }
                }
            });
    
            column.appendChild(square);
        }
    
        boardFragment.appendChild(column);
    }
    chessboard.replaceChildren();
    chessboard.appendChild(boardFragment);
    chessboard.setAttribute("class", "chessboard");
    gameContainer.replaceChildren();
    miscContainer.replaceChildren();
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
                square.classList.add("lightSquare");
                square.style.backgroundColor = lightSquareColour;
            }
            else
            {
                square.classList.add("darkSquare");
                square.style.backgroundColor = darkSquareColour;
            }

            square.addEventListener("click", function()
            {
                if( playerTurn == true )
                {
                    if( firstSelectedSquare == "" )
                    { // means user hasn't selected a piece to move yet
                        if( legalStartingSquaresFromFEN(currentFEN).includes(square.getAttribute("id")))
                        {
                            firstSelectedSquare = square.getAttribute("id");

                            if( (i+j)%2==0 )   
                            { // To change the colour of the selected square differently for light or dark squares
                                square.style.backgroundColor = lightSquareSelectedColour;
                            }
                            else
                            {
                                square.style.backgroundColor = darkSquareSelectedColour;
                            }
                        }
                    }
                    else
                    { // means user has selected a piece to move
                        if( thirdSelectedSquare == "" )
                        {
                            secondSelectedSquare = square.getAttribute("id");
                            userMove = firstSelectedSquare + secondSelectedSquare;
                        }

                        if( legalMovesFromFEN(currentFEN).includes(userMove) )
                        {
                            playerTurn = false;
                            let newFEN = boardToFEN(conventionalBoardProcessMove(fenToConventionalBoard(currentFEN),userMove));
                            gameHistoryArray.push(userMove);
                            loadPosition( newFEN );
                            makeBoardLight();
                            highlightLastMove();

                            setTimeout(() =>
                            {
                                chosenAI( newFEN, choice );
                                firstSelectedSquare = "";
                                secondSelectedSquare = "";
                                thirdSelectedSquare = "";
                            },50);
                        }
                        else
                        {
                            if( legalPromotionMovesFromFENTruncated(currentFEN).includes(userMove) )
                            {
                                thirdSelectedSquare == "promoting!";
                                pawnPromotionSelection();
                            }
                            else
                            {
                                loadPosition(currentFEN);
                                firstSelectedSquare = "";
                                secondSelectedSquare = "";
                                thirdSelectedSquare = "";
                            }
                        }
                    }
                }
            });
    
            column.appendChild(square);
        }
    
        boardFragment.appendChild(column);
    }
    chessboard.replaceChildren();
    chessboard.appendChild(boardFragment);
    chessboard.setAttribute("class", "chessboard");
    gameContainer.replaceChildren();
    miscContainer.replaceChildren();
    gameContainer.appendChild(chessboard);

    boardPerspective = false;
}

const pawnPromotionSelection = function()
{
    miscContainer.replaceChildren();

    if(boardPerspective==false)
    {
        let queenButton = document.createElement("button");
        queenButton.innerText = "\u265B";
        queenButton.addEventListener("click", event =>
        {
            playerTurn = false;
            let newFEN = boardToFEN(conventionalBoardProcessMove(fenToConventionalBoard(currentFEN),userMove+"Q"));
            loadPosition( newFEN );
            setTimeout(() =>
            {
                chosenAI( newFEN, choice );
                firstSelectedSquare = "";
                secondSelectedSquare = "";
                miscContainer.replaceChildren();
            },50);
        });
        let rookButton = document.createElement("button");
        rookButton.innerText = "\u265C";
        rookButton.addEventListener("click", event =>
        {
            playerTurn = false;
            let newFEN = boardToFEN(conventionalBoardProcessMove(fenToConventionalBoard(currentFEN),userMove+"R"));
            loadPosition( newFEN );
            setTimeout(() =>
            {
                chosenAI( newFEN, choice );
                firstSelectedSquare = "";
                secondSelectedSquare = "";
                miscContainer.replaceChildren();
            },50);
        });
        let bishopButton = document.createElement("button");
        bishopButton.innerText = "\u265D";
        bishopButton.addEventListener("click", event =>
        {
            playerTurn = false;
            let newFEN = boardToFEN(conventionalBoardProcessMove(fenToConventionalBoard(currentFEN),userMove+"B"));
            loadPosition( newFEN );
            setTimeout(() =>
            {
                chosenAI( newFEN, choice );
                firstSelectedSquare = "";
                secondSelectedSquare = "";
                miscContainer.replaceChildren();
            },50);
        });
        let knightButton = document.createElement("button");
        knightButton.innerText = "\u265E";
        knightButton.addEventListener("click", event =>
        {
            playerTurn = false;
            let newFEN = boardToFEN(conventionalBoardProcessMove(fenToConventionalBoard(currentFEN),userMove+"N"));
            loadPosition( newFEN );
            setTimeout(() =>
            {
                chosenAI( newFEN, choice );
                firstSelectedSquare = "";
                secondSelectedSquare = "";
                miscContainer.replaceChildren();
            },50);
        });
    
        miscContainer.appendChild(queenButton);
        miscContainer.appendChild(rookButton);
        miscContainer.appendChild(bishopButton);
        miscContainer.appendChild(knightButton);
    }
    else
    {
        let queenButton = document.createElement("button");
        queenButton.innerText = "\u2655";
        queenButton.addEventListener("click", event =>
        {
            playerTurn = false;
            let newFEN = boardToFEN(conventionalBoardProcessMove(fenToConventionalBoard(currentFEN),userMove+"Q"));
            loadPosition( newFEN );
            setTimeout(() =>
            {
                chosenAI( newFEN, choice );
                firstSelectedSquare = "";
                secondSelectedSquare = "";
                miscContainer.replaceChildren();
            },50);
        });
        let rookButton = document.createElement("button");
        rookButton.innerText = "\u2656";
        rookButton.addEventListener("click", event =>
        {
            playerTurn = false;
            let newFEN = boardToFEN(conventionalBoardProcessMove(fenToConventionalBoard(currentFEN),userMove+"R"));
            loadPosition( newFEN );
            setTimeout(() =>
            {
                chosenAI( newFEN, choice );
                firstSelectedSquare = "";
                secondSelectedSquare = "";
                miscContainer.replaceChildren();
            },50);
        });
        let bishopButton = document.createElement("button");
        bishopButton.innerText = "\u2657";
        bishopButton.addEventListener("click", event =>
        {
            playerTurn = false;
            let newFEN = boardToFEN(conventionalBoardProcessMove(fenToConventionalBoard(currentFEN),userMove+"B"));
            loadPosition( newFEN );
            setTimeout(() =>
            {
                chosenAI( newFEN, choice );
                firstSelectedSquare = "";
                secondSelectedSquare = "";
                miscContainer.replaceChildren();
            },50);
        });
        let knightButton = document.createElement("button");
        knightButton.innerText = "\u2658";
        knightButton.addEventListener("click", event =>
        {
            playerTurn = false;
            let newFEN = boardToFEN(conventionalBoardProcessMove(fenToConventionalBoard(currentFEN),userMove+"N"));
            loadPosition( newFEN );
            setTimeout(() =>
            {
                chosenAI( newFEN, choice );
                firstSelectedSquare = "";
                secondSelectedSquare = "";
                miscContainer.replaceChildren();
            },50);
        });
    
        miscContainer.appendChild(queenButton);
        miscContainer.appendChild(rookButton);
        miscContainer.appendChild(bishopButton);
        miscContainer.appendChild(knightButton);
    }
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

    //gameHistoryArray = []; // start anew
    //gameHistoryArray.push(fenString);


    if(boardPerspective==true)
    { //To remove all previous piece classes from the board and to start anew
        createWhiteChessboard(); 
    }
    if(boardPerspective==false)
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

const loadPositionFromBoard = function(engineBoard)
{
    loadPosition( boardToFEN(engineBoard) );
};

const boardToFEN = function(engineBoard)
{
    let FEN = "";

    for( let i = 0; i < 8; i++ )
    {
        let spaceCounter = 0;
        for( let j = 0; j < 8; j++ )
        {
            if( spaceCounter == 0 )
            {
                if( engineBoard.board[i][j] == "" )
                {
                    spaceCounter++;
                    if( j == 7 )
                    {
                        FEN += spaceCounter;
                        spaceCounter = 0;
                    }
                }
                else
                {
                    FEN += engineBoard.board[i][j];
                }
            }
            else
            {
                if( engineBoard.board[i][j] == "" )
                {
                    spaceCounter++;
                    if( j == 7 )
                    {
                        FEN += spaceCounter.toString();
                        spaceCounter = 0;
                    }
                }
                else
                {
                    FEN += spaceCounter.toString();
                    FEN += engineBoard.board[i][j];
                    spaceCounter = 0;
                }
            }
        }

        FEN += "/";

    }

    FEN = FEN.slice(0,-1); // To remove the slash at the end

    if( engineBoard.sideToMove == true )
    {
        FEN += " w ";
    }
    else
    {
        FEN += " b ";
    }

    let allFalse = true;

    if( engineBoard.canWhiteCastleKingside == true )
    {
        FEN += "K";
        allFalse = false;
    }
    if( engineBoard.canWhiteCastleQueenside == true )
    {
        FEN += "Q";
        allFalse = false;
    }
    if( engineBoard.canBlackCastleKingside == true )
    {
        FEN += "k";
        allFalse = false;
    }
    if( engineBoard.canBlackCastleQueenside == true )
    {
        FEN += "q";
        allFalse = false;
    }

    if( allFalse == true )
    {
        FEN += "-";
    }

    FEN += " ";

    if( engineBoard.enPassantSquare == "" )
    {
        FEN += "-";
    }
    else
    {
        FEN += engineBoard.enPassantSquare;
    }

    FEN += " " + engineBoard.halfMoveClock + " " + engineBoard.fullMoveNumber;

    return FEN;
};

const resetVisuals = function()
{
    let squares = document.querySelectorAll(".chessboardSquare");
    squares.forEach( function(square)
    {
        square.innerText = "";
    });
};

const updateVisuals = function()
{
    resetVisuals();

    let whitePawns = document.querySelectorAll(".whitePawn");
    whitePawns.forEach(function(piece)
    {
        piece.innerText = "\u2659\uFE0E";
    });
    let blackPawns = document.querySelectorAll(".blackPawn");
    blackPawns.forEach(function(piece)
    {
        piece.innerText = "\u265F\uFE0E";
    });
    let whiteKnight = document.querySelectorAll(".whiteKnight");
    whiteKnight.forEach(function(piece)
    {
        piece.innerText = "\u2658\uFE0E";
    });
    let blackKnights = document.querySelectorAll(".blackKnight");
    blackKnights.forEach(function(piece)
    {
        piece.innerText = "\u265E\uFE0E";
    });
    let whiteBishops = document.querySelectorAll(".whiteBishop");
    whiteBishops.forEach(function(piece)
    {
        piece.innerText = "\u2657\uFE0E";
    });
    let blackBishops = document.querySelectorAll(".blackBishop");
    blackBishops.forEach(function(piece)
    {
        piece.innerText = "\u265D\uFE0E";
    });
    let whiteRooks = document.querySelectorAll(".whiteRook");
    whiteRooks.forEach(function(piece)
    {
        piece.innerText = "\u2656\uFE0E";
    });
    let blackRooks = document.querySelectorAll(".blackRook");
    blackRooks.forEach(function(piece)
    {
        piece.innerText = "\u265C\uFE0E";
    });
    let whiteQueens = document.querySelectorAll(".whiteQueen");
    whiteQueens.forEach(function(piece)
    {
        piece.innerText = "\u2655\uFE0E";
    });
    let blackQueens = document.querySelectorAll(".blackQueen");
    blackQueens.forEach(function(piece)
    {
        piece.innerText = "\u265B\uFE0E";
    });
    let whiteKings = document.querySelectorAll(".whiteKing");
    whiteKings.forEach(function(piece)
    {
        piece.innerText = "\u2654\uFE0E";
    });
    let blackKings = document.querySelectorAll(".blackKing");
    blackKings.forEach(function(piece)
    {
        piece.innerText = "\u265A\uFE0E";
    });
}

const guiProcessMove = function(moveString) // will check if move is legal before changing anything
{ // move is in long algebraic notation. For example: "e2e4" or "g1f3"

    // TODO: everything
    updateVisuals();
}

const settingsScreen = function()
{
    gameContainer.replaceChildren();
    miscContainer.replaceChildren();

    let form = document.createElement("div");
    form.setAttribute("class", "input-group");
    
    let colourChoice = document.createElement("select");
    colourChoice.setAttribute("name", "colourChoice");
    colourChoice.setAttribute("id", "colourChoice");
    colourChoice.setAttribute("class", "form-select");

    let labelColourChoice = document.createElement("span");
    labelColourChoice.setAttribute("class", "input-group-text");
    labelColourChoice.innerText = "Play as:";

    let colourChoiceOptionWhite = document.createElement("option");
    colourChoiceOptionWhite.setAttribute("value", "White");
    colourChoiceOptionWhite.innerText = "White";

    let colourChoiceOptionBlack = document.createElement("option");
    colourChoiceOptionBlack.setAttribute("value", "Black");
    colourChoiceOptionBlack.innerText = "Black";

    let colourChoiceOptionNull = document.createElement("option");
    colourChoiceOptionNull.setAttribute("hidden", true);
    colourChoiceOptionNull.setAttribute("value", "");
    colourChoiceOptionNull.innerText = "Select your colour";

    colourChoice.addEventListener( "change", event => 
    {
        if(event.target.value == "White" )
        {
            boardPerspective = true;
        }
        else
        {
            if(event.target.value == "Black" )
            {
                boardPerspective = false;
            }
        }
    });

    colourChoice.appendChild(colourChoiceOptionNull);
    colourChoice.appendChild(colourChoiceOptionWhite);
    colourChoice.appendChild(colourChoiceOptionBlack);

    
    form.appendChild(labelColourChoice);
    form.appendChild(colourChoice);

    let opponentChoice = document.createElement("select");
    opponentChoice.setAttribute("name", "opponentChoice");
    opponentChoice.setAttribute("id", "opponentChoice");
    opponentChoice.setAttribute("class", "form-select");

    let labelOpponentChoice = document.createElement("span");
    labelOpponentChoice.setAttribute("class", "input-group-text");
    labelOpponentChoice.innerText = "Opponent:";

    let opponentChoiceOptionNull = document.createElement("option");
    opponentChoiceOptionNull.innerText = "Select your AI opponent";
    opponentChoiceOptionNull.setAttribute("value", "");
    opponentChoiceOptionNull.setAttribute("hidden", true);

    let opponentChoiceOptionRandom = document.createElement("option");
    opponentChoiceOptionRandom.setAttribute("value", "random");
    opponentChoiceOptionRandom.innerText = "AI One: Random mover";

    let opponentChoiceOptionRobot = document.createElement("option");
    opponentChoiceOptionRobot.setAttribute("value", "robot");
    opponentChoiceOptionRobot.innerText = "AI Three: Depth 3, cares about the piece point count";

    let opponentChoiceOptionFreedom = document.createElement("option");
    opponentChoiceOptionFreedom.setAttribute("value", "freedom");
    opponentChoiceOptionFreedom.innerText = "AI Two: Depth 2, cares about the quantity of legal moves";

    let opponentChoiceOptionHybrid = document.createElement("option");
    opponentChoiceOptionHybrid.setAttribute("value", "hybrid");
    opponentChoiceOptionHybrid.innerText = "AI Four: Depth 3, cares about both piece values and move availability";

    let opponentChoiceOptionExtension = document.createElement("option");
    opponentChoiceOptionExtension.setAttribute("value", "negaExtension");
    opponentChoiceOptionExtension.innerText = "AI Five: Depth 3+, looks deeper into forcing lines. Pieces and their activity eval.";

    let opponentChoiceOptionKingSafe = document.createElement("option");
    opponentChoiceOptionKingSafe.setAttribute("value", "kingSafe");
    opponentChoiceOptionKingSafe.innerText = "AI Six: Depth 3+, same as AI Five but also cares about castling and uses an opening book.";


    opponentChoice.addEventListener("change", event => 
    {
        if(event.target.value == "random")
        {
            choice = "random";
        }
        else
        {
            if(event.target.value == "robot")
            {
                choice = "robotAlphaBetaNega";
            }
            else
            {
                if(event.target.value == "freedom")
                {
                    choice = "freedom";
                }
                else
                {
                    if(event.target.value == "hybrid")
                    {
                        choice = "hybrid";
                    }
                    else
                    {
                        if( event.target.value == "negaExtension")
                        {
                            choice = "negaExtension";
                        }
                        else
                        {
                            if( event.target.value == "kingSafe")
                            {
                                choice = "kingSafe";
                            }
                        }
                    }
                }
            }
        }
    });

    opponentChoice.appendChild(opponentChoiceOptionNull);
    opponentChoice.appendChild(opponentChoiceOptionRandom);
    opponentChoice.appendChild(opponentChoiceOptionFreedom);
    opponentChoice.appendChild(opponentChoiceOptionRobot);
    opponentChoice.appendChild(opponentChoiceOptionHybrid);
    opponentChoice.appendChild(opponentChoiceOptionExtension);
    opponentChoice.appendChild(opponentChoiceOptionKingSafe);

    form.appendChild(labelOpponentChoice);
    form.appendChild(opponentChoice);

    let gameStartButton = document.createElement("button");

    gameStartButton.setAttribute("class", "btn input-group-btn btn-outline-primary");
    gameStartButton.innerText = "Start game!";
    gameStartButton.addEventListener("click", event => 
    {
        if(opponentChoice.value === "" || colourChoice.value === "")
        {
            //  they need to select a colour or opponent
            // TODO: give user feedback that they need to select these things
        }
        else
        {
            gameStarter();
        }
    });

    form.appendChild(gameStartButton);

    miscContainer.appendChild(form);
}

let gameStarter = function()
{
    gameContainer.replaceChildren();
    miscContainer.replaceChildren();

    gameHistoryArray = [];
    inBook = true;

    if(boardPerspective == true )
    {
        createWhiteChessboard();
        playerTurn = true;
        loadPosition("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    }
    else
    {
        createBlackChessboard();
        playerTurn = false;
        loadPosition("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
        chosenAI(currentFEN, choice);
    }
}

const playerLoses = function()
{
    let message = document.createElement("p");
    message.setAttribute("class", "fw-bold");
    message.innerText = "You lose!";

    let playAgainButton = document.createElement("button");
    playAgainButton.setAttribute("class", "btn btn-primary");
    playAgainButton.innerText = "play again?";
    playAgainButton.addEventListener("click", event =>
    {
        settingsScreen();
    });

    miscContainer.appendChild(message);
    miscContainer.appendChild(playAgainButton);
}

const playerWins = function()
{
    let message = document.createElement("p");
    message.setAttribute("class", "fw-bold");
    message.innerText = "You win!";

    let playAgainButton = document.createElement("button");
    playAgainButton.setAttribute("class", "btn btn-primary");
    playAgainButton.innerText = "play again?";
    playAgainButton.addEventListener("click", event =>
    {
        settingsScreen();
    });

    miscContainer.appendChild(message);
    miscContainer.appendChild(playAgainButton);
}

const playerStalemate = function()
{
    let message = document.createElement("p");
    message.innerText = "It's a draw by stalemate!";

    let playAgainButton = document.createElement("button");
    playAgainButton.innerText = "play again?";
    playAgainButton.addEventListener("click", event =>
    {
        settingsScreen();
    });

    miscContainer.appendChild(message);
    miscContainer.appendChild(playAgainButton);
}

let highlightLastMove = function()
{
    if(gameHistoryArray.length > 0)
    {
        let lastMove = gameHistoryArray[gameHistoryArray.length - 1];
        let square1 = lastMove.slice(0,2);
        let square2 = lastMove.slice(2,4);
    
        let square1UI = document.getElementById(square1);
        let square2UI = document.getElementById(square2);
    
        if(isSquareLight(square1))
        {
            square1UI.style.backgroundColor = lightSquareSelectedColour;
        }
        else
        {
            square1UI.style.backgroundColor = darkSquareSelectedColour;
        }
    
        if(isSquareLight(square2))
        {
            square2UI.style.backgroundColor = lightSquareSelectedColour;
        }
        else
        {
            square2UI.style.backgroundColor = darkSquareSelectedColour;
        }
    }
}

let isSquareLight = function(squareString)
{
    let coordinate1 = letterToNumber(squareString.slice(0,1)) + 1; //should be a number from 1 to 8
    let coordinate2 = Number(squareString.slice(1,2)); //should be a number from 1 to 8

    if((coordinate1 + coordinate2)%2 == 0 )
    {
        return false;
    }
    else
    {
        return true;
    }
}

let sideToMoveScript = function( menu )
{
    console.log(menu);
}; // I've forgotten what this is about

//Game state STUFF (GLOBAL VARIABLES)

let choice = ""; // choice of AI to play against
let currentFEN = ""; // current board position represented in FEN
let nodeCount; // for debugging node count in engines
let inBook = true;

let boardPerspective = true; // true for white and false for black
let sideToMove = true;       // true for white and false for black
let whiteCastleKingside = false;  //
let whiteCastleQueenside = false; // true for castling rights in that direction
let blackCastleKingside = false;  // false for no castling rights in that direction
let blackCastleQueenside = false; //
let enPassantSquare = ""; // the coordinate behind a pawn that was pushed 2 squares. For en passant moves. Will be "-" for null

let halfMoveClock = ""; // number of halfmoves (plies) since a capture or a pawn move was made. For the 50-move draw rule.
let fullMoveNumber = ""; // number of fullmoves. Increments after every Black turn. Starts at 1.
let gameHistoryArray = []; // array of longmove notations

let playerTurn = false; // if true then it's player's turn to move. If false, it's not player's turn to move.
let firstSelectedSquare = ""; // first square the player selected
let secondSelectedSquare = ""; // second square the player selected
let thirdSelectedSquare = ""; // equals "promoting!" or something when player is choosing what piece to promote a pawn into.
let userMove = ""; // the long form algebraic move the user created by selecting two squares
let currentBoard = 
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
    canWhiteCastleKingside: true,
    canWhiteCastleQueenside: true,
    canBlackCastleKingside: true,
    canBlackCastleQueenside: true,
    enPassantSquare: "",
    castlingRights: [true,true,true,true], // White Kingside, White Queenside, Black Kingside, Black Queenside
    halfMoveClock: 0,
    fullMoveNumber: 1,
};


//DOM STUFF

const gameContainer = document.getElementById("gameContainer")
const miscContainer = document.getElementById("misc");
settingsScreen();

//VISUAL STUFF

let lightSquareColour = "hsl(80, 50%, 80%)";
let darkSquareColour = "hsl(110, 50%, 50%)";
let lightSquareSelectedColour = "hsl(80, 50%, 65%)";
let darkSquareSelectedColour = "hsl(110, 50%, 35%)";
let lightSquareThinkingColour = "hsl(80, 50%, 90%)";
let darkSquareThinkingColour = "hsl(110, 50%, 60%)";
