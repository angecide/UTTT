import Set from 'core-js-pure/actual/set';
import {useState} from 'react';
import {ResetButtons} from './ResetButtons';
import {Board} from "./Board";
import {get_squares_to_enable_and_disable} from "./GameLogic";

export function Main() {
    const [board_array, set_board_array] = useState(Array(81).fill(""))
    const [start_turn, set_start_turn] = useState(0)

    const turn_symbol_map = {"1": "✕", "-1": "〇", "0": ""}
    let current_turn = start_turn // track whose turn it is

    let setDisable_collection = Array(81) // used to selectively disable squares
    let occupied_squares = new Set([]) // collection of square_idx that have already been played, no need to enable/disable these again

    function Square({square_idx}) {
        const [state, updateState] = useState("")
        const [disable, setDisable] = useState(false)
        setDisable_collection[square_idx] = setDisable

        const enable_and_disable_squares = () => {
            const {squares_to_enable, squares_to_disable} = get_squares_to_enable_and_disable(square_idx, occupied_squares)
            squares_to_enable
                .forEach(e => setDisable_collection[e](false))
            squares_to_disable
                .forEach(e => setDisable_collection[e](true))
        }

        const update_square = () => {
            board_array[square_idx] = current_turn
            updateState(turn_symbol_map[current_turn])
            current_turn = -current_turn
            enable_and_disable_squares()
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