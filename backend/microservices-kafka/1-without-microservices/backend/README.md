# Backend with MongoDB Integration

This backend now includes real MongoDB database operations instead of mock promises.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. MongoDB Setup
Make sure you have MongoDB installed and running locally, or use MongoDB Atlas.

**Local MongoDB:**
- Install MongoDB Community Edition
- Start MongoDB service: `mongod`
- Default connection: `mongodb://localhost:27017/ecommerce`

**MongoDB Atlas:**
- Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Get your connection string
- Set environment variable: `MONGODB_URI=your_atlas_connection_string`

### 3. Environment Variables (Optional)
Create a `.env` file in the backend directory:
```
MONGODB_URI=mongodb://localhost:27017/ecommerce
DB_NAME=ecommerce
NODE_ENV=development
```

### 4. Start the Server
```bash
npm start
# or
node index.js
```

## Database Collections

The application creates the following collections:

- **payments**: Stores payment information
- **orders**: Stores order details
- **emails**: Stores email sending records
- **analytics**: Stores analytics logs

## API Endpoints

- `POST /order`: Create a new order with payment, email, and analytics logging

## Features Added

✅ Real MongoDB connection and operations
✅ Proper error handling
✅ Database collections for payments, orders, emails, and analytics
✅ Graceful server shutdown
✅ Environment variable support
✅ Data validation and structure

## Error Handling

- Database connection errors are logged and handled gracefully
- Individual operation errors are caught and logged
- Analytics errors don't break the main flow
- Graceful shutdown on SIGTERM/SIGINT 