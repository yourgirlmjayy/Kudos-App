import "./Modal.css"

function Modal({closeModal, onModalDataChange, boardData, submitForm}) {
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        onModalDataChange( {[name]: value} );
    }
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={closeModal}>Ⅹ</button>
                <h2>Create a New Board</h2>
                <p>Title:</p>
                <input name="title" type="text" value={boardData.title} onChange={handleInputChange} placeholder="Title..."/>
                <p>Category:</p>
                <select name='category' value={boardData.category} onChange={handleInputChange}>
                    <option></option>
                    <option value="Celebration">Celebration</option>
                    <option value="Inspiration">Inspiration</option>
                    <option value="Thank You">Thank You</option>
                </select>
                <p>Author:</p>
                <input name='author' type="text" value={boardData.author} onChange={handleInputChange} placeholder="Author name..."/>
                <button onClick={submitForm}>Create Board</button>
            </div>
        </div>
    );
}

export default Modal;