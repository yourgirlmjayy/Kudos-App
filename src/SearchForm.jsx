import { useState } from 'react';
import './SearchForm.css';

const SearchForm = ({searchInput, handleSearchInput,handleFilterClicked}) => {

    const [search, setSearch] = useState("")

    const handleInputChange = (event) => {
        setSearch(event.target.value.trim())

        if (event.target.value.trim() === ""){
            handleSearchInput("")
        }
    }

    handleSearchInput(search); 
    //trim out whitespaces from user's input
    const handleSearch = () => {
    }

    const buttonIsClicked = (event) => {
        handleFilterClicked(event.target.name);
    }
    
    const handleFormSubmit = (event) => {
        //prevent page from being refreshed when seearch button is clicked
       event.preventDefault()
    }

    return (
        <>
        <form className='search-form' onSubmit={handleFormSubmit}>
        <input
            type="text"
            onChange={handleInputChange}            
            placeholder="Search a board..."
        />
        <button type="submit" onClick={handleSearch}>Search</button> 
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