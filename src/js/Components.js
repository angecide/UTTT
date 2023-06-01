import { useState } from 'react'

function Square() {
    const [state, setState] = useState(false)
    return (
        <button className='square' onClick={() => setState(!state)}>
            {state ? "╳" : ""}
        </button>
    )
}

function MiniBoard(props) {
    return (
        <div className={props.name}>
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

function Row(props) {
    return (
        <div className={props.name}>
            <MiniBoard name={"leftboard"} />
            <MiniBoard name={"middleboard"} />
            <MiniBoard name={"rightboard"} />
        </div>
    )
}

export function Board() {
    return (
        <>
            <Row name={"upperrow"}/>
            <Row name={"middlerow"}/>
            <Row name={"lowerrow"}/>
        </>
    )
}
