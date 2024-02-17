import {useState} from 'react'
import {ResetButtons} from './ResetButtons';

export function Board() {
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

        return <button className="square" onClick={() => update_square()}>
            {state}
        </button>
    }

    function MiniRow({mini_row_idx}) {
        return <div className={"mini-row"}>
            <Square square_idx={mini_row_idx}/>
            <Square square_idx={mini_row_idx + 1}/>
            <Square square_idx={mini_row_idx + 2}/>
        </div>
    }

    function MiniBoard({name, board_idx}) {
        return <div className={name}>
            <MiniRow mini_row_idx={board_idx}/>
            <MiniRow mini_row_idx={board_idx + 3}/>
            <MiniRow mini_row_idx={board_idx + 6}/>
        </div>
    }

    function Row({name, row_idx}) {
        return <div className={name}>
            <MiniBoard name={"left-board"} board_idx={row_idx}/>
            <MiniBoard name={"middle-board"} board_idx={row_idx + 9}/>
            <MiniBoard name={"right-board"} board_idx={row_idx + 18}/>
        </div>
    }

    return <>
        <ResetButtons set_board_array={set_board_array} set_turn={set_start_turn}/>
        <Row name={"upper-row"} row_idx={0}/>
        <Row name={"middle-row"} row_idx={27}/>
        <Row name={"lower-row"} row_idx={54}/>
    </>
}
