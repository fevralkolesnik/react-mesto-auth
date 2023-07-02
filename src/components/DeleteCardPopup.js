import PopupWithForm from "./PopupWithForm";

export default function DeleteCardPopup(props) {
  const { card, onClose, onSubmit } = props;

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(card);
  }

  return (
    <PopupWithForm
      title='Вы уверены?'
      name='delete-card'
      buttonText='Да'
      isOpen={card._id}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
    </PopupWithForm>
  );
}
