// api.js

export const fetchIngredients = () => {
  return fetch("http://192.168.27.1:1407/ingredients")
    .then((response) => response.json())
    .catch((error) => {
      throw new Error("Error fetching data:", error);
    });
};
