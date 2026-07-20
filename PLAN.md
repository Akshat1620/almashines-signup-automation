# Automation Test Plan: AlmaShines Sign Up Flow

## Tool Selected: Playwright (JavaScript)
- Modern, reliable, cross-browser
- Auto-waiting, network interception, built-in test runner
- Easy to set up and run

## Test Scenarios to Automate

### 1. Happy Path - Successful Sign Up
- Land on signup page
- Enter a new email
- Fill name & password
- Enter OTP (since OTP is sent to email, we simulate entering OTP)
- Choose role (Alumni/Student/Staff)
- Fill association details
- Accept terms
- Submit

### 2. Existing Email Flow
- Enter an already-registered email
- Verify user is prompted to login instead

### 3. Validation Tests
- Invalid email format
- Empty email field
- Password too short (< 8 chars)
- Password mismatch
- Empty name field
- Terms not accepted

### 4. Edge Cases
- Very long email
- Special characters in name
- Multiple rapid submissions

## Project Structure
```
almashines-automation/
├── package.json
├── playwright.config.js
├── README.md
├── test-results/
├── tests/
│   ├── signup-flow.spec.js    # Main test file
│   └── helpers/
│       └── test-data.js       # Test data and utilities
```

## What to Automate (and Why)

| Scenario | Priority | Reason |
|----------|----------|--------|
| Happy path signup | High | Core user journey |
| Existing email redirect | High | Critical UX flow |
| Email validation | High | Data quality |
| Password validation | Medium | Security requirement |
| Required field checks | Medium | UX completeness |
| OTP verification flow | High | Critical auth step |
| Terms acceptance | Medium | Legal compliance |