import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const { isOpen, onClose, onCreateCard } = props;

  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onCreateCard({
      name,
      link,
    });

    setName("");
    setLink("");
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          className="popup__input popup__input_type_place"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="placeName"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
        />
        <span className="popup__input-error placeName-error"></span>
      </label>

      <label className="popup__form-field">
        <input
          className="popup__input popup__input_type_image"
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          id="placeDescription"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__input-error placeDescription-error"></span>
      </label>
    </PopupWithForm>
  );
}
