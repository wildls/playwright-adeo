import { Page, test } from "@playwright/test";
import KiabiHomePageLocators from "@locators/kiabi/kiabiHomePage";

export default class KiabiHomePage {
  page: Page;
  kiabiHomePageLocators: KiabiHomePageLocators;

  constructor(page: Page) {
    this.page = page;
    this.kiabiHomePageLocators = new KiabiHomePageLocators(page);
  }

  /**
   * Accepts the cookies by clicking the accept button.
   * @author William
   */
  public async acceptCookies() {
    await test.step("Accept cookies", async () => {
      await this.kiabiHomePageLocators.buttonAcceptCookies().click();
    });
  }

  /**
   * Searches for a product using the search bar.
   * @param productName - The name of the product to search for.
   * @author William
   */
  public async searchProduct(productName: string) {
    await test.step(`Search for product: ${productName}`, async () => {
      await this.kiabiHomePageLocators.buttonSearch().click();
      await this.kiabiHomePageLocators.inputSearchBar().fill(productName);
    });
  }

  /**
   * Selects a product from the search results list.
   * @param position - The position of the product in the list (0-indexed).
   * @author William
   */
  public async selectFromResults(position: number) {
    await test.step("Select first product from results", async () => {
      await this.kiabiHomePageLocators.spanResultsList().nth(position).click();
    });
  }
}
