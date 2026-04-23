# Student Grievance Management System - Quick Start Guide

## Prerequisites
- Node.js (v14+) - Download from: https://nodejs.org
- npm (comes with Node.js)
- MongoDB - Download from: https://www.mongodb.com/try/download/community

## 📚 Documentation Files

- **SETUP_NO_DOCKER.md** - Complete step-by-step local setup
- **BACKEND_TESTING.md** - Test backend APIs locally (Start here!)
- **README.md** - Full project documentation

## Quick Start in 5 Minutes

### Step 1: Start MongoDB (Choose One Option)

**Option A: Using Local MongoDB Installation**
1. Download MongoDB from: https://www.mongodb.com/try/download/community
2. Install and run MongoDB:
   ```bash
   # On Windows, MongoDB should be installed as a service
   # It automatically starts on port 27017
   # Verify it's running: Open MongoDB Compass or test connection
   ```
3. Or manually start MongoDB:
   ```bash
   # Find mongod executable in installation directory
   mongod --dbpath "C:\data\db"  # Create C:\data\db folder first
   ```

**Option B: Using Docker (Alternative)**
```bash
# From project root directory
docker-compose up -d
```

### Step 2: Start Backend

```bash
cd backend
npm install
npm run dev
```
Backend will run on: http://localhost:5000

### Step 3: Start Frontend (new terminal)

```bash
cd frontend
npm install
npm start
```
Frontend will open on: http://localhost:3000

## First Time Usage

1. **Go to Home Page**: http://localhost:3000
2. **Register**: Click "Get Started" or "Register" button
   - Enter: Name, Email, Password
   - Submit
3. **Dashboard**: You'll be redirected automatically
4. **Submit Grievance**: Click "Submit New Grievance"
   - Fill: Title, Description, Category
   - Submit

## API Testing (Optional)

### Test with curl or Postman

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Submit Grievance (replace TOKEN with actual token):**
```bash
curl -X POST http://localhost:5000/api/grievances \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "title": "Course Material Issue",
    "description": "The course material is not available",
    "category": "Academic"
  }'
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Ensure MongoDB is running locally on port 27017 or see SETUP_NO_DOCKER.md |
| "MongoDB not found" | Download and install from https://www.mongodb.com/try/download/community |
| Port 5000 in use | Kill process or change PORT in backend/.env |
| Port 3000 in use | React will prompt to use different port |
| npm install fails | Delete node_modules and package-lock.json, then reinstall |
| CORS errors | Ensure backend is running and proxy is set in frontend |
| "Cannot find mongosh" | See SETUP_NO_DOCKER.md MongoDB section |

## Project Structure

```
mse2-FSD/
├── backend/          # Node.js + Express server
├── frontend/         # React application
├── docker-compose.yml # MongoDB setup
└── README.md         # Full documentation
```

## Key Features Implemented

✅ Student Registration & Login  
✅ JWT Authentication  
✅ Password Hashing (bcrypt)  
✅ Create/Read/Update/Delete Grievances  
✅ Search Grievances  
✅ Category Filtering  
✅ Status Tracking (Pending/Resolved)  
✅ Protected Routes  
✅ Error Handling  
✅ Responsive UI  

## Development Commands

**Backend:**
```bash
cd backend
npm run dev    # Start development server with nodemon
npm start      # Start production server
```

**Frontend:**
```bash
cd frontend
npm start      # Start development server
npm run build  # Build for production
npm test       # Run tests
```

## Next Steps

1. Customize branding/colors
2. Add email notifications
3. Implement admin panel
4. Add file attachments
5. Set up CI/CD pipeline

## Support

Refer to README.md for detailed documentation.
