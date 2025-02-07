import { Page } from "@playwright/test";

export default class KiabiHomePageLocators {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  buttonAcceptCookies = () => this.page.locator("#popin_tc_privacy_button"); // à verifier si pas test ID plus haut
  buttonSearch = () => this.page.getByTestId("headerSearch_input_search");
  inputSearchBar = () => this.page.getByRole("textbox");
  spanResultsList = () => this.page.getByTestId("productCard_span_label");
}
