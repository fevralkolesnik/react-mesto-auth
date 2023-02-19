import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main(props) {
  const {
    cards,
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardDelete,
    onCardLike,
    onCard,
  } = props;

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content page__content">
      <section className="profile content__profile" aria-label="Профиль">
        <div className="profile__avatar" onClick={onEditAvatar}>
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="Аватар пользователя"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            onClick={onEditProfile}
            className="profile__edit-button"
            type="button"
            aria-label="Редактировать профиль"
          ></button>
        </div>
        <p className="profile__description">{currentUser.about}</p>
        <button
          onClick={onAddPlace}
          className="profile__add-button"
          type="button"
          aria-label="Добавить публикацию"
        ></button>
      </section>

      <section className="elements" aria-label="Фото">
        {cards.map((card) => (
          <div key={card._id}>
            <Card
              card={card}
              onCardClick={onCard}
              onDeleteClick={onCardDelete}
              onLikeClick={onCardLike}
            />
          </div>
        ))}
      </section>
    </main>
  );
}
