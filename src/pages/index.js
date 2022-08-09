import './index.css'
import Card from '../components/Card.js';
import Section from '../components/Section.js'
import FormValidator from "../components/FormValidator.js"
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithVerifier from '../components/PopupWithVerifier.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
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
  profileAvatar,
  popupToEditAvatar,
  popupToVerify,
  editSubmit,
  editAvatar,
  avatarButton,
  addSubmit,
  verifySubmit
} from '../utils/constants.js'
const api = new Api('https://mesto.nomoreparties.co/v1/cohort-47', 'ae2441a2-0fee-454f-8a62-d5dbdc72ac5d')
const user = api.getUserInfo();
const cardsData = api.getCards();
const validatorToEditAuthor = new FormValidator (
  selectors,
  formToEditName
);
const validatorToAddCard = new FormValidator (
  selectors,
  formToAddCard
);
const validatorToEditAvatar = new FormValidator (
  selectors,
  popupToEditAvatar
);
const dataInfo = new UserInfo(
  profileName,
  profileJob
);
const popupProfile = new PopupWithForm(popupToEditName,
  (data) => {
  editSubmit.textContent = 'Сохранение...';
    api.editProfileData(data.nameAuthor, data.infoAuthor)
      .then((res) => {
        dataInfo.setUserInfo(res.name, res.about);
        editSubmit.textContent = 'Сохранить';
        popupProfile.close();
      })
      .catch((err) => {
        console.log(err);
      });
});
const popupForEditAvatar = new PopupWithForm(
  popupToEditAvatar,
  (elem) => {
    editAvatar.textContent = 'Сохранение...';
    api.editProfileAvatar(elem.link)
      .then((res) => {
        profileAvatar.src = res.avatar;
        editAvatar.textContent = 'Сохранить';
        popupForEditAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
popupForEditAvatar.setEventListeners();

avatarButton.addEventListener('click', () => {
  popupForEditAvatar.open();
});

const cards = new Section(
(item) => {
      const cardItem = handleNewCard(item);
      cards.addItem(cardItem);
    },
  cardElements
);
const popupCard = new PopupWithForm(popupToAddCard, (data) => {
    addSubmit.textContent = 'Создание...';
    api.addCard(data)
      .then((res) => {
        cards.addItem(handleNewCard(res));
       // cards.renderItems([res]);
        addSubmit.textContent = 'Создать';
        popupCard.close();
      })
      .catch((err) => {
        console.log(err);
      });
});
const popupStrechImage = new PopupWithImage(popupToScrechImage);
function handleCardClick(evt) {
  popupStrechImage.open(evt.target);
}
const popupRemoveCard = new PopupWithVerifier(
  popupToVerify,
  (elem, deletingCard) => {
    verifySubmit.textContent = 'Удаление...';
    api.removeCard(elem)
      .then(() => {
        popupRemoveCard.setEventListeners(elem);
        verifySubmit.textContent = 'Да';
        deletingCard.remove();
        deletingCard = null;
        popupRemoveCard.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
function handleRemoveCard (item, deletingCard) {
  popupRemoveCard.open(deletingCard);
  popupRemoveCard.setEventListeners(item);
};
function handleNewCard(card) {
  const newCard = new Card(card, "#card",handleCardClick, handleRemoveCard, {
    handleLike: (button) => {
      if(button.classList.contains('element__like-button_active')) {
        api.removeLike(card)
          .then((res) => {
            !newCard.counterOfLikes(res.likes.length);
            button.classList.remove('element__like-button_active');
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api.setLike(card)
          .then((res) => {
            !newCard.counterOfLikes(res.likes.length);
            button.classList.add('element__like-button_active');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  });
  return newCard.generateCard();
};
validatorToEditAuthor.enableValidation();
validatorToAddCard.enableValidation();
validatorToEditAvatar.enableValidation();
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
Promise.all([user, cardsData])
  .then((values) => {
    const userData = values[0];
    dataInfo.setUserInfo(userData.name, userData.about)
    profileAvatar.src = userData.avatar;
    const cardsArray = values[1];
    cards.renderItems(cardsArray);
  })
  .catch((err) => {
    console.log(err);
  });
