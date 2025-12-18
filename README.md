# Hospital Bed Manager

<div align="center">

![Bed Manager Logo](./frontend/public/bed-manager-favicon.png)

**A Real-Time Hospital Bed Management System with Predictive Analytics**

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.19.1-brightgreen.svg)](https://www.mongodb.com/)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-ML_Service-009688.svg)](https://fastapi.tiangolo.com/)

[Features](#features) • [Demo](#demo) • [Installation](#installation) • [Tech Stack](#tech-stack) • [Architecture](#architecture)

</div>

---

## Overview

**Hospital Bed Manager** is a comprehensive full-stack application designed to revolutionize hospital bed management through real-time monitoring, intelligent resource allocation, and predictive analytics. The system helps healthcare facilities optimize bed utilization, reduce patient wait times, and improve overall hospital efficiency.

### Key Highlights

- **Real-Time Monitoring**: Live bed status updates across all wards and hospitals
- **Smart Alerts**: Automated notifications for occupancy thresholds and critical situations
- **Emergency Transfers**: Quick referral system for transferring patients between hospitals
- **Predictive Analytics**: ML-powered predictions for discharge times and bed availability
- **Role-Based Access**: Multi-tier user system (Admin, Hospital Staff, Healthcare Worker)
- **Advanced Reporting**: Comprehensive analytics with PDF export capabilities
- **WebSocket Integration**: Real-time bidirectional communication for instant updates

---

## Features

### Authentication & Authorization
- Secure JWT-based authentication
- Role-based access control (Admin, Hospital Staff, Healthcare Worker)
- Profile management with photo upload
- Protected routes and API endpoints

### Bed Management
- Real-time bed status tracking (Available, Occupied, Cleaning, Maintenance)
- Comprehensive bed information (ward, type, features)
- Quick status updates and history logging
- Occupancy and cleaning logs with timestamps

### Smart Alerting System
- Automated alerts for high occupancy (>80%)
- Critical capacity warnings (>95%)
- Low occupancy notifications (<30%)
- Real-time WebSocket-based alert delivery
- Alert acknowledgment and history

### Emergency Referral Network
- Quick patient transfer requests between hospitals
- Nearby hospital discovery with distance calculation
- Priority-based request handling
- Status tracking (Pending, Accepted, Rejected, Completed)

### Analytics & Reporting
- Ward-wise occupancy statistics
- Bed utilization trends and patterns
- Average cleaning duration analysis
- Bed availability forecasts
- PDF report generation with charts
- Scheduled email reports

### Machine Learning Predictions
- **Discharge Time Prediction**: Estimate when patients will be discharged
- **Bed Availability Forecasting**: Predict available beds in next N hours
- **Cleaning Duration Estimation**: Optimize housekeeping resource allocation
- Model training with synthetic data generation

### Modern User Interface
- Responsive design for all devices
- Interactive dashboards with real-time updates
- Beautiful UI components (Radix UI + Tailwind CSS)
- Smooth animations (Framer Motion + GSAP)
- Dark mode support

---

## Demo

### System Architecture

![Solution Diagram](./img/Solution%20Diagram.jpeg)

*Comprehensive system architecture showing the interaction between frontend, backend, ML service, and database layers*

### Administrator Dashboard

![Admin Dashboard](./img/admin%20dashboard.png)

*Full administrative control panel with system-wide analytics, user management, and hospital network overview*

### Hospital Administrator Dashboard

![Hospital Administrator Dashboard](./img/Hospital%20Administrator%20Dashboard.png)

*Hospital-level management interface for bed allocation, ward monitoring, and resource optimization*

### Manager Dashboard

![Manager Dashboard](./img/Manager%20Dashboard.png)

*Operational management view with real-time occupancy tracking and staff coordination tools*

### Ward Staff Dashboard

![Ward Staff Dashboard](./img/Ward%20Staff%20Dashboard.png)

*Ward-level interface for bed status updates, patient admissions, and cleaning management*

### Emergency Room Staff Dashboard

![ER Staff Dashboard](./img/ER%20Staff%20Dashboard.jpeg)

*Emergency department interface for critical bed availability and rapid patient placement*

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Layer                           │
│  React 19 + Redux Toolkit + Socket.io-client + Vite       │
└───────────────────┬─────────────────────────────────────────┘
                    │ HTTP/REST + WebSocket
┌───────────────────▼─────────────────────────────────────────┐
│                   Backend API Server                        │
│     Node.js + Express + Socket.io + JWT Auth               │
│  ┌─────────────┬──────────────┬──────────────────────┐    │
│  │ Controllers │  Middleware  │      Services        │    │
│  │   (Routes)  │ (Auth/Guard) │ (Email/Scheduler)    │    │
│  └─────────────┴──────────────┴──────────────────────┘    │
└───────────────────┬────────────────────┬────────────────────┘
                    │                    │
         ┌──────────▼─────────┐  ┌──────▼──────────┐
         │   MongoDB Atlas    │  │   ML Service    │
         │  (Database Layer)  │  │ FastAPI+Python  │
         │ ┌───────────────┐ │  │  ┌───────────┐  │
         │ │ Users/Beds    │ │  │  │  Trained  │  │
         │ │ Hospitals     │ │  │  │  Models   │  │
         │ │ Alerts/Logs   │ │  │  │ (.pkl)    │  │
         │ └───────────────┘ │  │  └───────────┘  │
         └───────────────────┘  └─────────────────┘
```

### Component Architecture

**Frontend (React + Redux)**
- **State Management**: Redux Toolkit for global state
- **Routing**: React Router v7 for navigation
- **Real-time**: Socket.io-client for WebSocket connections
- **Styling**: Tailwind CSS + Radix UI components
- **Animations**: Framer Motion + GSAP

**Backend (Node.js + Express)**
- **API Framework**: Express 5 with async/await
- **Authentication**: JWT with bcrypt password hashing
- **Real-time**: Socket.io for bidirectional events
- **Validation**: Express-validator for input sanitization
- **File Upload**: Multer for profile pictures
- **Scheduling**: Node-cron for automated tasks

**ML Service (Python + FastAPI)**
- **Framework**: FastAPI with Pydantic schemas
- **Models**: Scikit-learn for predictions
- **Training**: Automated model training scripts
- **Persistence**: Pickle for model serialization

**Database (MongoDB)**
- **ODM**: Mongoose for schema modeling
- **Collections**: Users, Hospitals, Beds, Alerts, Logs
- **Indexing**: Optimized queries with compound indexes
- **Relations**: Referenced documents with population

---

## Tech Stack

### Frontend
- **React 19.1.1** - UI library with latest features
- **Redux Toolkit 2.9.1** - State management
- **React Router 7.9.4** - Client-side routing
- **Vite** - Lightning-fast build tool
- **Tailwind CSS 4.1.14** - Utility-first CSS
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **GSAP** - Advanced animations
- **Axios** - HTTP client
- **Socket.io-client** - WebSocket client
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express 5.1.0** - Web framework
- **MongoDB 8.19.1** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Socket.io 4.8.1** - Real-time engine
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Node-cron** - Task scheduling
- **Nodemailer** - Email service
- **Puppeteer** - PDF generation
- **Express-validator** - Input validation

### ML Service
- **Python 3.8+** - Programming language
- **FastAPI** - Modern Python web framework
- **Scikit-learn** - Machine learning library
- **Pandas** - Data manipulation
- **NumPy** - Numerical computing
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

### DevOps & Tools
- **Git** - Version control
- **npm/yarn** - Package management
- **pip** - Python package installer
- **Nodemon** - Development auto-reload
- **ESLint** - Code linting
- **dotenv** - Environment variables

---

## Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or higher)
- **Python** (v3.8 or higher)
- **MongoDB** (local instance or MongoDB Atlas)
- **npm** or **yarn**
- **Git**

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/hospital-bed-manager.git
cd hospital-bed-manager
```

### Step 2: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
# Required variables:
# - MONGO_URI (your MongoDB connection string)
# - JWT_SECRET (a secure random string)
# - PORT (default: 5001)
```

**Example `.env` file:**
```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/bedmanager
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=development
ML_SERVICE_URL=http://localhost:8000
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

**Seed the database (optional):**
```bash
# Seed hospitals
node seedHospitals.js

# Seed beds
node seedBeds.js

# Generate synthetic data for testing
node generateSyntheticData.js
```

**Start the backend:**
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Backend should now be running at `http://localhost:5001`

### Step 3: Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend should now be running at `http://localhost:5173`

### Step 4: ML Service Setup

```bash
cd ../ml-service

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Train models (first time only)
python train/train_discharge.py
python train/train_bed_availability.py
python train/train_cleaning_duration.py

# Start the ML service
uvicorn main:app --host 0.0.0.0 --port 8000
```

ML Service should now be running at `http://localhost:8000`

### Step 5: Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5001/api/health
- **ML Service**: http://localhost:8000/health
- **API Docs**: http://localhost:8000/docs

### Default Login Credentials

After seeding the database, you can use these default credentials:

**Admin:**
- Email: admin@hospital.com
- Password: admin123

**Hospital Staff:**
- Email: staff@hospital.com
- Password: staff123

**Healthcare Worker:**
- Email: worker@hospital.com
- Password: worker123

---

## Usage Guide

### For Administrators

1. **Manage Hospitals**: Add, update, or remove hospitals from the network
2. **View Analytics**: Access comprehensive reports and analytics
3. **Monitor Alerts**: Review system-wide alerts and notifications
4. **Generate Reports**: Create and schedule automated reports

### For Hospital Staff

1. **Manage Beds**: Update bed statuses, add new beds, manage ward information
2. **Handle Referrals**: Accept or reject incoming patient transfer requests
3. **View Ward Statistics**: Monitor occupancy rates and bed availability
4. **Track Cleaning**: Log cleaning activities and durations

### For Healthcare Workers

1. **Check Bed Availability**: View real-time bed status across hospitals
2. **Request Transfers**: Submit emergency referral requests
3. **View Notifications**: Stay updated with real-time alerts
4. **Access Patient Information**: View bed-specific details and features

---

## API Documentation

### Authentication Endpoints

```http
POST /api/auth/register - Register new user
POST /api/auth/login - User login
GET /api/auth/me - Get current user
```

### Bed Management

```http
GET /api/beds - Get all beds (with filters)
GET /api/beds/:id - Get single bed
POST /api/beds - Create new bed
PUT /api/beds/:id - Update bed
DELETE /api/beds/:id - Delete bed
PATCH /api/beds/:id/status - Update bed status
```

### Hospital Management

```http
GET /api/hospitals - Get all hospitals
GET /api/hospitals/:id - Get single hospital
POST /api/hospitals - Create hospital
PUT /api/hospitals/:id - Update hospital
DELETE /api/hospitals/:id - Delete hospital
```

### Emergency Referrals

```http
GET /api/emergency-requests - Get all requests
POST /api/emergency-requests - Create request
PUT /api/emergency-requests/:id - Update request
GET /api/emergency-requests/nearby - Find nearby hospitals
```

### Alerts & Analytics

```http
GET /api/alerts - Get alerts
POST /api/alerts/:id/acknowledge - Acknowledge alert
GET /api/analytics/occupancy - Get occupancy stats
GET /api/analytics/trends - Get trend data
POST /api/reports/generate - Generate PDF report
```

### ML Predictions

```http
POST /api/ml/predict/discharge - Predict discharge time
POST /api/ml/predict/bed-availability - Predict bed availability
POST /api/ml/predict/cleaning-duration - Predict cleaning time
```

For complete API documentation, visit `/api/docs` when the backend is running.

---

## WebSocket Events

### Client → Server

```javascript
// Join hospital room
socket.emit('joinHospital', { hospitalId: '123' });

// Update bed status
socket.emit('bedStatusUpdate', { bedId: '456', status: 'occupied' });

// Send alert
socket.emit('sendAlert', { type: 'high_occupancy', message: '...' });
```

### Server → Client

```javascript
// Bed status changed
socket.on('bedStatusChanged', (data) => { ... });

// New alert
socket.on('newAlert', (alert) => { ... });

// Occupancy update
socket.on('occupancyUpdate', (stats) => { ... });

// Emergency request
socket.on('emergencyRequest', (request) => { ... });
```

---

## Testing

### Backend Tests

```bash
cd backend

# Run validation scripts
npm run check:logs
npm run check:cleaning

# Test specific functionality
node testOccupancyAlert.js
node test-puppeteer.js
```

### ML Service Tests

```bash
cd ml-service

# Test ML integration
bash test_ml_integration.sh

# Test individual predictions
python -m pytest tests/
```

### Frontend Tests

```bash
cd frontend

# Run linting
npm run lint

# Build for production (validates code)
npm run build
```

---

## Project Structure

```
hospital-bed-manager/
│
├── backend/                    # Node.js backend
│   ├── config/                # Database configuration
│   ├── controllers/           # Route controllers
│   ├── middleware/            # Custom middleware
│   ├── models/                # Mongoose models
│   ├── routes/                # API routes
│   ├── services/              # Business logic
│   ├── uploads/               # User uploads (profiles)
│   ├── server.js              # Entry point
│   └── package.json
│
├── frontend/                   # React frontend
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── app/              # Redux store
│   │   ├── assets/           # Images, icons
│   │   ├── components/       # React components
│   │   ├── context/          # React context
│   │   ├── pages/            # Page components
│   │   ├── utils/            # Helper functions
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Entry point
│   ├── vite.config.js
│   └── package.json
│
├── ml-service/                # Python ML service
│   ├── models/               # Trained models (.pkl)
│   ├── routes/               # FastAPI routes
│   ├── train/                # Training scripts
│   ├── utils/                # Helper functions
│   ├── main.py               # FastAPI app
│   ├── config.py             # Configuration
│   └── requirements.txt
│
├── docs/                      # Documentation
│   └── screenshots/          # UI screenshots
│
├── HOW_TO_RUN.md             # Setup guide
└── README.md                 # This file
```

---

## Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Write clear, descriptive commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## Troubleshooting

### MongoDB Connection Issues

```bash
# Check if MongoDB is running
mongod --version

# For local MongoDB, ensure the service is started
# Windows: services.msc → MongoDB Server
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Port Already in Use

```bash
# Find process using the port
# Windows:
netstat -ano | findstr :5001
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :5001
kill -9 <PID>
```

### ML Service Not Starting

```bash
# Ensure virtual environment is activated
# Re-install dependencies
pip install --upgrade -r requirements.txt

# Check Python version
python --version  # Should be 3.8+
```

### Frontend Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
```

---

## Contact

**Developer**: Surjit mandal

- GitHub: [@surjit10](https://github.com/surjit10)

**Project Repository**: [https://github.com/surjit10/bed-manager](https://github.com/surjit10/bed-manager)

---

<div align="center">

**Made for Healthcare Excellence**

Star this repository if you find it helpful!

</div>
