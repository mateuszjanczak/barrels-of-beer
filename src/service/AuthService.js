import {API_URL} from "./Api";

class AuthService {

    url = `${API_URL}/auth`;

    registerAccount(username, password, email) {
        return fetch(`${this.url}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
                email
            }),
        }).then(res => {
            if (!res.ok) throw res;
            return res;
        });
    }


    executeJwtAuthenticationService(username, password) {
        return fetch(`${this.url}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            }),
        }).then(res => {
            if (!res.ok) throw res;
            return res.json();
        });
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem('authenticatedUser', username);
        sessionStorage.setItem('jwtToken', token);
    }

    getHeaders() {
        return 'Bearer ' + sessionStorage.getItem('jwtToken') || '';
    }

    isLogged() {
        return sessionStorage.getItem('authenticatedUser') !== null && sessionStorage.getItem('jwtToken') !== null;
    }

    logout() {
        sessionStorage.removeItem('authenticatedUser');
        sessionStorage.removeItem('jwtToken');
    }
}

export default new AuthService();
