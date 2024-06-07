// test/pageObjects/inventoryPage.js
class InventoryPage {
    get cartButton() { return $('.shopping_cart_link'); }
    get logoutButton() { return $('#logout_sidebar_link'); }
    get firstName() { return $('#first-name'); }
    get lastName() { return $('#last-name'); }
    get postalCode() { return $('#postal-code'); }
    get continueButton() { return $('#continue'); }
    get finishButton() { return $('#finish'); }
    get backHomeButton() { return $('#back-to-products'); }

    async open() {
        await browser.url('/inventory.html');
    }

    async addProductToCart() {
        await $('button.btn_inventory').click();
    }

    async openCart() {
        await this.cartButton.click();
    }

    async logout() {
        await this.logoutButton.click();
    }

    async sortProductsBy(option) {
        await $('select.product_sort_container').selectByVisibleText(option);
    }

    async footerLinks() {
        // Реалізуйте перевірку футер посилань
    }

    async startCheckout() {
        await $('#checkout').click();
    }

    async fillCheckoutForm(firstName, lastName, zip) {
        await this.firstName.setValue(firstName);
        await this.lastName.setValue(lastName);
        await this.postalCode.setValue(zip);
    }

    async continueCheckout() {
        await this.continueButton.click();
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    async cancelCheckout() {
        await $('#cancel').click();
    }

    async removeProduct() {
        await $('button.cart_button').click();
    }

    async continueShopping() {
        await $('#continue-shopping').click();
    }

    async addTwoProductsToCart() {
        await this.addProductToCart();
        await this.addProductToCart();
    }

    async addThirdProductToCart() {
        await this.addProductToCart();
    }
}

module.exports = new InventoryPage();
