import { useState } from 'react';
import './SearchForm.css';

const SearchForm = ({ onSearch }) => {
    const[text, setText] = useState('');

    const handleInputChange = (event) => {
        setText(event.target.value.trim()); //Trim whitespaces
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (text !== '') { // Check if input is not empty
            onSearch(text); 
        }
    };
 

    return (
        <form className='search-form' onSubmit={handleSubmit}>
        <input
            type="text"
            value={text}
            onChange={handleInputChange}
            placeholder="Search a board..."
        />
        <button type="submit">🔎</button> {/* Add search icon to button for accessibility */}
        </form>
    );
}

export default SearchForm;