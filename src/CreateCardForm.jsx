import './CreateCardForm.css'
import { useState } from 'react';
function CreateCardForm ({closeModal, boardId, submitForm}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [searchInput, setSearchInput] = useState("");
    const [gifs, setgifs] = useState([]);
    const [gifsURL, setGifsURL] = useState("");
    const [author, setAuthor] = useState('');

    const handleSearchSubmit = () => {
        fetchGiphy();
      }

    const handleSubmit = () => {
        const cardData = {
            title,
            description,
            gifsURL,
            author,
            boardId
        };
        console.log(cardData)
        submitForm(cardData);
    };

    const fetchGiphy = async() => {
        const API_KEY = import.meta.env.VITE_GIFY_API_KEY
        let url;
        // import gifs based on user's search input 
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
        //update searchInput whenever user types in the search field
        event.preventDefault()
        setSearchInput(event.target.value)
        
    }

    const handleSetGifsUrl = (url) => {
        setGifsURL(url);
      };   

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={closeModal}>&times;</button>
                <h2>Create a New Card</h2>
                <p>Title:</p>
                <input className="title" type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Title..."/>
                <p>Description:</p>
                <input className="description" type="text" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Description..."/>
                <p>Search GIFs:</p>
                <input className="searchGIFs" type="text" value={searchInput} onChange={handleInputChange} placeholder="Search..."/>
                <button onClick={handleSearchSubmit}>Search</button>
                <div className='giffy-images'>  
                    {gifs.map((gif) => (
                        <img className='gifs'
                            src={gif.images.downsized.url}
                            onClick={() => handleSetGifsUrl(gif.images.downsized.url)}
                            alt = {gif.alt_text}
                        />
                    ))}
                </div>
                <p>GIF Url:</p>
                <input className='gifs-url' type="text" value={gifsURL} onChange={(event) => setGifsURL(event.target.value)}></input>
                <p>Author:</p>
                <input className='author' type="text" value={author} onChange={(event) => setAuthor(event.target.value)} placeholder="Optional..."/>
                <p></p>
                <button onClick={handleSubmit}>Create Card</button> 
                {/* //create submit form function */}
            </div>
        </div>
    );
}

export default CreateCardForm;