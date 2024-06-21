import './Board.css';


function Board(props){
    return(
        <div className='board-card'>
            <img src={props.imgSrc} className='propsImage' alt='Board Image'></img>
            <div className='board-details'>
                <h5 className='board-title'>{props.title}</h5>
                <span className='board-category'>{props.category}</span>
            </div>
            <div className='card-button'>
                <button className='view-board'>👁️</button>
                <button className='delete-board' onClick={props.onBoardDelete}>🗑️</button>
            </div>
        </div>
    )
}

export default Board;