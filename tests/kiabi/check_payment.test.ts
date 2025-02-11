import { test, expect } from "@playwright/test";

import productDataFR from "@data/KB_FR/product_FR.json";
import productDataES from "@data/KB_ES/product_ES.json";
import customerDataFR from "@data/KB_FR/customer_FR.json";
import customerDataES from "@data/KB_ES/customer_ES.json";

import KiabiHomePage from "@pages/kiabi/kiabiHomePage.page";
import KiabiProductPage from "@pages/kiabi/kiabiProductPage.page";
import KiabiRedirectLoginPage from "@pages/kiabi/kiabiRedirectLoginPage";
import KiabiCartPage from "@pages/kiabi/kiabiCartPage.page";
import KiabiCheckoutPage from "@pages/kiabi/kiabiCheckoutPage.page";

/**
 * @author William
 * @description Automates the payment process on the Kiabi website for both French and Spanish environments.
 * This test navigates through the site, searches for a product, adds it to the cart, enters shipping and billing details,
 * and verifies available payment methods.
 *
 * @param {import('@playwright/test').Page} page - The Playwright page object used for browser interactions.
 * @param {string} baseURL - The base URL of the Kiabi website.
 *
 * @step Navigates to the Kiabi home page and accepts cookies.
 * @step Searches for a product and selects the first result.
 * @step Adds the product to the cart and proceeds to checkout as a guest.
 * @step Inputs shipping and billing information, validates address and country forms.
 * @step Validates the loyalty step and verifies available payment methods.
 * @step Takes a screenshot at the end of the test for verification.
 */

test(`[KBFR] [KBES] - Add item to cart and go to payment page`, async ({
  page,
  baseURL,
}) => {
  const projectName = test.info().project.name;

  const productData = projectName === "FR" ? productDataFR : productDataES;
  const customerData = projectName === "FR" ? customerDataFR : customerDataES;

  await page.goto(baseURL!);

  const kiabiHomePage = new KiabiHomePage(page);
  await kiabiHomePage.acceptCookies();
  await kiabiHomePage.searchProduct(productData.searchTerm);
  await kiabiHomePage.selectFromResults(0);

  const kiabiProductPage = new KiabiProductPage(page);
  const productPageLabel = await kiabiProductPage.getProductName();
  const productPagePrice = await kiabiProductPage.getProductPrice();
  await kiabiProductPage.addProductToCart();
  await kiabiProductPage.selectFirstAvailableSize();
  await kiabiProductPage.goToCart();

  const kiabiCartPage = new KiabiCartPage(page);
  const cartPageLabel = await kiabiCartPage.getProductName();
  const cartPagePrice = await kiabiCartPage.getProductPrice();
  expect(productPageLabel).toContain(cartPageLabel);
  expect(productPagePrice).toEqual(cartPagePrice);
  const cartAmount = await kiabiCartPage.getCartAmount();
  await kiabiCartPage.validateCart();

  const kiabiRedirectLoginPage = new KiabiRedirectLoginPage(page);
  await kiabiRedirectLoginPage.continueAsGuest();

  const kiabiCheckoutPage = new KiabiCheckoutPage(
    page,
    projectName as "FR" | "ES"
  );
  await kiabiCheckoutPage.inputPostalCode(customerData.postalCode);
  await kiabiCheckoutPage.selectHomeDelivery();
  await kiabiCheckoutPage.inputShippingInformation(
    customerData.shippingInfo.lastName,
    customerData.shippingInfo.firstName,
    customerData.shippingInfo.streetName,
    customerData.shippingInfo.streetNameExtra,
    customerData.shippingInfo.city
  );
  await kiabiCheckoutPage.checkCountryForm();
  await kiabiCheckoutPage.checkPostalCodeForm(customerData.postalCode);
  await kiabiCheckoutPage.validateShippingAddress();
  await kiabiCheckoutPage.inputPhoneNumber(customerData.phoneNumber);
  await kiabiCheckoutPage.validateShippingStep();
  await kiabiCheckoutPage.goToBillingInformation();
  await kiabiCheckoutPage.completeBillingInformation(
    customerData.billingInfo.birthDate,
    customerData.billingInfo.email
  );
  await kiabiCheckoutPage.validateBillingInformation();
  if (projectName === "FR") {
    await kiabiCheckoutPage.validateOriginalAddress();
  }
  await kiabiCheckoutPage.validateShippingStep();

  await kiabiCheckoutPage.validateLoyaltyStep();

  await kiabiCheckoutPage.verifyCreditCardForm();
  await kiabiCheckoutPage.verifyGooglePayForm();
  await kiabiCheckoutPage.verifyPaypalForm();

  if (projectName === "FR") {
    await kiabiCheckoutPage.verifyIllicadoForm();
    await kiabiCheckoutPage.verifyGiftCardForm();
    await kiabiCheckoutPage.verifyVoucherForm();
    await kiabiCheckoutPage.verifyOneyForm(cartAmount);
  } else {
    await kiabiCheckoutPage.verifyPaymentOnDeliveryForm();
    await kiabiCheckoutPage.verifyRefundVoucherForm();
  }

  await page.screenshot({ path: `screenshot-${projectName}.png` });
});

