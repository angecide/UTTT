import {useState} from 'react'
import {ResetButtons} from './ResetButtons';

export function Board() {
    const [board_array, set_board_array] = useState(Array(81).fill(""))

    function Square({idx}) {
        const [state, updateState] = useState(true)
        const update_square = () => {
            board_array[idx] = state ? "╳" : "◯"
            updateState(!state)
        }
        return <button className="square" onClick={() => update_square()}>
            {board_array[idx]}
        </button>
    }

    function MiniRow({row_idx, board_idx}) {
        return <div className={"mini-row"}>
            <Square idx={row_idx + board_idx}/>
            <Square idx={row_idx + 1 + board_idx}/>
            <Square idx={row_idx + 2 + board_idx}/>
        </div>
    }

    function MiniBoard({name, ...board_idx}) {
        return <div className={name}>
            <MiniRow row_idx={0} {...board_idx} />
            <MiniRow row_idx={3} {...board_idx} />
            <MiniRow row_idx={6} {...board_idx} />
        </div>
    }

    function Row({name, row_idx}) {
        return <div className={name}>
            <MiniBoard name={"left-board"} board_idx={0 + row_idx}/>
            <MiniBoard name={"middle-board"} board_idx={9 + row_idx}/>
            <MiniBoard name={"right-board"} board_idx={18 + row_idx}/>
        </div>
    }

    return <>
        <ResetButtons set_board_array={set_board_array}/>
        <Row name={"upper-row"} row_idx={0}/>
        <Row name={"middle-row"} row_idx={27}/>
        <Row name={"lower-row"} row_idx={54}/>
    </>
}
