# Backend Testing Guide

## Overview

This guide will help you test the backend API locally before running the full application.

---

## Prerequisites Check

Before testing, verify:
- ✅ Node.js installed: `node --version`
- ✅ npm installed: `npm install` already run
- ✅ Internet connection (MongoDB Atlas is cloud-based)

---

## Step 1: Start the Backend Server

```powershell
cd backend
npm run dev
```

**Expected Output:**
```
[nodemon] 3.0.1
[nodemon] to restart at any time, type `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,json
Server running on port 5000
MongoDB Connected: cluster0.xkt0o4i.mongodb.net
```

✅ **Server is ready for testing!**

---

## Step 2: Test Server Health

### Method 1: Using PowerShell (Built-in)

```powershell
# Test if server is responding
Invoke-WebRequest -Uri "http://localhost:5000/api/health" -Method GET
```

**Expected Response:**
```json
{"message": "Server is running"}
```

### Method 2: Using curl (If installed)

```powershell
curl http://localhost:5000/api/health
```

---

## Step 3: Test Registration API

### Register a Test Student

**PowerShell:**
```powershell
$body = @{
    name = "John Doe"
    email = "john@example.com"
    password = "password123"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:5000/api/auth/register" `
  -Method POST `
  -Headers @{"Content-Type" = "application/json"} `
  -Body $body

$response.Content | ConvertFrom-Json | Format-List
```

**Expected Response:**
```json
{
  "message": "Student registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "student": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

✅ **Registration works!**

---

## Step 4: Test Login API

### Login with Test Student

**PowerShell:**
```powershell
$body = @{
    email = "john@example.com"
    password = "password123"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:5000/api/auth/login" `
  -Method POST `
  -Headers @{"Content-Type" = "application/json"} `
  -Body $body

$result = $response.Content | ConvertFrom-Json
$result | Format-List

# Save token for next requests
$token = $result.token
Write-Host "Token: $token"
```

**Expected Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "student": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

✅ **Login works! Save the token for next tests**

---

## Step 5: Test Grievance APIs

### 5a. Submit a Grievance

**PowerShell:**
```powershell
# Replace TOKEN with actual token from login
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

$body = @{
    title = "Course Material Missing"
    description = "The course materials for CSE 101 are not available"
    category = "Academic"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:5000/api/grievances" `
  -Method POST `
  -Headers @{
    "Content-Type" = "application/json"
    "Authorization" = "Bearer $token"
  } `
  -Body $body

$response.Content | ConvertFrom-Json | Format-List
```

**Expected Response:**
```json
{
  "message": "Grievance submitted successfully",
  "grievance": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Course Material Missing",
    "description": "The course materials for CSE 101 are not available",
    "category": "Academic",
    "status": "Pending",
    "student": "507f1f77bcf86cd799439011",
    "date": "2026-04-23T10:30:00Z"
  }
}
```

✅ **Grievance created!**

### 5b. Get All Grievances

```powershell
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

$response = Invoke-WebRequest -Uri "http://localhost:5000/api/grievances" `
  -Method GET `
  -Headers @{
    "Authorization" = "Bearer $token"
  }

$response.Content | ConvertFrom-Json | Format-List
```

**Expected Response:**
```json
{
  "message": "Grievances retrieved successfully",
  "count": 1,
  "grievances": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Course Material Missing",
      "description": "The course materials for CSE 101 are not available",
      "category": "Academic",
      "status": "Pending",
      "student": "507f1f77bcf86cd799439011",
      "date": "2026-04-23T10:30:00Z"
    }
  ]
}
```

✅ **Grievances retrieved!**

### 5c. Get Grievance by ID

```powershell
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
$grievanceId = "507f1f77bcf86cd799439012"  # From previous response

$response = Invoke-WebRequest -Uri "http://localhost:5000/api/grievances/$grievanceId" `
  -Method GET `
  -Headers @{
    "Authorization" = "Bearer $token"
  }

$response.Content | ConvertFrom-Json | Format-List
```

### 5d. Update Grievance

```powershell
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
$grievanceId = "507f1f77bcf86cd799439012"

