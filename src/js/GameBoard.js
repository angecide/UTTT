import { useState } from 'react'
import { ResetButtons } from './ResetButtons';

function Square({ idx, board_array }) {
    const [state, updateState] = useState(true)
    const update_square = () => {
        board_array[idx] = state ? "╳" : "◯"
        updateState(!state)
    }
    return (
        <button
            className="square"
            onClick={() => update_square()}
        >
            {board_array[idx]}
        </button>
    )
}

function MiniBoard({ name, board_idx, ...board_array }) {
    return (
        <div className={name}>
            {
                [0, 3, 6].map((i) =>
                    <div className="minirow" key={i}>
                        <Square idx={i + board_idx} {...board_array} />
                        <Square idx={i + 1 + board_idx} {...board_array} />
                        <Square idx={i + 2 + board_idx} {...board_array} />
                    </div>
                )
            }
        </div>
    )
}

function Row({ name, row_idx, ...board_array }) {
    return (
        <div className={name}>
            <MiniBoard name={"leftboard"} board_idx={0 + row_idx} {...board_array} />
            <MiniBoard name={"middleboard"} board_idx={9 + row_idx} {...board_array} />
            <MiniBoard name={"rightboard"} board_idx={18 + row_idx} {...board_array} />
        </div>
    )
}

export function Board() {
    const [board_array, set_board_array] = useState(Array(81).fill(""))
    return (
        <>
            <ResetButtons set_board_array={set_board_array} />
            <Row name={"upperrow"} row_idx={0} board_array={board_array} />
            <Row name={"middlerow"} row_idx={27} board_array={board_array} />
            <Row name={"lowerrow"} row_idx={54} board_array={board_array} />
        </>
    )
}
