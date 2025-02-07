import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    trace: "on-first-retry",
  },
  projects: [
    // FR projects on multiple browsers
    {
      name: "FR",
      use: {
        baseURL: "https://www.kiabi.com/",
        locale: "fr-FR",
        ...devices["Desktop Chrome"],
      },
    },
    /*{
      name: "FR-firefox",
      use: {
        baseURL: "https://www.kiabi.com/",
        locale: "fr-FR",
        ...devices["Desktop Firefox"],
      },
    },
    {
      name: "FR-webkit",
      use: {
        baseURL: "https://www.kiabi.com/",
        locale: "fr-FR",
        ...devices["Desktop Safari"],
      },
    },*/
    // ES projects on multiple browsers
    {
      name: "ES",
      use: {
        baseURL: "https://www.kiabi.es/",
        locale: "es-ES",
        ...devices["Desktop Chrome"],
      },
    },
    /*{
      name: "ES-firefox",
      use: {
        baseURL: "https://www.kiabi.es/",
        locale: "es-ES",
        ...devices["Desktop Firefox"],
      },
    },
    {
      name: "ES-webkit",
      use: {
        baseURL: "https://www.kiabi.es/",
        locale: "es-ES",
        ...devices["Desktop Safari"],
      },
    },*/
  ],
});
