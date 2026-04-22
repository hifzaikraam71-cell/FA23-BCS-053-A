# AdFlow Pro - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- **Node.js** 18+ 
- **MySQL** 8.0+
- **npm** or **yarn**
- **Git**

---

## 📥 Installation

### Step 1: Clone & Navigate
```bash
cd "c:\Users\MCS\Desktop\AdFlow-Pro"
```

### Step 2: Backend Setup

#### A. Create MySQL Database
```sql
-- Open MySQL and run:
CREATE DATABASE adflow_pro;
```

#### B. Install Backend Dependencies
```bash
cd backend
npm install
```

#### C. Configure Environment
Edit `backend/.env`:
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=adflow_pro
DB_USER=root
DB_PASSWORD=root
PORT=5000
JWT_SECRET=your_secure_key_change_in_production
```

#### D. Start Backend Server
```bash
npm run dev
# OR
node server.js
```
✅ Server starts at `http://localhost:5000`

### Step 3: Frontend Setup

#### A. Install Frontend Dependencies
```bash
cd frontend
npm install
```

#### B. Start Development Server
```bash
npm run dev
```
✅ Frontend at `http://localhost:3000`

---

## 🧪 Testing the Application

### Test 1: Check Backend Health
```bash
curl http://localhost:5000
# Expected: {"message": "Backend Working ✅", "status": "online"}
```

### Test 2: Register New User
```bash
POST http://localhost:5000/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

### Test 3: Login User
```bash
POST http://localhost:5000/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
# Get the token from response
```

### Test 4: Create Category (Admin)
```bash
POST http://localhost:5000/categories
Authorization: Bearer {your_token}
Content-Type: application/json

{
  "name": "Electronics",
  "description": "Electronic devices and gadgets"
}
```

### Test 5: Create City (Admin)
```bash
POST http://localhost:5000/cities
Authorization: Bearer {your_token}
Content-Type: application/json

{
  "name": "Karachi",
  "country": "Pakistan"
}
```

### Test 6: Create Ad
```bash
POST http://localhost:5000/ads
Authorization: Bearer {your_token}
Content-Type: application/json

{
  "title": "Samsung Galaxy S24",
  "description": "Latest smartphone with great features",
  "price": 799.99,
  "categoryId": 1,
  "cityId": 1
}
```

### Test 7: Get All Ads
```bash
GET http://localhost:5000/ads
# Shows all published ads with pagination
```

### Test 8: Get Single Ad
```bash
GET http://localhost:5000/ads/1
# Returns detailed ad information and increments view count
```

### Test 9: Update Ad
```bash
PUT http://localhost:5000/ads/1
Authorization: Bearer {your_token}
Content-Type: application/json

{
  "title": "Samsung Galaxy S24 Ultra",
  "price": 899.99
}
```

### Test 10: Delete Ad
```bash
DELETE http://localhost:5000/ads/1
Authorization: Bearer {your_token}
```

---

## 🎨 Frontend Features

### Home Page (`/`)
- Beautiful hero section with gradient backgrounds
- Feature highlights with animations
- Quick access to explore, packages, and support
- Stats section showing platform metrics

### Explore Listings (`/explore`)
- Browse all published advertisements
- Filter by category and city
- Search functionality
- Pagination support
- Ad cards with images and prices

### Dashboard (`/dashboard`)
- View user's created ads
- Ad statistics and views
- Manage listings (edit/delete)
- Payment history

### Admin Panel (`/admin`)
- Manage all ads
- Moderate listings
- View user analytics
- System settings

### Categories (`/categories`)
- Browse all product categories
- View category-specific ads

### Cities (`/cities`)
- Browse all available cities
- View location-specific listings

### Packages (`/packages`)
- View available subscription packages
- Premium tier options
- Feature comparison

---

## 📊 Database Tables Auto-Created

When backend starts, these tables are automatically created:

```
✅ users          - User accounts and profiles
✅ ads            - Advertisements/Listings
✅ categories     - Ad categories
✅ cities         - Locations/Cities
✅ packages       - Premium packages
✅ payments       - Payment transactions
✅ analytics      - Ad performance data
```

---

## 🔑 Sample Test Credentials

After creating a user via registration:
```
Email: test@example.com
Password: password123
```

### Different Roles
- **User:** Can create and manage their own ads
- **Moderator:** Can review and approve pending ads
- **Admin:** Has full access to all operations

---

## 🐛 Troubleshooting

### Error: "MySQL Connection Failed"
```
✓ Check MySQL is running
✓ Verify credentials in .env
✓ Ensure database exists
```

### Error: "Port 5000 already in use"
```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID {PID} /F
```

### Error: "CORS error from frontend"
```
✓ Check backend .env CORS settings
✓ Verify frontend is running on correct port
✓ Restart both servers
```

### Error: "Module not found"
```bash
# Reinstall dependencies
npm install
```

---

## 📦 NPM Scripts

### Backend
```bash
npm install    # Install dependencies
npm run dev    # Start development server
npm start      # Start production server (if configured)
```

### Frontend
```bash
npm install    # Install dependencies
npm run dev    # Start development server
npm run build  # Build for production
npm start      # Start production build
npm run lint   # Run ESLint
```

---

## 🎯 Key Features Implemented

✅ **User Authentication**
- JWT-based secure authentication
- Password hashing with bcryptjs
- Role-based access control

✅ **Ad Management (CRUD)**
- Create new advertisements
- Read/View all ads or specific ad
- Update ad details
- Delete ads

✅ **Database**
- MySQL with Sequelize ORM
- 7 fully normalized tables
- Proper foreign key relationships
- Timestamps on all records

✅ **Beautiful UI**
- Modern gradient designs
- Responsive layout (mobile, tablet, desktop)
- Smooth animations and transitions
- Professional color scheme

✅ **API Features**
- RESTful endpoints
- Pagination support
- Filter capabilities
- Error handling

---

## 📈 What's Next?

After basic testing:
1. ✅ Add more test data (categories, cities, packages)
2. ✅ Test payment integration with Stripe
3. ✅ Try analytics dashboard
4. ✅ Test moderator workflows
5. ✅ Deploy to production

---

## 💡 Commands Quick Reference

```bash
# Backend
cd backend && npm install && npm run dev

# Frontend (new terminal)
cd frontend && npm install && npm run dev

# Test API health
curl http://localhost:5000

# Open in browser
http://localhost:3000        # Frontend
http://localhost:5000        # API
```

---

## 📞 Need Help?

1. Check the ARCHITECTURE.md for detailed documentation
2. Review the API endpoint examples above
3. Check browser console for frontend errors
4. Check terminal logs for backend errors
5. Ensure MySQL is running and credentials are correct

---

**Version:** 1.0.0  
**Created:** April 2026  
**Status:** ✅ Ready for Production
