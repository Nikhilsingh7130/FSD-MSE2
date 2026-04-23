# Student Grievance Management System - MERN Stack

A complete web-based Student Grievance Management System built using the MERN stack (MongoDB, Express, React, Node.js).

## Features

### Authentication
- Student registration with email validation
- Secure login with JWT tokens
- Password hashing using bcrypt
- Protected routes for authenticated users

### Grievance Management
- **Submit Grievances**: Submit new grievances with title, description, and category
- **View Grievances**: See all submitted grievances with details
- **Edit Grievances**: Update grievance information and status
- **Delete Grievances**: Remove grievances as needed
- **Search Grievances**: Search grievances by title
- **Categorization**: Grievances can be categorized as:
  - Academic
  - Hostel
  - Transport
  - Other
- **Status Tracking**: Track grievance status (Pending/Resolved)

## Project Structure

```
mse2-FSD/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── grievanceController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Student.js
│   │   └── Grievance.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── grievances.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   ├── Dashboard.css
│   │   │   ├── LoginForm.js
│   │   │   ├── RegistrationForm.js
│   │   │   ├── AuthForms.css
│   │   │   └── ProtectedRoute.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   └── Home.css
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── auth.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── public/
├── docker-compose.yml
└── README.md
```

## Tech Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variables

### Frontend
- **React**: UI library
- **React Router**: Navigation
- **Axios**: HTTP client
- **CSS**: Styling

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (Community Edition) - Download from: https://www.mongodb.com/try/download/community
- Git (optional)

## Installation & Setup

### 1. Clone or Download the Project

```bash
cd mse2-FSD
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file (already provided)
# Verify MONGODB_URI and JWT_SECRET in .env

# Start MongoDB (choose one option)

# Option A: Using Local MongoDB (Recommended for development)
#   1. Download from: https://www.mongodb.com/try/download/community
#   2. Install MongoDB
#   3. MongoDB automatically runs on localhost:27017 after installation
#   4. OR manually start: mongod --dbpath "C:\data\db"

# Option B: Using Docker Compose
#   cd ..
#   docker-compose up -d
#   cd backend

# Start the backend server
npm run dev
# Server will run on http://localhost:5000
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file from example
copy .env.example .env
# or
cp .env.example .env

# Start the React development server
npm start
# Application will open on http://localhost:3000
```

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register a new student
- `POST /api/auth/login` - Login a student

### Grievance Routes (All require authentication)
- `POST /api/grievances` - Submit a new grievance
- `GET /api/grievances` - Get all grievances of logged-in student
- `GET /api/grievances/:id` - Get a specific grievance by ID
- `PUT /api/grievances/:id` - Update a grievance
- `DELETE /api/grievances/:id` - Delete a grievance
- `GET /api/grievances/search?title=xyz` - Search grievances by title

## Database Schema

### Student Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Grievance Model
```javascript
{
  title: String (required, max 100),
  description: String (required, max 1000),
  category: String (enum: 'Academic', 'Hostel', 'Transport', 'Other'),
  status: String (enum: 'Pending', 'Resolved', default: 'Pending'),
  student: ObjectId (reference to Student),
  date: Date (default: current date),
  createdAt: Date,
  updatedAt: Date
}
```

## Usage

### Registration
1. Navigate to the registration page
2. Fill in name, email, and password
3. Submit the form
4. You will be automatically logged in and redirected to the dashboard

### Login
1. Navigate to the login page
2. Enter your email and password
3. Submit the form
4. You will be redirected to the dashboard

### Dashboard
1. **Submit Grievance**: Click "Submit New Grievance", fill in the form, and submit
2. **View Grievances**: See all your grievances displayed as cards
3. **Search Grievances**: Use the search bar to find grievances by title
4. **Edit Grievance**: Click the "Edit" button on a grievance card
5. **Delete Grievance**: Click the "Delete" button (confirmation required)
6. **Logout**: Click the "Logout" button in the header

## Error Handling

The application handles various errors:
- **Duplicate Email**: Prevents registration with already registered email
- **Invalid Credentials**: Shows error on failed login
- **Unauthorized Access**: Prevents access to other users' grievances
- **Missing Fields**: Validates all required fields
- **Not Found**: Returns 404 for non-existent grievances

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Protected routes requiring authentication
- Authorization checks to prevent unauthorized access
- CORS enabled for development

## Running in Production

### Backend
1. Update `.env` with production MongoDB URI and JWT secret
2. Install production dependencies: `npm install --production`
3. Run: `NODE_ENV=production node server.js`

### Frontend
1. Build the optimized bundle: `npm run build`
2. Deploy the `build` folder to a static hosting service

## Docker Setup (Optional)

To run MongoDB with Docker (if Docker is installed):

```bash
# Start MongoDB container
docker-compose up -d

# To stop MongoDB
docker-compose down

# To view logs
docker-compose logs -f mongodb
```

## Local MongoDB Setup (Without Docker)

1. **Download MongoDB Community Edition**
   - Visit: https://www.mongodb.com/try/download/community
   - Download for Windows (latest version)

2. **Install MongoDB**
   - Run the installer
   - Choose "Install MongoDB as a Service" (recommended)
   - MongoDB will automatically start on `localhost:27017`

3. **Verify Installation**
   - Download MongoDB Compass: https://www.mongodb.com/products/compass
   - Open Compass and connect to `localhost:27017`
   - You should see it connects successfully

4. **Optional: Manual Start**
   - If not running as a service, start manually:
   ```bash
   mongod --dbpath "C:\data\db"
   ```
   - Create `C:\data\db` folder first if it doesn't exist

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in `.env`
- Verify MongoDB is accessible on localhost:27017

### CORS Error
- Ensure backend server is running
- Check proxy setting in frontend `package.json`
- Verify REACT_APP_API_URL in frontend `.env`

### Authentication Issues
- Clear browser local storage if JWT is corrupted
- Ensure JWT_SECRET is set in backend `.env`
- Check token expiration (set to 7 days)

### Port Already in Use
- Backend uses port 5000, Frontend uses port 3000
- Change ports if needed in environment or package.json

## Contributing

Feel free to contribute to this project by submitting issues or pull requests.

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please refer to the documentation or contact the development team.
