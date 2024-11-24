import Set from 'core-js-pure/actual/set';
import range from 'core-js-pure/full/iterator/range';

const entire_board_indices = new Set(range(0, 81)) // used to quickly determine which squares to disable each iteration
const filled = 511 // bitboard representation of every square in a 3x3 TTT board being occupied with a move
const winning_lines = [292, 448, 273, 84, 73, 56, 7, 146] // corresponds to TTT bitboard values of winning lines
const board_won = new Array(512).fill(false) // used to quickly determine if a TTT board has been won
for (const board of range(0, 512)) { // 0 to 511 are basically all the possible combinations of TTT boards
    for (const line of winning_lines) {
        if ((board & line) === line) { // check if this TTT board configuration contains any of the winning lines
            board_won[board] = true // thus, board_won[bitboard] is true if the TTT bitboard contains a winning line
        }
    }
}

export function update_game_state({player_bit_arrays, move_played, current_turn, game_board, cache, set_disables}) {
    const board = Math.floor(move_played / 9) // current TTT board index of where "move_played" was played
    const move = move_played % 9 // the corresponding square_idx relative to the above TTT board
    const current_board = player_bit_arrays[current_turn] // the player who played "move_played"'s bitboard
    const other_board = player_bit_arrays[-current_turn] // the other player's bit board

    game_board.delete(move_played) // game_board tracks all the squares that can be enabled, i.e. unoccupied squares etc.

    current_board[board] |= (1 << move) // update the current_turn's board with the "move" that was played on "board"
    if (board_won[current_board[board]]) { // check if the small board has been won
        current_board[9] |= (1 << board) // update the big board with the information that this board has been won
        console.log(current_turn, "won on board", board, "by playing", move_played)
        range(board * 9, board * 9 + 9).forEach(e => game_board.delete(e)) // disables this board for the rest of the game

        if (board_won[current_board[9]]) { // check if the big board has been won
            console.log(current_turn, "won the game by playing", move_played)
            game_board.clear() // game is over, disable all the squares
        }

    } else if ((current_board[board] | other_board[board]) === filled) { // check if the small board has been drawn
        player_bit_arrays[0] |= (1 << board) // update the draw board with the information that this board has been drawn
        console.log(current_turn, "draw on board", board, "by playing", move_played)
    }

    const big_board = current_board[9] | other_board[9] | player_bit_arrays[0] // current state of all the big boards
    if (big_board === filled && !board_won[current_board[9]]) { // check if the big board has been drawn
        console.log("the game ends in a draw")
    }

    let squares_to_enable // these are the squares that will be enabled for the next player to play on
    if ((big_board & (1 << move)) === 0) { // check if "move" sends the next player to a board that hasn't been finished
        squares_to_enable = new Set(range(move * 9, move * 9 + 9)) // if that's the case, then that board is enabled
            .intersection(game_board) // this ensures that we don't include squares that are disabled or going to be disabled
    } else {
        squares_to_enable = game_board // else, the next player can choose any unoccupied squares on any unfinished boards
    }

    entire_board_indices // disable squares that needs to be disabled
        .difference(squares_to_enable) // ensures that we don't disable squares that are going to be enabled
        .difference(cache.previously_disabled_squares) // no need to disable squares that have already been disabled
        .forEach(e => set_disables[e](true))

    squares_to_enable // enable squares that needs to be enabled
        .difference(cache.previously_enabled_squares) // no need to enable squares that have already been enabled
        .forEach(e => set_disables[e](false))

    cache.previously_disabled_squares = entire_board_indices.difference(squares_to_enable)
    cache.previously_enabled_squares = squares_to_enable
}
