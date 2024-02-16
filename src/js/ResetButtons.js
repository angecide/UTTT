import {useMemo} from "react";

const reset_and_set_turn = (set_board_array, set_turn, turn) => {
    set_board_array(Array(81).fill(""))
    set_turn(turn)
}
// there is some duplicated code here, for playerX, Y and even reset
// just put it all under the same function and refactor from that
function PlayerX({set_board_array, set_turn}) {
    return <button className="reset"
                   value={"╳"}
                   onClick={() => reset_and_set_turn(set_board_array, set_turn, 1)}>
        {"╳"}
    </button>
}

function PlayerO({set_board_array, set_turn}) {
    return <button className="reset"
                   value={"◯"}
                   onClick={() => reset_and_set_turn(set_board_array, set_turn, -1)}>
        {"◯"}
    </button>
}

function Reset({set_board_array, set_turn}) {
    return <button className="reset"
                   value={"reset"}
                   onClick={() => reset_and_set_turn(set_board_array, set_turn, 0)}>
        {"reset"}
    </button>
}

export const ResetButtons = ({set_board_array, set_turn}) => useMemo(() =>
    <div className="reset-buttons">
        <PlayerX set_board_array={set_board_array} set_turn={set_turn}/>
        <PlayerO set_board_array={set_board_array} set_turn={set_turn}/>
        <Reset set_board_array={set_board_array} set_turn={set_turn}/>
    </div>, [set_board_array, set_turn]);