/**
 * @author William
 * @description Automates the payment process on the Kiabi website for both French and Spanish environments.
 * This test navigates through the site, searches for a product, adds it to the cart, enters shipping and billing details,
 * and verifies available payment methods.
 * Since the cart is >100€, Oney payment should be available for KBFR.
 *
 * @param {import('@playwright/test').Page} page - The Playwright page object used for browser interactions.
 * @param {string} baseURL - The base URL of the Kiabi website.
 *
 * @step Navigates to the Kiabi home page and accepts cookies.
 * @step Searches for a product and selects the first result.
 * @step Adds the product to the cart and proceeds to checkout as a guest.
 * @step Inputs shipping and billing information, validates address and country forms.
 * @step Validates the loyalty step and verifies available payment methods.
 * @step Takes a screenshot at the end of the test for verification.
 */
test(`[KBFR] [KBES] - Add item to cart and go to payment page - Cart > 100€`, async ({
  page,
  baseURL,
}) => {
  const projectName = test.info().project.name;

  const productData = projectName === "FR" ? productDataFR : productDataES;
  const customerData = projectName === "FR" ? customerDataFR : customerDataES;

  await page.goto(baseURL!);

  const kiabiHomePage = new KiabiHomePage(page);
  await kiabiHomePage.acceptCookies();
  await kiabiHomePage.searchProduct(productData.searchTerm);
  await kiabiHomePage.selectFromResults(0);

  const kiabiProductPage = new KiabiProductPage(page);
  const productPageLabel = await kiabiProductPage.getProductName();
  const productPagePrice = await kiabiProductPage.getProductPrice();
  await kiabiProductPage.addProductToCart();
  await kiabiProductPage.selectFirstAvailableSize();
  await kiabiProductPage.goToCart();

  const kiabiCartPage = new KiabiCartPage(page);
  const cartPageLabel = await kiabiCartPage.getProductName();
  const cartPagePrice = await kiabiCartPage.getProductPrice();
  expect(productPageLabel).toContain(cartPageLabel);
  expect(productPagePrice).toEqual(cartPagePrice);
  await kiabiCartPage.ensureCartAmountAbove(100);
  const cartAmount = await kiabiCartPage.getCartAmount();
  await kiabiCartPage.validateCart();

  const kiabiRedirectLoginPage = new KiabiRedirectLoginPage(page);
  await kiabiRedirectLoginPage.continueAsGuest();

  const kiabiCheckoutPage = new KiabiCheckoutPage(
    page,
    projectName as "FR" | "ES"
  );
  await kiabiCheckoutPage.inputPostalCode(customerData.postalCode);
  await kiabiCheckoutPage.selectHomeDelivery();
  await kiabiCheckoutPage.inputShippingInformation(
    customerData.shippingInfo.lastName,
    customerData.shippingInfo.firstName,
    customerData.shippingInfo.streetName,
    customerData.shippingInfo.streetNameExtra,
    customerData.shippingInfo.city
  );
  await kiabiCheckoutPage.checkCountryForm();
  await kiabiCheckoutPage.checkPostalCodeForm(customerData.postalCode);
  await kiabiCheckoutPage.validateShippingAddress();
  await kiabiCheckoutPage.inputPhoneNumber(customerData.phoneNumber);
  await kiabiCheckoutPage.validateShippingStep();
  await kiabiCheckoutPage.goToBillingInformation();
  await kiabiCheckoutPage.completeBillingInformation(
    customerData.billingInfo.birthDate,
    customerData.billingInfo.email
  );
  await kiabiCheckoutPage.validateBillingInformation();
  if (projectName === "FR") {
    await kiabiCheckoutPage.validateOriginalAddress();
  }
  await kiabiCheckoutPage.validateShippingStep();

  await kiabiCheckoutPage.validateLoyaltyStep();

  await kiabiCheckoutPage.verifyCreditCardForm();
  await kiabiCheckoutPage.verifyGooglePayForm();
  await kiabiCheckoutPage.verifyPaypalForm();

  if (projectName === "FR") {
    await kiabiCheckoutPage.verifyIllicadoForm();
    await kiabiCheckoutPage.verifyGiftCardForm();
    await kiabiCheckoutPage.verifyVoucherForm();
    await kiabiCheckoutPage.verifyOneyForm(cartAmount);
  } else {
    await kiabiCheckoutPage.verifyPaymentOnDeliveryForm();
    await kiabiCheckoutPage.verifyRefundVoucherForm();
  }

  await page.screenshot({ path: `screenshot-${projectName}.png` });
});

