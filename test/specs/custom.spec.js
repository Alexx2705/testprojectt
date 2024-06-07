// test/specs/custom.spec.js
const inventoryPage = require('../pageObjects/inventoryPage');
const loginPage = require('../pageObjects/loginPage');

describe('Custom Tests', () => {
    before(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.open();
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
