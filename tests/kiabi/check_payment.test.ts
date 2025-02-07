import { test } from "@playwright/test";

import productDataFR from "data/KB_FR/product_FR.json";
import productDataES from "data/KB_ES/product_ES.json";
import customerDataFR from "data/KB_FR/customer_FR.json";
import customerDataES from "data/KB_ES/customer_ES.json";

import KiabiHomePage from "pages/kiabi/kiabiHomePage.page";
import KiabiProductPage from "pages/kiabi/kiabiProductPage.page";
import KiabiRedirectLoginPage from "pages/kiabi/kiabiRedirectLoginPage";
import KiabiCartPage from "pages/kiabi/kiabiCartPage.page";
import KiabiCheckoutPage from "pages/kiabi/kiabiCheckoutPage.page";

test(`Check payment`, async ({ page, baseURL }) => {
  const projectName = test.info().project.name;

  const productData = projectName === "FR" ? productDataFR : productDataES;
  const customerData = projectName === "FR" ? customerDataFR : customerDataES;

  await page.goto(baseURL!);

  const kiabiHomePage = new KiabiHomePage(page);
  await kiabiHomePage.acceptCookies();
  await kiabiHomePage.searchProduct(productData.searchTerm);
  await kiabiHomePage.selectFirstResult();

  const kiabiProductPage = new KiabiProductPage(page);
  console.log(await kiabiProductPage.getProductLabel());
  console.log(await kiabiProductPage.getProductPrice());
  await kiabiProductPage.addProductToCart();
  await kiabiProductPage.selectFirstAvailableSize();
  await kiabiProductPage.goToCart();

  const kiabiCartPage = new KiabiCartPage(page);
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
    await kiabiCheckoutPage.verifyOneyForm();
  } else {
    await kiabiCheckoutPage.verifyPaymentOnDeliveryForm();
    await kiabiCheckoutPage.verifyRefundVoucherForm();
  }

  await page.screenshot({ path: `screenshot-${projectName}.png` });
});
