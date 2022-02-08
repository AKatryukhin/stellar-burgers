import {
  PASSWORD_CHANGE_URL,
  PASSWORD_RESET_URL, USER_GET_DATA_URL,
  USER_LOGIN_URL,
  USER_LOGOUT_URL,
  USER_REGISTER_URL, USER_UPDATE_DATA_URL, USER_UPDATE_TOKEN_URL
} from "./constants";

const handleResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
};

const handleResponseJWT = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => Promise.reject(err))
};

// export const fetchWithRefresh = async (url, options) => {
//   const res = await fetch(url, options);
//
//   if (res.ok) {
//     return res.json();
//   }
//
//   const json = await res.json();
//
//   if (json.message === "jwt expired") {
//     const refreshRes = await userRefreshToken();
//     const json = await refreshRes.json();
//
//     if (!json.success) {
//       return json;
//     }
//     setCookie("refreshToken", json.refreshToken);
//     setCookie("accessToken", json.accessToken);
//
//     options.headers.Authorization = json.accessToken;
//
//     const res = await fetch(url, options);
//     return res.json();
//   } else {
//     return json;
//   }
// };

export const passwordReset = ({ email }) => {
  return fetch(PASSWORD_RESET_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  }).then(handleResponse);
};

export const passwordChange = ({ password, token }) => {
  return fetch(PASSWORD_CHANGE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      token: token
    }),
  }).then(handleResponse);
};

export const userRegister = (name, email, password) => {
  return fetch(USER_REGISTER_URL, {
    method: "POST",
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      password: password,
      name: name,
      email: email
    }),
  }).then(handleResponse);
};

export const userLogin = (email, password) => {
  return fetch(USER_LOGIN_URL, {
    method: "POST",
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      password: password,
      email: email
    }),
  }).then(handleResponse);
};

export const userLogout = (refreshToken) => {
  return fetch(USER_LOGOUT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then(handleResponse);
}

export const userRefreshToken = (refreshToken) => {
  return fetch(USER_UPDATE_TOKEN_URL, {
    method: "POST",
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then(handleResponse);
}

export const getUserInfo = (accessToken) => {
  return fetch(USER_GET_DATA_URL, {
    method: "GET",
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }).then(handleResponseJWT);
}

export const updateUserInfo = (name, email, accessToken) => {
  return fetch(USER_UPDATE_DATA_URL, {
    method: "PATCH",
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      name: name,
      email: email
    }),
  }).then(handleResponseJWT);
}