import {useState} from 'react'
import {ResetButtons} from './ResetButtons';
import {Board} from "./Board";

export function Main() {
    const [board_array, set_board_array] = useState(Array(81).fill(""))
    const [start_turn, set_start_turn] = useState(0)
    const turn_map = {"1": "✕", "-1": "〇"}
    let current_turn = start_turn

    function Square({square_idx}) {
        const [state, updateState] = useState("")

        const update_square = () => {
            board_array[square_idx] = current_turn
            updateState(turn_map[current_turn])
            current_turn = -current_turn
        }

        return <button className="square" onClick={update_square}>
            {state}
        </button>
    }

    return <>
        <ResetButtons set_board_array={set_board_array} set_turn={set_start_turn}/>
        <Board Square={Square}/>
    </>
}
