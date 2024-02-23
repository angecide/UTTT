import Set from 'core-js-pure/actual/set';
import {useState} from 'react';
import {ResetButtons} from './ResetButtons';
import {Board} from "./Board";
import {get_squares_to_disable} from "./GameLogic";

export function Main() {
    const [board_array, set_board_array] = useState(Array(81).fill(""))
    const [start_turn, set_start_turn] = useState(0)

    const turn_map = {"1": "✕", "-1": "〇", "0": ""} // map to determine which symbol to draw based on whose turn it is
    let current_turn = start_turn // track whose turn it is currently

    let setDisable_collection = Array(81) // used to selectively disable squares, without re-rendering the other squares
    let occupied_squares = new Set([]) // collection of square_idx that have already been played, no need to enable/disable these again
    let previously_disabled_squares = new Set([]) // used to re-enable all the non-occupied squares that were disabled previously

    function Square({square_idx}) {
        const [state, updateState] = useState("")
        const [disable, setDisable] = useState(false)
        setDisable_collection[square_idx] = setDisable

        const disable_squares = (new_squares_to_disable) => {
            new_squares_to_disable
                .forEach(e => setDisable_collection[e](true))
            previously_disabled_squares
                .difference(occupied_squares)
                .difference(new_squares_to_disable)
                .forEach(e => setDisable_collection[e](false))
            previously_disabled_squares = new_squares_to_disable
        }

        const update_square = () => {
            board_array[square_idx] = current_turn
            updateState(turn_map[current_turn])
            current_turn = -current_turn
            disable_squares(get_squares_to_disable(square_idx, occupied_squares))
            occupied_squares.add(square_idx) // by adding this now instead of earlier, we ensure that the previous function disables square_idx
        }

        return <button className="square"
                       onClick={update_square}
                       disabled={disable}>
            {state}
        </button>
    }

    return <>
        <ResetButtons set_board_array={set_board_array} set_turn={set_start_turn}/>
        <Board Square={Square}/>
    </>
}