import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/auth/login");

  await expect(page).toHaveTitle(/Login/);
});

test.describe("Login page navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auth/login");
  });

  test("register navigation", async ({ page }) => {
    await page
      .getByRole("link", { name: "Don't have an account? Register" })
      .click();
    await expect(page).toHaveURL(/\/register/);
  });
});

// test("Log into the app", async ({ page }) => {
//   await page.goto("/auth/login");
//   await page.getByLabel("Email").fill("initial@todoapp.com");
//   await page.getByLabel("Password").fill("theamazingpassword1");

//   const urlPromise = page.waitForURL(/\/todos/);
//   await page.getByRole("button", { name: "Login" }).click();
//   await urlPromise;

//   await expect(page).toHaveURL(/\/todos/);
// });

// test("Invalid Email or Password", async ({ page }) => {
//   await page.goto("/auth/login");
//   await page.getByLabel("Email").fill("initia@todoapp.com");
//   await page.getByLabel("Password").fill("theamazingpassword2");
//   await page.getByRole("button", { name: "Login" }).click();

//   await expect(page).toHaveURL(/\/login/);
//   await page.waitForFunction(
//     (text) => document.body.innerText.includes(text),
//     "Invalid email or password"
//   );
// });