/**
 * @author William
 * @description Checks error messages for the postal code textbox.
 *
 * @param {import('@playwright/test').Page} page - The Playwright page object used for browser interactions.
 * @param {string} baseURL - The base URL of the Kiabi website.
 *
 * @step Navigates to the Kiabi home page and accepts cookies.
 * @step Searches for a product and selects the first result.
 * @step Adds the product to the cart and proceeds to checkout as a guest.
 * @step Check different error cases for postal code textbox : no postal code, postal code > 5 digits and text input.
 */
test(`[KBFR] [KBES] - Postal Code error cases`, async ({ page, baseURL }) => {
  const projectName = test.info().project.name;

  const productData = projectName === "FR" ? productDataFR : productDataES;

  await page.goto(baseURL!);

  const kiabiHomePage = new KiabiHomePage(page);
  await kiabiHomePage.acceptCookies();
  await kiabiHomePage.searchProduct(productData.searchTerm);
  await kiabiHomePage.selectFromResults(0);

  const kiabiProductPage = new KiabiProductPage(page);
  await kiabiProductPage.addProductToCart();
  await kiabiProductPage.selectFirstAvailableSize();
  await kiabiProductPage.goToCart();

  const kiabiCartPage = new KiabiCartPage(page);
  await kiabiCartPage.ensureCartAmountAbove(100);
  await kiabiCartPage.validateCart();

  const kiabiRedirectLoginPage = new KiabiRedirectLoginPage(page);
  await kiabiRedirectLoginPage.continueAsGuest();

  const kiabiCheckoutPage = new KiabiCheckoutPage(
    page,
    projectName as "FR" | "ES"
  );
  await kiabiCheckoutPage.inputNoPostalCode();
  await kiabiCheckoutPage.inputSixDigitPostalCode();
  await kiabiCheckoutPage.inputTextAsPostalCode();

  await page.screenshot({ path: `screenshot-${projectName}.png` });
});
