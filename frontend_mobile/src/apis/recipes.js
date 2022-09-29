import api from "./api";

function fetchRecipes(success, fail) {
  api.get(`recipes/${id}/`).then(success).catch(fail);
}

function fetchRecipesTips(id, success, fail) {
  api.get(`recipes/tips/${id}/`).then(success).catch(fail);
}

export { fetchRecipes, fetchRecipesTips };
