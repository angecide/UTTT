import Set from 'core-js-pure/actual/set';
import {useState} from 'react';
import {ResetButtons} from './ResetButtons';
import {Board} from "./Board";
import {get_legal_moves} from "./GameLogic";

export function Main() {
    const [board_array, set_board_array] = useState(Array(81).fill(""))
    const [start_turn, set_start_turn] = useState(0)

    const turn_map = {"1": "✕", "-1": "〇", "0": ""}
    let current_turn = start_turn

    let set_disable_array = Array(81)
    let disabled_squares = new Set([])
    let old_disabled_squares = new Set([])

    function Square({square_idx}) {
        const [state, updateState] = useState("")
        const [disable, set_disable] = useState(false)
        set_disable_array[square_idx] = set_disable

        const disable_squares = (new_disabled_squares) => {
            new_disabled_squares.forEach(e => set_disable_array[e](true))
            old_disabled_squares
                .difference(disabled_squares)
                .difference(new_disabled_squares)
                .forEach(e => set_disable_array[e](false))
            old_disabled_squares = new_disabled_squares
        }

        const update_square = () => {
            board_array[square_idx] = current_turn
            disabled_squares.add(square_idx)
            updateState(turn_map[current_turn])
            current_turn = -current_turn
            disable_squares(get_legal_moves(square_idx))
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