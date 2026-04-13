# Real-Time Security System with WebSocket + JSON Fallback

## Overview
This enhanced system provides real-time data display from WebSocket server with automatic fallback to JSON file reading. The system seamlessly switches between WebSocket and HTTP polling based on connection status.

## Architecture
```
Raspberry Pi/Devices
        |
        v
WebSocket Server (Port 5000)
        |    \
        |     \  JSON File Storage
        v      v
Web Dashboard (WebSocket + Fallback)
```

## Key Features

### 1. **Enhanced WebSocket Server**
- **JSON File Storage**: All incoming data saved to `security_data.json`
- **Data Validation**: Ensures required fields before saving
- **Automatic Cleanup**: Keeps only last 1000 records
- **REST API Endpoints**: 
  - `POST /api/new_match` - Add new data
  - `GET /api/data` - Read saved data (fallback)
  - `GET /health` - Server health check

### 2. **Smart Frontend Client**
- **Dual Connection**: WebSocket + HTTP fallback
- **Auto-switching**: Seamlessly switches to fallback when WebSocket disconnects
- **Real-time Updates**: Instant updates via WebSocket when available
- **Polling Fallback**: 5-second HTTP polling when WebSocket unavailable
- **Connection Status**: Visual indicators (LIVE/FALLBACK/OFFLINE)

### 3. **Production-Ready Features**
- **Error Handling**: Comprehensive error management
- **Auto-reconnection**: Automatic WebSocket reconnection attempts
- **Data Persistence**: JSON file ensures no data loss
- **Performance**: Efficient data handling and UI updates
- **Responsive Design**: Works on all screen sizes

## Data Flow

### **Primary Flow (WebSocket Connected)**
1. Raspberry Pi sends data via WebSocket
2. Server validates and broadcasts to all clients
3. Server saves data to JSON file
4. Frontend receives real-time updates instantly

### **Fallback Flow (WebSocket Disconnected)**
1. Frontend detects WebSocket disconnection
2. Automatically switches to HTTP polling mode
3. Fetches latest data from `/api/data` endpoint every 5 seconds
4. Updates UI with saved data from JSON file

## Setup Instructions

### 1. Backend Server Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Start server
npm start
# For development with auto-restart:
npm run dev
```

Server endpoints:
- **WebSocket**: `ws://localhost:5000`
- **Health Check**: `http://localhost:5000/health`
- **Data API**: `http://localhost:5000/api/data`
- **Test API**: `http://localhost:5000/api/new_match`

### 2. Frontend Setup
```bash
# Install dependencies (includes socket.io-client)
npm install

# Start development server
npm run dev
```

### 3. Test the System
1. Open `http://localhost:3000/dashboard`
2. Check connection status (should show "LIVE")
3. Click "Test Data" button to send sample data
4. Verify real-time updates appear instantly
5. Stop WebSocket server to test fallback mechanism

## File Structure
```
security-system/
  server/
    package.json              # Server dependencies
    server.js                # Enhanced WebSocket server
    security_data.json        # Auto-generated data file
  hooks/
    useRealTimeData.ts       # Smart WebSocket + fallback hook
  components/
    RealTimeDataTable.tsx    # Data display component
  app/(main)/dashboard/
    page.tsx                 # Updated dashboard
  package.json               # Frontend dependencies
```

## Data Format

### **Input Data Format**
```json
{
  "person_name": "John Doe",
  "person_id": "ID_12345",
  "age": "32",
  "legal_case": "Trespassing",
  "score": "95%",
  "node_id": "NODE_01",
  "timestamp": "2026-04-13T11:37:00.000Z"
}
```

### **Stored Data Format** (with server metadata)
```json
{
  "person_name": "John Doe",
  "person_id": "ID_12345",
  "age": "32",
  "legal_case": "Trespassing",
  "score": "95%",
  "node_id": "NODE_01",
  "timestamp": "2026-04-13T11:37:00.000Z",
  "server_timestamp": "2026-04-13T11:37:01.000Z",
  "match_id": "1681234567890_abc123def"
}
```

## Connection States

