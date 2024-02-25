import {useState} from 'react';
import {ResetButtons} from './ResetButtons';
import {Board} from "./Board";
import {evaluate_legal_moves, update_bit_array} from "./GameLogic";

export function Main() {
    const [start_turn, set_start_turn] = useState(0)

    const turn_symbol_map = {"1": "✕", "-1": "〇", "0": ""}
    let current_turn = start_turn // track whose turn it is

    let setDisable_collection = Array(81) // used to selectively enable or disable squares
    let occupied_squares = new Set([]) // collection of square_idx that have already been played
    const player_bit_arrays = {"1": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "-1": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}

    function Square({square_idx}) {
        const [state, updateState] = useState("")
        const [disable, setDisable] = useState(start_turn === 0)
        setDisable_collection[square_idx] = setDisable

        const enable_and_disable_squares = () => {
            const {squares_to_enable, squares_to_disable} = evaluate_legal_moves(square_idx, occupied_squares)
            squares_to_enable.forEach(e => setDisable_collection[e](false))
            squares_to_disable.forEach(e => setDisable_collection[e](true))
        }

        const update_square = () => {
            updateState(turn_symbol_map[current_turn])
            current_turn = -current_turn
            update_bit_array(current_turn, square_idx, player_bit_arrays)
            enable_and_disable_squares()
            occupied_squares.add(square_idx)
        }

        return <button className="square"
                       onClick={update_square}
                       disabled={disable}>
            {state}
        </button>
    }

    return <>
        <ResetButtons set_turn={set_start_turn}/>
        <Board Square={Square}/>
    </>
}