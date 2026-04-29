// ─────────────────────────────────────────────
// WebSocket Hook for Real-time Security Dashboard
// Handles connection, reconnection, and event handling
// ─────────────────────────────────────────────

"use client";

import { useEffect, useState, useRef } from 'react';

interface MatchData {
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

interface WebSocketState {
  connected: boolean;
  matches: MatchData[];
  error: string | null;
}

export function useWebSocket() {
  const [state, setState] = useState<WebSocketState>({
    connected: false,
    matches: [],
    error: null
  });

  const socketRef = useRef<any>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const connect = () => {
    try {
      // Connect to WebSocket server (Socket.IO uses HTTP URL)
      const serverUrl = 'https://spireless-elmira-unmurmurously.ngrok-free.dev';
      
      console.log('connecting...');
      socketRef.current = (window as any).io(serverUrl, {
        transports: ['websocket', 'polling'],
        timeout: 20000,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 10,
        forceNew: true
      });

      socketRef.current.on('connect', () => {
        console.log('connected');
        setState(prev => ({ ...prev, connected: true, error: null }));
        
        // Clear any pending reconnection timeout
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
          reconnectTimeoutRef.current = null;
        }
      });

      socketRef.current.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
        console.log('Socket.IO will attempt to reconnect automatically...');
        setState(prev => ({ ...prev, connected: false }));
        // Let Socket.IO handle reconnection automatically
      });

      socketRef.current.on('new_match', (data: MatchData) => {
        console.log('Received new match:', data);
        
        setState(prev => ({
          ...prev,
          matches: [data, ...prev.matches] // Add new match at the beginning
        }));
      });

      socketRef.current.on('connect_error', (error: any) => {
        console.error('❌ WebSocket connection error:', error);
        console.log('Socket.IO will attempt to reconnect automatically...');
        // Don't set error state - let Socket.IO handle reconnection
      });

      socketRef.current.on('error', (error: any) => {
        console.error('WebSocket error:', error);
        setState(prev => ({ 
          ...prev, 
          error: error.message || 'Connection error' 
        }));
      });

      socketRef.current.on('connected', (data: any) => {
        console.log('Server welcome message:', data);
      });

    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to connect to server' 
      }));
    }
  };

  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    setState(prev => ({ ...prev, connected: false }));
  };

  const sendTestMatch = () => {
    if (socketRef.current && state.connected) {
      const testMatch = {
        person_name: "Test Criminal",
        person_id: "TEST_001",
        age: "32",
        legal_case: "Trespassing",
        score: "95%",
        node_id: "NODE_01",
        timestamp: new Date().toISOString()
      };
      
      socketRef.current.emit('new_match', testMatch);
      console.log('Sent test match:', testMatch);
    }
  };

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, []);

  return {
    ...state,
    connect,
    disconnect,
    sendTestMatch
  };
}
