# AdFlow Pro - System Architecture & Documentation

## 📋 Project Overview

**AdFlow Pro** is a production-grade sponsored listing marketplace platform built with modern web technologies. It provides a complete solution for managing advertisements through categories, cities, and premium packages with integrated payment processing and analytics.

### Key Features
- ✅ **User Authentication** - Secure JWT-based authentication
- 📦 **Flexible Packages** - Standard, Premium, and Featured tiers
- 🗂️ **Category & City Management** - Organize listings hierarchically
- 💳 **Payment Integration** - Stripe payment processing
- 📊 **Analytics Dashboard** - Real-time performance tracking
- 🛡️ **Moderation System** - Built-in content review workflow
- 👥 **Role-based Access** - Admin, Moderator, and User roles

---

## 🏗️ System Architecture

### Three-Tier Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Layer (Client)                  │
│  Next.js 16 + React 19 + TypeScript + Tailwind CSS          │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP/REST API
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                    API Layer (Server)                       │
│  Express.js + JWT Auth + Sequelize ORM                      │
└──────────────────────────┬──────────────────────────────────┘
                           │ SQL Queries
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                    Data Layer (Database)                    │
│  MySQL + Sequelize Models                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗄️ Database Schema

### Core Tables

#### **users**
```sql
- id (PK, INT)
- username (VARCHAR, UNIQUE)
- email (VARCHAR, UNIQUE)
- password (VARCHAR, hashed)
- role (ENUM: user, admin, moderator)
- profileImage (VARCHAR, nullable)
- createdAt, updatedAt (TIMESTAMPS)
```

#### **ads**
```sql
- id (PK, INT)
- title (VARCHAR)
- description (TEXT)
- image (VARCHAR, nullable)
- images (JSON array)
- price (DECIMAL)
- status (ENUM: pending, approved, rejected, published, archived)
- sponsored (BOOLEAN)
- views (INT, default: 0)
- schedule (DATETIME, nullable)
- expiryDate (DATETIME, nullable)
- publishedAt (DATETIME, nullable)
- userId (FK → users.id)
- categoryId (FK → categories.id)
- cityId (FK → cities.id)
- packageId (FK → packages.id, nullable)
- createdAt, updatedAt (TIMESTAMPS)
```

#### **categories**
```sql
- id (PK, INT)
- name (VARCHAR, UNIQUE)
- slug (VARCHAR, UNIQUE)
- description (TEXT, nullable)
- icon (VARCHAR, nullable)
- createdAt, updatedAt (TIMESTAMPS)
```

#### **cities**
```sql
- id (PK, INT)
- name (VARCHAR, UNIQUE)
- slug (VARCHAR, UNIQUE)
- country (VARCHAR, nullable)
- createdAt, updatedAt (TIMESTAMPS)
```

#### **packages**
```sql
- id (PK, INT)
- name (VARCHAR)
- price (DECIMAL)
- duration (INT, days)
- features (JSON array)
- visibility (ENUM: standard, premium, featured)
- createdAt, updatedAt (TIMESTAMPS)
```

#### **payments**
```sql
- id (PK, INT)
- userId (FK → users.id)
- adId (FK → ads.id, nullable)
- amount (DECIMAL)
- currency (VARCHAR, default: 'USD')
- status (ENUM: pending, completed, failed, refunded)
- transactionId (VARCHAR, nullable)
- paymentMethod (VARCHAR, nullable)
- createdAt, updatedAt (TIMESTAMPS)
```

#### **analytics**
```sql
- id (PK, INT)
- adId (FK → ads.id)
- views (INT, nullable)
- clicks (INT, nullable)
- impressions (INT, nullable)
- conversions (INT, nullable)
- date (DATETIME)
- createdAt, updatedAt (TIMESTAMPS)
```

---

## 🔌 REST API Endpoints

### Authentication Routes
```
POST   /auth/register          Register new user
POST   /auth/login             Login user
```

### Ad Management Routes
```
POST   /ads                    Create new ad (auth required)
GET    /ads                    Get all published ads (with filters)
GET    /ads/:id                Get single ad details
PUT    /ads/:id                Update ad (auth required)
DELETE /ads/:id                Delete ad (auth required)
```

### Category Routes
```
GET    /categories             Get all categories
POST   /categories             Create category (admin only)
```

### City Routes
```
GET    /cities                 Get all cities
POST   /cities                 Create city (admin only)
```

### Package Routes
```
GET    /packages               Get all packages
```

### Analytics Routes
```
GET    /analytics/ad/:adId     Get ad analytics (auth required)
```

### Payment Routes
```
POST   /payments               Initiate payment (auth required)
```

---

## 🎨 Frontend Structure

### Directory Layout
```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Home page
│   │   ├── globals.css             # Global styles
│   │   ├── ad/[id]/page.tsx        # Ad details
│   │   ├── admin/page.tsx          # Admin panel
│   │   ├── dashboard/page.tsx      # User dashboard
│   │   ├── explore/page.tsx        # Explore listings
│   │   ├── analytics/page.tsx      # Analytics
│   │   ├── categories/page.tsx     # Categories
│   │   ├── cities/page.tsx         # Cities
│   │   └── ... other pages
│   ├── components/
│   │   ├── SiteHeader.tsx          # Top navigation
│   │   ├── Footer.tsx              # Footer
│   │   └── ... other components
│   └── contexts/
│       └── AuthContext.tsx         # Auth state management
├── package.json
├── tsconfig.json
├── next.config.ts
└── tailwind.config.ts
```

