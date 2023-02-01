import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

export default function App() {

  const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);

  function handleEditProfileClick () {
    setEditProfilePopup(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick () {
    setAddPlacePopup(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick () {
    setEditAvatarPopup(!isEditAvatarPopupOpen);
  }

  const [selectedCard, setSelectedCard] = React.useState({name: "", link: ""});

  function handleCardClick (card) {
    setSelectedCard({...selectedCard, name: card.name, link: card.link})
  }


  function closeAllPopups () {
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setEditAvatarPopup(false);
    setSelectedCard({...selectedCard, name: "", link: ""})
  }


  return (
    <div className="page">
      <Header />

      <Main onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick}  
            onCard={handleCardClick}/>

      <Footer />

      <PopupWithForm title='Редактировать профиль' name='edit-profile' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <label className="popup__form-field">
              <input
              className="popup__input popup__input_type_name"
              type="text"
              name="name"
              id="profileName"
              placeholder="Имя"
              required
              minLength="2"
              maxLength="40"/>
              <span className="popup__input-error profileName-error"></span>
          </label>

          <label className="popup__form-field">
              <input
              className="popup__input popup__input_type_description"
              type="text"
              name="description"
              id="profileDescription"
              placeholder="О себе"
              required
              minLength="2"
              maxLength="200"/>
              <span className="popup__input-error profileDescription-error"></span>
          </label>
      </PopupWithForm>
      
      <PopupWithForm title='Новое место' name='add-card' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <label className="popup__form-field">
              <input
              className="popup__input popup__input_type_place"
              type="text"
              name="name"
              id="placeName"
              placeholder="Название"
              required
              minLength="2"
              maxLength="30"/>
              <span class="popup__input-error placeName-error"></span>
          </label>

          <label className="popup__form-field">
              <input
              className="popup__input popup__input_type_image"
              type="url"
              id="placeDescription"
              name="link"
              placeholder="Ссылка на картинку"
              required/>
              <span className="popup__input-error placeDescription-error"></span>
          </label>
      </PopupWithForm>

      <PopupWithForm title='Обновить аватар' name='set-avatar' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <label className="popup__form-field">
              <input
              className="popup__input popup__input_type_avatar"
              type="url"
              id="profileAvatar"
              name="link"
              placeholder="Ссылка на картинку"
              required/>
              <span className="popup__input-error profileAvatar-error"></span>
          </label>
      </PopupWithForm>

      <PopupWithForm title='Вы уверены?' name='delete-card'>
          <button className="popup__submit-button" type="submit" aria-label="Удалить карточку">Да</button>
      </PopupWithForm> 

      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

  </div>
  );
}


