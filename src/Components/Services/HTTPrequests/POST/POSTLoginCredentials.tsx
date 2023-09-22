import ILoginCredentials from "../../Interfaces/ILoginCredentials";

export default function POSTLoginCredentials(data: ILoginCredentials) {
  // Create a promise for the fetch request
  return new Promise<string>((resolve, reject) => {
    fetch("https://localhost:7070/api/Auth/Login", {
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
