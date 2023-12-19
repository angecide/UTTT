import {useState} from 'react'
import {ResetButtons} from './ResetButtons';

function Square({idx, board_array}) {
    const [state, updateState] = useState(true)
    const update_square = () => {
        board_array[idx] = state ? "╳" : "◯"
        updateState(!state)
    }
    return <button className="square" onClick={() => update_square()}>
        {board_array[idx]}
    </button>
}

function MiniRow({row_idx, board_idx, ...board_array}) {
    return <div className={"mini-row"}>
        <Square idx={row_idx + board_idx} {...board_array} />
        <Square idx={row_idx + 1 + board_idx} {...board_array} />
        <Square idx={row_idx + 2 + board_idx} {...board_array} />
    </div>
}

function MiniBoard({name, ...props}) {
    return <div className={name}>
        <MiniRow row_idx={0} {...props} />
        <MiniRow row_idx={3} {...props} />
        <MiniRow row_idx={6} {...props} />
    </div>
}

function Row({name, row_idx, ...board_array}) {
    return <div className={name}>
        <MiniBoard name={"left-board"} board_idx={0 + row_idx} {...board_array} />
        <MiniBoard name={"middle-board"} board_idx={9 + row_idx} {...board_array} />
        <MiniBoard name={"right-board"} board_idx={18 + row_idx} {...board_array} />
    </div>
}

export function Board() {
    const [board_array, set_board_array] = useState(Array(81).fill(""))
    return <>
        <ResetButtons set_board_array={set_board_array}/>
        <Row name={"upper-row"} row_idx={0} board_array={board_array}/>
        <Row name={"middle-row"} row_idx={27} board_array={board_array}/>
        <Row name={"lower-row"} row_idx={54} board_array={board_array}/>
    </>
}
