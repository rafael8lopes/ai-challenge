import { test, expect } from '@playwright/test'

test('analyst opens a dispute, reads case strength, and returns to the list', async ({ page }) => {
  // 1. Land on the dispute list page
  await page.goto('/')
  await expect(page).toHaveURL('/')

  // Wait for the table to render at least one dispute row + its details button
  const firstReview = page.getByRole('button', { name: 'Review' }).first()
  await expect(firstReview).toBeVisible()

  // 2. Click the row's details button
  await firstReview.click()

  // 3. Land on the detail page
  await expect(page).toHaveURL(/\/disputes\/DSP-\d+/)

  // 4. Read the CASE STRENGTH section
  const caseStrength = page.getByRole('region', { name: /case strength/i })
  await expect(caseStrength).toBeVisible()
  await expect(caseStrength.getByText('CASE STRENGTH')).toBeVisible()
  await expect(caseStrength.getByText(/%$/)).toBeVisible()

  // 5. Click the "All Disputes" back link
  await page.getByRole('button', { name: /all disputes/i }).click()

  // 6. Back on the list page
  await expect(page).toHaveURL('/')
  await expect(page.getByRole('button', { name: 'Review' }).first()).toBeVisible()
})
