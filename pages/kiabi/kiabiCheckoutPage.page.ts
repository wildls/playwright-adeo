import { Page, expect, test } from "@playwright/test";
import KiabiCheckoutPageLocators from "@locators/kiabi/kiabiCheckoutPage";

export default class KiabiCheckoutPage {
  page: Page;
  kiabiCheckoutPageLocators: KiabiCheckoutPageLocators;
  locale: "FR" | "ES";

  /**
   * Pass the locale when constructing your page object.
   * For example: new KiabiCheckoutPage(page, "FR")
   * @param page - Playwright Page object
   * @param locale - Locale for the checkout page ("FR" or "ES")
   * @author William
   */
  constructor(page: Page, locale: "FR" | "ES") {
    this.page = page;
    this.locale = locale;
    this.kiabiCheckoutPageLocators = new KiabiCheckoutPageLocators(
      page,
      locale
    );
  }

  /**
   * Fill in the postal code and confirm the input.
   * @param postalCode - Postal code to input
   * @author William
   */
  public async inputPostalCode(postalCode: string) {
    await test.step("Input Postal Code", async () => {
      await this.kiabiCheckoutPageLocators.inputPostalCode().fill(postalCode);
      await this.kiabiCheckoutPageLocators.buttonConfirmPostalCode().click();
    });
  }

  /**
   * Tests the error message displayed when no postal code is entered.
   *
   * @author William
   * @locale FR+ES
   */
  public async inputNoPostalCode() {
    await test.step("Input no postal code in textbox", async () => {
      await this.kiabiCheckoutPageLocators.buttonConfirmPostalCode().click();
      await expect(
        this.kiabiCheckoutPageLocators.divPostalCodeErrorMessage()
      ).toBeVisible();
      await expect(
        this.kiabiCheckoutPageLocators.divPostalCodeErrorMessage()
      ).toHaveText(/Le code postal est requis|Se requiere el código postal/);
      await expect(this.kiabiCheckoutPageLocators.buttonConfirmPostalCode())
        .toBeInViewport;
    });
  }

  /**
   * Tests the error message displayed when a six-digit postal code is entered.
   *
   * @author William
   * @locale FR+ES
   */
  public async inputSixDigitPostalCode() {
    await test.step("Input six-digit postal code in textbox", async () => {
      const postalCode = Math.floor(100000 + Math.random() * 900000);
      await this.kiabiCheckoutPageLocators
        .inputPostalCode()
        .fill(postalCode.toString());
      await this.kiabiCheckoutPageLocators.buttonConfirmPostalCode().click();
      await expect(
        this.kiabiCheckoutPageLocators.divPostalCodeErrorMessage()
      ).toBeVisible();
      await expect(
        this.kiabiCheckoutPageLocators.divPostalCodeErrorMessage()
      ).toHaveText(
        /Le code postal peut comporter maximum 5 caractères|El código postal puede incluir máximo 5 caracteres/
      );
      await expect(this.kiabiCheckoutPageLocators.buttonConfirmPostalCode())
        .toBeInViewport;
    });
  }

  /**
   * Tests the error message displayed when text is entered instead of a postal code.
   *
   * @author William
   * @locale FR+ES
   */
  public async inputTextAsPostalCode() {
    await test.step("Input text in postal code textbox", async () => {
      const postalCode = Math.random().toString(36).slice(2, 7);
      await this.kiabiCheckoutPageLocators
        .inputPostalCode()
        .fill(postalCode.toString());
      await this.kiabiCheckoutPageLocators.buttonConfirmPostalCode().click();
      await expect(
        this.kiabiCheckoutPageLocators.divPostalCodeErrorMessage()
      ).toBeVisible();
      await expect(
        this.kiabiCheckoutPageLocators.divPostalCodeErrorMessage()
      ).toHaveText(
        /Le format du code postal est incorrect|El formato del código postal es incorrecto/
      );
      await expect(this.kiabiCheckoutPageLocators.buttonConfirmPostalCode())
        .toBeInViewport;
    });
  }

