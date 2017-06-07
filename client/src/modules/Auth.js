/* helper functions to be used throughout the app for authentication purposes */
class Auth {
  // authenticate a user.  save a token string in Local Storage.
  static authenticateUser(token) {
    localStorage.setItem('token', token);
  }
  // check if a user is authetnicated - check if a toekn is saved in Local Storage
  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }
  // Deauthenticate a user by removing a token from Local Storage.
  static deauthenticateUser() {
    localStorage.removeItem('token');  // Remove the authority token. 
    localStorage.removeItem('userId'); // Remove the userId.
  }
  // get a token value
  static getToken() {
    return localStorage.getItem('token');
  }
}

export default Auth;
