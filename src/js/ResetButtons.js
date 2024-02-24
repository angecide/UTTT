export function ResetButtons({set_board_array, set_turn}) {

    function ResetButton({text, turn}) {
        const reset_and_set_turn = () => {
            set_turn(turn)
        }

        return <button className="reset"
                       value={text}
                       onClick={reset_and_set_turn}>
            {text}
        </button>
    }

    return <div className="reset-buttons">
        <ResetButton text={"✕"} turn={1}/>
        <ResetButton text={"〇"} turn={-1}/>
        <ResetButton text={"reset"} turn={0}/>
    </div>
}