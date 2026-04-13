// Real-time data display component with exact card structure and button functionality
// Shows security data with individual cards and action buttons

"use client";

import { useState } from "react";
import { SecurityData } from "@/hooks/useRealTimeData";
import { Activity, AlertTriangle, Wifi, WifiOff, Database, RefreshCw, Check, X } from "lucide-react";

interface RealTimeDataTableProps {
  data: SecurityData[];
  connected: boolean;
  loading: boolean;
  error: string | null;
  lastUpdate: string | null;
  connectionType: 'websocket' | 'fallback' | 'offline';
  onRefresh: () => void;
  onSendTest: () => void;
  onConfirmMatch?: (match: SecurityData) => void;
  onRejectMatch?: (match: SecurityData) => void;
}

interface CardState {
  [key: string]: 'confirmed' | 'rejected' | 'pending';
}

export default function RealTimeDataTable({
  data,
  connected,
  loading,
  error,
  lastUpdate,
  connectionType,
  onRefresh,
  onSendTest,
  onConfirmMatch,
  onRejectMatch
}: RealTimeDataTableProps) {
  
  const [cardStates, setCardStates] = useState<CardState>({});
  const [toast, setToast] = useState<{ show: boolean; type: 'success' | 'error'; message: string }>({
    show: false,
    type: 'success',
    message: ''
  });
  
  const getConnectionStatus = () => {
    switch (connectionType) {
      case 'websocket':
        return { color: 'text-green-600', bg: 'bg-green-100', icon: Wifi, text: 'LIVE (WebSocket)' };
      case 'fallback':
        return { color: 'text-yellow-600', bg: 'bg-yellow-100', icon: Database, text: 'FALLBACK (HTTP)' };
      case 'offline':
        return { color: 'text-red-600', bg: 'bg-red-100', icon: WifiOff, text: 'OFFLINE' };
      default:
        return { color: 'text-gray-600', bg: 'bg-gray-100', icon: WifiOff, text: 'UNKNOWN' };
    }
  };

  const status = getConnectionStatus();
  const StatusIcon = status.icon;

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleConfirm = (match: SecurityData) => {
    console.log("CONFIRM CLICKED");
    console.log('Confirm button clicked for match:', match);
    const matchKey = match.match_id || `${match.timestamp}_${match.person_id}`;
    console.log('Setting card state to confirmed for key:', matchKey);
    
    setCardStates(prev => {
      const newState = { ...prev, [matchKey]: 'confirmed' } as CardState;
      console.log('Updated cardStates after confirm:', newState);
      return newState;
    });
    
    // Show toast notification
    showToast('success', 'The criminal catching successfully');
    
    onConfirmMatch?.(match);
  };

  const handleReject = (match: SecurityData) => {
    console.log("REJECT CLICKED");
    console.log('Reject button clicked for match:', match);
    const matchKey = match.match_id || `${match.timestamp}_${match.person_id}`;
    console.log('Setting card state to rejected for key:', matchKey);
    
    setCardStates(prev => {
      const newState = { ...prev, [matchKey]: 'rejected' } as CardState;
      console.log('Updated cardStates after reject:', newState);
      return newState;
    });
    
    // Show toast notification
    showToast('error', 'Match rejected successfully');
    
    onRejectMatch?.(match);
  };

  const getCardStyle = (match: SecurityData) => {
    const matchKey = match.match_id || `${match.timestamp}_${match.person_id}`;
    const state = cardStates[matchKey];
    console.log('Card state for key', matchKey, ':', state);
    
    switch (state) {
      case 'confirmed':
        return 'bg-green-50 border-green-500';
      case 'rejected':
        return 'bg-red-50 border-red-500';
      default:
        return 'bg-white border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="animate-spin text-blue-500 mr-2" size={20} />
        <span className="text-gray-600">Loading security data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center mb-2">
          <AlertTriangle className="text-red-500 mr-2" size={20} />
          <span className="font-semibold text-red-800">Connection Error</span>
        </div>
        <p className="text-red-700 text-sm mb-3">{error}</p>
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className={`${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3`}>
            {toast.type === 'success' ? <Check size={24} /> : <X size={24} />}
            <span className="font-semibold text-lg">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Status Bar */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
        <div className="flex items-center gap-3">
          <StatusIcon size={20} className={status.color} />
          <div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.color}`}>
              {status.text}
            </span>
            {lastUpdate && (
              <p className="text-xs text-gray-500 mt-1">
                Last update: {formatTimestamp(lastUpdate)}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {data.length} records
          </span>
          <button
            onClick={onSendTest}
            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            disabled={!connected && connectionType === 'offline'}
          >
            Test Data
          </button>
          <button
            onClick={onRefresh}
            className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Data Display - Each match in separate card */}
      {data.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border">
          <AlertTriangle size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No Security Data Available</h3>
          <p className="text-gray-500 mb-4">
            {connectionType === 'websocket' 
              ? "Waiting for real-time data from security nodes..."
              : "No data found in system"}
          </p>
          <button
            onClick={onSendTest}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            disabled={connectionType === 'offline'}
          >
            Send Test Data
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((match, index) => {
            const matchKey = match.match_id || `${match.timestamp}_${match.person_id}`;
            const cardState = cardStates[matchKey];
            const isDisabled = cardState === 'confirmed' || cardState === 'rejected';
            return (
              <div
                key={match.match_id || index}
                className={`bg-white border-2 rounded-lg shadow-xl p-6 transition-all duration-300 ${
                  index === 0 ? 'border-blue-500' : 'border-gray-300'
                }`}
              >
                {/* Card Title */}
                <div className="flex items-center gap-3 mb-4">
                  <Activity size={20} className="text-red-500" />
                  <h2 className="text-xl font-bold text-gray-900">Criminal detected</h2>
                  {index === 0 && (
                    <div className="flex items-center gap-2 ml-auto">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-blue-600 font-semibold">Latest</span>
                    </div>
                  )}
                </div>

                {/* Match Data - Each on separate line */}
                <div className="space-y-3 mb-6 text-lg">
                  <div className="text-gray-900">
                    <span className="font-semibold">type:</span> {match.legal_case}
                  </div>
                  <div className="text-gray-900">
                    <span className="font-semibold">Name:</span> {match.person_name}
                  </div>
                  <div className="text-gray-900">
                    <span className="font-semibold">ID:</span> {match.person_id}
                  </div>
                  <div className="text-gray-900">
                    <span className="font-semibold">Age:</span> {match.age}
                  </div>
                  <div className="text-gray-900">
                    <span className="font-semibold">Legal Case:</span> {match.legal_case}
                  </div>
                  <div className="text-gray-900">
                    <span className="font-semibold">Score:</span> {match.score}
                  </div>
                  <div className="text-gray-900">
                    <span className="font-semibold">Node ID:</span> {match.node_id}
                  </div>
                  <div className="text-gray-900">
                    <span className="font-semibold">Time:</span> {formatTimestamp(match.timestamp)}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => handleConfirm(match)}
                    disabled={isDisabled}
                    className={`flex-1 py-4 px-8 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg ${
                      isDisabled 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    <Check size={20} />
                    Confirm Match
                  </button>

                  <button
                    onClick={() => handleReject(match)}
                    disabled={isDisabled}
                    className={`flex-1 py-4 px-8 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg ${
                      isDisabled 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-red-500 text-white hover:bg-red-600'
                    }`}
                  >
                    <X size={20} />
                    Reject Match
                  </button>
                </div>

                {/* Visual Confirmation/Rejection Indicator */}
                {cardState === 'confirmed' && (
                  <div className="mt-4 pt-3 border-t border-green-300">
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-green-600" />
                      <span className="text-sm text-green-600 font-semibold">Match Confirmed</span>
                    </div>
                  </div>
                )}

                {cardState === 'rejected' && (
                  <div className="mt-4 pt-3 border-t border-red-300">
                    <div className="flex items-center gap-2">
                      <X size={16} className="text-red-600" />
                      <span className="text-sm text-red-600 font-semibold">Match Rejected</span>
                    </div>
                  </div>
                )}

                {/* Latest Record Indicator */}
                {index === 0 && !isDisabled && (
                  <div className="mt-4 pt-3 border-t border-blue-200">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-blue-600 font-semibold">Latest Detection</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
        <p className="text-gray-500 mb-4">
          {connectionType === 'websocket' 
            ? "Waiting for real-time data from security nodes..."
            : "No data found in system"}
        </p>
        <button
          onClick={onSendTest}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          disabled={connectionType === 'offline'}
        >
          Send Test Data
        </button>
      </div>
    ) : (
      <div className="space-y-6">
        {data.map((match, index) => {
          const matchKey = match.match_id || `${match.timestamp}_${match.person_id}`;
          const cardState = cardStates[matchKey];
          const isDisabled = cardState === 'confirmed' || cardState === 'rejected';
          return (
            <div
              key={match.match_id || index}
              className={`border-2 rounded-lg shadow-xl p-6 transition-all duration-300 ${getCardStyle(match)} ${
                index === 0 && !isDisabled ? 'border-blue-500' : ''
              }`}
            >
              {/* Card Title */}
              <div className="flex items-center gap-3 mb-4">
                <Activity size={20} className="text-red-500" />
                <h2 className="text-xl font-bold text-gray-900">Criminal detected</h2>
                
                {/* Status Indicator */}
                {cardState === 'confirmed' && (
                  <div className="flex items-center gap-2 ml-auto">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg font-bold">+</span>
                    </div>
                    <span className="text-green-600 font-semibold">CONFIRMED</span>
                  </div>
                )}
                
                {cardState === 'rejected' && (
                  <div className="flex items-center gap-2 ml-auto">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg font-bold">×</span>
                    </div>
                    <span className="text-red-600 font-semibold">REJECTED</span>
                  </div>
                )}
                
                {index === 0 && !isDisabled && (
                  <div className="flex items-center gap-2 ml-auto">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-blue-600 font-semibold">Latest</span>
                  </div>
                )}
              </div>

              {/* Match Data - Each on separate line */}
              <div className="space-y-3 mb-6 text-lg">
                <div className="text-gray-900">
                  <span className="font-semibold">Type:</span> {match.type || match.legal_case}
                </div>
                <div className="text-gray-900">
                  <span className="font-semibold">Person Name:</span> {match.person_name}
                </div>
                <div className="text-gray-900">
                  <span className="font-semibold">Person ID:</span> {match.person_id}
                </div>
                <div className="text-gray-900">
                  <span className="font-semibold">Age:</span> {match.age}
                </div>
                <div className="text-gray-900">
                  <span className="font-semibold">Legal Case:</span> {match.legal_case}
                </div>
                <div className="text-gray-900">
                  <span className="font-semibold">Score:</span> {match.score}
                </div>
                <div className="text-gray-900">
                  <span className="font-semibold">Node ID:</span> {match.node_id}
                </div>
                <div className="text-gray-900">
                  <span className="font-semibold">Timestamp:</span> {formatTimestamp(match.timestamp)}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    console.log("CONFIRM CLICKED");
                    handleConfirm(match);
                  }}
                  disabled={isDisabled}
                  className={`flex-1 py-4 px-8 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg pointer-events-auto ${
                    isDisabled 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                  style={{ zIndex: 10 }}
                >
                  <Check size={20} />
                  Confirm Match
                </button>

                <button
                  type="button"
                  onClick={() => {
                    console.log("REJECT CLICKED");
                    handleReject(match);
                  }}
                  disabled={isDisabled}
                  className={`flex-1 py-4 px-8 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg pointer-events-auto ${
                    isDisabled 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                  style={{ zIndex: 10 }}
                >
                  <X size={20} />
                  Reject Match
                </button>
              </div>

              {/* Visual Confirmation/Rejection Indicator */}
              {cardState === 'confirmed' && (
                <div className="mt-4 pt-3 border-t border-green-300">
                  <div className="flex items-center gap-2">
                    <Check size={16} className="text-green-600" />
                    <span className="text-sm text-green-600 font-semibold">The criminal catching successfully</span>
                  </div>
                </div>
              )}

              {cardState === 'rejected' && (
                <div className="mt-4 pt-3 border-t border-red-300">
                  <div className="flex items-center gap-2">
                    <X size={16} className="text-red-600" />
                    <span className="text-sm text-red-600 font-semibold">Match rejected</span>
                  </div>
                </div>
              )}

              {/* Latest Record Indicator */}
              {index === 0 && !isDisabled && (
                <div className="mt-4 pt-3 border-t border-blue-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-blue-600 font-semibold">Latest Detection</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    )}
  </div>
);
