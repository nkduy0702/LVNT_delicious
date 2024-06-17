// api.js

export const deleteUser = (id) => {
  return fetch("http://192.168.27.1:1407/dashboard/users/delete", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
    .then((response) => response.json())
    .catch((error) => {
      throw new Error("Error fetching data:", error);
    });
};
