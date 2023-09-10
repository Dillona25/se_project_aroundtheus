import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import { data } from "autoprefixer";

//* Arrays

const initialCards = [
  {
    name: "Mt Hood",
    link: "https://images.unsplash.com/photo-1663947718266-e5cfe7e95271?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
  },
  {
    name: "Multnomah Falls",
    link: "https://images.unsplash.com/photo-1657518860188-daa43c146ed8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
  },
  {
    name: "Diablo Lake",
    link: "https://images.unsplash.com/photo-1521400259647-cec809312f3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
  },
  {
    name: "Mt Rainier",
    link: "https://images.unsplash.com/photo-1568226292321-dd67ff8b3b2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
  },
  {
    name: "Mt St Helens",
    link: "https://images.unsplash.com/photo-1616684553557-82371dfba65f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=986&q=80",
  },
  {
    name: "Oregon Coast",
    link: "https://images.unsplash.com/photo-1602966287996-dbdb3d69d36c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
  },
];

//* Template

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".cards__content");

///* Wrappers

const cardList = document.querySelector(".cards__list");
const profileEditForm = document.querySelector("#modal-edit-form");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-add-modal");
const profileAddForm = document.querySelector("#modal-form-add");
const imageModal = document.querySelector("#image-modal");

//* Buttons and other DOM nodes
const profileEditButton = document.querySelector(".profile__edit-button");
const modalCloseButton = profileEditModal.querySelector(".modal__close");
const profileName = document.querySelector(".profile__content-name");
const profileSubtitle = document.querySelector(".profile__content-subtitle");
const modalName = document.querySelector(".modal__name");
const modalSubtitle = document.querySelector(".modal__bio");
const profileAddButton = document.querySelector(".profile__add-button");
const imageModalCaption = document.querySelector(".modal__image-caption");

//* Form Data
const cardTitleInput = document.querySelector(".modal__add");
const cardLinkInput = document.querySelector(".modal__link");
const modalImageElement = imageModal.querySelector(".modal__image");

//* Render Cards

function renderCard(cardData) {
  return new Card(cardData, handleCardClick, "#card-template").getCard();
}

//* FormValidator.js logic

const editFormElement = profileEditModal.querySelector("#modal-edit-form");
const addFormElement = profileAddModal.querySelector("#modal-form-add");

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
editFormValidator.enableValidation();
addFormValidator.enableValidation();

//* Section.js

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      cardSection.addItem(renderCard(cardData));
    },
  },
  "#card-list"
);
cardSection.renderItems();

//* popupWithImage.js

const popupImage = new PopupWithImage({ popupSelector: "#image-modal" });
popupImage.setEventListeners();

function handleCardClick(cardData) {
  popupImage.open(cardData);
}

//* popupWithForm.js: Edit profile

profileEditButton.addEventListener("click", () => {
  profileForm.open();
});

const profileForm = new PopupWithForm("#profile-edit-modal", () => {
  profileForm._getInputValues();
  profileForm.close();
});
profileForm.setEventListeners();

//* popupWuthForm: Add Card

profileAddButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addCardForm.open();
});

const addCardForm = new PopupWithForm("#profile-add-modal", () => {
  addCardForm._getInputValues();
  addCardForm.close();
});
addCardForm.setEventListeners();

//* userInfo.js
