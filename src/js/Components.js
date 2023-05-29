/*
simple test script:
create three rows with a button, using map function to genereate the div
if I press on one of the three buttons, it should draw "╳" on that button
the crucial part is: only that button should be re-rendered, and nothing else
*/
function Board() {
    return (
        [1, 2, 3].map((i) =>
            <div className="board" key={i}>
                <button className="square" key={i + 3} onClick={e => e.target.innerText = "╳"}/>
            </div>
        )
    )
}

export function Main() {
    return (
        <>
            <div className="header">{"Ultimate Tic Tac Toe"}</div>
            <Board/>
        </>
    )
}
