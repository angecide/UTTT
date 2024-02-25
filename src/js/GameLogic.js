import Set from 'core-js-pure/actual/set';
import range from 'core-js-pure/full/iterator/range';

const entire_board_indices = new Set(range(0, 81)) // used to quickly determine which squares to disable

const winning_line = [292, 448, 273, 84, 73, 56, 7, 146]
const board_is_done = new Array(512).fill(false)
for (const board of range(0, 512)) {
    for (const line of winning_line) {
        if ((board & line) === line) {
            board_is_done[board] = true
        }
    }
}

export function update_game_state({player_bit_arrays, move_played, current_turn, disabled_squares, setDisables}) {
    const board = Math.floor(move_played / 9) // current board index of move_played
    const move = move_played % 9 // the corresponding move_idx relative to the board
    const start = 9 * move // the starting index on the TTT that the next player has to play on based on move_played

    player_bit_arrays[current_turn][board] += (1 << move)
    if (board_is_done[player_bit_arrays[current_turn][board]]) {
        player_bit_arrays[current_turn][9] += (1 << board)
    }

    const squares_to_enable = new Set(range(start, start + 9))
        .difference(disabled_squares) // make sure we don't enable squares that have already been played on
        .difference(new Set([move_played])) // in case move_played points to the same TTT board

    const squares_to_disable = entire_board_indices
        .difference(disabled_squares) // no need to try to disable squares that have already been disabled
        .difference(squares_to_enable) // we don't want to disable the squares we want to enable

    squares_to_enable.forEach(e => setDisables[e](false))
    squares_to_disable.forEach(e => setDisables[e](true))
}