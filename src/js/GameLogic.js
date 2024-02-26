﻿import Set from 'core-js-pure/actual/set';
import range from 'core-js-pure/full/iterator/range';

const entire_board_indices = new Set(range(0, 81)) // used to quickly determine which squares to disable

const draw = 511
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

    // this block of code updates the player arrays based on the move that was played, and checks if game is over
    current_board[board] |= (1 << move) // update the board
    if (board_won[current_board[board]]) { // check if the board has been won
        current_board[9] |= (1 << board) // update the big board with the information that this board has been won
        console.log(current_turn, "won on board", board, "by playing", move_played, "that player's bit array:", current_board)
        if (board_won[current_board[9]]) { // check if the big board has been won
            console.log(current_turn, "won the game by playing", move_played, "that player's bit array:", current_board)
        }
    } else if ((current_board[board] | other_board[board]) === draw) { // check if the board is drawn
        player_bit_arrays[0] |= (1 << board) // update the draw board with the information that this board has been drawn
        console.log(current_turn, "draw on board", board, "by playing", move_played, "players bit arrays:", player_bit_arrays)
    }
    if (((current_board[9] | other_board[9] | player_bit_arrays[0]) & draw) === draw) // check if the big board is drawn
    {
        console.log("the game ends in a draw")
    }

    const start = move * 9 // the starting index of the TTT board where the next player has to play based on move_played

    const squares_to_enable = new Set(range(start, start + 9))
        .difference(disabled_squares) // make sure we don't enable squares that have already been played on
        .difference(new Set([move_played])) // in case move_played points to the same TTT board

    entire_board_indices
        .difference(disabled_squares) // no need to try to disable squares that have already been disabled
        .difference(squares_to_enable) // we don't want to disable the squares we want to enable
        .forEach(e => setDisables[e](true))

    squares_to_enable.forEach(e => setDisables[e](false))
}