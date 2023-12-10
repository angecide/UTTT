
const reset_board = (set_board_array) => {
    set_board_array(Array(81).fill(""))
}

function PlayerX({ set_board_array }) {
    return (
        <button
            className="reset"
            value={"╳"}
            onClick={() => reset_board(set_board_array)}
        >
            {"╳"}
        </button>
    )
}

function PlayerO({ set_board_array }) {
    return (
        <button
            className="reset"
            value={"◯"}
            onClick={() => reset_board(set_board_array)}
        >
            {"◯"}
        </button>
    )
}

function Reset({ set_board_array }) {
    return (
        <button
            className="reset"
            value={"reset"}
            onClick={() => reset_board(set_board_array)}
        >
            {"reset"}
        </button>
    )
}

export function ResetButtons({ set_board_array }) {
    return (
        <div className="resetbuttons">
            <PlayerX set_board_array={set_board_array} />
            <PlayerO set_board_array={set_board_array} />
            <Reset set_board_array={set_board_array} />
        </div>
    )
}