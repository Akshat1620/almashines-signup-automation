/**
 * Test Data & Utilities for AlmaShines Sign Up Tests
 * 
 * Provides:
 * - Test user generation
 * - Existing email samples
 * - Invalid email patterns
 * - CSS selectors
 * - Timeouts
 */

const BASE_URL = 'https://www.almashines.com/dtc/account';

const TIMEOUTS = {
  element: 10000,      // 10 seconds for element visibility
  navigation: 30000,   // 30 seconds for page navigation
  network: 5000,       // 5 seconds for network calls
  action: 5000,        // 5 seconds for user actions
};

const SELECTORS = {
  emailInput: 'input[type="email"]',
  passwordInput: 'input[type="password"]',
  nameInput: 'input[name="name"], input[id="name"]',
  submitBtn: 'button[type="submit"], button:has-text("Sign Up")',
  otpInput: 'input[placeholder*="OTP"]',
  termsCheckbox: 'input[type="checkbox"]',
};

// Sample existing emails (for testing existing account flow)
const EXISTING_EMAILS = [
  'existing.user@almashines.com',
  'test.account@almashines.com',
];

// Sample invalid emails for validation testing
const INVALID_EMAILS = [
  'notanemail',                    // Missing @
  '@example.com',                  // Missing local part
  'user@',                         // Missing domain
  'user name@example.com',         // Space in local part
  'user@domain',                   // Missing TLD
  'user@.com',                     // Missing domain name
  'user..name@example.com',        // Consecutive dots
  '.user@example.com',             // Starts with dot
  'user.@example.com',             // Ends with dot
  'a' + 'b'.repeat(250) + '@example.com',  // Extremely long local part
];

/**
 * Generate a unique test user for each test run
 * @returns {Object} Test user object with email, name, password, etc.
 */
function generateTestUser() {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 8);
  const email = `test.user.${timestamp}.${randomId}@mailinator.com`; // Using Mailinator for easy OTP testing
  const firstName = `Test${randomId}`;
  const lastName = `User${Math.floor(Math.random() * 10000)}`;
  
  return {
    email,
    fullName: `${firstName} ${lastName}`,
    firstName,
    lastName,
    password: 'TestPass@123',       // Meets most password requirements (8+ chars, mixed case, number, symbol)
    confirmPassword: 'TestPass@123',
    otp: '123456',                  // Placeholder - actual OTP from email would be different
    role: 'Student',
    timestamp,
    randomId,
  };
}

/**
 * Generate multiple unique test users
 * @param {number} count - Number of users to generate
 * @returns {Array} Array of test user objects
 */
function generateTestUsers(count = 1) {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push(generateTestUser());
  }
  return users;
}

/**
 * Wait for an element to be visible and clickable
 * @param {Page} page - Playwright page object
 * @param {string} selector - CSS selector
 * @param {number} timeout - Timeout in ms
 * @returns {Promise<ElementHandle>}
 */
async function waitForElement(page, selector, timeout = TIMEOUTS.element) {
  await page.waitForSelector(selector, { visible: true, timeout });
  return page.$(selector);
}

/**
 * Click an element with retry logic
 * @param {Page} page - Playwright page object
 * @param {string} selector - CSS selector
 * @param {number} maxRetries - Max attempts
 * @returns {Promise<void>}
 */
async function clickWithRetry(page, selector, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await page.click(selector, { timeout: TIMEOUTS.action });
      return;
    } catch (e) {
      if (i === maxRetries - 1) throw e;
      await page.waitForTimeout(500);
    }
  }
}

/**
 * Fill an input field with retry logic
 * @param {Page} page - Playwright page object
 * @param {string} selector - CSS selector
 * @param {string} value - Value to fill
 * @param {number} maxRetries - Max attempts
 * @returns {Promise<void>}
 */
async function fillWithRetry(page, selector, value, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await page.fill(selector, value, { timeout: TIMEOUTS.action });
      return;
    } catch (e) {
      if (i === maxRetries - 1) throw e;
      await page.waitForTimeout(500);
    }
  }
}

/**
 * Check if an error message is displayed
 * @param {Page} page - Playwright page object
 * @param {string} errorText - Text to look for in error message
 * @returns {Promise<boolean>}
 */
async function hasErrorMessage(page, errorText) {
  const pageContent = await page.textContent('body');
  return pageContent.toLowerCase().includes(errorText.toLowerCase());
}

/**
 * Take a labeled screenshot for debugging
 * @param {Page} page - Playwright page object
 * @param {string} label - Label for the screenshot
 * @returns {Promise<void>}
 */
async function captureScreenshot(page, label) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `test-results/screenshots/${label}-${timestamp}.png`;
  await page.screenshot({ path: filename, fullPage: true });
  console.log(`Screenshot saved: ${filename}`);
}

module.exports = {
  BASE_URL,
  TIMEOUTS,
  SELECTORS,
  EXISTING_EMAILS,
  INVALID_EMAILS,
  generateTestUser,
  generateTestUsers,
  waitForElement,
  clickWithRetry,
  fillWithRetry,
  hasErrorMessage,
  captureScreenshot,
};
