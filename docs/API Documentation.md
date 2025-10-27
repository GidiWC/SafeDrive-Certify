# API Documentation for SafeDrive Certify

## Base URL
`https://api.safedrivecertify.co.za/v1`

## Authentication
All requests require JWT token in header: `Authorization: Bearer <token>`

## Endpoints

### Driver Registration
- **POST** `/drivers/register`
  - Params: `{name, email, license_number, password}`
  - Response: `{driver_id, message: "Registered successfully"}`

### Certification
- **POST** `/drivers/certify`
  - Params: `{driver_id, course_score}`
  - Response: `{certified: true, badge_url}`

### Submit Rating
- **POST** `/trips/rate`
  - Params: `{trip_id, rating: 1-5, comment}`
  - Response: `{status: "success"}`

### Report Incident
- **POST** `/reports/incident`
  - Params: `{location: {lat, lng}, photos: [urls], description, anonymous: true}`
  - Response: `{report_id, status: "submitted"}`

### Get Rewards
- **GET** `/drivers/rewards/{driver_id}`
  - Response: `[{reward_name, unlocked: true}]`

### Association Dashboard
- **GET** `/associations/drivers`
  - Params: `{association_id}`
  - Response: `[{driver_id, rating, incidents_count}]`

## Error Responses
- 400: Bad Request - `{error: "Invalid params"}`
- 401: Unauthorized - `{error: "Invalid token"}`
- 500: Server Error - `{error: "Internal error"}`
