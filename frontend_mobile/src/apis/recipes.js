import api from "./api";

function fetchRecipes(success, fail) {
  api.get(`recipes/${id}/`).then(success).catch(fail);
}

function fetchRecipesTips(id, success, fail) {
  api.get(`recipes/tips/${id}/`).then(success).catch(fail);
}

function fetchRecommendRecipeList(id, success, fail) {
  api.get(`recipes/list/${id}/`).then(success).catch(fail);
}

function fetchRecipeDetail(id, success, fail) {
  api
    .post(`recipes/detail/`, {
      id,
    })
    .then(success)
    .catch(fail);
}

function fetchRecipeStep(recipe_id, recipe_step, success, fail) {
  api
    .post(`recipes/step/`, {
      recipe_id,
      recipe_step,
    })
    .then(success)
    .catch(fail);
}

function fetchRecipeComplete(id, success, fail) {
  api
    .post(`recipes/complete/`, {
      id,
    })
    .then(success)
    .catch(fail);
}

export {
  fetchRecipes,
  fetchRecipesTips,
  fetchRecommendRecipeList,
  fetchRecipeDetail,
  fetchRecipeStep,
  fetchRecipeComplete,
};
