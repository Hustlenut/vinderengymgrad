import ILoginCredentials from "../../Interfaces/ILoginCredentials";

export default async function POSTLoginCredentials(data: ILoginCredentials) {

    try {
        const response = await fetch("https://localhost:7070/api/Auth/Login", {
          method: "POST",
          headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), //converts JS object to JSON
        });
  
        if (response.ok) {
          // Handle a successful response
          const responseBody = await response.json(); //To obtain the JS object
          const token = responseBody.token;
  
          localStorage.setItem('authToken', token);
  
          const decodedToken = JSON.parse(atob(token.split('.')[1])); //Another parsing is required, since the token itself is in JSON format
          const userRole = decodedToken.roles;
          //TODO: Restrict access through direct access to /admin 
          if(userRole === "Admin") {
              return "Admin"
          }else if(userRole === "Student"){
              return "Student"
          }
          
          
        } else {
          console.log("POST request not successful")
        }
      } catch (error) {
        console.error(error);
      };

      
}