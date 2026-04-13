// Real-time data display component with individual match rows
// Shows security data with connection status and action buttons

"use client";

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

      {/* Data Display - Each match in separate row */}
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
        <div className="space-y-4">
          {data.map((match, index) => (
            <div
              key={match.match_id || index}
              className={`bg-white border rounded-lg transition-all duration-300 ${
                index === 0 ? 'border-blue-300 shadow-md' : 'border-gray-200'
              }`}
            >
              {/* Match Title */}
              <div className="flex items-center gap-2 px-4 pt-4 pb-2">
                <Activity size={16} className="text-red-500" />
                <h3 className="text-sm font-bold text-gray-900">Criminal detected</h3>
                {index === 0 && (
                  <div className="flex items-center gap-2 ml-auto">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-blue-600 font-semibold">Latest</span>
                  </div>
                )}
              </div>

              {/* Match Data */}
              <div className="px-4 pb-3">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                      <Activity size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-base">{match.person_name}</h4>
                      <p className="text-sm text-gray-500">ID: {match.person_id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full font-semibold">
                      {match.score} Match
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      Node: {match.node_id}
                    </p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-4">
                  <div>
                    <span className="font-semibold text-gray-600">Age:</span>
                    <span className="ml-2 text-gray-900">{match.age}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Legal Case:</span>
                    <span className="ml-2 text-gray-900">{match.legal_case}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Detected:</span>
                    <span className="ml-2 text-gray-900">
                      {formatTimestamp(match.timestamp)}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Server:</span>
                    <span className="ml-2 text-gray-900">
                      {match.server_timestamp ? formatTimestamp(match.server_timestamp) : 'N/A'}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-4 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => onConfirmMatch?.(match)}
                    className="flex-1 py-3 px-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Check size={16} />
                    Confirm Match
                  </button>

                  <button
                    onClick={() => onRejectMatch?.(match)}
                    className="flex-1 py-3 px-4 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <X size={16} />
                    Reject Match
                  </button>
                </div>
              </div>

              {/* Latest Record Indicator */}
              {index === 0 && (
                <div className="px-4 pb-3 pt-1 border-t border-blue-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-blue-600 font-semibold">Latest Detection</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
