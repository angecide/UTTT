import { useState } from 'react'

function Square() {
    const [state, setState] = useState(false)
    return (
        <button className='square' onClick={() => setState(!state)}>
            {state ? "╳" : ""}
        </button>
    )
}

function Board() {
    return (
        [1, 2, 3].map((i) =>
            <div className="board" key={i}>
                <Square />
            </div>
        )
    )
}

export function Main() {
    return (
        <>
            <div className="header">{"Ultimate Tic Tac Toe"}</div>
            <Board />
        </>
    )
}
