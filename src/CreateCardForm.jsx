import './CreateCardForm.css'
import { useState } from 'react';
function CreateCardForm ({closeModal, onModalDataChange, boardData, submitForm}) {
    const [searchInput, setSearchInput] = useState("");
    const [gifs, setgifs] = useState([]);
    const [gifsURL, setGifsURL] = useState("");

    const handleSearchSubmit = () => {
        fetchGiphy();
      }

    const fetchGiphy = async() => {
        const API_KEY = import.meta.env.VITE_GIFY_API_KEY
        let url;
        url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchInput}`;
    
        const options = {
          method: "GET",
          headers: {
            accept: "application/json"
          }
        };
    
        const res = await fetch(url, options);
        const data = await res.json();
        setgifs(data.data);
          

    }

    const handleInputChange = (event) => {
        event.preventDefault()
        setSearchInput(event.target.value)
        
    }

    const handleSetGifsUrl = (url) => {
        setGifsURL(url.target.value);
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
                <input name="searchGIFs" type="text" value={searchInput} onChange={handleInputChange} placeholder="Search..."/>
                <button onClick={handleSearchSubmit}>Search</button>
                <p>URL:</p>
                <input className='gifs-url' type="text" value={gifsURL}></input>
                <div className='giffy-images'>  
                    {gifs.map((gif) => (
                        <img className='gifs'
                            src={gif.images.downsized.url}
                            onClick={handleSetGifsUrl}
                        />
                    ))}
                </div>
                <p>Author:</p>
                <input name='author' type="text"  placeholder="Optional"/>
                <button onClick={submitForm}>Create Card</button> 
                {/* //create submit form function */}
            </div>
        </div>
    );
}

export default CreateCardForm;