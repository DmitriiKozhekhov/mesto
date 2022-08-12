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
  profileJob,
  profileAvatar
);
const popupProfile = new PopupWithForm(popupToEditName,
  (data) => {
  editSubmit.textContent = 'Сохранение...';
    api.editProfileData(data.nameAuthor, data.infoAuthor)
      .then((res) => {
        dataInfo.setUserInfo(res.name, res.about);
        popupProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        editSubmit.textContent = 'Сохранить';
      });
});
const popupForEditAvatar = new PopupWithForm(
  popupToEditAvatar,
  (elem) => {
    editAvatar.textContent = 'Сохранение...';
    api.editProfileAvatar(elem.link)
      .then((res) => {
        dataInfo.editAvatar(res);
        popupForEditAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        editAvatar.textContent = 'Сохранить';
      });
  }
);
popupForEditAvatar.setEventListeners();
avatarButton.addEventListener('click', () => {
  popupForEditAvatar.open();
});

const cards = new Section(
(item) => {
      cards.addItem(handleNewCard(item).generateCard());
    },
  cardElements
);
const popupCard = new PopupWithForm(popupToAddCard, (data) => {
    addSubmit.textContent = 'Создание...';
    api.addCard(data)
      .then((res) => {
        cards.addItem(handleNewCard(res).generateCard());
        popupCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        addSubmit.textContent = 'Создать';
      });
});
const popupStrechImage = new PopupWithImage(popupToScrechImage);
// function handleCardClick(evt) {
//   popupStrechImage.open(evt.target);
// }
const popupRemoveCard = new PopupWithVerifier(
  popupToVerify,
  (elem, deletingCard) => {
    verifySubmit.textContent = 'Удаление...';
    api.removeCard(elem)
      .then(() => {
        handleNewCard(elem).removeCard(deletingCard);
        popupRemoveCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        verifySubmit.textContent = 'Да';
      });
  }
);
popupRemoveCard.setEventListeners();

// function handleRemoveCard (item, deletingCard) {
//   popupRemoveCard.open(deletingCard);
//   popupRemoveCard.setEventListeners(item);
// };
function handleNewCard(card) {
  const newCard = new Card(card, "#card",popupStrechImage, popupRemoveCard, (card) => {
    api.setLike(card)
      .then((res) => {
        !newCard.counterOfLikes(res.likes.length);
        newCard.setLike();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  (card) => {
    api.removeLike(card)
      .then((res) => {
        !newCard.counterOfLikes(res.likes.length);
        newCard.removeLike();
      })
      .catch((err) => {
        console.log(err);
      });
  },dataInfo._id);
  return newCard;
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
    dataInfo.setUserInfo(userData.name, userData.about);
    dataInfo._id = userData._id;
    dataInfo.editAvatar(userData);
    const cardsArray = values[1];
    cards.renderItems(cardsArray);
  })
  .catch((err) => {
    console.log(err);
  });
