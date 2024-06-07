// test/specs/inventory.spec.js
const inventoryPage = require('../pageObjects/inventoryPage');
const loginPage = require('../pageObjects/loginPage');

describe('Inventory Tests', () => {
    before(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.open();
    });

    it('should save the cart after logout', async () => {
        await inventoryPage.addProductToCart();
        await inventoryPage.logout();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.openCart();
        const cartItems = await $$('.cart_item');
        expect(cartItems.length).toBeGreaterThan(0);
    });

    it('should verify sorting options', async () => {
        const sortingOptions = [
            'Price (low to high)',
            'Price (high to low)',
            'Name (A to Z)',
            'Name (Z to A)'
        ];

        for (const option of sortingOptions) {
            await inventoryPage.sortProductsBy(option);
            // Реалізуйте перевірку сортування
        }
    });

    it('should test footer links', async () => {
        await inventoryPage.footerLinks();
        // Реалізуйте перевірку футер посилань
    });

    it('should test valid checkout', async () => {
        await inventoryPage.addProductToCart();
        await inventoryPage.openCart();
        await inventoryPage.startCheckout();
        await inventoryPage.fillCheckoutForm('Andrew', 'Muzychuk', '33018');
        await inventoryPage.continueCheckout();
        await inventoryPage.finishCheckout();
        await inventoryPage.navigateBackHome();
        const title = await browser.getTitle();
        expect(title).toBe('Swag Labs');
    });

    it('should test checkout without products', async () => {
        await inventoryPage.openCart();
        await inventoryPage.startCheckout();
        const errorMessage = await $('.error-message-container').getText();
        expect(errorMessage).toContain('Your cart is empty');
    });

    it('should remove the product from the cart', async () => {
        await inventoryPage.addTwoProductsToCart();
        await inventoryPage.openCart();
        await inventoryPage.removeProduct();
        const cartItems = await $$('.cart_item');
        expect(cartItems.length).toBe(1);
    });

    it('should test return buttons', async () => {
        await inventoryPage.addTwoProductsToCart();
        await inventoryPage.openCart();
        await inventoryPage.continueShopping();
        await inventoryPage.addThirdProductToCart();
        await inventoryPage.openCart();
        await inventoryPage.startCheckout();
        await inventoryPage.cancelCheckout();
        const cartItems = await $$('.cart_item');
        expect(cartItems.length).toBe(3);
    });
});
