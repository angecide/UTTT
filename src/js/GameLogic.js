import Set from 'core-js-pure/actual/set';
import range from 'core-js-pure/full/iterator/range';

const entire_board_indices = new Set(range(0, 81)) // used to quickly determine which squares to disable

export function evaluate_legal_moves(move_played, disabled_squares) {
    const start = 9 * (move_played % 9) // start index of the corresponding TTT board based on move_played

    const legal_moves = new Set(range(start, start + 9))
        .difference(disabled_squares) // make sure we don't enable squares that have already been played on

    const squares_to_disable = entire_board_indices
        .difference(disabled_squares) // no need to try to disable squares that have already been disabled
        .difference(legal_moves) // we don't want to disable the legal moves

    return {squares_to_enable: legal_moves, squares_to_disable: squares_to_disable}
}