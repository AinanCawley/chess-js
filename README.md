# chess-js

Making a Chess GUI and Engine from scratch in Javascript.

# AI Opponents

Currently there are 5 "AI" opponents to choose from. They get progressively more advanced.

# AI One 

Random mover just makes random moves.

# AI Two

"Depth 2, cares about the quantity of legal moves".

This AI evaluates leaf nodes by subtracting the number of legal moves the side-to-move can make by the number of legal moves the side-not-to-move can make. A depth 2 alpha-beta minimax search is used.

# AI Three

"Depth 3, cares about the piece point count".

This AI evaluates leaf nodes on the basis that pawns are 1 point, Knights and Bishops are 3 points, Rooks are 5 points, and Queens are 9 points. A depth 3 alpha-beta minimax search is used.

# AI Four

"Depth 3, cares about both piece values and move availability".

This AI combines both caring about the number of legal moves (like AI Two), and caring about the amount of piece value (like AI Three). A depth 3 alpha-beta minimax search is used.

# AI Five

"Depth 3+, looks deeper into forcing lines. Pieces and their activity eval"

This AI evaluates leaf nodes using a more nuanced piece activity eval instead of simply the number of legal moves. For example, the number of King moves doesn't come into the equation, and the number of Queen moves is hardly considered (to discourage early Queen play in the opening and the Queen usually has many more moves anyways). 

Another nuance is that improving a specific type of piece has diminishing returns. For example, it is preferred to develop both Bishop and Knights to an adequate level instead of "super developing" the Knights but leaving the Bishops undeveloped.

A depth 3 alpha-beta minimax is used but with SEARCH EXTENSION! This AI uses search extensions to look deeper into lines with forcing moves. If there are 5 or less legal moves, the search depth isn't decremented. 

# AI Six

"AI Six: Depth 3+, same as AI Five but also cares about castling and uses an opening book."

This AI is the same as AI Five but with an opening book and an evaluation component that depends on whether Queens are on the board. If there are Queens, having castled is preferred to having castling rights which is preferred to having lost castling rights.