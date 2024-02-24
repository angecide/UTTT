import Set from 'core-js-pure/actual/set';
import range from 'core-js-pure/full/iterator/range';

const entire_board_indices = new Set(range(0, 81)) // used to quickly determine which squares to disable

function evaluate_TTT_board(move_played, board_array) {
    /*
    based on the move that was played and the resulting board state, figure out whether or not the board has been won or
    drawn, just like in regular TTT, and then disable all those squares and color the TTT board with the winner's color.

    At some point I also need to figure out a way to evaluate the bigger TTT board to evaluate who won the overall game.
     */
}

export function evaluate_legal_moves(move_played, disabled_squares) {
    const start = 9 * (move_played % 9) // start index of the square to the TTT board consisting of legal moves

    const legal_moves = new Set(range(start, start + 9))
        .difference(disabled_squares) // make sure we don't enable squares that have already been played on

    // if legal_moves contains move_played, we want to make sure that move_played still gets disabled
    // this call cannot be part of the above method chaining, since .delete returns a boolean value
    legal_moves.delete(move_played)

    const squares_to_disable = entire_board_indices
        .difference(disabled_squares) // no need to try to disable squares that have already been disabled
        .difference(legal_moves) // we don't want to disable the legal moves

    return {squares_to_enable: legal_moves, squares_to_disable: squares_to_disable}
}