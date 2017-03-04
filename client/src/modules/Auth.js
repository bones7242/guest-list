class Auth {
    // authenticate a user.  save a token string in Local Storage.
    // @param {string} token
    static authenticateUser(token) {
        localStorage.setItem("token", token);
    }

    // check if a user is authetnicated - check if a toekn is saved in Local Storage
    // @returns {boolean}
    static isUserAuthenticated() {
        return localStorage.getItem("token") !== null;
    }

    // deauthenticate a user.  remove a token from Local Storage.
    static deauthenticateUser() {
        localStorage.removeItem("token");
    }

    // get a token value
    // @returns {string}
    static getToken() {
        return localStorage.getItem("token");
    }
}

export default Auth;