export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".cards__like-button")
      .addEventListener("click", () => {
        this._handLikeIcon();
      });

    this._cardElement
      .querySelector(".cards__delete")
      .addEventListener("click", () => {
        this._handleDeleteIcon();
      });
  }

  _handLikeIcon() {
    this._cardElement
      .querySelector(".cards__like-button")
      .classList.toggle("cards__like-button_active");
  }

  _handleDeleteIcon() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getCard() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__content")
      .cloneNode(true);
    this._setEventListeners();

    this._cardElement.querySelector(".cards__image").src = this._link;
    this._cardElement.querySelector(".cards__description-text").textContent =
      this._name;

    return this._cardElement;
  }
}
