import { useState } from 'react'

let board_array = Array(81).fill("")

function Square(props) {
    const [state, setState] = useState(true)
    const update = () => {
        board_array[props.idx] = state ? "╳": "◯"
        setState(!state)
    }
    return (
        <button className='square' onClick={() => update()}>
            {board_array[props.idx]}
        </button>
    )
}

function MiniBoard(props) {
    return (
        <div className={props.name}>
            {
                [0, 3, 6].map((i) =>
                    <div className='minirow' key={i}>
                        <Square idx={i + props.board_idx}/>
                        <Square idx={i + 1 + props.board_idx}/>
                        <Square idx={i + 2 + props.board_idx}/>
                    </div>
                )
            }
        </div>
    )
}

function Row(props) {
    return (
        <div className={props.name}>
            <MiniBoard name={"leftboard"} board_idx={0 + props.row_idx}/>
            <MiniBoard name={"middleboard"} board_idx={9 + props.row_idx}/>
            <MiniBoard name={"rightboard"} board_idx={18 + props.row_idx}/>
        </div>
    )
}

export function Board() {
    return (
        <>
            <Row name={"upperrow"} row_idx={0}/>
            <Row name={"middlerow"} row_idx={27}/>
            <Row name={"lowerrow"} row_idx={54}/>
        </>
    )
}
