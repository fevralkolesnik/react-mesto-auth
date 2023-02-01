import React from "react";
import api from '../utils/api';
import Card from "./Card";

export default function Main(props) {
    const [userName, setUserName] = React.useState("Жак-Ив Кусто");
    const [userDescription , setUserDescription ] = React.useState("Исследователь океана");
    const [userAvatar, setUserAvatar] = React.useState("../images/avatar.jpg");
    const [cards, setCards] = React.useState([]);
    
    const {onEditProfile, onAddPlace, onEditAvatar, onDeleteCard, onCard} = props;
    
    React.useEffect(() => {
        api.getUserInfo()
            .then ((data) => {
                setUserName(data.name);
                setUserDescription(data.about);
                setUserAvatar(data.avatar);
            })
            .catch (err => {
                console.log(`Произошла ошибка: ${err}`);
            });
    
            api.getAllCards()
            .then ((data) => {
                setCards(data);
            })
            .catch (err => {
                console.log(`Произошла ошибка: ${err}`);
            });
    }, []);
    

    return(
        <main className="content page__content">
            <section className="profile content__profile" aria-label="Профиль">
                <div className="profile__avatar" onClick={onEditAvatar}>
                    <img className="profile__image" src={userAvatar} alt="Аватар пользователя"/>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button onClick={onEditProfile} className="profile__edit-button" type="button" aria-label="Редактировать профиль"></button>
                </div>
                <p className="profile__description">{userDescription}</p>
                <button onClick={onAddPlace} className="profile__add-button" type="button" aria-label="Добавить публикацию"></button>
            </section>
                
            <section className="elements" aria-label="Фото">
                {cards.map((card) => (
                    <div key={card._id}>
                        <Card card={card} onCardClick={onCard} onDeleteClick={onDeleteCard}/>
                    </div>
                ))}
            </section>
        </main>
    );
}




