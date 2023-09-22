/**
 * The purpose of this component is to determine which environment the 
 * project is running on, then fetch API URL's.
 * 
 */

const NodeENV = () => {
    if(process.env.NODE_ENV === "development"){
        return "development";
    }else if(process.env.NODE_ENV === "production"){
        return "production";
    }else{
        return "No environment found"
    }
}


const API_URL = {
    DEV_POST_authLogin: () => {
      return (process.env.REACT_APP_DEV_AUTH_LOGIN) || ""; //Makes it return a valid string or an empty string instead of "undefined"
    },



} 

export { API_URL, NodeENV }