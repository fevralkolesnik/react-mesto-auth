import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRouteElement from "./ProtectedRoute";
import { getContent } from "../auth";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopup] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopup] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccessfully, setIsSuccessfully] = useState(false);
  // const [isDeleteCardOpen, setIsDeleteCardOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
    email: "",
    loggedIn: false, 
  });
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });

  const navigate = useNavigate(); 

  function handleLoggedIn (email) {
    setCurrentUser((user) => ({...user, email: email, loggedIn: true}));
  }

  function handleTokenCheck () {
    if (localStorage.getItem('token')){
      const token = localStorage.getItem('token');
      getContent(token)
      .then((res) => {
        if (res) {
          handleLoggedIn(res.data.email);
          navigate("/", {replace: true});
        }
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
    }
  }

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser((user) => ({
          ...user,
          name: data.name,
          about: data.about,
          avatar: data.avatar,
          _id: data._id,
        }));
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
    api
      .getAllCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });

    
  }, []);

  useEffect(() => {
    handleTokenCheck();
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopup(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopup(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopup(true);
  }

  function handleInfoTooltip () {
    setIsInfoTooltipOpen(true);
  }

  // function handleCardDeleteClick () {
  //   setIsDeleteCardOpen(true);
  // }

  function handleCardClick(card) {
    setSelectedCard({ ...selectedCard, name: card.name, link: card.link });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }

  function handleUpdateUser(userInfo) {
    api
      .setUserInfo(userInfo)
      .then((data) => {
        setCurrentUser({ ...currentUser, name: data.name, about: data.about });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar(userAvatar) {
    api
      .setAvatar(userAvatar)
      .then((data) => {
        setCurrentUser({ ...currentUser, avatar: data.avatar });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addNewCard(newCard)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }

  function closeAllPopups() {
    setIsEditProfilePopup(false);
    setIsAddPlacePopup(false);
    setIsEditAvatarPopup(false);
    setIsInfoTooltipOpen(false);
    // setIsDeleteCardOpen(false);
    setSelectedCard({ ...selectedCard, name: "", link: "" });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />

        <Routes>
          
          <Route path='/' element={<ProtectedRouteElement component={Main}
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
          onCard={handleCardClick} />}
          />

          <Route path='/signup' element={<Register onResult={setIsSuccessfully} onModalWindow={handleInfoTooltip} />} />

          <Route path='/signin' element={<Login handleLoggedIn={handleLoggedIn} />} />

        </Routes>

        

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onCreateCard={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <InfoTooltip isSuccessfully={isSuccessfully} isOpen={isInfoTooltipOpen} onClose={closeAllPopups} />

        {/* <PopupWithForm title='Вы уверены?' name='delete-card' buttonText='Да' isOpen={isDeleteCardOpen} onClose={closeAllPopups}/> */}

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}
