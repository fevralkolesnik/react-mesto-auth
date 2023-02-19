export default function ImagePopup(props) {
  const { card, onClose } = props;

  return (
    <div
      className={`popup popup_type_image-view ${
        card.name ? "popup_opened" : ""
      }`}
    >
      <div className="popup__image-container">
        <button
          className="popup__close-button popup__close-button_type_image-view"
          onClick={onClose}
          type="button"
          aria-label="Закрыть окно просмотра картинки"
        ></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <h2 className="popup__image-name">{card.name}</h2>
      </div>
    </div>
  );
}
