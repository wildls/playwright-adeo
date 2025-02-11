import { Page, test } from "@playwright/test";
import KiabiProductPageLocators from "@locators/kiabi/kiabiProductPage";

export default class KiabiProductPage {
  page: Page;
  kiabiProductPageLocators: KiabiProductPageLocators;

  constructor(page: Page) {
    this.page = page;
    this.kiabiProductPageLocators = new KiabiProductPageLocators(page);
  }

  /**
   * Adds the product to the cart.
   * @author William
   */
  public async addProductToCart() {
    await test.step("Add product to cart", async () => {
      await this.kiabiProductPageLocators.buttonAddToCart().click();
    });
  }

  /**
   * Selects the first available size for the product.
   * @author William
   */
  public async selectFirstAvailableSize() {
    await test.step("Select first available size", async () => {
      await this.kiabiProductPageLocators.buttonAvailableSize().first().click();
    });
  }

  /**
   * Retrieves the product label.
   * @returns {Promise<string>} The product label text.
   * @author William
   */
  public async getProductName(): Promise<string> {
    return await test.step("Get product label", async () => {
      return (await this.kiabiProductPageLocators
        .spanProductLabel()
        .textContent()) as string;
    });
  }

  /**
   * Retrieves the product price.
   * @returns {Promise<string>} The product price text.
   * @author William
   */
  public async getProductPrice(): Promise<string> {
    return await test.step("Get product price", async () => {
      return (await this.kiabiProductPageLocators
        .divProductPrice()
        .textContent()) as string;
    });
  }

  /**
   * Navigates to the cart page.
   * @author William
   */
  public async goToCart() {
    await test.step("Go to cart", async () => {
      await this.kiabiProductPageLocators.buttonGoToCart().click();
    });
  }
}
