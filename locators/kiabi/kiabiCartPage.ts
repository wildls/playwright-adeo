import { Page } from "@playwright/test";

export default class KiabiCartPageLocators {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  spanProductName = () => this.page.getByTestId("undefinedProductName");
  spanProductSize = () => this.page.getByTestId("undefinedProductSize");
  spanProductPrice = () => this.page.getByTestId("undefinedPrice");
  buttonValidateCart = () =>
    this.page.getByTestId("invoiceDetailsCard_button_validateCart");
  buttonDeleteQuantity = () => this.page.getByTestId("button_deleteQuantity");
  buttonAddQuantity = () => this.page.getByTestId("button_moreQuantity");
  spanCartAmount = () =>
    this.page.getByTestId("cartInvoiceDetails_div_total_price");
}
