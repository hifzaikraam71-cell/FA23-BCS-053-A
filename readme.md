# 🚀 AdFlow Pro

AdFlow Pro is a full-stack ads management web application built using React, Node.js, Express, and MongoDB.

---

## 🌟 Features

- Create Ads (Title, Description, Image, Category)
- Admin Panel (Approve / Reject Ads)
- Search Ads 🔍
- Filter by Categories 📂
- Modern UI (Glassmorphism Design)

---
# live link
https://adflow-bty8frf6b-nayab376s-projects.vercel.app/

## 🧰 Tech Stack

- Frontend: React.js  
- Backend: Node.js + Express.js  
- Database: MongoDB  
- API Calls: Axios  

---


## 🚀 Getting Started

### Local Development
1. **Install Dependencies**:
   ```bash
   npm run install:all
   ```
2. **Run Both Servers**:
   ```bash
   npm run dev
   ```
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

### ☁️ Vercel Deployment
This project is pre-configured for Vercel. 
1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. Vercel will automatically detect the `frontend` directory and deploy the Next.js app.
4. **Environment Variables**: Add `NEXT_PUBLIC_API_URL` (pointing to your hosted backend) in the Vercel dashboard.

---

## 📁 Project Structure
- `frontend/`: Next.js application (Marketplace UI)
- `backend/`: Express.js server (API & Database)
- `vercel.json`: Vercel configuration
- `package.json`: Root manager for monorepo scripts
