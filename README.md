# AlmaShines Sign Up Flow - Automation Testing

Automated test suite for the **AlmaShines Sign Up flow** using [Playwright](https://playwright.dev/).

## Overview

This project contains automated test scripts to validate the user registration flow on the AlmaShines demo community platform (https://www.almashines.com/dtc/account).

### What is Being Tested

The **Sign Up flow only**:
1. Land on the Sign Up page
2. Enter email address
3. System checks the email:
   - **Existing account** → prompts user to log in
   - **New email** → user enters name & password
4. Email verification via OTP
5. Role selection, association details, terms acceptance

### Scenarios Covered

| Test | Scenario | Automation Rationale |
|------|----------|---------------------|
| TC01 | Page load verification | Ensures platform is accessible |
| TC02 | New email flow | Core user journey (high impact) |
| TC03 | Name/password → OTP | Critical authentication step |
| TC04 | Existing email → login prompt | Important UX branching logic |
| TC05 | Invalid email validation | Data quality & security |
| TC06 | Empty field validation | UX completeness |
| TC07 | Password requirements | Security validation |
| TC08 | Full E2E walkthrough | Comprehensive flow documentation |
| TC09 | Network API analysis | Understand backend integration |
| TC10 | Responsive layout | Cross-device compatibility |

## Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- npm (comes with Node.js)

### Installation

```bash
# Navigate to project directory
cd almashines-automation

# Install dependencies
npm install

# Install Playwright browsers (Chromium, Firefox, WebKit)
npx playwright install chromium
```

## Running Tests

### Run all tests (headless)
```bash
npm test
```

### Run tests with visible browser
```bash
npm run test:headed
```

### Run a specific test file
```bash
npx playwright test tests/signup-flow.spec.js
```

### Run tests in debug mode
```bash
npm run test:debug
```

### View HTML test report
```bash
npm run report
```

### Generate test code with Playwright Codegen
```bash
npm run codegen
```

## Test Results

After running tests:
- **HTML Report**: `test-results/report/index.html`
- **Screenshots**: `test-results/screenshots/` (captured at each step)
- **Test Videos**: `test-results/` (recorded on failure)

## Project Structure

```
almashines-automation/
├── package.json              # Project dependencies & scripts
├── playwright.config.js      # Playwright configuration
├── README.md                 # This file
├── PLAN.md                   # Test plan documentation
├── tests/
│   ├── signup-flow.spec.js   # Main test suite
│   └── helpers/
│       └── test-data.js      # Test data generators & utilities
└── test-results/             # Generated test artifacts
    ├── report/               # HTML test report
    └── screenshots/          # Step-by-step screenshots
```

## OTP Handling

Since OTP verification requires access to the email inbox, the test framework:
1. Documents the pre-OTP flow thoroughly (email → name/password)
2. Captures screenshots at every state
3. If OTP input is visible, attempts to fill it (for environments where OTP can be retrieved via API)
4. Logs all observed page states for manual review

For complete E2E automation of OTP, integrate with:
- **Mailinator API** (for `@mailinator.com` test emails)
- **MailSlurper** (for local SMTP testing)
- **Gmail API** (for Gmail-based test accounts)

## Known Limitations / What Was Tried

1. **OTP Retrieval**: Full OTP automation requires email API integration. The test captures the flow up to OTP entry.
2. **Dynamic Selectors**: The app uses AngularJS (as seen in source), so selectors may vary across renders. The test uses flexible pattern matching.
3. **Rate Limiting**: The platform may have rate limits for test accounts. Tests use unique emails per run.
4. **Cross-browser**: Config supports Chromium, Firefox, and WebKit. Chromium is recommended for primary testing.

## Contact

This test suite was created as part of the AlmaShines QA Automation assessment.