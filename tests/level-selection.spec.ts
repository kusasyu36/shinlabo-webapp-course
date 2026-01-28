import { test, expect } from '@playwright/test';

test.describe('Level Selection', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/dashboard');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should display 3 level options on dashboard', async ({ page }) => {
    await page.goto('/dashboard');

    // Wait for the level selector to load
    await expect(page.getByText('あなたに合ったコースを選んでください')).toBeVisible();

    // Check all 3 level cards are displayed by their icons
    await expect(page.getByText('🌱')).toBeVisible();
    await expect(page.getByText('🌿')).toBeVisible();
    await expect(page.getByText('🌳')).toBeVisible();

    // Check lesson counts
    await expect(page.getByText('10レッスン')).toBeVisible();
    await expect(page.getByText('20レッスン')).toBeVisible();
    await expect(page.getByText('22レッスン')).toBeVisible();
  });

  test('should be able to select beginner level', async ({ page }) => {
    await page.goto('/dashboard');

    // Click on beginner card (use icon to be specific)
    await page.getByText('🌱').click();

    // Check "選択中" badge appears
    await expect(page.getByText('選択中')).toBeVisible();

    // Click confirm button
    await page.getByRole('button', { name: /初心者コースで始める/ }).click();

    // Should now see the dashboard with beginner content - check for Unit label
    await expect(page.getByText('Unit 1')).toBeVisible();

    // Should show beginner level badge in header
    await expect(page.getByText('🌱 初心者コース')).toBeVisible();
  });

  test('should be able to select standard level', async ({ page }) => {
    await page.goto('/dashboard');

    // Click on standard card
    await page.getByText('🌿').click();

    // Check "選択中" badge appears
    await expect(page.getByText('選択中')).toBeVisible();

    // Click confirm button
    await page.getByRole('button', { name: /標準コースで始める/ }).click();

    // Should now see the dashboard with standard content - check for Phase label
    await expect(page.getByText('Phase 1')).toBeVisible();

    // Should show standard level badge in header
    await expect(page.getByText('🌿 標準コース')).toBeVisible();
  });

  test('should be able to select advanced level', async ({ page }) => {
    await page.goto('/dashboard');

    // Click on advanced card
    await page.getByText('🌳').click();

    // Check "選択中" badge appears
    await expect(page.getByText('選択中')).toBeVisible();

    // Click confirm button
    await page.getByRole('button', { name: /経験者コースで始める/ }).click();

    // Should now see the dashboard with advanced content
    await expect(page.getByText('🌳 経験者コース')).toBeVisible();

    // Should show 6 phases for advanced (including React/Next.js)
    await expect(page.getByText('Phase 1')).toBeVisible();
    await expect(page.getByText('React/Next.jsで本格開発')).toBeVisible();
  });

  test('beginner should have 10 lessons, standard 20, advanced 22', async ({ page }) => {
    await page.goto('/dashboard');

    // Check lesson counts in level selector
    await expect(page.getByText('10レッスン')).toBeVisible();
    await expect(page.getByText('20レッスン')).toBeVisible();
    await expect(page.getByText('22レッスン')).toBeVisible();
  });

  test('should allow changing level after selection', async ({ page }) => {
    await page.goto('/dashboard');

    // Select standard first
    await page.getByText('🌿').click();
    await page.getByRole('button', { name: /標準コースで始める/ }).click();

    // Verify we're on standard
    await expect(page.getByText('🌿 標準コース')).toBeVisible();

    // Click level change button
    await page.getByRole('button', { name: /レベル変更/ }).click();

    // Should show level selector again
    await expect(page.getByText('あなたに合ったコースを選んでください')).toBeVisible();

    // Select advanced
    await page.getByText('🌳').click();
    await page.getByRole('button', { name: /経験者コースで始める/ }).click();

    // Should now show advanced content
    await expect(page.getByText('🌳 経験者コース')).toBeVisible();
  });
});

