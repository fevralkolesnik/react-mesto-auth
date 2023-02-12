class Api {
  #onResponce (res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject('Ошибка: ', res);
  }

  constructor (config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then (this.#onResponce);
  }

  setUserInfo(userInfo) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about
      })
    })
    .then (this.#onResponce);
  }

  getAllCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then (this.#onResponce);
  }

  addNewCard(card) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
    .then (this.#onResponce);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then (this.#onResponce);
  }

  addLikeCard (cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then (this.#onResponce);
  }

  deleteLikeCard (cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then (this.#onResponce);
  }

  changeLikeCardStatus (cardId, isLiked) {
    return isLiked ? this.addLikeCard(cardId) : this.deleteLikeCard(cardId);
  }

  setAvatar (avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar.avatar
      })
    })
    .then (this.#onResponce);
  }


}

const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-56',
  headers: {
    "Content-type": "application/json",
    "authorization": "faa27423-4696-4ea8-9c6e-5d108b9b47f8"
  }
});

export default api