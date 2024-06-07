// test/pageObjects/loginPage.js
class LoginPage {
    get username() { return $('#user-name'); }
    get password() { return $('#password'); }
    get loginButton() { return $('#login-button'); }

    async open() {
        await browser.url('/');
    }

    async login(username, password) {
        await this.username.setValue(username);
        await this.password.setValue(password);
        await this.loginButton.click();
    }
}

module.exports = new LoginPage();
