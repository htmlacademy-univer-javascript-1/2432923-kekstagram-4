import { BASE_URL, Method, RequestErrorText, Route } from './consts.js';

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

export const getData = () => load(Route.GET_DATA, RequestErrorText.GET_DATA);

export const sendData = (body) => load(Route.SEND_DATA, RequestErrorText.SEND_DATA, Method.POST, body);
