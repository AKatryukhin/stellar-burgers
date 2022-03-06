import { INGREDIENTS_URL, ORDER_URL } from './constants';
import { IIngredientData } from "./types";

const handleResponse = (res: Response) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
};

export const getIngredientsList = () => {
  return fetch(INGREDIENTS_URL)
  .then(handleResponse);
};

export const placeAnOrder = (selectedIngredients: IIngredientData) => {
  return fetch(ORDER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        "ingredients": selectedIngredients
      }
    ),
  }).then(handleResponse);
};