import { Page } from "@playwright/test";

export default class KiabiCheckoutPageLocators {
  page: Page;
  locale: "FR" | "ES";

  constructor(page: Page, locale: "FR" | "ES") {
    this.page = page;
    this.locale = locale;
  }

  // Common locators
  inputPostalCode = () => this.page.getByTestId("postalCode_input_postalCode");
  buttonConfirmPostalCode = () =>
    this.page.getByTestId("postalCode_button_validate");
  labelHomeDelivery = () =>
    this.page.getByTestId("deliveryChoices_radio_shippingHome");
  inputRadioHomeDelivery = () =>
    this.page.locator('input[type="radio"][value="HOME"]');
  buttonCloseAddressForm = () =>
    this.page.getByRole("button", { name: "close button" });
  inputPhoneNumber = () => this.page.getByTestId("mobileForm-mobile");
  buttonValidateShippingStep = () =>
    this.page.getByTestId("shippingStep_button_validate");

  // Dynamic locators for address form
  inputFormLastName = () =>
    this.page.getByTestId(`homeAddressForm${this.locale}_input_lastName`);
  inputFormFirstName = () =>
    this.page.getByTestId(`homeAddressForm${this.locale}_input_firstName`);
  inputFormStreet = () =>
    this.page.getByTestId(`homeAddressForm${this.locale}_input_addressLine1`);
  inputFormStreetExtra = () =>
    this.page.getByTestId(`homeAddressForm${this.locale}_input_addressLine2`);
  inputFormPostalCode = () =>
    this.page.getByTestId(`homeAddressForm${this.locale}_input_postalCode`);
  inputFormCity = () =>
    this.page.getByTestId(`homeAddressForm${this.locale}_input_city`);
  selectFormCountry = () =>
    this.page.getByTestId(`homeAddressForm${this.locale}_select_country`);
  spanSameBillingAddress = () =>
    this.page.getByTestId(
      `homeAddressForm${this.locale}_button_billingDifferentThanShipping`
    );
  buttonCompleteShippingForm = () =>
    this.page.getByTestId(`homeAddressForm${this.locale}_button_validate`);

  // Dynamic locators for billing form
  // Note: If the button text also changes based on language, you might need to handle that separately.
  spanCompleteForm = () =>
    this.page.getByRole("button", {
      name: this.locale === "FR" ? "Compléter" : "Completar",
    });
  inputFormBirthDate = () =>
    this.page.getByTestId(`billingForm${this.locale}_input_birthDate`);
  inputFormEmail = () =>
    this.page.getByTestId(`billingForm${this.locale}_input_email`);
  buttonCompleteBillingForm = () =>
    this.page.getByTestId(`billingForm${this.locale}_button_validate`);

  inputOriginalAddress = () =>
    this.page.locator('input[type="radio"][value="BILLING-WRONG-ADDRESS"]');

  buttonValidateAddress = () =>
    this.page.getByTestId("billingAddressFrDialogContent-validation_btn");

  buttonValidateLoyaltyStep = () =>
    this.page.getByTestId("loyaltyStep_button_goNextStep");

  inputCreditCard = () => this.page.locator('input[type="radio"][value="CBE"]');
  labelCreditCard = () =>
    this.page.getByTestId("paymentStepPayline_radio_paymentOptions_CBE");
  iframeCreditCardNumber = () =>
    this.page.frameLocator(
      'iframe[id*="cardNumber"][src*="payment.payline.com"]'
    );
  inputCreditCardNumber = () =>
    this.iframeCreditCardNumber().locator('input[type="tel"]');
  inputCreditCardExpiryDate = () =>
    this.page.locator('input[id*="expirationDate"]');
  iframeCreditCardCvv = () =>
    this.page.frameLocator('iframe[id*="cvv"][src*="payment.payline.com"]');
  inputCreditCardCvv = () =>
    this.iframeCreditCardCvv().locator('input[type="tel"]');

  inputGooglePay = () => this.page.locator('input[type="radio"][value="GGP"]');
  labelGooglePay = () =>
    this.page.getByTestId("paymentStepPayline_radio_paymentOptions_GGP");
  buttonGooglePay = () =>
    this.page.getByRole("button", {
      name: /Acheter avec GPay|Comprar con GPay/,
    });

  inputPaypal = () => this.page.locator('input[type="radio"][value="PAL"]');
  labelPaypal = () =>
    this.page.getByTestId("paymentStepPayline_radio_paymentOptions_PAL");
  buttonPaypal = () => this.page.locator('button[id*="paypal"]');

  divIllicado = () =>
    this.page.locator('div[class*="pl-pmContainer pl-illicado"]');
  inputIllicado = () => this.page.locator('input[type="radio"][value="ILI"]');
  labelIllicado = () =>
    this.page.getByTestId("paymentStepPayline_radio_paymentOptions_ILI");
  buttonIllicado = () => this.divIllicado().getByRole("button");

  divGiftcard = () =>
    this.page.locator('div[class*="pl-pmContainer pl-cadeau-kiabi"]');
  inputGiftCard = () => this.page.locator('input[type="radio"][value="KDO"]');
  labelGiftCard = () =>
    this.page.getByTestId("paymentStepPayline_radio_paymentOptions_KDO");
  buttonGiftCard = () => this.divGiftcard().getByRole("button");

  divVoucher = () =>
    this.page.locator('div[class*="pl-pmContainer pl-globalpos"]');
  inputVoucher = () => this.page.locator('input[type="radio"][value="BAR"]');
  labelVoucher = () =>
    this.page.getByTestId("paymentStepPayline_radio_paymentOptions_BAR");
  inputVoucherNumber = () => this.divVoucher().getByRole("textbox");
  buttonVoucher = () => this.divVoucher().getByRole("button");

  inputOney = () => this.page.locator('input[type="radio"][value="PNF"]');
  labelOney = () =>
    this.page.getByTestId("paymentStepPayline_radio_paymentOptions_PNF");
  //buttonOney = () =>
  //this.page.getByTestId("checkoutPaymentStep_validatePayment_PNF");
  divPaymentOnDelivery = () =>
    this.page.locator('div[id*="PaymentOptionContentContainer_CRBT"]');
  inputPaymentOnDelivery = () =>
    this.page.locator('input[type="radio"][value="CRBT"]');
  labelPaymentOnDelivery = () =>
    this.page.getByTestId("paymentStepPayline_radio_paymentOptions_CRBT");
  buttonPaymentOnDelivery = () =>
    this.divPaymentOnDelivery().getByRole("button");

  divRefundVoucher = () =>
    this.page.locator(
      'div[id*="PaymentOptionContentContainer_REFUND_VOUCHER"]'
    );
  inputRefundVoucher = () =>
    this.page.locator('input[type="radio"][value="REFUND_VOUCHER"]');
  labelRefundVoucher = () =>
    this.page.getByTestId(
      "paymentStepPayline_radio_paymentOptions_REFUND_VOUCHER"
    );
  inputRefundVoucherNumber = () => this.page.getByTestId("RefundVoucher_input");
  buttonRefundVoucher = () => this.divRefundVoucher().getByRole("button");
}
