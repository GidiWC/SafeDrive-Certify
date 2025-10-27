# Test Plan and Quality Assurance (QA) Strategy for SafeDrive Certify

## Test Cases
1. User Registration: Enter valid/invalid data, check success/error.
2. Certification: Complete course, verify badge issuance.
3. Rating Submission: Rate trip, check update in profile.
4. Incident Report: Submit with photo, verify anonymity.
5. Dashboard Access: Login as association, view drivers.

## Testing Types
- **Unit Testing:** Test individual functions (e.g., rating calculation) with Jest.
- **Integration Testing:** Test API calls and database interactions.
- **User Acceptance Testing (UAT):** Beta users test full flows on devices.
- **Performance Testing:** Simulate 1000 concurrent users.
- **Security Testing:** Penetration tests for vulnerabilities.

## QA Process
- Automated tests run on every commit via CI/CD.
- Manual QA for UI/UX before releases.
- Bug tracking with Jira; severity levels: Critical, Major, Minor.
