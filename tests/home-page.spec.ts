import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/ToDoApp/);
});

test.describe("Home page navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("login navigation", async ({ page }) => {
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page).toHaveURL(/\/login/);
  });

  test("register navigation", async ({ page }) => {
    await page.getByRole("button", { name: "Register" }).click();
    await expect(page).toHaveURL(/\/register/);
  });
});
