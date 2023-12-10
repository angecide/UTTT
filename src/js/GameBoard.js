import { useState } from 'react'

let board_array = Array(81).fill("")

function Square({idx}) {
    const [state, setState] = useState(true)
    const update = () => {
        board_array[idx] = state ? "╳" : "◯"
        setState(!state)
    }
    return (
        <button
            className="square"
            onClick={() => update()}
        >
            {board_array[idx]}
        </button>
    )
}

function MiniBoard({name, board_idx}) {
    return (
        <div className={name}>
            {
                [0, 3, 6].map((i) =>
                    <div className="minirow" key={i}>
                        <Square idx={i + board_idx} />
                        <Square idx={i + 1 + board_idx} />
                        <Square idx={i + 2 + board_idx} />
                    </div>
                )
            }
        </div>
    )
}

function Row({name, row_idx}) {
    return (
        <div className={name}>
            <MiniBoard name={"leftboard"} board_idx={0 + row_idx} />
            <MiniBoard name={"middleboard"} board_idx={9 + row_idx} />
            <MiniBoard name={"rightboard"} board_idx={18 + row_idx} />
        </div>
    )
}

export function Board() {
    return (
        <>
            <Row name={"upperrow"} row_idx={0} />
            <Row name={"middlerow"} row_idx={27} />
            <Row name={"lowerrow"} row_idx={54} />
        </>
    )
}
