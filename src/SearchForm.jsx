import { useState } from 'react';
import './SearchForm.css';

const SearchForm = ({searchInput, handleSearchInput,handleFilterClicked}) => {

    const handleInputChange = (event) => {
        handleSearchInput(event.target.value.trim()); //trim out whitespaces from user's input
    }

    const buttonIsClicked = (event) => {
        handleFilterClicked(event.target.name);
    }
 

    return (
        <>
        <form className='search-form' onSubmit={(event) => event.preventDefault()}>
        <input
            type="text"
            value={searchInput} 
            onChange={handleInputChange}
            placeholder="Search a board..."
        />
        <button type="submit">🔎</button> {/* Add search icon to button for accessibility */}
        </form>
        <div className="category-filters">
        <button name="All" onClick={buttonIsClicked}>All</button>
        <button name="Recent" onClick={buttonIsClicked}>Recent</button>
        <button name="Celebration" onClick={buttonIsClicked}>Celebration</button>
        <button name="Thank You" onClick={buttonIsClicked}>Thank You</button>
        <button name="Inspiration" onClick={buttonIsClicked}>Inspiration</button>
    </div>
    </>
    )
}

export default SearchForm;