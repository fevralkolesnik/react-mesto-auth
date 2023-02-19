export default function PopupWithForm(props) {
  const { name, title, buttonText, children, isOpen, onClose, onSubmit } =
    props;

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className={`popup__close-button popup__close-button_type_${name}`}
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
        <h3 className="popup__title">{title}</h3>
        <form
          className={`popup__form popup__form_type_${name}`}
          name={name}
          onSubmit={onSubmit}
        >
          {children}
          <button
            className="popup__submit-button"
            type="submit"
            aria-label="Отправить форму"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
