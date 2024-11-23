export function ResetButtons({set_turn}) {

    function ResetButton({text, turn}) {
        return <button className="reset"
                       value={text}
                       onClick={() => set_turn(turn)}>
            {text}
        </button>
    }

    return <div className="reset-buttons">
        <ResetButton text={"✕"} turn={1}/>
        <ResetButton text={"〇"} turn={-1}/>
        <ResetButton text={"reset"} turn={0}/>
    </div>
}
