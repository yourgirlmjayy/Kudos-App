// import "./CardList.css"
import Card from "./Card"

function CardList ({cards, handleDelete, handleIncrementUpvote}) {
    // Check to see if cards is available and is an array before mapping
    const cardList = cards && Array.isArray(cards) ? cards.map((card) => {
        return (
            <Card
                key={card.id}
                title={card.title}
                description={card.description}
                imgUrl={card.imgUrl}
                upvotes={card.upvotes}
                handleDelete={handleDelete}
                handleIncrementUpvote={handleIncrementUpvote}
            />
        );
        // If card isn't an array or if there are no cards available, display this message
    }) : <p>No cards available.</p>;
    return (
        <div className="cardList">
            {cardList}
        </div>
    );
}

export default CardList;