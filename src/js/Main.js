import {useState} from 'react';
import {ResetButtons} from './ResetButtons';
import {Board} from "./Board";
import {update_game_state} from "./GameLogic";

export function Main() {
    const [start_turn, set_start_turn] = useState(0)

    const turn_symbol_map = {"1": "✕", "-1": "〇", "0": ""}

    const game_state = { // player_bit_arrays tracks the moves played on the board by each player using bit arrays
        player_bit_arrays: {"1": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "-1": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
        current_turn: start_turn, // track whose turn it is
        disabled_squares: new Set([]), // collection of square_idx that have already been played
        setDisables: new Array(81) // used to selectively enable or disable squares
    }

    function Square({square_idx}) {
        const [state, updateState] = useState("")
        const [disable, setDisable] = useState(start_turn === 0)
        game_state.setDisables[square_idx] = setDisable

        const update_square = () => {
            updateState(turn_symbol_map[game_state.current_turn])
            game_state.move_played = square_idx
            update_game_state(game_state)
            game_state.disabled_squares.add(square_idx)
            game_state.current_turn = -game_state.current_turn
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