$body = @{
    title = "Updated: Course Material Missing"
    description = "Updated description"
    category = "Academic"
    status = "Resolved"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:5000/api/grievances/$grievanceId" `
  -Method PUT `
  -Headers @{
    "Content-Type" = "application/json"
    "Authorization" = "Bearer $token"
  } `
  -Body $body

$response.Content | ConvertFrom-Json | Format-List
```

✅ **Grievance updated!**

### 5e. Search Grievances

```powershell
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

$response = Invoke-WebRequest -Uri "http://localhost:5000/api/grievances/search?title=Course" `
  -Method GET `
  -Headers @{
    "Authorization" = "Bearer $token"
  }

$response.Content | ConvertFrom-Json | Format-List
```

### 5f. Delete Grievance

```powershell
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
$grievanceId = "507f1f77bcf86cd799439012"

$response = Invoke-WebRequest -Uri "http://localhost:5000/api/grievances/$grievanceId" `
  -Method DELETE `
  -Headers @{
    "Authorization" = "Bearer $token"
  }

$response.Content | ConvertFrom-Json | Format-List
```

✅ **Grievance deleted!**

---

## Complete Testing Script

Save this as `test-backend.ps1`:

```powershell
# Backend Testing Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Backend API Testing" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# 1. Health Check
Write-Host "`n1. Testing Server Health..." -ForegroundColor Yellow
$health = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -Method GET
Write-Host "✓ Server is running" -ForegroundColor Green

# 2. Registration
Write-Host "`n2. Testing Registration..." -ForegroundColor Yellow
$regBody = @{
    name = "Test User $(Get-Random)"
    email = "test$(Get-Random)@example.com"
    password = "password123"
} | ConvertTo-Json

$regResponse = Invoke-WebRequest -Uri "http://localhost:5000/api/auth/register" `
  -Method POST `
  -Headers @{"Content-Type" = "application/json"} `
  -Body $regBody

$regResult = $regResponse.Content | ConvertFrom-Json
$token = $regResult.token
$studentId = $regResult.student.id

Write-Host "✓ Registration successful" -ForegroundColor Green
Write-Host "  Email: $($regResult.student.email)" -ForegroundColor Gray
Write-Host "  Token: $($token.Substring(0, 20))..." -ForegroundColor Gray

# 3. Login
Write-Host "`n3. Testing Login..." -ForegroundColor Yellow
$loginBody = @{
    email = $regResult.student.email
    password = "password123"
} | ConvertTo-Json

$loginResponse = Invoke-WebRequest -Uri "http://localhost:5000/api/auth/login" `
  -Method POST `
  -Headers @{"Content-Type" = "application/json"} `
  -Body $loginBody

$loginResult = $loginResponse.Content | ConvertFrom-Json
Write-Host "✓ Login successful" -ForegroundColor Green

# 4. Submit Grievance
Write-Host "`n4. Testing Submit Grievance..." -ForegroundColor Yellow
$grievanceBody = @{
    title = "Test Grievance"
    description = "This is a test grievance for testing purposes"
    category = "Academic"
} | ConvertTo-Json

$grievanceResponse = Invoke-WebRequest -Uri "http://localhost:5000/api/grievances" `
  -Method POST `
  -Headers @{
    "Content-Type" = "application/json"
    "Authorization" = "Bearer $token"
  } `
  -Body $grievanceBody

$grievanceResult = $grievanceResponse.Content | ConvertFrom-Json
$grievanceId = $grievanceResult.grievance._id

Write-Host "✓ Grievance submitted" -ForegroundColor Green
Write-Host "  ID: $grievanceId" -ForegroundColor Gray
Write-Host "  Title: $($grievanceResult.grievance.title)" -ForegroundColor Gray

# 5. Get All Grievances
Write-Host "`n5. Testing Get All Grievances..." -ForegroundColor Yellow
$allResponse = Invoke-WebRequest -Uri "http://localhost:5000/api/grievances" `
  -Method GET `
  -Headers @{"Authorization" = "Bearer $token"}

$allResult = $allResponse.Content | ConvertFrom-Json
Write-Host "✓ Retrieved $($allResult.count) grievance(s)" -ForegroundColor Green

# 6. Update Grievance
Write-Host "`n6. Testing Update Grievance..." -ForegroundColor Yellow
$updateBody = @{
    status = "Resolved"
} | ConvertTo-Json

$updateResponse = Invoke-WebRequest -Uri "http://localhost:5000/api/grievances/$grievanceId" `
  -Method PUT `
  -Headers @{
    "Content-Type" = "application/json"
    "Authorization" = "Bearer $token"
  } `
  -Body $updateBody

Write-Host "✓ Grievance updated to Resolved" -ForegroundColor Green

# 7. Search Grievances
Write-Host "`n7. Testing Search Grievances..." -ForegroundColor Yellow
$searchResponse = Invoke-WebRequest -Uri "http://localhost:5000/api/grievances/search?title=Test" `
  -Method GET `
  -Headers @{"Authorization" = "Bearer $token"}

$searchResult = $searchResponse.Content | ConvertFrom-Json
Write-Host "✓ Search found $($searchResult.count) grievance(s)" -ForegroundColor Green

# 8. Delete Grievance
Write-Host "`n8. Testing Delete Grievance..." -ForegroundColor Yellow
$deleteResponse = Invoke-WebRequest -Uri "http://localhost:5000/api/grievances/$grievanceId" `
  -Method DELETE `
  -Headers @{"Authorization" = "Bearer $token"}

Write-Host "✓ Grievance deleted" -ForegroundColor Green

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "✓ All Tests Passed!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
```

### Run the Script

```powershell
# Navigate to backend folder
cd "C:\Users\Nikhil Singh\Desktop\mse2-FSD\backend"

# Run the test script
powershell -ExecutionPolicy Bypass -File ..\test-backend.ps1
```

---

## Using Postman (GUI Alternative)

1. **Download Postman**: https://www.postman.com/downloads/
2. **Import Collection** or create requests manually:

**Register Request:**
- Method: `POST`
- URL: `http://localhost:5000/api/auth/register`
- Body (JSON):
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

**Login Request:**
- Method: `POST`
- URL: `http://localhost:5000/api/auth/login`
- Body (JSON):
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

**Submit Grievance Request:**
- Method: `POST`
- URL: `http://localhost:5000/api/grievances`
- Headers: `Authorization: Bearer {TOKEN}`
- Body (JSON):
  ```json
  {
    "title": "Course Material Missing",
    "description": "The course materials are not available",
    "category": "Academic"
  }
  ```

---

## Error Responses

### Duplicate Email
**Status**: 400
```json
{"message": "Email already registered"}
```

### Invalid Login
**Status**: 401
```json
{"message": "Invalid email or password"}
```

### Unauthorized Access
**Status**: 403
```json
{"message": "Unauthorized access"}
```

### No Token
**Status**: 401
```json
{"message": "No token, authorization denied"}
```

### Grievance Not Found
**Status**: 404
```json
{"message": "Grievance not found"}
```

---

## Verification Checklist

- [ ] Server starts without errors
- [ ] Health endpoint responds
- [ ] Can register new student
- [ ] Can login with credentials
- [ ] Can submit grievance
- [ ] Can view all grievances
- [ ] Can search grievances
- [ ] Can update grievance
- [ ] Can delete grievance
- [ ] JWT token validation works
- [ ] Authorization checks work

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot connect to MongoDB" | Check internet connection, MongoDB Atlas credentials |
| "Port 5000 already in use" | Kill process: `Get-NetTCPConnection -LocalPort 5000` → `Stop-Process` |
| "Authorization denied" | Ensure token is included in Authorization header |
| "Email already registered" | Use different email or test email |
| "Cannot find nodemon" | Run `npm install` in backend folder |
| "Invalid token" | Generate new token from login endpoint |

---

## Next: Test Frontend

Once backend is working:
1. Start frontend: `cd frontend && npm start`
2. Register and login via UI
3. Submit grievances through dashboard
4. Verify all features work

**Backend is the foundation - test it first!** ✅
