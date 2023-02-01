export default function ImagePopup () {
    return (
        <div className="popup popup_type_image-view">
            <div className="popup__image-container">
            <button className="popup__close-button popup__close-button_type_image-view" type="button" aria-label="Закрыть окно просмотра картинки"></button>
            <img className="popup__image"/>
            <h2 className="popup__image-name"></h2>
            </div>
        </div>
    ); 
}