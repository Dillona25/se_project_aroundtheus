import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import "./index.css";
import { data } from "autoprefixer";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/API.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

//* ==========================================
//*              constants
//* ==========================================

const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-add-modal");
const editAvatarModal = document.querySelector("#profile-avatar-modal");
const profileEditButton = document.querySelector(".profile__edit-button");
const modalName = document.querySelector(".modal__name");
const modalSubtitle = document.querySelector(".modal__bio");
const profileAddButton = document.querySelector(".profile__add-button");

const api = new Api("https://around-api.en.tripleten-services.com/v1", {
  authorization: "7e84cba7-6af7-4727-bf28-6799c49e2b64",
  "Content-Type": "application/json",
});

const userInfo = new UserInfo(
  ".profile__content-name",
  ".profile__content-subtitle",
  ".profile__image"
);

//* ==========================================
//*              Render Cards
//* ==========================================

function renderCard(cardData) {
  return new Card(
    cardData,
    handleCardClick,
    "#card-template",
    handleDelete,
    handleLikeButton
  ).getCard();
}

//* ==========================================
//*               Liking cards
//* ==========================================

function handleLikeButton(card) {
  if (card.isLiked) {
    api
      .removeLikes(card.cardId)
      .then((res) => {
        card.setLikeStatus(res.isLiked);
      })
      .catch((err) => console.log(err));
  } else {
    api
      .addLikes(card.cardId)
      .then((res) => {
        card.setLikeStatus(res.isLiked);
      })
      .catch((err) => console.log(err));
  }
}

//* ==========================================
//*             Form Validation
//* ==========================================

const editFormElement = profileEditModal.querySelector("#modal-edit-form");
const addFormElement = profileAddModal.querySelector("#modal-form-add");
const editAvatarElement = editAvatarModal.querySelector("#modal__form_avatar");

const formValidatorOptions = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(
  formValidatorOptions,
  editFormElement
);
const addFormValidator = new FormValidator(
  formValidatorOptions,
  addFormElement
);

const editAvatarValidator = new FormValidator(
  formValidatorOptions,
  editAvatarElement
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
editAvatarValidator.enableValidation();

//* ==========================================
//*        Section class and Promise
//* ==========================================

let cardSection;
Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
  ([data, cards]) => {
    userInfo.setUserInfo(data.name, data.about);
    userInfo.setUserAvatar(data.avatar);
    cardSection = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          cardSection.addItem(renderCard(cardData));
        },
      },
      "#card-list"
    );
    cardSection.renderItems();
  }
);

//* ==========================================
//*           Editing Avatar Image
//* ==========================================

const avatarButton = document.querySelector(".profile__image-edit");
avatarButton.addEventListener("click", () => {
  editAvatarValidator.resetValidation();
  editAvatarForm.open();
});

const editAvatarForm = new PopupWithForm("#profile-avatar-modal", (avatar) => {
  editAvatarForm.setSubmitText(true);
  api
    .editAvatar(avatar)
    .then((userData) => {
      userInfo.setUserAvatar(userData.avatar);
      editAvatarForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => editAvatarForm.setSubmitText(false));
});
editAvatarForm.setEventListeners();

//* ==========================================
//*          PopupWithImage Class
//* ==========================================

const popupImage = new PopupWithImage({ popupSelector: "#image-modal" });
popupImage.setEventListeners();

function handleCardClick(cardData) {
  popupImage.open(cardData);
}

//* ==========================================
//*       PopupWithForm: Edit profile
//* ==========================================

profileEditButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  modalName.value = data.name;
  modalSubtitle.value = data.about;
  profileForm.open();
});

const profileForm = new PopupWithForm("#profile-edit-modal", (data) => {
  profileForm.setSubmitText(true);
  api
    .editUserInfo(data)
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about);
      profileForm.close();
    })
    .finally(() => profileForm.setSubmitText(false));
});
profileForm.setEventListeners();

//* ==========================================
//*        PopupWithForm: Add Card
//* ==========================================

profileAddButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addCardForm.open();
});

const addCardForm = new PopupWithForm("#profile-add-modal", (inputValues) => {
  addCardForm.setSubmitText(true);
  api
    .addNewCard(inputValues)
    .then((data) => {
      cardSection.addItem(renderCard(data));
      addCardForm.close();
    })
    .finally(() => addCardForm.setSubmitText(false));
});
addCardForm.setEventListeners();

//* ==========================================
//*     PopupWithForm: Delete Confirmation
//* ==========================================

const confirmation = new PopupWithConfirmation({
  popupSelector: "#confirmation-modal",
});
confirmation.setEventListeners();

function handleDelete(card) {
  confirmation.open();
  confirmation.confirmDelete(() => {
    confirmation.setSubmitText(true, "Deleting...");
    api
      .deleteCard(card.cardId)
      .then(() => {
        confirmation.close();
        card.removeCard();
      })
      .catch((err) => console.log(err))
      .finally(() => confirmation.setSubmitText(false));
  });
}
