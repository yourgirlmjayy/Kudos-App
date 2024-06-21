import './CreateCardForm.css'

function CreateCardForm ({closeModal, onModalDataChange, boardData, submitForm}) {
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        onModalDataChange( {[name]: value} );
    }
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={closeModal}>&times;</button>
                <h2>Create a New Card</h2>
                <p>Title:</p>
                <input name="title" type="text" placeholder="Title..."/>
                <p>Description:</p>
                <input name="description" type="text" placeholder="Description..."/>
                <p>GIF:</p>
                <input name="searchGIFs" type="text" placeholder="Search GIFs..."/>
                <p>Author:</p>
                <input name='author' type="text"  placeholder="Optional"/>
                <button onClick={submitForm}>Create Card</button>
            </div>
        </div>
    );
}

export default CreateCardForm;