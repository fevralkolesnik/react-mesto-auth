import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditAvatarPopup (props) {

    const {isOpen, onClose, onUpdateAvatar} = props;

    const currentUser = React.useContext(CurrentUserContext);

    const avatar = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: avatar.current.value
        });
    }


    return (
        <PopupWithForm title='Обновить аватар' name='set-avatar' buttonText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <label className="popup__form-field">
                <input
                className="popup__input popup__input_type_avatar"
                type="url"
                ref={avatar}
                id="profileAvatar"
                name="link"
                placeholder="Ссылка на картинку"
                required/>
                <span className="popup__input-error profileAvatar-error"></span>
            </label>
        </PopupWithForm>
    );
}