export function ResetButtons({set_board_array, set_turn}) {

    const reset_and_set_turn = (turn) => {
        set_board_array(Array(81).fill(""))
        set_turn(turn)
    }

    function ResetButton({text, turn}) {
        return <button className="reset"
                       value={text}
                       onClick={() => reset_and_set_turn(turn)}>
            {text}
        </button>
    }

    return <div className="reset-buttons">
        <ResetButton text={"✕"} turn={1}/>
        <ResetButton text={"〇"} turn={-1}/>
        <ResetButton text={"reset"} turn={0}/>
    </div>
}