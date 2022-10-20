# chess-js

Making a Chess GUI and Engine from scratch in Javascript.

# AI Opponents

Currently there are 3 AI opponents to choose from.

AI One: Random mover just makes random moves.

AI Two: "Depth 2, cares about the quantity of legal moves" evaluates leaf nodes by subtracting the number of legal moves the side-to-move can make by the number of legal moves the side-not-to-move can make. A depth 2 alpha-beta minimax search is used.

AI Three: "Depth 3, cares about the piece point count" evaluates leaf nodes on the basis that pawns are 1 point, Knights and Bishops are 3 points, Rooks are 5 points, and Queens are 9 points. A depth 3 alpha-beta minimax search is used.

AI Four: "Depth 3, cares about both piece values and move availability" combines both AIs 2 and 3.

AI Five: "Depth 3+, only cares about piece values but selectively looks deeper into forcing lines" is the same as AI Three but extends search for positions with only 2 legal moves. This helps calculate forcing lines deeper.