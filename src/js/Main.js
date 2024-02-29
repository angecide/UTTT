import {useState} from 'react';
import {ResetButtons} from './ResetButtons';
import {Board} from "./Board";
import {update_game_state} from "./GameLogic";

export function Main() {
    const [start_turn, set_start_turn] = useState(0)

    const turn_symbol_map = {"1": "✕", "-1": "〇", "0": ""}

    const game_state = { // tracks the moves played on the board by each player using bit arrays, "0": 0 tracks draws
        player_bit_arrays: {"1": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "-1": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "0": 0},
        current_turn: start_turn, // track whose turn it is
        disabled_squares: new Set([]), // collection of square_idx that have already been played on
        set_disables: new Array(81) // used to selectively enable or disable squares
    }

    function Square({square_idx}) {
        const [square_text, update_square_text] = useState("")
        const [disable, set_disable] = useState(start_turn === 0)
        game_state.set_disables[square_idx] = set_disable

        const update_square = () => {
            update_square_text(turn_symbol_map[game_state.current_turn])
            game_state.move_played = square_idx
            update_game_state(game_state)
            game_state.current_turn = -game_state.current_turn
        }

        return <button className="square"
                       onClick={update_square}
                       disabled={disable}>
            {square_text}
        </button>
    }

    return <>
        <ResetButtons set_turn={set_start_turn}/>
        <Board Square={Square}/>
    </>
}