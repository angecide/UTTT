import 'core-js/actual/set';
import {useState} from 'react'
import {ResetButtons} from './ResetButtons';
import {Board} from "./Board";

export function Main() {
    const [board_array, set_board_array] = useState(Array(81).fill(""))
    const [start_turn, set_start_turn] = useState(0)

    const turn_map = {"1": "✕", "-1": "〇", "0": ""}
    let current_turn = start_turn

    let set_disable_array = Array(81)
    let new_disabled_squares = new Set([])
    let old_disabled_squares = new Set([])

    function Square({square_idx}) {
        const [state, updateState] = useState("")
        const [disable, set_disable] = useState(false)
        set_disable_array[square_idx] = set_disable

        const disable_squares = () => {
            new_disabled_squares.forEach(e => set_disable_array[e](true))
            old_disabled_squares.difference(new_disabled_squares).forEach(e => set_disable_array[e](false))
            old_disabled_squares = new_disabled_squares
        }

        const update_square = () => {
            board_array[square_idx] = current_turn
            updateState(turn_map[current_turn])
            current_turn = -current_turn
            if (new_disabled_squares.has(4)) {
                new_disabled_squares = new Set([6, 7, 8, 9, 10, 11, 12, 13])
            } else {
                new_disabled_squares = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8])
            }
            disable_squares()
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