# Real-Time WebSocket Security System

## Overview
This implementation provides a real-time WebSocket system for receiving MATCH events from Raspberry Pi devices and displaying them instantly on the web dashboard without page refresh.

## Architecture
```
Raspberry Pi (WebSocket Client) 
    |
    v
WebSocket Server (Node.js, Port 5000)
    |
    v
Web Dashboard (WebSocket Client)
```

## Data Format
Each "new_match" event contains JSON:
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

## Setup Instructions

### 1. Backend Server Setup

Navigate to server directory and install dependencies:
```bash
cd server
npm install
```

Start the WebSocket server:
```bash
npm start
# For development with auto-restart:
npm run dev
```

Server will run on:
- WebSocket: `ws://localhost:5000`
- Health Check: `http://localhost:5000/health`
- REST API: `http://localhost:5000/api/new_match`

### 2. Frontend Setup

Install Socket.IO client:
```bash
npm install socket.io-client
```

Start the Next.js application:
```bash
npm run dev
```

## Features

### Backend Server Features
- **Real-time Broadcasting**: Instantly relays "new_match" events to all connected clients
- **Data Validation**: Ensures required fields are present before broadcasting
- **Connection Management**: Handles client connections/disconnections
- **Health Monitoring**: Health check endpoint for monitoring
- **REST API**: Optional REST endpoint for testing
- **Error Handling**: Proper error reporting and logging

### Frontend Features
- **Live Connection Status**: Shows LIVE/OFFLINE status
- **Real-time Updates**: Instant display of new matches without refresh
- **Smooth Animations**: New matches appear with highlight animation
- **Test Functionality**: Built-in test button for sending sample matches
- **Auto-reconnection**: Automatically reconnects if connection drops
- **Error Display**: Shows connection errors to user
- **Responsive Design**: Works on all screen sizes

### UI Components
- **Connection Indicator**: Green (LIVE) / Red (OFFLINE) status badge
- **Match Cards**: Display person details, match score, and metadata
- **New Match Highlight**: Latest match pulses with red highlight
- **Test Button**: Send test match data for development
- **Empty State**: Friendly message when no matches detected

## Raspberry Pi Integration

### WebSocket Client Code (Python Example)
```python
import socketio
import json
import time

# Create Socket.IO client
sio = socketio.Client()

@sio.event
def connect():
    print('Connected to WebSocket server')

@sio.event
def disconnect():
    print('Disconnected from WebSocket server')

# Connect to server
sio.connect('http://localhost:5000')

# Send match data
match_data = {
    "person_name": "Criminal Name",
    "person_id": "CRIM_001",
    "age": "32",
    "legal_case": "Trespassing",
    "score": "95%",
    "node_id": "NODE_01",
    "timestamp": time.strftime('%Y-%m-%dT%H:%M:%S.000Z')
}

sio.emit('new_match', match_data)
```

### REST API Alternative (HTTP POST)
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

## Testing

### 1. Start Both Services
```bash
# Terminal 1: Start WebSocket server
cd server && npm start

# Terminal 2: Start Next.js app
npm run dev
```

### 2. Test Connection
- Open `http://localhost:3000/dashboard`
- Verify "LIVE" status appears
- Click "Test Match" button to send sample data

### 3. Verify Real-time Updates
- New match should appear instantly in "Criminal Detected" section
- Latest match should pulse with red highlight
- Connection status should remain "LIVE"

## File Structure
```
security-system/
  server/
    package.json          # Server dependencies
    server.js             # WebSocket server
  hooks/
    useWebSocket.ts       # React hook for WebSocket
  app/(main)/dashboard/
    page.tsx             # Dashboard with real-time updates
  package.json           # Frontend dependencies (includes socket.io-client)
```

## Configuration

### Server Port
Default port is 5000. Change via environment variable:
```bash
PORT=3001 npm start
```

### WebSocket URL
Frontend connects to `ws://localhost:5000` by default.
Update in `hooks/useWebSocket.ts` if needed.

## Troubleshooting

### Common Issues
1. **Connection Failed**: Ensure server is running on port 5000
2. **CORS Errors**: Server allows all origins for development
3. **Missing Dependencies**: Run `npm install` in both directories
4. **Port Conflicts**: Change server port if 5000 is in use

### Debug Mode
Enable detailed logging:
```bash
DEBUG=socket.io:* npm start
```

## Security Considerations
- **Development**: CORS allows all origins
- **Production**: Restrict CORS to specific domains
- **Authentication**: Add authentication tokens for production
- **Rate Limiting**: Implement rate limiting for production

## Performance
- **Memory Efficient**: No database storage, live streaming only
- **Low Latency**: Direct WebSocket communication
- **Scalable**: Can handle multiple Pi devices and web clients
- **Auto-cleanup**: Automatic disconnection handling

## Next Steps
1. Deploy server to cloud service (AWS, Heroku, etc.)
2. Add authentication for secure connections
3. Implement rate limiting and security measures
4. Add data persistence if needed
5. Monitor server health and performance
