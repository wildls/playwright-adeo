import { Page } from "@playwright/test";

export default class KiabiRedirectLoginPageLocators {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  buttonContinueAsGuest = () =>
    this.page.getByTestId("accountInfosAuthEmailUnknownDrawer_button_TMI");
}
