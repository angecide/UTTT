import Set from 'core-js-pure/actual/set';
import range from 'core-js-pure/full/iterator/range';

const entire_board_indices = new Set(range(0, 81)) // used to quickly determine which squares to disable

const winning_line = [292, 448, 273, 84, 73, 56, 7, 146]
const board_is_done = range(0, 512)

export function update_bit_array(current_turn, move_played, player_bit_arrays) {
    /*
    based on the move that was played and the resulting board state, figure out whether or not the board has been won or
    drawn, just like in regular TTT, and then disable all those squares and color the TTT board with the winner's color.

    At some point I also need to figure out a way to evaluate the bigger TTT board to evaluate who won the overall game.
     */

    const board = Math.floor(move_played / 9)
    const move = move_played % 9

}

export function evaluate_legal_moves(move_played, disabled_squares) {
    const start = 9 * (move_played % 9) // start index of the square to the TTT board consisting of legal moves

    const legal_moves = new Set(range(start, start + 9))
        .difference(disabled_squares) // make sure we don't enable squares that have already been played on
        .difference(new Set([move_played])) // in case move_played points to the same TTT board

    const squares_to_disable = entire_board_indices
        .difference(disabled_squares) // no need to try to disable squares that have already been disabled
        .difference(legal_moves) // we don't want to disable the legal moves

    return {squares_to_enable: legal_moves, squares_to_disable: squares_to_disable}
}