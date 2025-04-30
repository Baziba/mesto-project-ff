const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-37",
  headers: {
    authorization: "29474657-c139-4aa6-9052-9b2ec448cc8d",
    "Content-Type": "application/json",
  },
};

export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers }).then(handleResponse)
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, { headers: config.headers }).then(handleResponse);
}

export const updateUser = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(handleResponse);
}

export const uploadCard = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(handleResponse);
}

export const deleteCard = cardId => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  }).then(handleResponse);
}

export const setLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers
  }).then(handleResponse);
}

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  }).then(handleResponse);
}

export const uploadAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar `, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar: link }),
  }).then(handleResponse);
}

const handleResponse = (response) => {
  if (!response.ok)
    return Promise.reject(`Ошибка: ${response.status}`);
  return response.json();
}