// Real-time data hook with WebSocket and fallback mechanism
// Handles WebSocket connection and JSON file fallback

"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useNotifications } from '@/contexts/NotificationContext';

export interface SecurityData {
  type?: string;
  person_name: string;
  person_id: string;
  age: string;
  legal_case: string;
  score: string;
  node_id: string;
  timestamp: string;
  server_timestamp?: string;
  match_id?: string;
}

interface RealTimeDataState {
  connected: boolean;
  data: SecurityData[];
  loading: boolean;
  error: string | null;
  lastUpdate: string | null;
  connectionType: 'websocket' | 'fallback' | 'offline';
}

const SERVER_URL = 'http://localhost:5000';
const WS_URL = 'ws://localhost:5000';

export function useRealTimeData() {
  const [state, setState] = useState<RealTimeDataState>({
    connected: false,
    data: [],
    loading: false,
    error: null,
    lastUpdate: null,
    connectionType: 'offline'
  });

  const socketRef = useRef<any>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fallbackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const dataRef = useRef<SecurityData[]>([]);
  const { addNotification } = useNotifications();

  // Fallback: Fetch data from JSON file via REST API
  const fetchFallbackData = useCallback(async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/data`);
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          const newData = result.data || [];
          dataRef.current = newData;
          
          setState(prev => ({
            ...prev,
            data: newData,
            loading: false,
            error: null,
            lastUpdate: result.timestamp,
            connectionType: 'fallback'
          }));
          
          console.log(`Loaded ${newData.length} records via fallback`);
        }
      }
    } catch (error) {
      console.error('Fallback fetch error:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Unable to connect to server',
        connectionType: 'offline'
      }));
    }
  }, []);

  // Initialize WebSocket connection
  const connectWebSocket = useCallback(() => {
    try {
      // Clear any existing fallback polling
      if (fallbackIntervalRef.current) {
        clearInterval(fallbackIntervalRef.current);
        fallbackIntervalRef.current = null;
      }

      // Import socket.io-client dynamically to avoid SSR issues
      import('socket.io-client').then(({ io }) => {
        socketRef.current = io(WS_URL, {
          transports: ['websocket', 'polling'],
          timeout: 5000,
          reconnection: true,
          reconnectionDelay: 1000,
          reconnectionAttempts: 5
        });

        socketRef.current.on('connect', () => {
          console.log('WebSocket connected');
          setState(prev => ({
            ...prev,
            connected: true,
            loading: false,
            error: null,
            connectionType: 'websocket'
          }));

          // Clear any pending reconnection timeout
          if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
            reconnectTimeoutRef.current = null;
          }
        });

        socketRef.current.on('disconnect', (reason: string) => {
          console.log('WebSocket disconnected:', reason);
          setState(prev => ({
            ...prev,
            connected: false,
            connectionType: 'offline'
          }));

          // Start fallback polling if WebSocket fails
          if (reason === 'io client disconnect') {
            // Client initiated disconnect, don't reconnect
            return;
          }

          // Start fallback after 3 seconds if no reconnection
          setTimeout(() => {
            if (!socketRef.current?.connected) {
              console.log('Starting fallback polling');
              fetchFallbackData();
              fallbackIntervalRef.current = setInterval(fetchFallbackData, 5000);
            }
          }, 3000);
        });

        socketRef.current.on('new_match', (newData: SecurityData) => {
          console.log('Received new match via WebSocket:', newData);
          console.log('Full WebSocket object structure:', JSON.stringify(newData, null, 2));
          
          // Update data with new match at the beginning
          const updatedData = [newData, ...dataRef.current];
          dataRef.current = updatedData;
          
          setState(prev => ({
            ...prev,
            data: updatedData,
            loading: false,
            error: null,
            lastUpdate: newData.server_timestamp || newData.timestamp,
            connectionType: 'websocket'
          }));

          // Add to notification queue
          const notificationItem = {
            id: newData.match_id || `${newData.timestamp}_${newData.person_id}`,
            type: "match" as const,
            person_name: newData.person_name,
            person_id: newData.person_id,
            age: newData.age,
            legal_case: newData.legal_case,
            score: parseFloat(newData.score) || 0,
            node_id: newData.node_id,
            timestamp: newData.timestamp,
            server_timestamp: newData.server_timestamp
          };
          addNotification(notificationItem);
        });

        socketRef.current.on('error', (error: any) => {
          console.error('WebSocket error:', error);
          setState(prev => ({
            ...prev,
            error: error.message || 'Connection error',
            connectionType: 'offline'
          }));
        });

        socketRef.current.on('connect_error', (error: any) => {
          console.error('WebSocket connection error:', error);
          // Start fallback polling
          fetchFallbackData();
          fallbackIntervalRef.current = setInterval(fetchFallbackData, 5000);
        });

      }).catch((error) => {
        console.error('Failed to import socket.io-client:', error);
        // Start fallback polling
        fetchFallbackData();
        fallbackIntervalRef.current = setInterval(fetchFallbackData, 5000);
      });

    } catch (error) {
      console.error('WebSocket connection failed:', error);
      // Start fallback polling
      fetchFallbackData();
      fallbackIntervalRef.current = setInterval(fetchFallbackData, 5000);
    }
  }, [fetchFallbackData]);

  // Send test data
  const sendTestData = useCallback(() => {
    const testData: SecurityData = {
      person_name: "Test Criminal",
      person_id: `TEST_${Date.now()}`,
      age: "32",
      legal_case: "Trespassing",
      score: "95%",
      node_id: "NODE_01",
      timestamp: new Date().toISOString()
    };

    if (socketRef.current?.connected) {
      socketRef.current.emit('new_match', testData);
      console.log('Sent test data via WebSocket');
    } else {
      // Send via REST API as fallback
      fetch(`${SERVER_URL}/api/new_match`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
      }).then(response => response.json())
        .then(result => {
          console.log('Sent test data via REST API:', result);
          // Refresh data
          fetchFallbackData();
        })
        .catch(error => {
          console.error('Failed to send test data:', error);
        });
    }
  }, [fetchFallbackData]);

  // Emit criminal confirmed event
  const emitCriminalConfirmed = useCallback((data: SecurityData) => {
    const eventData = {
      name: data.person_name,
      id: data.person_id,
      time: data.timestamp,
      location: data.node_id
    };

    if (socketRef.current?.connected) {
      socketRef.current.emit('criminal_confirmed', eventData);
      console.log('Emitted criminal_confirmed:', eventData);
      return true;
    } else {
      console.warn('WebSocket not connected, cannot emit criminal_confirmed');
      return false;
    }
  }, []);

  // Emit criminal rejected event
  const emitCriminalRejected = useCallback((data: SecurityData) => {
    const eventData = {
      name: data.person_name,
      id: data.person_id,
      time: data.timestamp,
      location: data.node_id
    };

    if (socketRef.current?.connected) {
      socketRef.current.emit('criminal_rejected', eventData);
      console.log('Emitted criminal_rejected:', eventData);
      return true;
    } else {
      console.warn('WebSocket not connected, cannot emit criminal_rejected');
      return false;
    }
  }, []);

  // Manual refresh
  const refreshData = useCallback(() => {
    if (socketRef.current?.connected) {
      // WebSocket is connected, data should be real-time
      console.log('WebSocket is active, data is real-time');
    } else {
      // Force refresh via fallback
      fetchFallbackData();
    }
  }, [fetchFallbackData]);

  // Initialize connection on mount
  useEffect(() => {
    connectWebSocket();

    return () => {
      // Cleanup
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (fallbackIntervalRef.current) {
        clearInterval(fallbackIntervalRef.current);
      }
    };
  }, [connectWebSocket]);

  return {
    ...state,
    sendTestData,
    refreshData,
    reconnect: connectWebSocket,
    emitCriminalConfirmed,
    emitCriminalRejected
  };
}
