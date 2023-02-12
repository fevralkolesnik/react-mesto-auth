import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export default function Card (props) {

    const {card, onCardClick, onDeleteClick} = props;

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = ( 
        `element__like ${isLiked && 'element__like_active'}` 
      );; 

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
                <button className={cardLikeButtonClassName} aria-label="Мне нравится" type="button"></button>
                <p className="element__count-likes">{card.likes.length}</p>
                </div>
            </div>
            {isOwn && <button className="element__delete-button" type="button" aria-label="Удалить карточку" onClick={onDeleteClick}></button>}
         </article>
    )
}