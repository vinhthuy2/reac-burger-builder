import * as actionTypes from './actionTypes';
import axios from './../../axios-orders';
export const addIngredient = name => {
  return {
    ingredientName: name,
    type: actionTypes.ADD_INGREDIENTS
  };
};

export const removeIngredient = name => {
  return {
    ingredientName: name,
    type: actionTypes.REMOVE_INGREDIENTS
  };
};

export const setIngredient = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios
      .get('/ingredients.json')
      .then(response => {
        dispatch(setIngredient(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
