import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

export default function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopup] = React.useState(false);
  const [isDeleteCardOpen, setIsDeleteCardOpen] = React.useState(false);

  function handleEditProfileClick () {
    setIsEditProfilePopup(true);
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopup(true);
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopup(true);
  }

  function handleDeleteCardClick () {
    setIsDeleteCardOpen(true);
  }

  const [selectedCard, setSelectedCard] = React.useState({name: "", link: ""});

  function handleCardClick (card) {
    setSelectedCard({...selectedCard, name: card.name, link: card.link})
  }


  function closeAllPopups () {
    setIsEditProfilePopup(false);
    setIsAddPlacePopup(false);
    setIsEditAvatarPopup(false);
    setIsDeleteCardOpen(false);
    setSelectedCard({...selectedCard, name: "", link: ""})
  }


  return (
    <div className="page">
      <Header />

      <Main onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick}  
            onDeleteCard={handleDeleteCardClick}
            onCard={handleCardClick}/>

      <Footer />

      <PopupWithForm title='Редактировать профиль' name='edit-profile' buttonText='Сохранить' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
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
      
      <PopupWithForm title='Новое место' name='add-card' buttonText='Создать' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
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
              <span className="popup__input-error placeName-error"></span>
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

      <PopupWithForm title='Обновить аватар' name='set-avatar' buttonText='Сохранить' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
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

      <PopupWithForm title='Вы уверены?' name='delete-card' buttonText='Да' isOpen={isDeleteCardOpen} onClose={closeAllPopups}/>

      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

  </div>
  );
}


