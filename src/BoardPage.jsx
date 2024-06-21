import CreateCardForm from "./CreateCardForm";
import Header from "./Header"
import { useState } from "react";

function BoardPage() {
    const [isModalVisible, setIsModalVisible] = useState(true);

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
            <h1>Board Title</h1>
            <button onClick={handleOpenModal}>Create a New Card</button>
            {isModalVisible && (
            <CreateCardForm
              isOpen={isModalVisible}
              closeModal={handleCloseModal}
            //   onModalDataChange={handleBoardDataChange}
            //   boardData={boardData}
            //   submitForm={handleCreateBoard}
            />
          )}
        </>
    )
}

export default BoardPage;