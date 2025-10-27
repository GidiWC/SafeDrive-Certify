# Data Model and Database Schema for SafeDrive Certify

## Database: MongoDB

## Collections

### Users
- id: ObjectId
- type: "driver" | "passenger" | "association"
- name: string
- email: string
- password_hash: string
- license_number?: string (for drivers)
- certified: boolean (for drivers)
- rating: number (for drivers)
- association_id?: ObjectId (for drivers)

### Trips
- id: ObjectId
- driver_id: ObjectId
- passenger_id: ObjectId
- start_location: {lat: number, lng: number}
- end_location: {lat: number, lng: number}
- timestamp: Date
- status: "completed" | "ongoing"

### Ratings
- id: ObjectId
- trip_id: ObjectId
- driver_id: ObjectId
- passenger_id: ObjectId
- score: number (1-5)
- comment: string
- timestamp: Date

### IncidentReports
- id: ObjectId
- reporter_id?: ObjectId (anonymous if null)
- location: {lat: number, lng: number}
- photos: [string] (URLs)
- description: string
- verified: boolean
- timestamp: Date

### Rewards
- id: ObjectId
- driver_id: ObjectId
- reward_type: "priority" | "discount" | "badge"
- unlocked_at: Date

## Relationships
- Users (drivers) have many Trips, Ratings, Rewards.
- Trips belong to one Driver and one Passenger.
- Ratings belong to one Trip.
- IncidentReports are standalone but can reference Users if not anonymous.
