
class Api {
  constructor({ baseUrl}) {
    this._baseUrl = baseUrl;

  }

  //проверка на подключение сервера
  _checkResponseServer(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
  //универсальный метод запроса с проверкой ответа
  _request(url, options) {
    return fetch(url, options).then(this._checkResponseServer);
  }

  //Загрузка информации о пользователе с сервера
  getUserInfo(token) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`}
    });
  }

  //аватар
  editAvatar(user,token) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        avatar: user.avatar
      })
    });
  }

  //обновление данных пользователя
  editProfile(user,token) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: 
      {'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: user.name,
        about: user.about
      })
    });
  }
  //Загрузка карточек с сервера
  getInitialCards(token) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`}
    });
  }

  //добавление новой карточки
  addNewCard(element,token) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: element.name,
        link: element.link
      })
    });
  }

  //удаление карточки
  removeCard(cardId,token) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  //добавление лайка
  addNewLike(cardId,token) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  //удаление лайка
  removeLike(cardId, token) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      'Content-Type': 'application/json'
    });
  }
}


const api = new Api({
  baseUrl: 'http://localhost:3000',
  // headers: {
  //       'Authorization': `Bearer ${localStorage.getItem('token')}`,
  //       'Content-Type': 'application/json'
  //     }
})
export default api;