### **LIVE (WebSocket)**
- Green indicator with WiFi icon
- Real-time instant updates
- No polling required
- Lowest latency

### **FALLBACK (HTTP)**
- Yellow indicator with Database icon
- 5-second polling interval
- Updates from JSON file
- Slight delay but functional

### **OFFLINE**
- Red indicator with WiFiOff icon
- No connection to server
- Manual refresh available
- Error messages displayed

## API Endpoints

### **POST /api/new_match**
Add new security match data.
```bash
curl -X POST http://localhost:5000/api/new_match \
  -H "Content-Type: application/json" \
  -d '{
    "person_name": "Test Criminal",
    "person_id": "TEST_001",
    "age": "32",
    "legal_case": "Trespassing",
    "score": "95%",
    "node_id": "NODE_01",
    "timestamp": "2026-04-13T11:37:00.000Z"
  }'
```

### **GET /api/data**
Retrieve all saved security data.
```bash
curl http://localhost:5000/api/data
```

### **GET /health**
Check server status and statistics.
```bash
curl http://localhost:5000/health
```

## Client Integration Examples

### **JavaScript/Node.js Client**
```javascript
const socket = io('ws://localhost:5000');

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('new_match', (data) => {
  console.log('New match received:', data);
  // Update UI in real-time
});

// Send data
socket.emit('new_match', {
  person_name: "Test Criminal",
  person_id: "TEST_001",
  age: "32",
  legal_case: "Trespassing",
  score: "95%",
  node_id: "NODE_01",
  timestamp: new Date().toISOString()
});
```

### **Python Client**
```python
import socketio
import json
import time

sio = socketio.Client()

@sio.event
def connect():
    print('Connected to WebSocket server')

@sio.event
def new_match(data):
    print('Received new match:', data)

sio.connect('http://localhost:5000')

# Send match data
match_data = {
    "person_name": "Test Criminal",
    "person_id": "TEST_001",
    "age": "32",
    "legal_case": "Trespassing",
    "score": "95%",
    "node_id": "NODE_01",
    "timestamp": time.strftime('%Y-%m-%dT%H:%M:%S.000Z')
}

sio.emit('new_match', match_data)
```

## Troubleshooting

### **Common Issues**

1. **WebSocket Connection Failed**
   - Ensure server is running on port 5000
   - Check firewall settings
   - Verify socket.io-client is installed

2. **Fallback Not Working**
   - Check if `/api/data` endpoint is accessible
   - Verify JSON file permissions
   - Check CORS settings

3. **Data Not Saving**
   - Check file write permissions in server directory
   - Verify JSON file format
   - Check server logs for errors

### **Debug Mode**
Enable detailed logging:
```bash
# Server debug
DEBUG=socket.io:* npm start

# Frontend debug (browser console)
# Network tab shows WebSocket connections
# Console shows connection status changes
```

## Performance Considerations

### **Memory Management**
- JSON file limited to 1000 records
- Automatic cleanup prevents file bloat
- Efficient data structures in frontend

### **Network Efficiency**
- WebSocket preferred for real-time
- Fallback polling at 5-second intervals
- Minimal HTTP requests in fallback mode

### **UI Performance**
- React hooks optimized for re-renders
- Debounced updates prevent flickering
- Smooth animations and transitions

## Production Deployment

### **Environment Variables**
```bash
PORT=5000                    # Server port
NODE_ENV=production         # Production mode
MAX_RECORDS=1000            # Max records to keep
POLLING_INTERVAL=5000       # Fallback polling (ms)
```

### **Security Considerations**
- CORS restrictions for production
- Authentication tokens for WebSocket
- Rate limiting on API endpoints
- HTTPS/WSS for secure connections

### **Scaling Options**
- Redis for multi-server data sharing
- Database instead of JSON file
- Load balancer for WebSocket servers
- CDN for static assets

## Monitoring

### **Connection Metrics**
- WebSocket connection count
- Fallback activation frequency
- Data throughput statistics
- Error rates and types

### **Health Checks**
- Server uptime monitoring
- Database/file system health
- Network latency measurements
- Memory usage tracking

This system provides a robust, production-ready solution for real-time security data display with automatic fallback capabilities.