test.describe('Lesson Navigation', () => {
  test('should have lesson links in standard dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    // Select standard level
    await page.getByText('🌿').click();
    await page.getByRole('button', { name: /標準コースで始める/ }).click();

    // Wait for dashboard to load
    await expect(page.getByText('Phase 1')).toBeVisible();

    // Check first lesson link exists and has href
    const lessonLink = page.getByRole('link', { name: /L1/ }).first();
    await expect(lessonLink).toBeVisible();
    await expect(lessonLink).toHaveAttribute('href', /.+/);
  });

  test('beginner lessons should show different content than standard', async ({ page }) => {
    await page.goto('/dashboard');
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    // Select beginner level
    await page.getByText('🌱').click();
    await page.getByRole('button', { name: /初心者コースで始める/ }).click();

    // Wait for dashboard to load
    await expect(page.getByText('Unit 1')).toBeVisible();

    // Click on first lesson - beginner lessons have different IDs
    await page.getByRole('link', { name: /L1/ }).first().click();

    // Should show beginner-specific content (first beginner lesson title)
    await expect(page.getByText('Lesson 1: AIとは何か？')).toBeVisible();
  });
});

test.describe('Content Verification', () => {
  test('should NOT contain SDGs text on homepage', async ({ page }) => {
    await page.goto('/');

    // Get all text content
    const content = await page.textContent('body');
    expect(content).not.toContain('SDGs推進');
  });

  test('should NOT contain SDGs text in footer', async ({ page }) => {
    await page.goto('/');

    const footerContent = await page.locator('footer').textContent();
    expect(footerContent).not.toContain('SDGs');
  });

  test('homepage should show Vibe Coding course title', async ({ page }) => {
    await page.goto('/');

    // Should show Web app course title
    await expect(page.getByRole('heading', { name: /AIでWebアプリを作る/ })).toBeVisible();
  });

  test('homepage should show 3 course options', async ({ page }) => {
    await page.goto('/');

    // Check the 3 course cards are visible
    await expect(page.getByText('🌱').first()).toBeVisible();
    await expect(page.getByText('🌿').first()).toBeVisible();
    await expect(page.getByText('🌳').first()).toBeVisible();
  });

  test('footer should have AI tool links', async ({ page }) => {
    await page.goto('/');

    // Should have AI tool links in footer
    await expect(page.getByRole('link', { name: 'Google AI Studio' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Claude' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'v0 by Vercel' })).toBeVisible();
  });
});

test.describe('Level Content Differences', () => {
  test('beginner uses Units, standard/advanced use Phases', async ({ page }) => {
    await page.goto('/dashboard');
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    // Select beginner
    await page.getByText('🌱').click();
    await page.getByRole('button', { name: /初心者コースで始める/ }).click();

    // Beginner should show "Unit" not "Phase"
    await expect(page.getByText('Unit 1')).toBeVisible();
    const beginnerContent = await page.textContent('main');
    expect(beginnerContent).not.toContain('Phase 1');

    // Change to standard
    await page.getByRole('button', { name: /レベル変更/ }).click();
    await page.getByText('🌿').click();
    await page.getByRole('button', { name: /標準コースで始める/ }).click();

    // Standard should show "Phase" not "Unit"
    await expect(page.getByText('Phase 1')).toBeVisible();
  });

  test('advanced has 6 phases including React/Next.js', async ({ page }) => {
    await page.goto('/dashboard');
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    // Select advanced
    await page.getByText('🌳').click();
    await page.getByRole('button', { name: /経験者コースで始める/ }).click();

    // Should have Phase 6 with React/Next.js content
    await expect(page.getByText('Phase 5')).toBeVisible();
    await expect(page.getByText('React/Next.jsで本格開発')).toBeVisible();
    await expect(page.getByText('Phase 6')).toBeVisible();
    await expect(page.getByText('本番環境とデプロイ')).toBeVisible();
  });
});
