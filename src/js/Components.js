import { useState } from 'react'

function Square() {
    const [state, setState] = useState(false)
    return (
        <button className='square' onClick={() => setState(!state)}>
            {state ? "╳" : ""}
        </button>
    )
}

function TTT() {
    return (
        [1, 2, 3].map((i) =>
            <div className="TTT" key={i}>
                {
                    [3, 6, 9].map((j) => <Square key={i + j} />)
                }
            </div>
        )
    )
}

function UTTT() {
    return (
        <div>
            <TTT />
        </div>
    )
}

export function Main() {
    return (
        <>
            <div className="header">{"Ultimate Tic Tac Toe"}</div>
            <TTT />
        </>
    )
}
