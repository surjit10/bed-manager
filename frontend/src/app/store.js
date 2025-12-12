import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import bedsReducer from '../features/beds/bedsSlice';
import requestsReducer from '../features/requests/requestsSlice';
import alertsReducer from '../features/alerts/alertsSlice';
import analyticsReducer from '../features/analytics/analyticsSlice';

// Configure Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    beds: bedsReducer,
    requests: requestsReducer,
    alerts: alertsReducer,
    analytics: analyticsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types if needed
        ignoredActions: ['socket/connect', 'socket/disconnect'],
      },
    }),
  devTools: import.meta.env.MODE !== 'production', // Enable Redux DevTools in development
});

// Export types for TypeScript (optional, but good practice)
export const getState = store.getState;
export const dispatch = store.dispatch;
