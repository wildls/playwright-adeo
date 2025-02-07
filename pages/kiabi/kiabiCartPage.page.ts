import { Page, test } from "@playwright/test";
import KiabiCartPageLocators from "@locators/kiabi/kiabiCartPage";

export default class KiabiCartPage {
  page: Page;
  kiabiCartPageLocators: KiabiCartPageLocators;

  constructor(page: Page) {
    this.page = page;
    this.kiabiCartPageLocators = new KiabiCartPageLocators(page);
  }

  /**
   * Retrieves the product name from the cart.
   * @returns {Promise<string | null>} The product name text.
   * @author William
   */
  public async getProductName(): Promise<string | null> {
    return await test.step("Get product name from cart", async () => {
      return await this.kiabiCartPageLocators.spanProductName().textContent();
    });
  }

  /**
   * Retrieves the product price from the cart.
   * @returns {Promise<string | null>} The product price text.
   * @author William
   */
  public async getProductPrice(): Promise<string | null> {
    return await test.step("Get product price from cart", async () => {
      return await this.kiabiCartPageLocators.spanProductPrice().textContent();
    });
  }

  /**
   * Retrieves the product size from the cart.
   * @returns {Promise<string | null>} The product size text.
   * @author William
   */
  public async getProductSize(): Promise<string | null> {
    return await test.step("Get product size from cart", async () => {
      return await this.kiabiCartPageLocators.spanProductSize().textContent();
    });
  }

  /**
   * Clicks on the validate cart button.
   * @author William
   */
  public async validateCart() {
    await test.step("Validate cart", async () => {
      await this.kiabiCartPageLocators.buttonValidateCart().click();
    });
  }
}
