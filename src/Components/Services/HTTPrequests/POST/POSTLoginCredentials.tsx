import ILoginCredentials from "../../Interfaces/ILoginCredentials";
import { PRO_API_URL, DEV_API_URL, NodeENV } from "../Endpoints/env";

export default function POSTLoginCredentials(data: ILoginCredentials) {
  const environment = NodeENV();
  var envInUse_authLogin: string = "";

  if(environment === "development") {
    var DEV_POST_authLogin = DEV_API_URL.DEV_POST_authLogin();
    envInUse_authLogin = DEV_POST_authLogin;
  }else if(environment === "production") {
    var PRO_POST_authLogin = PRO_API_URL.PRO_POST_authLogin();
    envInUse_authLogin = PRO_POST_authLogin;
  }else{
    return Promise.reject(new Error("No environment was found"));
  }

  // Create a promise for the fetch request
  return new Promise<string>((resolve, reject) => {
    fetch(envInUse_authLogin, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log("OK!");
          return response.json();
        } else {
          console.log("POST request not successful ");
          return response.json().then(err => {
            reject(err); // rejecting with the resolved error object.
         });         
        }
      })
      .then((responseBody) => { //the responseBody is an JSON object at this point...
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