  /**
   * Select the home delivery option.
   * @author William
   */
  public async selectHomeDelivery() {
    await test.step("Select Home Delivery", async () => {
      await this.kiabiCheckoutPageLocators.labelHomeDelivery().click();
      await this.kiabiCheckoutPageLocators.inputRadioHomeDelivery().click();
    });
  }

  /**
   * Close the address form.
   * @author William
   */
  public async closeAddressForm() {
    await test.step("Close Address Form", async () => {
      await this.kiabiCheckoutPageLocators.buttonCloseAddressForm().click();
    });
  }

  /**
   * Input the shipping information.
   * The dynamic locators inside KiabiCheckoutPageLocators will build the test IDs based on the locale.
   * @param lastName - Last name for the shipping address
   * @param firstName - First name for the shipping address
   * @param streetName - Street name for the shipping address
   * @param streetNameExtra - Additional street information
   * @param city - City for the shipping address
   * @author William
   */
  public async inputShippingInformation(
    lastName: string,
    firstName: string,
    streetName: string,
    streetNameExtra: string,
    city: string
  ) {
    await test.step("Input Shipping Information", async () => {
      await this.kiabiCheckoutPageLocators.inputFormLastName().fill(lastName);
      await this.kiabiCheckoutPageLocators.inputFormFirstName().fill(firstName);
      await this.kiabiCheckoutPageLocators.inputFormStreet().fill(streetName);
      await this.kiabiCheckoutPageLocators
        .inputFormStreetExtra()
        .fill(streetNameExtra);
      await this.kiabiCheckoutPageLocators.inputFormCity().fill(city);
      if (
        !(await this.kiabiCheckoutPageLocators
          .spanSameBillingAddress()
          .isChecked())
      ) {
        await this.kiabiCheckoutPageLocators.spanSameBillingAddress().check();
      }
    });
  }

  /**
   * Check if the postal code form is correctly populated and disabled.
   * @param postalCode - Postal code to check in the form
   * @author William
   */
  public async checkPostalCodeForm(postalCode: string) {
    await test.step("Check Postal Code Form", async () => {
      await expect(
        this.kiabiCheckoutPageLocators.inputFormPostalCode()
      ).toBeDisabled();
      await expect(
        this.kiabiCheckoutPageLocators.inputFormPostalCode()
      ).toHaveValue(postalCode);
    });
  }

  /**
   * Check if the country form is correctly populated and disabled based on the locale.
   * @author William
   */
  public async checkCountryForm() {
    await test.step("Check Country Form", async () => {
      await expect(
        this.kiabiCheckoutPageLocators.selectFormCountry()
      ).toBeDisabled();
      await expect(
        this.kiabiCheckoutPageLocators.selectFormCountry()
      ).toHaveValue(this.locale);
    });
  }

  /**
   * Validate the shipping address by clicking the complete button.
   * @author William
   */
  public async validateShippingAddress() {
    await test.step("Validate Shipping Address", async () => {
      await this.kiabiCheckoutPageLocators.buttonCompleteShippingForm().click();
    });
  }

  /**
   * Input the phone number for the shipping address.
   * @param phoneNumber - Phone number to input
   * @author William
   */
  public async inputPhoneNumber(phoneNumber: string) {
    await test.step("Input Phone Number", async () => {
      await this.kiabiCheckoutPageLocators.inputPhoneNumber().fill(phoneNumber);
    });
  }

  /**
   * Validate the shipping step by clicking the button.
   * @author William
   */
  public async validateShippingStep() {
    await test.step("Validate Shipping Step", async () => {
      await this.kiabiCheckoutPageLocators.buttonValidateShippingStep().click();
    });
  }

  /**
   * Navigate to the billing information step by clicking the button.
   * @author William
   */
  public async goToBillingInformation() {
    await test.step("Go to Billing Information", async () => {
      await this.kiabiCheckoutPageLocators.spanCompleteForm().click();
    });
  }

