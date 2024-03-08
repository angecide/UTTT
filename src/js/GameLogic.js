import Set from 'core-js-pure/actual/set';
import range from 'core-js-pure/full/iterator/range';

let disabled_squares = new Set() // squares that were previously disabled
let enabled_squares = new Set() // squares that were previously enabled
const entire_board_indices = new Set(range(0, 81)) // used to quickly determine which squares to disable each iteration

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

export function update_game_state({player_bit_arrays, move_played, current_turn, finished_squares, set_disables}) {
    const board = Math.floor(move_played / 9) // current TTT board index of where "move_played" was played
    const move = move_played % 9 // the corresponding square_idx relative to the above TTT board

    const current_board = player_bit_arrays[current_turn] // the player who played "move_played"'s bit board
    const other_board = player_bit_arrays[-current_turn] // the other player's bit board

    let squares_to_disable = new Set([move_played]) // new set of squares that will be disabled for the rest of the game

    current_board[board] |= (1 << move) // update the current_turn's board with the "move" that was played on "board"
    if (board_won[current_board[board]]) { // check if the small board has been won
        current_board[9] |= (1 << board) // update the big board with the information that this board has been won
        squares_to_disable = squares_to_disable.union(new Set(range(board * 9, board * 9 + 9))) // disable this board
        console.log(current_turn, "won on board", board, "by playing", move_played)

        if (board_won[current_board[9]]) { // check if the big board has been won
            squares_to_disable = squares_to_disable.union(entire_board_indices) // game is over, disable all squares
            console.log(current_turn, "won the game by playing", move_played)
        }

    } else if ((current_board[board] | other_board[board]) === filled) { // check if the small board has been drawn
        player_bit_arrays[0] |= (1 << board) // update the draw board with the information that this board has been drawn
        console.log(current_turn, "draw on board", board, "by playing", move_played)
    }

    const big_board = current_board[9] | other_board[9] | player_bit_arrays[0] // the current state of all the big boards

    if (big_board === filled) { // check if the big board has been drawn
        squares_to_disable = squares_to_disable.union(entire_board_indices) // game is over, disable all squares
        console.log("the game ends in a draw")
    }

    let squares_to_enable // these are the squares that will be enabled for the next player to play on
    if ((big_board & (1 << move)) === 0) { // check if "move" sends the next player to a board that hasn't been finished
        squares_to_enable = new Set(range(move * 9, move * 9 + 9)) // if that's the case, then that board is enabled
    } else {
        squares_to_enable = entire_board_indices // otherwise, the next player can choose any of the other valid squares
    }

    /*
    How can I update enabled_squares ...
    The chain calls below, which updates squares_to_enable, shouldn't really need to update squares_to_enable
    the reason for this is that the main purpose of these chain calls is to optimize the final forEach loop
    and the reason why I decided to re-define squares_to_enable was because it was needed in the deciding which squares to disable
    but why not just use the entire squares_to_enable for this? It's set operation anyway, who cares about running some .difference on a bigger set
    the reason for not using squares_to_enable, is because there is a possibility that it contains something that's part of squares_to_disable? what has priority?
        the squares_to_disable is more fine tuned to the game rules, whereas squares_to_enable is defined with the intention of squares_to_disable being subtracted from it
        so squares_to_enable = squares_to_enable - squares_to_disable - finished_squares, and stuff_to_disable = entire_board_indices - finished_squares - squares_to_enable
        => stuff_to_disable = entire_board_indices - finished_squares - (squares_to_enable - squares_to_disable - finished_squares)
                            = entire_board_indices - finished_squares - squares_to_enable + squares_to_disable + finished_squares (not entirely sure this is how it works)

    tangent thought: Why am I subtracting with both squares_to_disable and finished_squares, shouldn't finished_squares already be part of finished_squares?
        no, squares_to_disable is always being re-defined at the start of this function
        squares_to_disable is the new squares that are disabled for the rest of the game, and finished_squares is a collection of all the previous squares_to_disable

    basically, if I don't update squares_to_enable, then it also includes stuff from squares_to_disable - finished_squares

    */
    squares_to_enable
        .difference(finished_squares) // don't enable squares that are already played on or part of a finished board
        .difference(squares_to_disable) // don't enable squares that are going to be disabled
        .forEach(e => set_disables[e](false)) // enable the remaining squares

    entire_board_indices // the entire board is used as a basis for determining which squares needs to be disabled
        .difference(squares_to_enable) // don't disable squares that have just been enabled
        .difference(finished_squares) // no need to re-run disable on squares that are already disabled
        .forEach(e => set_disables[e](true)) // disable the remaining squares
    squares_to_disable.forEach(e => finished_squares.add(e)) // squares_to_disable are no longer going to be enabled
}