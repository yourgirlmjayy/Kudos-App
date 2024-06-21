import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header';
// import Buttons from './Buttons';
import SearchForm from './SearchForm.jsx';
import Board from './Board.jsx';
import Modal from './Modal.jsx';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [boardData, setBoardData] = useState({ title: '', category: '', author: null}) //set author to null because it is not a required field
  const [boards, setBoards] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState("All"); // default, all boards is the category of boards displayed
  const [filteredResults, setFilteredResults] = useState([]);


  useEffect(() => {
    getBoards();
  }, []); // renders page immediately
  
  async function getBoards() {
    // fetch list of boards from backend server
    try{
      const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS;
      console.log(backendUrlAccess);
      const response = await fetch(`${backendUrlAccess}/boards`);
      // handle errors
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      // parse fetched data as json
      const data = await response.json();
      setBoards(data);
      console.log(boards);
    }
    catch(error) {
      console.error(error);
    }
    //updates the filteredResults state with the updated boards array
    setFilteredResults(boards);
  };

  async function addBoard(boardData) {
    try{
      const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS;
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'},
        body: JSON.stringify({
          title: boardData.title,
          category: boardData.category,
          author: boardData.author
          })
        };
      const response = await fetch(`${backendUrlAccess}/boards`,options);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      getBoards();
    }
    catch(error) {
      console.error(error);
    }
  };

  async function deleteBoard(boardId) {
    //make call to backend to delete board
    try{
      const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS;
      const options = {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'},
        };
      const response = await fetch(`${backendUrlAccess}/boards/${boardId}`,options);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      getBoards();
    }
    catch(error) {
      console.error(error);
    }
  }
  
  // set function to handle when modal is opened
  function handleOpenModal (){
    //set modal visibility to true to handle when modal is open
    setIsModalVisible(true);
  }

  // set function for when modal is closed
  function handleCloseModal () {
    setIsModalVisible(false);
  }

  const handleCreateBoard = () => {
    addBoard(boardData); 
    handleCloseModal();
  }

  const handleBoardDataChange = (data) => {
    setBoardData(prev => ({ ...prev, ...data }));
  };
  const handleDeleteBoard = (boardId) => {
    deleteBoard(boardId);
  }

  const handleSearchInput = (searchInput) => {
    setSearchInput(searchInput); //update search input 
    setSearchResults(boards.filter(board => board.title.toLowerCase().includes(searchInput.toLowerCase()))); // filter boards by title and make search case insensitive
}

  const handleFilterClicked = (selectedFilter) => {
    setFilterCriteria(selectedFilter);
  }

  function getFilteredBoards(boards, criteria) {
    // if user selects 'all', return all the boards available
    if (criteria == "All") {
      return boards;
    }
    // map the boards based on the category user selects to const filtered
    const filtered = boards.filter(board => board.category == criteria);
    return filtered.length > 0 ? filtered : [];
  }

  const BoardList = boards.map((board) => {
    return( 
      <Board 
        key={board.id}
        title={board.title}
        category={board.category}
        onBoardDelete={() => handleDeleteBoard(board.id)}
        boards={searchInput ? getFilteredBoards(searchResults, filterCriteria) : getFilteredBoards(boards, filterCriteria)}
      />
    )
  })

  return(
    <>

      <header>
        <div className='kudos-app'>
            <Header />
            <SearchForm 
              searchInput={searchInput}
              handleSearchInput={handleSearchInput}
              handleFilterClicked={handleFilterClicked}
            />
            {/* <Buttons /> */}
            <div className='centre-button'>
              <button className='create-new-board-button' onClick={handleOpenModal}>Create a new Board</button>
            </div>
        </div>
          </header>
      <main>
        <div className='board-container'>
            {BoardList}
        </div>

      </main>
      
      {isModalVisible && (
        <Modal
          isOpen={isModalVisible}
          closeModal={handleCloseModal}
          onModalDataChange={handleBoardDataChange}
          boardData={boardData}
          submitForm={handleCreateBoard}
        />
      )}
    </>

  )
}

export default App;
