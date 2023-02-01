export default function Card (props) {

    const {card, onCardClick} = props;

    function handleCardClick () {
        onCardClick(card);
    }

    return (
        <article className="element">
            <div className="element__square">
                <img className="element__image" src={card.link} alt={card.name} onClick={handleCardClick}></img>
            </div>
            <div className="element__info">
                <h2 className="element__name">{card.name}</h2>
                <div className="element__stat">
                <button className="element__like" aria-label="Мне нравится" type="button"></button>
                <p className="element__count-likes">{card.likes.length}</p>
                </div>
            </div>
            <button className="element__delete-button" type="button" aria-label="Удалить карточку"></button>
         </article>
    )
}