import Set from 'core-js-pure/actual/set';
import range from 'core-js-pure/full/iterator/range';

export const get_legal_moves = (move_played) => {
    const start = 9 * (move_played % 9)
    return new Set(range(start, start + 9))
}