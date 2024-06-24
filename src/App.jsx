import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './Header';
import SearchForm from './SearchForm.jsx';
import Board from './Board.jsx';
import Modal from './Modal.jsx';
import BoardPage from './BoardPage.jsx';


function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [boardData, setBoardData] = useState({ title: '', imgUrl: '', category: '', author: null}) //set author to null because it is not a required field
  const [boards, setBoards] = useState([]);
  const [filteredBoards, setFilteredBoards] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState("All");

  useEffect(() => {
    getBoards();
  }, []); // renders page with boards immediately
  
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
      const filtered = getFilteredBoards(data, filterCriteria);
      const searchedAndFiltered = getSearchBoards(filtered, searchInput);
      setFilteredBoards(searchedAndFiltered);
    }
    catch(error) {
      console.error(error);
    }
  };

  async function addBoard(boardData) {
    console.log("imgurltest", boardData.imgUrl)
    try{
      const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS;
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'},
        body: JSON.stringify({
          title: boardData.title,
          imgUrl: boardData.imgUrl,
          category: boardData.category,
          author: boardData.author
          })
        };
      const response = await fetch(`${backendUrlAccess}/boards`,options);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      console.log(data);
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
}

  const handleFilterClicked = (selectedFilter) => {
    setFilterCriteria(selectedFilter);
  }

  function getSearchBoards (boards, searchCriteria) {
    if(searchCriteria == ""){
      return boards; //return all the boards when search is empty
    }
    return boards.filter( (board) => board.title.toLowerCase().includes(searchCriteria.toLowerCase()));
  }

  function getFilteredBoards(boards, criteria) {
    // if user selects 'all', return all the boards available
    if (criteria == "All") {
      return boards;
    }
    // map the boards based on the category user selects to const filtered
    const filtered = boards.filter(board => board.category === criteria);
    return filtered.length > 0 ? filtered : []; 
  }



  useEffect(() => {
        const filtered = getFilteredBoards(boards, filterCriteria);
        const searchedAndFiltered = getSearchBoards(filtered, searchInput);
        setFilteredBoards(searchedAndFiltered);

  }, [searchInput, filterCriteria])

  const BoardList = filteredBoards.map((board) => {
    return( 
      <Board 
        key={board.id}
        id={board.id}
        title={board.title}
        category={board.category}
        imgUrl={board.imgUrl}
        onBoardDelete={() => handleDeleteBoard(board.id)}
      />
    )
  })

  return(
    <Router>
    <Routes>
      <Route path='/' element={
        <>
          <header>
            <div className='kudos-app'>
              <Header />
              <SearchForm 
                searchInput={searchInput}
                handleSearchInput={handleSearchInput}
                handleFilterClicked={handleFilterClicked}
              />
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
          
          <footer>Created by Mojolajesu Dada</footer>

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
      } />
      <Route path='/board/:boardId' element={<BoardPage />}/>
    </Routes>
  </Router>

  )
}

export default App;
