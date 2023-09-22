import ILoginCredentials from "../../Interfaces/ILoginCredentials";
import { API_URL, NodeENV } from "../Endpoints/env";

export default function POSTLoginCredentials(data: ILoginCredentials) {
  const environment = NodeENV();
  var DEV_POST_authLogin: string = "";

  if(environment === "development") {
    DEV_POST_authLogin = API_URL.DEV_POST_authLogin();
  }

  // Create a promise for the fetch request
  return new Promise<string>((resolve, reject) => {
    fetch(DEV_POST_authLogin, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("POST request not successful");
          reject("POST request failed");
        }
      })
      .then((responseBody) => {
        const token = responseBody.token;
        localStorage.setItem("authToken", token);
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userRole = decodedToken.roles;

        if (userRole === "Admin") {
          resolve("Admin");
        } else if (userRole === "Student") {
          resolve("Student");
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}
