import { Page } from "@playwright/test";

export default class KiabiProductPageLocators {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  buttonAddToCart = () =>
    this.page.getByTestId("productInformation_button_addToCart");
  buttonAvailableSize = () =>
    this.page.locator(
      `//li[@data-testid="productSize_li_sizeSold"]
  [.//div[@class="drawerProductSizes_productSizeInformationContainer__pjwUF" and not(normalize-space())]]
  /button`
    );
  buttonGoToCart = () =>
    this.page.getByTestId("cartConfirmationDrawer_button_seeCart");
  spanProductLabel = () =>
    this.page.getByTestId("productPage_span_productLabel");
  divProductPrice = () =>
    this.page.getByTestId("productPage_div_priceContainer");
}
