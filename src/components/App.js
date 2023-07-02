import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import DeleteCardPopup from "./DeleteCardPopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRouteElement from "./ProtectedRoute";
import * as auth from "../utils/auth";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopup] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopup] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccessfully, setIsSuccessfully] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
    email: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [deletedCard, setDeletedCard] = useState({ _id: "" });

  const navigate = useNavigate();

  function handleLoggedIn(email) {
    setCurrentUser({ ...currentUser, email: email });
    setIsLoggedIn(true);
  }

  function handleLoggedOut() {
    setCurrentUser({
      ...currentUser,
      name: "",
      about: "",
      avatar: "",
      _id: "",
      email: "",
    });
    setIsLoggedIn(false);
    setCards([]);
  }

  function handleTokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      api.getUserInfo()
      .then((res) => {
        if (res) {
          handleLoggedIn(res.email);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
    }
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        api.setToken(res.token);
        handleLoggedIn(email);
        navigate("/", { replace: true });
      })
      .catch(() => {
        setIsSuccessfully(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setIsSuccessfully(true);
        setIsInfoTooltipOpen(true);
        navigate("/signin", { replace: true });
      })
      .catch(() => {
        setIsSuccessfully(false);
        setIsInfoTooltipOpen(true);
      });
  }

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser({
          ...currentUser,
          name: data.name,
          about: data.about,
          avatar: data.avatar,
          _id: data._id,
        });
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  useEffect(() => {
    handleTokenCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function handleCardDeleteClick (card) {
    setDeletedCard({ ...deletedCard, _id: card._id });
  }

  function handleCardClick(card) {
    setSelectedCard({ ...selectedCard, name: card.name, link: card.link });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

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
        closeAllPopups();
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
    setDeletedCard({ ...deletedCard, _id: "" });
    setSelectedCard({ ...selectedCard, name: "", link: "" });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header onExitUser={handleLoggedOut} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                component={Main}
                isLoggedIn={isLoggedIn}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardDelete={handleCardDeleteClick}
                onCardLike={handleCardLike}
                onCard={handleCardClick}
              />
            }
          />

          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />

          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
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

        <InfoTooltip
          isSuccessfully={isSuccessfully}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
        />

        <DeleteCardPopup card={deletedCard} onClose={closeAllPopups} onSubmit={handleCardDelete}/>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}
