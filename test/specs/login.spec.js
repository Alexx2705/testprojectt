// test/specs/login.spec.js
const loginPage = require('../pageObjects/loginPage');
const inventoryPage = require('../pageObjects/inventoryPage');

describe('Login Tests', () => {
    it('should login with valid credentials', async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        const title = await browser.getTitle();
        expect(title).toBe('Swag Labs');
        const inventoryPageHeader = await $('span.title').getText();
        expect(inventoryPageHeader).toBe('PRODUCTS');
        const cartIcon = await $('.shopping_cart_link').isDisplayed();
        expect(cartIcon).toBe(true);
    });

    it('should try login with invalid password', async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'wrong_password');
        const errorMessage = await $('.error-message-container').getText();
        expect(errorMessage).toContain('Epic sadface: Username and password do not match any user in this service');
    });

    it('should try login with invalid login', async () => {
        await loginPage.open();
        await loginPage.login('invalid_user', 'secret_sauce');
        const errorMessage = await $('.error-message-container').getText();
        expect(errorMessage).toContain('Epic sadface: Username and password do not match any user in this service');
    });

    it('should logout successfully', async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.logout();
        const loginButtonVisible = await loginPage.loginButton.isDisplayed();
        expect(loginButtonVisible).toBe(true);
    });
});
