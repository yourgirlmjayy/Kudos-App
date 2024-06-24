import './Board.css';
import { useNavigate } from 'react-router';

function Board(props){
    const navigate = useNavigate();
    console.log(props.imgUrl);
    return(
        <div className='board-card'>
            <img src={props.imgUrl} className='propsImage' alt='Board Image'></img>
            <div className='board-details'>
                <h5 className='board-title'>{props.title}</h5>
                <span className='board-category'>{props.category}</span>
            </div>
            <div className='card-button'>
                <button className='view-board' onClick={() => navigate(`/board/${props.id}`)}>View Board</button>
                <button className='delete-board' onClick={() => props.onBoardDelete(props.id)}>Delete Board</button>
            </div>
        </div>
    )
}

export default Board;