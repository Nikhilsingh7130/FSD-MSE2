# Quick Backend Test - One Page Reference

## Start Backend
```powershell
cd backend
npm run dev
```

✅ When you see: `Server running on port 5000` and `MongoDB Connected`

---

## Quick Test Commands

### 1️⃣ Health Check
```powershell
Invoke-WebRequest http://localhost:5000/api/health
```

### 2️⃣ Register
```powershell
$body = @{name="User";email="user@test.com";password="pass123"} | ConvertTo-Json
$r = Invoke-WebRequest http://localhost:5000/api/auth/register -Method POST -Headers @{"Content-Type"="application/json"} -Body $body
$token = ($r.Content | ConvertFrom-Json).token
$token
```

### 3️⃣ Submit Grievance
```powershell
$body = @{title="Test";description="Test";category="Academic"} | ConvertTo-Json
Invoke-WebRequest http://localhost:5000/api/grievances -Method POST -Headers @{"Content-Type"="application/json"; "Authorization"="Bearer $token"} -Body $body
```

### 4️⃣ Get All Grievances
```powershell
Invoke-WebRequest http://localhost:5000/api/grievances -Method GET -Headers @{"Authorization"="Bearer $token"}
```

### 5️⃣ Search
```powershell
Invoke-WebRequest "http://localhost:5000/api/grievances/search?title=Test" -Method GET -Headers @{"Authorization"="Bearer $token"}
```

---

## API Endpoints Reference

| Method | Endpoint | Body | Auth |
|--------|----------|------|------|
| POST | /api/auth/register | name, email, password | ❌ |
| POST | /api/auth/login | email, password | ❌ |
| POST | /api/grievances | title, description, category | ✅ |
| GET | /api/grievances | - | ✅ |
| GET | /api/grievances/:id | - | ✅ |
| GET | /api/grievances/search?title=xyz | - | ✅ |
| PUT | /api/grievances/:id | title, description, category, status | ✅ |
| DELETE | /api/grievances/:id | - | ✅ |

---

## Status Codes

| Code | Meaning |
|------|---------|
| 201 | ✅ Created |
| 200 | ✅ Success |
| 400 | ⚠️ Bad request |
| 401 | ❌ Unauthorized |
| 403 | ❌ Forbidden |
| 404 | ❌ Not found |
| 500 | ❌ Server error |

---

## Automated Test Script

Save as `test.ps1` in backend folder:

```powershell
Write-Host "Testing Backend..." -ForegroundColor Green

# Register
$reg = @{name="T$(Get-Random)";email="t$(Get-Random)@t.com";password="p123"} | ConvertTo-Json
$r1 = (Invoke-WebRequest http://localhost:5000/api/auth/register -Method POST -Headers @{"Content-Type"="application/json"} -Body $reg).Content | ConvertFrom-Json
$token = $r1.token
Write-Host "✓ Registered" -ForegroundColor Green

# Login
$login = @{email=$r1.student.email;password="p123"} | ConvertTo-Json
$r2 = (Invoke-WebRequest http://localhost:5000/api/auth/login -Method POST -Headers @{"Content-Type"="application/json"} -Body $login).Content | ConvertFrom-Json
Write-Host "✓ Logged in" -ForegroundColor Green

# Submit Grievance
$griev = @{title="Test";description="Desc";category="Academic"} | ConvertTo-Json
$r3 = (Invoke-WebRequest http://localhost:5000/api/grievances -Method POST -Headers @{"Content-Type"="application/json";"Authorization"="Bearer $token"} -Body $griev).Content | ConvertFrom-Json
$gid = $r3.grievance._id
Write-Host "✓ Submitted grievance: $gid" -ForegroundColor Green

# Get All
$r4 = (Invoke-WebRequest http://localhost:5000/api/grievances -Method GET -Headers @{"Authorization"="Bearer $token"}).Content | ConvertFrom-Json
Write-Host "✓ Found $($r4.count) grievance(s)" -ForegroundColor Green

# Update
$upd = @{status="Resolved"} | ConvertTo-Json
$r5 = (Invoke-WebRequest http://localhost:5000/api/grievances/$gid -Method PUT -Headers @{"Content-Type"="application/json";"Authorization"="Bearer $token"} -Body $upd).Content | ConvertFrom-Json
Write-Host "✓ Updated to: $($r5.grievance.status)" -ForegroundColor Green

# Delete
Invoke-WebRequest http://localhost:5000/api/grievances/$gid -Method DELETE -Headers @{"Authorization"="Bearer $token"}
Write-Host "✓ Deleted" -ForegroundColor Green

Write-Host "`n✅ All tests passed!" -ForegroundColor Green
```

Run: `powershell -ExecutionPolicy Bypass -File test.ps1`

---

## Postman Collection (Quick Setup)

1. Open Postman
2. Create requests:

**Register:**
- POST: `http://localhost:5000/api/auth/register`
- Body: `{"name":"Test","email":"test@t.com","password":"p123"}`

**Login:**
- POST: `http://localhost:5000/api/auth/login`
- Body: `{"email":"test@t.com","password":"p123"}`
- Save response token as `{{token}}`

**Submit:**
- POST: `http://localhost:5000/api/grievances`
- Headers: `Authorization: Bearer {{token}}`
- Body: `{"title":"Test","description":"Desc","category":"Academic"}`

**Get All:**
- GET: `http://localhost:5000/api/grievances`
- Headers: `Authorization: Bearer {{token}}`

---

## Troubleshooting

**"Connection refused"** → Backend not running  
**"MongoDB connection error"** → Check internet (using MongoDB Atlas)  
**"401 Unauthorized"** → Token missing or invalid  
**"400 Bad request"** → Check request body format  
**"Email already exists"** → Use different email  

---

For detailed testing guide, see: **BACKEND_TESTING.md**
