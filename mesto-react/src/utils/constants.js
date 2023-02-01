const selectors = {
  content: '.content',
  popup: '.popup',
  profileName: '.profile__name',
  profileDescription: '.profile__description',
  profileAvatar: '.profile__avatar',
  profileImage: '.profile__image',
  buttonEdit: '.profile__edit-button',
  popupEditProfile: '.popup_type_edit-profile',
  popupFormEditProfile: '.popup__form_type_edit-profile',
  popupEditProfileNameInput: '.popup__input_type_name',
  popupEditProfileDescriptionInput: '.popup__input_type_description',
  buttonAddCard: '.profile__add-button',
  popupAddCard: '.popup_type_add-card',
  popupFormAddCard: '.popup__form_type_add-card',
  popupAddCardNameInput: '.popup__input_type_place',
  popupAddCardLinkInput: '.popup__input_type_image',
  popupImageView: '.popup_type_image-view',
  popupImageLink: '.popup__image',
  popupImageName: '.popup__image-name',
  popupDeleteCard: '.popup_type_delete-card',
  popupFormDeleteCard: '.popup__form_type_delete-card',
  popupSetAvatar: '.popup_type_set-avatar',
  popupFormSetAvatar: '.popup__form_type_set-avatar',
  popupSetAvatarLink: '.popup__input_type_avatar',
  popupCloseButton: 'popup__close-button',
  popupSubmitButton: '.popup__submit-button',
  cardsConteiner: '.elements',
  cardTemplate: '#template-element',
  card: '.element',
  cardName: '.element__name',
  cardImage: '.element__image',
  cardButtonLike: '.element__like',
  cardCountLikes: '.element__count-likes',
  cardButtonDelete: '.element__delete-button',
  cardButtonDeleteDisabled: 'element__delete-button_disabled',

  Esc: 'Escape',

  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error'
}

const content = document.querySelector(selectors.content);

const profileName = content.querySelector(selectors.profileName);
const profileDescription = content.querySelector(selectors.profileDescription);

const buttonEdit = content.querySelector(selectors.buttonEdit);
const popupEditProfile = document.querySelector(selectors.popupEditProfile);
const popupFormEditProfile = popupEditProfile.querySelector(selectors.popupFormEditProfile);
const popupEditProfileNameInput = popupFormEditProfile.querySelector(selectors.popupEditProfileNameInput);
const popupEditProfileDescriptionInput = popupFormEditProfile.querySelector(selectors.popupEditProfileDescriptionInput);

const buttonAddCard = content.querySelector(selectors.buttonAddCard);
const popupAddCard = document.querySelector(selectors.popupAddCard);
const popupFormAddCard = popupAddCard.querySelector(selectors.popupFormAddCard);
const popupAddCardNameInput = popupFormAddCard.querySelector(selectors.popupAddCardNameInput);
const popupAddCardLinkInput = popupFormAddCard.querySelector(selectors.popupAddCardLinkInput);

const popupImageView = document.querySelector(selectors.popupImageView);
const popupImageLink = popupImageView.querySelector(selectors.popupImageLink);
const popupImageName = popupImageView.querySelector(selectors.popupImageName);

const popupFormSetAvatar = document.querySelector(selectors.popupFormSetAvatar);
const userImage = document.querySelector(selectors.profileImage);
const userAvatar = document.querySelector(selectors.profileAvatar);

const cardsConteiner = document.querySelector(selectors.cardsConteiner);

export {selectors,
  profileName, profileDescription,
  buttonEdit, popupEditProfile, popupFormEditProfile, popupEditProfileNameInput, popupEditProfileDescriptionInput,
  buttonAddCard, popupAddCard, popupFormAddCard, popupAddCardNameInput, popupAddCardLinkInput,
  popupImageView, popupImageLink, popupImageName, cardsConteiner, userAvatar, popupFormSetAvatar, userImage};
