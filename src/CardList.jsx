
import Card from "./Card"

function CardList ({cards, handleDelete, handleIncrementUpvote}) {
    // Check to see if cards is available and is an array before mapping
    const cardList = cards && Array.isArray(cards) ? cards.map((card) => {
        return (
            <div className="card-list">
                <Card
                    key={card.id}
                    title={card.title}
                    description={card.description}
                    author={card.author}
                    imgUrl={card.imgUrl}
                    upvotes={card.upvotes}
                    id={card.id}
                    handleDelete={handleDelete}
                    handleIncrementUpvote={handleIncrementUpvote}
                />
            </div>
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