### Key Technologies
- **Framework:** Next.js 16.2.2
- **UI Library:** React 19.2.4
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **HTTP Client:** Axios
- **Auth:** JWT + jwt-decode

---

## ⚙️ Backend Structure

### Directory Layout
```
backend/
├── server.js                   # Main server file
├── package.json
├── .env                        # Environment configuration
└── uploads/                    # File upload directory
```

### Key Technologies
- **Framework:** Express.js 5.2.1
- **Database ORM:** Sequelize 6.37.3
- **Database:** MySQL 8.0+
- **Authentication:** JWT
- **Password Hashing:** bcryptjs
- **Image Processing:** Sharp
- **File Upload:** Multer
- **Payments:** Stripe
- **Task Scheduling:** Node-cron

---

## 🔐 Authentication & Security

### JWT Implementation
```javascript
// Token Structure
{
  id: user.id,
  email: user.email,
  role: user.role,
  expiresIn: '7d'
}
```

### Protected Routes
All routes requiring authentication check `Authorization: Bearer <token>` header using the `authenticateToken` middleware.

### Password Security
- Passwords hashed with bcryptjs (10 rounds salt)
- Never stored in plain text
- Verified using bcrypt.compare()

---

## 📦 Database Setup

### Prerequisites
- MySQL 8.0 or higher
- Node.js 18+

### Installation Steps

1. **Create MySQL Database**
```sql
CREATE DATABASE adflow_pro;
```

2. **Update .env Configuration**
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=adflow_pro
DB_USER=root
DB_PASSWORD=root
JWT_SECRET=your_secure_key_here
```

3. **Install Dependencies**
```bash
cd backend
npm install
```

4. **Start Backend Server**
```bash
npm run dev
```
Server will automatically sync all models and create tables!

---

## 📊 Database Models & Relationships

### Entity Relationship Diagram

```
                    ┌─────────────┐
                    │    users    │
                    └──────┬──────┘
                           │
                ┌──────────┼──────────┐
                ↓          ↓          ↓
            ┌─────┐    ┌────────┐  ┌──────────┐
            │ads  │←───│  ads   │  │ payments │
            └─────┘    └────────┘  └──────────┘
              ↓ │         ↓
          ┌────────┐  ┌────────────┐
          │category│  │ analytics  │
          └────────┘  └────────────┘
              ↓
          ┌────────┐
          │ cities │
          └────────┘
              ↓
          ┌────────────┐
          │ packages   │
          └────────────┘
```

### Relationships

| Model | Relationship | Target |
|-------|-------------|--------|
| User | 1:N | Ad (user creates many ads) |
| Ad | N:1 | Category (many ads in category) |
| Ad | N:1 | City (many ads in city) |
| Ad | N:1 | Package (many ads use package) |
| Ad | 1:N | Analytics (ad has analytics data) |
| Ad | 1:N | Payment (ad has payments) |
| User | 1:N | Payment (user makes payments) |

---

## 🎯 CRUD Operations

### Ad CRUD Example

**CREATE:**
```bash
POST /ads
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "iPhone 15 Pro",
  "description": "Brand new, sealed box",
  "price": 999.99,
  "categoryId": 1,
  "cityId": 5,
  "packageId": 2
}
```

**READ:**
```bash
GET /ads?categoryId=1&cityId=5&page=1&limit=12
```

**UPDATE:**
```bash
PUT /ads/1
Authorization: Bearer <token>

{
  "title": "iPhone 15 Pro Max",
  "price": 1099.99
}
```

**DELETE:**
```bash
DELETE /ads/1
Authorization: Bearer <token>
```

---

## 🚀 Deployment Checklist

- [ ] Set secure JWT_SECRET in production
- [ ] Configure MySQL with production credentials
- [ ] Enable SSL for all API endpoints
- [ ] Set up proper error logging
- [ ] Configure CORS for production domain
- [ ] Enable rate limiting on API routes
- [ ] Set up backup strategy for MySQL
- [ ] Configure CDN for static assets
- [ ] Set up monitoring and alerting
- [ ] Enable HTTPS everywhere

---

## 📈 Performance Optimization

- **Database Indexing:** Indexes on frequently queried columns
- **Pagination:** Limit API results to 12-50 items per page
- **Caching:** Implement Redis for frequently accessed data
- **Image Optimization:** Sharp for image resizing and compression
- **API Response:** JSON responses gzipped and cached

---

## 🧪 Testing Endpoints

Use Postman/Insomnia to test:

1. **Register User**
```
POST http://localhost:5000/auth/register
```

2. **Login**
```
POST http://localhost:5000/auth/login
```

3. **Get All Ads**
```
GET http://localhost:5000/ads
```

4. **Create Ad**
```
POST http://localhost:5000/ads
(with Bearer token)
```

---

## 📝 Notes

- All timestamps use UTC
- Prices are in decimal format (2 decimal places)
- Images are stored as file paths (can be enhanced with cloud storage)
- Analytics data should be aggregated daily for performance

---

## 📞 Support

For issues or questions, contact the development team or check the FAQ section.

**Version:** 1.0.0  
**Last Updated:** April 2026  
**License:** ISC
