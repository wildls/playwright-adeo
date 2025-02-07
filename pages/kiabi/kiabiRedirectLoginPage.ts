import { Page, test } from "@playwright/test";
import KiabiRedirectLoginPageLocators from "@locators/kiabi/kiabiRedirectLoginPage";

export default class KiabiRedirectLoginPage {
  page: Page;
  kiabiRedirectLoginPageLocators: KiabiRedirectLoginPageLocators;

  constructor(page: Page) {
    this.page = page;
    this.kiabiRedirectLoginPageLocators = new KiabiRedirectLoginPageLocators(
      page
    );
  }

  /**
   * Clicks the 'Continue as Guest' button on the login redirect page.
   * @author William
   */
  public async continueAsGuest() {
    await test.step("Continue as Guest", async () => {
      await this.kiabiRedirectLoginPageLocators.buttonContinueAsGuest().click();
    });
  }
}
