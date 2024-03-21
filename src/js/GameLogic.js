import Set from 'core-js-pure/actual/set';
import range from 'core-js-pure/full/iterator/range';

const filled = 511 // bit board representation of every square in a 3x3 TTT board being occupied with a move
const winning_lines = [292, 448, 273, 84, 73, 56, 7, 146]
const board_won = new Array(512).fill(false) // used to quickly determine if a board has been won
for (const board of range(0, 512)) { // 0 to 511 are basically all the possible combinations of TTT boards
    for (const line of winning_lines) {
        if ((board & line) === line) {
            board_won[board] = true // if any of those board configurations contains a winning line, set it to true
        }
    }
}

export function update_game_state({player_bit_arrays, move_played, current_turn, game_board, cache, set_disables}) {
    const board = Math.floor(move_played / 9) // current TTT board index of where "move_played" was played
    const move = move_played % 9 // the corresponding square_idx relative to the above TTT board

    const current_board = player_bit_arrays[current_turn] // the player who played "move_played"'s bit board
    const other_board = player_bit_arrays[-current_turn] // the other player's bit board

    let squares_to_disable = new Set([move_played]) // new set of squares that will be disabled for the rest of the game
    game_board.delete(move_played)

    current_board[board] |= (1 << move) // update the current_turn's board with the "move" that was played on "board"
    if (board_won[current_board[board]]) { // check if the small board has been won
        current_board[9] |= (1 << board) // update the big board with the information that this board has been won
        console.log(current_turn, "won on board", board, "by playing", move_played)

        range(board * 9, board * 9 + 9).forEach(e => {
            squares_to_disable.add(e)
            game_board.delete(e)
        })

        if (board_won[current_board[9]]) { // check if the big board has been won
            console.log(current_turn, "won the game by playing", move_played)

            squares_to_disable = squares_to_disable.union(game_board)
        }

    } else if ((current_board[board] | other_board[board]) === filled) { // check if the small board has been drawn

        player_bit_arrays[0] |= (1 << board) // update the draw board with the information that this board has been drawn
        console.log(current_turn, "draw on board", board, "by playing", move_played)
    }

    const big_board = current_board[9] | other_board[9] | player_bit_arrays[0] // the current state of all the big boards

    if (big_board === filled) { // check if the big board has been drawn
        console.log("the game ends in a draw")

        squares_to_disable = squares_to_disable.union(game_board)
    }

    let squares_to_enable // these are the squares that will be enabled for the next player to play on
    if ((big_board & (1 << move)) === 0) { // check if "move" sends the next player to a board that hasn't been finished
        squares_to_enable = new Set(range(move * 9, move * 9 + 9))
    } else {
        squares_to_enable = game_board
    }

}