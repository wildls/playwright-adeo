import { Page, test, expect } from "@playwright/test";
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
   * @returns {Promise<string>} The product name text.
   * @author William
   */
  public async getProductName(): Promise<string> {
    return await test.step(`Get product name from cart`, async () => {
      return (await this.kiabiCartPageLocators
        .spanProductName()
        .textContent()) as string;
    });
  }

  /**
   * Retrieves the product price from the cart.
   * @returns {Promise<string>} The product price text.
   * @author William
   */
  public async getProductPrice(): Promise<string> {
    return await test.step(`Get product price from cart`, async () => {
      const rawPrice = await this.kiabiCartPageLocators
        .spanProductPrice()
        .textContent();
      expect(rawPrice).not.toBeNull();

      return rawPrice!.replace(/\u00A0/g, " ").trim();
    });
  }

  /**
   * Retrieves the product size from the cart.
   * @returns {Promise<string>} The product size text.
   * @author William
   */
  public async getProductSize(): Promise<string> {
    return await test.step("Get product size from cart", async () => {
      return (await this.kiabiCartPageLocators
        .spanProductSize()
        .textContent()) as string;
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

  /**
   * Retrieves the total amount of the cart.
   * @returns {Promise<number>} The total amount of the cart.
   * @author William
   */
  public async getCartAmount(): Promise<number> {
    return await test.step("Get cart amount", async () => {
      const rawAmount = await this.kiabiCartPageLocators
        .spanCartAmount()
        .textContent();
      expect(rawAmount).not.toBeNull();
      return parseInt(rawAmount!.replace(/\u00A0/g, " ").trim());
    });
  }

  /**
   * Clicks on the "add quantity" button until the cart's total amount
   * exceeds the provided targetAmount.
   *
   * Test steps are added for better traceability in your reports.
   *
   * @param targetAmount The desired cart amount threshold.
   * @author William
   */
  async ensureCartAmountAbove(targetAmount: number): Promise<void> {
    await test.step(`Ensure cart amount exceeds ${targetAmount}`, async () => {
      let currentAmount = await this.getCartAmount();
      await test.step(`Initial cart amount: ${currentAmount}`, async () => {});

      while (currentAmount <= targetAmount) {
        await test.step(`Cart amount is ${currentAmount}. Clicking "Add Quantity" button`, async () => {
          await this.kiabiCartPageLocators.buttonAddQuantity().click();
          await this.page.waitForTimeout(300);
        });
        currentAmount = await this.getCartAmount();
        await test.step(`Updated cart amount: ${currentAmount}`, async () => {});
      }
    });
  }
}
