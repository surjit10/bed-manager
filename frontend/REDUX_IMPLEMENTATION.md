# BedManager - Redux & Socket.IO Integration

## 📦 Implementation Overview

This implementation provides a complete state management and real-time synchronization solution for the BedManager application using Redux Toolkit, Axios, and Socket.IO.

## 🗂️ File Structure

```
frontend/src/
├── app/
│   └── store.js                 # Redux store configuration
├── features/
│   ├── auth/
│   │   └── authSlice.js        # Authentication state management
│   └── beds/
│       └── bedsSlice.js        # Beds state management
├── services/
│   ├── api.js                  # Axios instance with interceptors
│   └── socketService.js        # Socket.IO connection manager
├── context/
│   └── SocketProvider.jsx      # React context for socket lifecycle
└── components/
    └── examples/
        ├── LoginExample.jsx    # Example login component
        └── BedsListExample.jsx # Example beds list component
```

## 🚀 Features Implemented

### 1. **Axios API Service** (`src/services/api.js`)
- ✅ Pre-configured base URL: `http://localhost:5000/api`
- ✅ Automatic JWT token injection in request headers
- ✅ Token retrieved from localStorage
- ✅ Response interceptor for 401 error handling
- ✅ Automatic logout on authentication failure

### 2. **Redux Store** (`src/app/store.js`)
- ✅ Configured with Redux Toolkit
- ✅ Combines auth and beds slices
- ✅ Redux DevTools enabled in development
- ✅ Serializable check middleware configured

### 3. **Auth Slice** (`src/features/auth/authSlice.js`)
- ✅ State: `{ user, token, status, error }`
- ✅ Actions:
  - `login` - Async thunk for user authentication
  - `restoreSession` - Restore auth from localStorage
  - `logout` - Clear user session
  - `clearError` - Clear error messages
- ✅ Selectors:
  - `selectCurrentUser` - Get current user object
  - `selectAuthToken` - Get JWT token
  - `selectAuthStatus` - Get loading status
  - `selectAuthError` - Get error message
  - `selectIsAuthenticated` - Check if user is logged in

### 4. **Beds Slice** (`src/features/beds/bedsSlice.js`)
- ✅ State: `{ bedsList, status, error, updateStatus }`
- ✅ Actions:
  - `fetchBeds` - Async thunk to fetch all beds
  - `updateBedStatus` - Async thunk to update bed status
  - `updateBedInList` - Sync action for socket updates
  - `resetBeds` - Clear beds state
- ✅ Selectors:
  - `selectAllBeds` - Get all beds
  - `selectBedsStatus` - Get loading status
  - `selectBedsByStatus` - Filter beds by status
  - `selectBedById` - Get specific bed
  - `selectBedStats` - Get bed statistics

### 5. **Socket.IO Service** (`src/services/socketService.js`)
- ✅ Connection with JWT authentication
- ✅ Automatic reconnection on disconnect
- ✅ Listens to `bedUpdate` events
- ✅ Dispatches Redux actions on bed updates
- ✅ Connection status management
- ✅ Utility functions:
  - `connectSocket(token, dispatch)`
  - `disconnectSocket()`
  - `getSocket()`
  - `isSocketConnected()`
  - `emitSocketEvent(eventName, data)`

### 6. **Socket Provider** (`src/context/SocketProvider.jsx`)
- ✅ React Context for socket instance
- ✅ Automatic connection on login
- ✅ Automatic disconnection on logout
- ✅ Custom hook: `useSocket()`
- ✅ Lifecycle management

## 📝 Usage Examples

### Login Component

```jsx
import { useDispatch, useSelector } from 'react-redux';
import { login, selectAuthStatus, selectAuthError } from '../features/auth/authSlice';

function LoginComponent() {
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  const handleLogin = async () => {
    try {
      await dispatch(login({ username: 'admin', password: 'password' })).unwrap();
      // Login successful - socket connects automatically
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <button onClick={handleLogin} disabled={status === 'loading'}>
      {status === 'loading' ? 'Logging in...' : 'Login'}
    </button>
  );
}
```

### Beds List Component

```jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBeds, updateBedStatus, selectAllBeds } from '../features/beds/bedsSlice';
import { useSocket } from '../context/SocketProvider';

function BedsList() {
  const dispatch = useDispatch();
  const socket = useSocket();
  const beds = useSelector(selectAllBeds);

  useEffect(() => {
    dispatch(fetchBeds());
  }, [dispatch]);

  const handleUpdateBed = (bedId, status) => {
    dispatch(updateBedStatus({ id: bedId, status }));
  };

  return (
    <div>
      <p>Socket: {socket?.connected ? '🟢 Connected' : '🔴 Disconnected'}</p>
      {beds.map(bed => (
        <div key={bed._id}>
          <p>{bed.bedNumber} - {bed.status}</p>
          <button onClick={() => handleUpdateBed(bed._id, 'occupied')}>
            Mark Occupied
          </button>
        </div>
      ))}
    </div>
  );
}
```

### Logout Component

```jsx
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

function LogoutButton() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    // Socket will disconnect automatically
  };

  return <button onClick={handleLogout}>Logout</button>;
}
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## 🔌 API Endpoints Used

### Authentication
- `POST /auth/login` - User login
  - Body: `{ username, password }`
  - Response: `{ token, user: { id, username } }`

### Beds
- `GET /beds` - Fetch all beds (requires auth)
  - Response: `[{ _id, bedNumber, status, ... }]`
- `PATCH /beds/:id/status` - Update bed status (requires auth)
  - Body: `{ status }`
  - Response: `{ _id, bedNumber, status, ... }`

## 🔄 Socket.IO Events

### Client Listens To:
- `bedUpdate` - Receives updated bed object
  - Payload: `{ _id, bedNumber, status, ... }`

### Connection:
- Authentication via `auth: { token }` in socket config

## 📦 Dependencies

```json
{
  "@reduxjs/toolkit": "^2.0.1",
  "react-redux": "^9.0.4",
  "axios": "^1.6.2",
  "socket.io-client": "^4.5.4"
}
```

## 🎯 Integration Steps

1. ✅ Redux Provider wraps the application in `main.jsx`
2. ✅ SocketProvider wraps inside Redux Provider
3. ✅ Socket connects automatically when user logs in
4. ✅ Socket disconnects automatically when user logs out
5. ✅ All components can access Redux state using hooks
6. ✅ Real-time updates work automatically via socket

## 🧪 Testing the Implementation

### 1. Test Authentication
```javascript
// Login
dispatch(login({ username: 'testuser', password: 'testpass' }));

// Check auth state
const user = useSelector(selectCurrentUser);
const token = useSelector(selectAuthToken);

// Logout
dispatch(logout());
```

### 2. Test Beds Management
```javascript
// Fetch beds
dispatch(fetchBeds());

// Update bed status
dispatch(updateBedStatus({ id: 'bed123', status: 'occupied' }));

// Get all beds
const beds = useSelector(selectAllBeds);

// Get bed statistics
const stats = useSelector(selectBedStats);
```

### 3. Test Socket Connection
```javascript
// Get socket instance
const socket = useSocket();

// Check connection status
console.log('Connected:', socket?.connected);

// Emit custom event
emitSocketEvent('customEvent', { data: 'test' });
```

## 🛡️ Error Handling

### API Errors
- All API calls return rejected promises with error messages
- Errors stored in Redux state (`error` field)
- 401 errors trigger automatic logout

### Socket Errors
- Automatic reconnection on disconnect
- Connection errors logged to console
- Socket status available via `socket?.connected`

## 🔐 Security Features

- ✅ JWT tokens stored in localStorage
- ✅ Automatic token injection in API requests
- ✅ Socket authentication via token
- ✅ Automatic logout on token expiration
- ✅ CORS-ready configuration

## 🚀 Next Steps

1. Create UI components using the example components
2. Add routing (React Router)
3. Add form validation
4. Add loading spinners and error boundaries
5. Add unit tests for slices and services
6. Add TypeScript types (optional)
7. Implement additional features (filters, search, etc.)

## 📚 Additional Resources

- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [Socket.IO Client Docs](https://socket.io/docs/v4/client-api/)
- [Axios Docs](https://axios-http.com/docs/intro)

---

**Implementation by:** Surjit (Frontend Team)  
**Date:** October 2025  
**Status:** ✅ Complete and Production-Ready
