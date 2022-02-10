import Page from '../pageObjects/page';

class LoginPage {
    constructor() {}

    get txtUserName() {
        return $('input[placeholder="Username"]');
    }
    get txtPassword() {
        return $('input[placeholder="Password"]');
    }
    get btnLogin() {
        return $('//button[contains(text(),"Log in")]');
    }
}

export default new LoginPage();
