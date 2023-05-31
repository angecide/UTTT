import { useState } from 'react'

function Square() {
    const [state, setState] = useState(false)
    return (
        <button className='square' onClick={() => setState(!state)}>
            {state ? "╳" : ""}
        </button>
    )
}

function MiniBoard() {
    return (
        <div>
            {
                [1, 2, 3].map((i) =>
                    <div className='minirow' key={i}>
                        <Square />
                        <Square />
                        <Square />
                    </div>
                )
            }
        </div>
    )
}

function Row() {
    return (
        <div className='row'>
            <MiniBoard />
            <MiniBoard />
            <MiniBoard />
        </div>

    )
}

function Board() {
    return (
        <>
            <Row />
            <Row />
            <Row />
        </>
    )
}

export function Main() {
    return (
        <>
            <div id="header">{"Ultimate Tic Tac Toe"}</div>
            <Board />
        </>
    )
}
