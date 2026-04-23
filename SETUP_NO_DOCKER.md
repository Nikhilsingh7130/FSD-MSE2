# Setup Without Docker - Complete Guide

## For Windows Users - No Docker Required

This guide will help you set up the Student Grievance Management System without Docker.

---

## Step 1: Install MongoDB Locally

### Option A: Easiest - MongoDB as a Windows Service

1. **Download MongoDB Community Edition**
   - Go to: https://www.mongodb.com/try/download/community
   - Select "Windows" and download the `.msi` installer
   - Choose the latest stable version (e.g., 7.0+)

2. **Run the Installer**
   - Run the `.msi` file
   - Choose "Complete" installation
   - Check "Install MongoDB as a Service" ✓
   - MongoDB will automatically start on `localhost:27017`
   - Click "Install"

3. **Verify Installation**
   - Open PowerShell and run:
   ```powershell
   mongosh
   ```
   - You should see a MongoDB shell prompt
   - Type `exit` to close

### Option B: Manual Setup - Command Line

1. **Download MongoDB**
   - From: https://www.mongodb.com/try/download/community
   - Extract to a folder (e.g., `C:\MongoDB`)

2. **Create Data Directory**
   ```powershell
   New-Item -ItemType Directory -Path "C:\data\db" -Force
   ```

3. **Start MongoDB**
   ```powershell
   C:\MongoDB\bin\mongod --dbpath "C:\data\db"
   ```
   - Keep this terminal open
   - You'll see: `"waiting for connections on port 27017"`

---

## Step 2: Install Node.js & npm

1. Download from: https://nodejs.org (Latest LTS version)
2. Run the installer and follow prompts
3. Verify installation:
   ```powershell
   node --version
   npm --version
   ```

---

## Step 3: Backend Setup

```powershell
# Navigate to backend
cd "C:\Users\Nikhil Singh\Desktop\mse2-FSD\backend"

# Install dependencies
npm install

# Verify .env file exists
cat .env

# Start backend server
npm run dev

# You should see:
# Server running on port 5000
# MongoDB Connected: 127.0.0.1
```

**Keep this terminal open!**

---

## Step 4: Frontend Setup (New Terminal)

```powershell
# Open NEW PowerShell terminal

# Navigate to frontend
cd "C:\Users\Nikhil Singh\Desktop\mse2-FSD\frontend"

# Install dependencies
npm install

# Start frontend development server
npm start

# React app will automatically open at http://localhost:3000
```

---

## Step 5: Verify Everything Works

1. **Home Page**: http://localhost:3000
   - You should see the landing page with features

2. **Register**: Click "Get Started"
   - Name: Test User
   - Email: test@example.com
   - Password: password123

3. **Dashboard**: You're now logged in!
   - Click "Submit New Grievance"
   - Fill in the form
   - Submit

---

## Running Checklist

Make sure all three are running:

- [ ] MongoDB running (terminal 1 or service)
- [ ] Backend running on port 5000 (terminal 2)
- [ ] Frontend running on port 3000 (terminal 3)

---

## Stopping Services

To stop everything:

1. **MongoDB** (if running as service):
   ```powershell
   # Windows Service (auto-starts)
   # To stop: Services → MongoDB Server → Stop
   ```

2. **MongoDB** (if running manually):
   - Press `Ctrl + C` in the MongoDB terminal

3. **Backend**:
   - Press `Ctrl + C` in the backend terminal

4. **Frontend**:
   - Press `Ctrl + C` in the frontend terminal

---

## Troubleshooting

### MongoDB Connection Error
**Problem**: "Cannot connect to MongoDB"

**Solution**:
```powershell
# Test MongoDB connection
mongosh

# You should see:
# Current Mongosh Log ID: ...
# Connecting to: mongodb://127.0.0.1:27017/

# Type 'exit' to close
exit
```

### Port Already in Use

**Backend (Port 5000)**:
```powershell
# Find process using port 5000
Get-NetTCPConnection -LocalPort 5000

# Kill the process
Stop-Process -Id [PID] -Force
```

**Frontend (Port 3000)**:
- React will ask to use a different port (press `Y`)

### npm install fails

```powershell
# Delete node_modules and package-lock.json
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json -Force

# Reinstall
npm install
```

### "Cannot find mongosh" error

```powershell
# If mongosh is not recognized, MongoDB may not be in PATH
# Try full path:
"C:\Program Files\MongoDB\Server\7.0\bin\mongosh.exe"

# Or add to PATH:
# Windows Settings → Environment Variables → Edit PATH
# Add: C:\Program Files\MongoDB\Server\7.0\bin
```

---

## MongoDB Commands (Optional)

Open MongoDB shell and try these commands:

```powershell
mongosh

# View all databases
show databases

# Switch to grievance_system database
use grievance_system

# View collections
show collections

# View students
db.students.find()

# View grievances
db.grievances.find().pretty()

# Exit
exit
```

---

## File Structure After Setup

```
mse2-FSD/
├── backend/
│   ├── node_modules/      (created by npm install)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── node_modules/      (created by npm install)
│   ├── public/
│   ├── src/
│   └── package.json
└── README.md
```

---

## Development Workflow

### Terminal 1 - MongoDB
```powershell
# Either:
# A) Just verify it's running as service (check Services app)
# B) Or manually start:
mongod --dbpath "C:\data\db"
```

### Terminal 2 - Backend
```powershell
cd mse2-FSD/backend
npm run dev
```

### Terminal 3 - Frontend
```powershell
cd mse2-FSD/frontend
npm start
```

---

## Making Changes

### Backend Changes
- Edit files in `backend/` folders
- Server auto-restarts (nodemon)
- Refresh browser to see changes

### Frontend Changes
- Edit files in `frontend/src/`
- Browser auto-refreshes
- Check terminal for errors

---

## Testing API with curl

```powershell
# Register
$body = @{
    name = "Test User"
    email = "test@test.com"
    password = "password123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/auth/register" `
  -Method POST `
  -Headers @{"Content-Type" = "application/json"} `
  -Body $body
```

---

## Next Steps

1. Customize UI colors/branding
2. Add validation rules
3. Implement admin features
4. Deploy to production
5. Set up email notifications

---

## Support

- **Full Docs**: See README.md
- **Quick Start**: See QUICKSTART.md
- **Issues**: Check troubleshooting section above

---

**You're all set! No Docker required. Just MongoDB, Node.js, and npm.**

Generated: April 2026
