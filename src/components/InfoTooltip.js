import success from "../images/suc.svg";
import error from "../images/err.svg";

export default function InfoTooltip(props) {
  const { isSuccessfully, isOpen, onClose } = props;

  const message = {
    happy: "Вы успешно зарегистрировались!",
    sad: "Что-то пошло не так! Попробуйте ещё раз.",
  };

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_modal">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
        <img
          src={isSuccessfully ? success : error}
          alt="Статус регистрации"
        ></img>
        <h3 className="popup__title popup__title_type_modal">
          {isSuccessfully ? message.happy : message.sad}
        </h3>
      </div>
    </div>
  );
}
