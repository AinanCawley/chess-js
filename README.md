# chess-js

Making a Chess GUI and Engine from scratch in Javascript.

# AI Opponents

Currently there are 3 AI opponents to choose from.

1: Random mover just makes random moves.

2: "Depth 3, cares about the piece point count" evaluates leaf nodes on the basis that pawns are 1 point, Knights and Bishops are 3 points, Rooks are 5 points, and Queens are 5 points. A depth 3 alpha-beta minimax search is used.

3: "Depth 2, cares about the quantity of legal moves" evaluates leaf nodes by taking the number of legal moves the side-to-move can make by the number of legal moves the side-not-to-move can make. A depth 2 alpha-beta minimax search is used.