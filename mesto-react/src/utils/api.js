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

  editUserInfo(userInfo) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.description
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

  setAvatar (avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar.link
      })
    })
    .then (this.#onResponce);
  }
}

const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-51',
  headers: {
    "Content-type": "application/json",
    "authorization": "a4e76836-721c-4a61-8d8d-db1b2283f53f"
  }
});

export default api