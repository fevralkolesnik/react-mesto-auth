import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          className="popup__input popup__input_type_name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="profileName"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="popup__input-error profileName-error"></span>
      </label>

      <label className="popup__form-field">
        <input
          className="popup__input popup__input_type_description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          id="profileDescription"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="popup__input-error profileDescription-error"></span>
      </label>
    </PopupWithForm>
  );
}
