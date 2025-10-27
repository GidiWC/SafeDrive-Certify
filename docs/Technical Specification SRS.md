# Technical Specification / Software Requirements Specification (SRS) for SafeDrive Certify

## Tech Stack
- **Frontend:** React Native with TypeScript, Redux Toolkit for state management.
- **Backend:** Node.js with Express.js.
- **Database:** MongoDB.
- **Authentication:** JWT with biometric support.
- **Hosting:** AWS (EC2, S3, Lambda).
- **Other:** Google Maps API, Firebase for notifications.

## Detailed Feature Breakdown

### 1. Driver Registration and Certification
- **API Endpoints:**
  - `POST /api/v1/drivers/register`: Register driver with name, email, license number.
  - `POST /api/v1/drivers/certify`: Submit course completion, issue badge.
- **Data Models:**
  - Driver: {id, name, email, license_number, certified: boolean, rating: number, incidents: array}
- **Business Logic:** Certification requires passing online quiz; badge revocable on incidents.

### 2. Passenger Ratings
- **API Endpoints:**
  - `POST /api/v1/trips/rate`: Submit rating for trip.
- **Data Models:**
  - Rating: {trip_id, driver_id, passenger_id, score: 1-5, comment, timestamp}
- **Business Logic:** Ratings update driver's public profile score.

### 3. Incident Reporting
- **API Endpoints:**
  - `POST /api/v1/reports/incident`: Submit anonymous report with location, photos.
- **Data Models:**
  - Report: {id, location, photos: array, description, verified: boolean, timestamp}
- **Business Logic:** Reports validated by moderators; false reports flagged.

### 4. Rewards System
- **API Endpoints:**
  - `GET /api/v1/drivers/rewards`: Fetch available rewards.
- **Business Logic:** High-rating drivers (4+ stars, <3 incidents) get perks.

### 5. Association Dashboard
- **API Endpoints:**
  - `GET /api/v1/associations/drivers`: List drivers with stats.
- **Business Logic:** Dashboards show heatmaps of incidents.

## Non-Functional Requirements
- Offline mode: Cache data locally.
- Performance: <2s response times.
- Security: End-to-end encryption for reports.
