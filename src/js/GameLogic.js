import Set from 'core-js-pure/actual/set';
import range from 'core-js-pure/full/iterator/range';

const entire_board_indices = new Set(range(0, 81)) // used to quickly determine which squares to disable this iteration

const filled = 511 // bit board representation of every square in a 3x3 TTT board being occupied with a move
const winning_lines = [292, 448, 273, 84, 73, 56, 7, 146]
const board_won = new Array(512).fill(false) // used to quickly determine if a board has been won
for (const board of range(0, 512)) { // 0 to 511 are basically all the possible combinations of TTT boards
    for (const line of winning_lines) {
        if ((board & line) === line) {
            board_won[board] = true // if any of those board configurations contains a winning line, we set it to true
        }
    }
}

export function update_game_state({player_bit_arrays, move_played, current_turn, disabled_squares, setDisables}) {
    const board = Math.floor(move_played / 9) // current TTT board index of where "move_played" was played
    const move = move_played % 9 // the corresponding square_idx relative to the above TTT board

    const current_board = player_bit_arrays[current_turn] // the player who played "move_played"'s bit board
    const other_board = player_bit_arrays[-current_turn] // the other player's bit board

    let squares_to_disable = new Set([move_played]) // additional squares that will be added to disabled_squares at the end
    current_board[board] |= (1 << move) // update the board

    if (board_won[current_board[board]]) { // check if the board has been won
        current_board[9] |= (1 << board) // update the big board with the information that this board has been won
        console.log(current_turn, "won on board", board, "by playing", move_played, "that player's bit array:", current_board)

        squares_to_disable = squares_to_disable.union(new Set(range(board * 9, board * 9 + 9)))

        if (board_won[current_board[9]]) { // check if the big board has been won
            console.log(current_turn, "won the game by playing", move_played, "that player's bit array:", current_board)
            squares_to_disable = squares_to_disable.union(entire_board_indices) // game is over, disable all squares
        }

    } else if ((current_board[board] | other_board[board]) === filled) { // check if the board has been drawn
        player_bit_arrays[0] |= (1 << board) // update the draw board with the information that this board has been drawn
        console.log(current_turn, "draw on board", board, "by playing", move_played, "players bit arrays:", player_bit_arrays)
    }

    const big_board = (current_board[9] | other_board[9] | player_bit_arrays[0]) ^ filled // flip the zeros and ones

    if (big_board === 0) { // check if the big board has been drawn
        squares_to_disable = squares_to_disable.union(entire_board_indices) // game is over, disable all squares
        console.log("the game ends in a draw")
    }

    let squares_to_enable
    if (big_board & (1 << move)) {
        squares_to_enable = new Set(range(move * 9, move * 9 + 9))
    } else {
        squares_to_enable = entire_board_indices
    }

    squares_to_enable = squares_to_enable
        .difference(disabled_squares)
        .difference(squares_to_disable)
    squares_to_enable.forEach(e => setDisables[e](false))

    entire_board_indices
        .difference(squares_to_enable)
        .difference(disabled_squares)
        .forEach(e => setDisables[e](true))
    squares_to_disable.forEach(e => disabled_squares.add(e))
}