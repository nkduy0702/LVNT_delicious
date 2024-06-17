// api.js

export const fetchDataUsers = () => {
  return fetch("http://192.168.27.1:1407/dashboard/users")
    .then((response) => response.json())
    .catch((error) => {
      throw new Error("Error fetching data:", error);
    });
};
