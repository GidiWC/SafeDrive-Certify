# Security and Privacy Plan for SafeDrive Certify

## Compliance
- Adheres to South Africa's POPIA (Protection of Personal Information Act).
- Data minimization: Only collect necessary data.

## Data Encryption
- In transit: TLS 1.3 for all API calls.
- At rest: AES-256 encryption for database and S3 storage.

## Authentication
- JWT tokens with expiration.
- Biometric login support (fingerprint/face ID).
- Password hashing with bcrypt.

## Authorization
- Role-based access: Drivers, Passengers, Associations.
- API rate limiting to prevent abuse.

## Privacy
- Anonymous reporting: No user ID stored for incidents.
- Data retention: User data deleted after 2 years inactivity; reports after 5 years.
- User consent: Opt-in for data collection.

## Incident Response
- Breach notification within 72 hours.
- Regular security audits and penetration testing.
