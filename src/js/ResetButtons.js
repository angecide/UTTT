
function PlayerX() {
    return (
        <button
            className="reset"
            value={"╳"}
        >
            {"╳"}
        </button>
    )
}

function PlayerO() {
    return (
        <button
            className="reset"
            value={"◯"}
        >
            {"◯"}
        </button>
    )
}

function Reset() {
    return (
        <button
            className="reset"
            value={"reset"}
        >
            {"reset"}
        </button>
    )
}

export function ResetButtons() {
    return (
        <div className="resetbuttons">
            <PlayerX />
            <PlayerO />
            <Reset />
        </div>
    )
}