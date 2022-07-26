import './index.css'
import Card from '../components/Card.js';
import Section from '../components/Section.js'
import FormValidator from "../components/FormValidator.js"
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {
  selectors,
  popupToScrechImage,
  popupToAddCard,
  profileEditOpenButton,
  cardAddOpenButton,
  popupToEditName,
  formToAddCard,
  formToEditName,
  profileName,
  profileJob,
  profileNameInput,
  profileJobInput,
  cardElements,
  originalCards,
} from '../utils/constants.js'
const validatorToEditAuthor = new FormValidator (
  selectors,
  formToEditName
);
const validatorToAddCard = new FormValidator (
  selectors,
  formToAddCard
);
const cards = new Section(
  {
    items: originalCards,
    renderer: (item) => {
      const cardItem = handleNewCard(item);
      cards.addItem(cardItem);
    },
  },
  cardElements
);
const dataInfo = new UserInfo({
  nameAuthor: profileName,
  infoAuthor: profileJob,
});
const popupProfile = new PopupWithForm(popupToEditName, (data) => dataInfo.setUserInfo(data));
const popupCard = new PopupWithForm(popupToAddCard, (data) => {
  cards.addItem(handleNewCard(data));
});
const popupStrechImage = new PopupWithImage(popupToScrechImage);

function handleCardClick(evt) {
  popupStrechImage.open(evt.target);
}
function handleNewCard(card) {
  const newCard = new Card(card, "#card",handleCardClick).generateCard();
  return newCard;
};
validatorToEditAuthor.enableValidation();
validatorToAddCard.enableValidation();
cards.renderItems();
popupProfile.setEventListeners();
popupCard.setEventListeners();
popupStrechImage.setEventListeners();
profileEditOpenButton.addEventListener('click', () => {
  popupProfile.open();
  const { nameAuthor, infoAuthor } = dataInfo.getUserInfo();
  profileNameInput.value = nameAuthor;
  profileJobInput.value = infoAuthor;
  validatorToEditAuthor.resetValidation();
});
cardAddOpenButton.addEventListener('click', () => {
  popupCard.open();
  validatorToAddCard.resetValidation();
});
