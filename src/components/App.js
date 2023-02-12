import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from "./ImagePopup";
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export default function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopup] = React.useState(false);
  // const [isDeleteCardOpen, setIsDeleteCardOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({name: '', about: '', avatar: '', _id: ''});

  React.useEffect(() => {
    api.getUserInfo()
      .then ((data) => {
        setCurrentUser({...currentUser, name: data.name, about: data.about, avatar: data.avatar, _id: data._id});
      })
      .catch (err => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }, []);

  function handleEditProfileClick () {
    setIsEditProfilePopup(true);
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopup(true);
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopup(true);
  }
  
  // function handleCardDeleteClick () {
  //   setIsDeleteCardOpen(true);
  // }



  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getAllCards()
        .then ((data) => {
            setCards(data);
        })
        .catch (err => {
            console.log(`Произошла ошибка: ${err}`);
        });
  }, []);

  const [selectedCard, setSelectedCard] = React.useState({name: "", link: ""});

  function handleCardClick (card) {
    setSelectedCard({...selectedCard, name: card.name, link: card.link})
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }
  
  function handleCardDelete (card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }


  function handleUpdateUser(userInfo) {
    api.setUserInfo(userInfo) 
      .then((data) => {
        setCurrentUser({...currentUser, name: data.name, about: data.about});
        closeAllPopups();
      })
  }

  function handleUpdateAvatar(userAvatar) {
    api.setAvatar(userAvatar) 
      .then((data) => {
        setCurrentUser({...currentUser, avatar: data.avatar});
        closeAllPopups();
      })
  }

  function handleAddPlaceSubmit(newCard) {
    api.addNewCard(newCard)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
  }




  function closeAllPopups () {
    setIsEditProfilePopup(false);
    setIsAddPlacePopup(false);
    setIsEditAvatarPopup(false);
    // setIsDeleteCardOpen(false);
    setSelectedCard({...selectedCard, name: "", link: ""})
  }


  return (
    
      <div className="page">

        <CurrentUserContext.Provider value={currentUser}>
        <Header />

        <Main cards={cards}
              onEditProfile={handleEditProfileClick} 
              onAddPlace={handleAddPlaceClick} 
              onEditAvatar={handleEditAvatarClick}  
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
              onCard={handleCardClick}/> 

        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onCreateCard={handleAddPlaceSubmit} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

        {/* <PopupWithForm title='Вы уверены?' name='delete-card' buttonText='Да' isOpen={isDeleteCardOpen} onClose={closeAllPopups}/> */}

        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

        </CurrentUserContext.Provider>
    </div>
  );
}


