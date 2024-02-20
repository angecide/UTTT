import {useState} from 'react'
import {ResetButtons} from './ResetButtons';
import {Board} from "./Board";

export function Main() {
    const [board_array, set_board_array] = useState(Array(81).fill(""))
    const [start_turn, set_start_turn] = useState(0)
    const turn_map = {"1": "✕", "-1": "〇", "0": ""}
    let current_turn = start_turn
    let set_disable_array = Array(81)
    let disable_these_squares = []

    function Square({square_idx}) {
        const [state, updateState] = useState("")
        const [disable, set_disable] = useState(false)
        set_disable_array[square_idx] = set_disable

        const disable_squares = () => {
            disable_these_squares.forEach(e => set_disable_array[e](true))
        }

        const update_square = () => {
            board_array[square_idx] = current_turn
            updateState(turn_map[current_turn])
            current_turn = -current_turn
            disable_these_squares = [0, 1, 2, 3, 4, 5, 6, 7, 8] // the idea is that update_square will call game logic which will return the indices of squares that needs to be disabled
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