  /**
   * Complete the billing information (birth date and email).
   * @param birthDate - Birth date to input
   * @param email - Email to input
   * @author William
   */
  public async completeBillingInformation(birthDate: string, email: string) {
    await test.step("Complete Billing Information", async () => {
      await this.kiabiCheckoutPageLocators.inputFormBirthDate().fill(birthDate);
      await this.kiabiCheckoutPageLocators.inputFormEmail().fill(email);
    });
  }

  /**
   * Validate the billing information by clicking the complete button.
   * @author William
   */
  public async validateBillingInformation() {
    await test.step("Validate Billing Information", async () => {
      await this.kiabiCheckoutPageLocators.buttonCompleteBillingForm().click();
    });
  }

  /**
   * Validate the original address by checking it and clicking the validate button.
   * @author William
   */
  public async validateOriginalAddress() {
    await test.step("Validate Original Address", async () => {
      await expect(
        this.kiabiCheckoutPageLocators.inputOriginalAddress()
      ).toBeChecked();
      await this.kiabiCheckoutPageLocators.buttonValidateAddress().click();
    });
  }

  /**
   * Validate the loyalty step by clicking the button.
   * @author William
   */
  public async validateLoyaltyStep() {
    await test.step("Validate Loyalty Step", async () => {
      await this.kiabiCheckoutPageLocators.buttonValidateLoyaltyStep().click();
    });
  }

  /**
   * Verify the credit card form is visible and editable.
   * @author William
   */
  /**
   * Verify the credit card form is visible and editable.
   * @locale FR+ES
   * @author William
   */
  public async verifyCreditCardForm() {
    await test.step("Verify Credit Card Form", async () => {
      await this.kiabiCheckoutPageLocators
        .inputCreditCard()
        .scrollIntoViewIfNeeded();
      await this.kiabiCheckoutPageLocators.inputCreditCard().click();
      await expect(
        this.kiabiCheckoutPageLocators.labelCreditCard()
      ).toBeVisible();
      await expect(this.kiabiCheckoutPageLocators.labelCreditCard()).toHaveText(
        /Carte bancaire|Tarjeta de crédito/
      );
      await expect(
        this.kiabiCheckoutPageLocators.inputCreditCardNumber()
      ).toBeVisible();
      await expect(
        this.kiabiCheckoutPageLocators.inputCreditCardNumber()
      ).toBeEditable();
      await expect(
        this.kiabiCheckoutPageLocators.inputCreditCardExpiryDate()
      ).toBeVisible();
      await expect(
        this.kiabiCheckoutPageLocators.inputCreditCardExpiryDate()
      ).toBeEditable();
      await expect(
        this.kiabiCheckoutPageLocators.inputCreditCardCvv()
      ).toBeInViewport();
      await expect(
        this.kiabiCheckoutPageLocators.inputCreditCardCvv()
      ).toBeEditable();
    });
  }

  /**
   * Verify the Google Pay form is visible and clickable.
   * @locale FR+ES
   * @author William
   */
  public async verifyGooglePayForm() {
    await test.step("Verify Google Pay Form", async () => {
      await this.kiabiCheckoutPageLocators.inputGooglePay().click();
      await expect(this.kiabiCheckoutPageLocators.labelGooglePay()).toHaveText(
        "Google Pay"
      );
      await expect(
        this.kiabiCheckoutPageLocators.buttonGooglePay()
      ).toBeInViewport();
    });
  }

  /**
   * Verify the PayPal form is visible and clickable.
   * @locale FR+ES
   * @author William
   */
  public async verifyPaypalForm() {
    await test.step("Verify PayPal Form", async () => {
      await this.kiabiCheckoutPageLocators.inputPaypal().click();
      await expect(this.kiabiCheckoutPageLocators.labelPaypal()).toContainText(
        "Paypal"
      );
      await expect(
        this.kiabiCheckoutPageLocators.buttonPaypal()
      ).toBeInViewport();
    });
  }

