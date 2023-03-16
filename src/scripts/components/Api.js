export default class Api {
  constructor({address, token}) {
    this._address = address;
    this._token = token;
    this._handleReturnPromise = this._handleReturnPromise.bind(this);
  }

  _handleReturnPromise(res) {
    if (res.ok) {
      return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Получить данные пользователя
  getUserData() {
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
    .then(this._handleReturnPromise)
  }

  //Получить список всех карточек в виде массива
  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
    .then(this._handleReturnPromise)
  }

  //Редактировать данные пользователя
  editUserData(data) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        job: data.job
      })
    })
    .then(this._handleReturnPromise)
  }

  //Добавить карточку
  addNewCard(data) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._handleReturnPromise)
  }

  //Удалить карточку
  deleteCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
    .then(this._handleReturnPromise)
  }

    //Поставить лайк карточке
    addLike(id) {
      return fetch(`${this._address}/cards/${id}/likes`, {
        method: 'PUT',
        headers: {
          authorization: this._token
        }
      })
      .then(this._handleReturnPromise)
    }
  
    // Удалить лайк карточки
    deleteLike(id) {
      return fetch(`${this._address}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: this._token
        }
      })
      .then(this._handleReturnPromise)
    }

  //Заменить аватар
  editAvatar(data) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(this._handleReturnPromise)
  }
}