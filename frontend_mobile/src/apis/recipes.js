import api from "./api";

function fetchRecipes(success, fail) {
  api.get(`recipes/1`).then(success).catch(fail);
}

export { fetchRecipes };