  /**
   * Verify the Illicado form is visible and clickable.
   * @locale FR
   * @author William
   */
  public async verifyIllicadoForm() {
    await test.step("Verify Illicado Form", async () => {
      await this.kiabiCheckoutPageLocators.inputIllicado().click();
      await expect(this.kiabiCheckoutPageLocators.labelIllicado()).toHaveText(
        "Illicado"
      );
      await expect(
        this.kiabiCheckoutPageLocators.buttonIllicado()
      ).toBeInViewport();
    });
  }

  /**
   * Verify the gift card form is visible and clickable.
   * @locale FR
   * @author William
   */
  public async verifyGiftCardForm() {
    await test.step("Verify Gift Card Form", async () => {
      await this.kiabiCheckoutPageLocators.inputGiftCard().click();
      await expect(this.kiabiCheckoutPageLocators.labelGiftCard()).toHaveText(
        "Carte cadeau Kiabi"
      );
      await expect(
        this.kiabiCheckoutPageLocators.buttonGiftCard()
      ).toBeInViewport();
    });
  }

  /**
   * Verify the voucher form is visible and editable.
   * @locale FR
   * @author William
   */
  public async verifyVoucherForm() {
    await test.step("Verify Voucher Form", async () => {
      await this.kiabiCheckoutPageLocators.inputVoucher().click();
      await expect(this.kiabiCheckoutPageLocators.labelVoucher()).toHaveText(
        "Bon d'achat"
      );
      await expect(
        this.kiabiCheckoutPageLocators.inputVoucherNumber()
      ).toBeInViewport();
      await expect(
        this.kiabiCheckoutPageLocators.inputVoucherNumber()
      ).toBeEditable();
      await expect(
        this.kiabiCheckoutPageLocators.buttonVoucher()
      ).toBeInViewport();
    });
  }

  /**
   * Verify the Oney form is disabled and contains the correct label.
   * @locale FR
   * @author William
   */
  public async verifyOneyForm(cartAmount: number) {
    await test.step("Verify Oney Form", async () => {
      await expect(this.kiabiCheckoutPageLocators.labelOney()).toHaveText(
        "Oney"
      );
      if (cartAmount > 100) {
        await expect(this.kiabiCheckoutPageLocators.inputOney()).toBeEnabled();
        await this.kiabiCheckoutPageLocators.inputOney().click();
        await expect(this.kiabiCheckoutPageLocators.buttonOney())
          .toBeInViewport;
      } else {
        await expect(this.kiabiCheckoutPageLocators.inputOney()).toBeDisabled();
      }
    });
  }

  /**
   * Verify the payment on delivery form is visible and clickable.
   * @locale ES
   * @author William
   */
  public async verifyPaymentOnDeliveryForm() {
    await test.step("Verify Payment on Delivery Form", async () => {
      await this.kiabiCheckoutPageLocators.inputPaymentOnDelivery().click();
      await expect(
        this.kiabiCheckoutPageLocators.labelPaymentOnDelivery()
      ).toHaveText("Contra reembolso");
      await expect(
        this.kiabiCheckoutPageLocators.buttonPaymentOnDelivery()
      ).toBeInViewport();
    });
  }

  /**
   * Verify the refund voucher form is visible and editable.
   * @locale ES
   * @author William
   */
  public async verifyRefundVoucherForm() {
    await test.step("Verify Refund Voucher Form", async () => {
      await this.kiabiCheckoutPageLocators.inputRefundVoucher().click();
      await expect(
        this.kiabiCheckoutPageLocators.labelRefundVoucher()
      ).toHaveText("Bono reembolso");
      await expect(
        this.kiabiCheckoutPageLocators.inputRefundVoucherNumber()
      ).toBeInViewport();
      await expect(
        this.kiabiCheckoutPageLocators.inputRefundVoucherNumber()
      ).toBeEditable();
      await expect(
        this.kiabiCheckoutPageLocators.buttonRefundVoucher()
      ).toBeInViewport();
    });
  }
}
