import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthToken, selectIsAuthenticated } from '../features/auth/authSlice';
import { connectSocket, disconnectSocket, getSocket } from '../services/socketService';

// Create Socket Context
const SocketContext = createContext(null);

/**
 * Custom hook to access socket instance
 * @returns {Socket|null} socket instance
 */
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

/**
 * Socket Provider Component
 * Manages socket lifecycle based on authentication state
 */
export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const token = useSelector(selectAuthToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const socketRef = useRef(null);

  useEffect(() => {
    // Get token from Redux or fallback to localStorage
    const localToken = localStorage.getItem('authToken');
    const actualToken = token || (localToken !== 'undefined' && localToken !== 'null' ? localToken : null);
    
    console.log('🔍 SocketProvider state:', {
      isAuthenticated,
      hasReduxToken: !!token,
      hasLocalStorageToken: !!localStorage.getItem('authToken'),
      localTokenValue: localToken,
      actualToken: actualToken ? `${actualToken.substring(0, 20)}...` : 'none'
    });
    
    // Connect socket when user is authenticated and has valid token
    if (isAuthenticated && actualToken) {
      console.log('🔌 Initializing socket connection...');
      socketRef.current = connectSocket(actualToken, dispatch);
    } else {
      // Disconnect socket when user logs out or no valid token
      if (socketRef.current) {
        console.log('🔌 User logged out, disconnecting socket...');
        disconnectSocket();
        socketRef.current = null;
      }
    }

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        disconnectSocket();
        socketRef.current = null;
      }
    };
  }, [isAuthenticated, token, dispatch]);

  // Provide socket instance through context
  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
