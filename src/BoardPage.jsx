import CreateCardForm from "./CreateCardForm";
import { useParams } from 'react-router-dom';
import Header from "./Header"
import CardList from "./CardList";
import { useState, useEffect } from "react";

function BoardPage() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedBoard,setSelectedBoard] = useState({});
    const [cardData,setCardData] = useState({
        title: '',
        description: '',
        imgUrl: '',
        author: null,
        upvotes: 0,
        boardId: '',
    });

    const { boardId } = useParams();

    async function getSpecificBoard(boardId) {
        // function to get a specfic board from all boards
        try{
            const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS;
            const response = await fetch(`${backendUrlAccess}/boards/${boardId}`);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            setSelectedBoard(data);
        }
        catch(error) {
            console.error(error);
        }
    };

    async function addCard(cardData) {
        try{
          const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS;
          const options = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'},
            body: JSON.stringify({
              title: cardData.title,
              description: cardData.description,
              imgUrl: cardData.imgUrl,
              author: cardData.author,
              boardId: cardData.boardId
              })
            };
          const response = await fetch(`${backendUrlAccess}/boards/${cardData.boardId}/cards`,options);
          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
          const data = await response.json();
          setCardData(data);
          getSpecificBoard(cardData.boardId);
        }
        catch(error) {
          console.error(error);
        }
    };

    async function deleteCard(boardId) {
        try{
            const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS;
            const options = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'},
            };
            const response = await fetch(`${backendUrlAccess}/boards/${boardId}/cards/`,options);
            if (!response.ok) {
            throw new Error('Something went wrong!');
            }
            const data = await response.json();
            setCardData(data);
            getSpecificBoard(cardData.boardId);

        }
        catch(error) {
            console.error(error);
        }
        }


    const handleCreateCard = (newCardData) => {
        addCard(newCardData);
        setIsModalVisible(false)
        };

    // render specific board page when view board is clicked
    useEffect(() => {
      getSpecificBoard(boardId);
    }, []);

// set function to handle when modal is opened
  function handleOpenModal (){
     //set modal visibility to true to handle when modal is open
    setIsModalVisible(true);
  }

  // set function for when modal is closed
  function handleCloseModal () {
    setIsModalVisible(false);
  }

  return (
    <>
        <Header />
        <h1>{selectedBoard.title}</h1>
        <button onClick={handleOpenModal}>Create a New Card</button>
        {/* <CardList cards={selectedBoard.cards} handleDelete={deleteCard} handleIncrementUpvote={incrementUpvote}/> */}
        {isModalVisible && <CreateCardForm
            closeModal={handleCloseModal}
            submitForm={handleCreateCard}
            boardId={boardId} />
        }
    </> 
    )
} 
    

export default BoardPage;