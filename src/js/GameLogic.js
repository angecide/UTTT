import Set from 'core-js-pure/actual/set';
import range from 'core-js-pure/full/iterator/range';

const entire_board_indices = new Set(range(0, 81)) // index for every square on the board

export const get_squares_to_disable = (move_played, disabled_squares) => {
    const start = 9 * (move_played % 9)

    return entire_board_indices
        .difference(new Set(range(start, start + 9))) // make sure the legal moves don't get disabled
        .difference(disabled_squares) // no need to run setDisable on squares that have already been disabled
}