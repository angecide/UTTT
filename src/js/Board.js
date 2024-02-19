export function Board({Square}) {

    function MiniRow({mini_row_idx}) {
        return <div className={"mini-row"}>
            <Square square_idx={mini_row_idx}/>
            <Square square_idx={mini_row_idx + 1}/>
            <Square square_idx={mini_row_idx + 2}/>
        </div>
    }

    function MiniBoard({name, board_idx}) {
        return <div className={name}>
            <MiniRow mini_row_idx={board_idx}/>
            <MiniRow mini_row_idx={board_idx + 3}/>
            <MiniRow mini_row_idx={board_idx + 6}/>
        </div>
    }

    function Row({name, row_idx}) {
        return <div className={name}>
            <MiniBoard name={"left-board"} board_idx={row_idx}/>
            <MiniBoard name={"middle-board"} board_idx={row_idx + 9}/>
            <MiniBoard name={"right-board"} board_idx={row_idx + 18}/>
        </div>
    }

    return <>
        <Row name={"upper-row"} row_idx={0}/>
        <Row name={"middle-row"} row_idx={27}/>
        <Row name={"lower-row"} row_idx={54}/>
    </>
}