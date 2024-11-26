import {useEffect, useRef, useState} from 'react';
import {ResetButtons} from './ResetButtons';
import {Board} from "./Board";
import {update_game_state} from "./GameLogic";
import range from 'core-js-pure/full/iterator/range';

const turn_symbol_map = {"1": "✕", "-1": "〇", "0": ""}

export function Main() {
    const [start_turn, set_start_turn] = useState(0)

    const game_state = { // tracks the moves played on the board by each player using bit arrays, "0": 0 tracks draws
        player_bit_arrays: {"1": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "-1": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "0": 0},
        game_board: new Set(range(0, 81)), // used to quickly determine which squares to enable next turn
        current_turn: start_turn, // track whose turn it is
        square_states: new Array(81), // array consisting of each square's set_disable and set_winner function
        cache: {previously_enabled_squares: new Set(), previously_disabled_squares: new Set()}
    }

    useEffect(() => { // a callback that calls set_status whenever the variable start_turn has been changed
        start_turn === 0 ? game_state.set_status("pick a side") : game_state.set_status("play the game")
    })

    function Square({square_idx}) {
        const [disable, set_disable] = useState(start_turn === 0)
        const [winner, set_winner] = useState("")
        game_state.square_states[square_idx] = {set_disable, set_winner}
        const square_text = useRef("")

        function update_square() {
            square_text.symbol = turn_symbol_map[game_state.current_turn]
            game_state.move_played = square_idx
            update_game_state(game_state)
            game_state.current_turn = -game_state.current_turn
        }

        return <button className="square"
                       onClick={update_square}
                       disabled={disable}
                       value={winner}>
            {square_text.symbol}
        </button>
    }

    function Status() {
        const [status, set_status] = useState("")
        game_state.set_status = set_status

        return <div className="status">
            {status}
        </div>
    }

    return <>
        <ResetButtons set_turn={set_start_turn}/>
        <Board Square={Square}/>
        <Status/>
    </>
}
