// ─────────────────────────────────────────────
// WebSocket Server for Security System
// Handles real-time "new_match" events from Raspberry Pi
// and broadcasts to all connected web clients
// ─────────────────────────────────────────────

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow all origins for development
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Store connected clients
let connectedClients = new Set();

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);
  connectedClients.add(socket.id);

  // Send welcome message to new client
  socket.emit('connected', {
    message: 'Connected to Security System WebSocket Server',
    timestamp: new Date().toISOString()
  });

  // Handle "new_match" events from Raspberry Pi or any client
  socket.on('new_match', (data) => {
    console.log('Received new_match event:', data);
    
    // Validate required fields
    const requiredFields = ['person_name', 'person_id', 'age', 'legal_case', 'score', 'node_id', 'timestamp'];
    const isValid = requiredFields.every(field => data.hasOwnProperty(field));
    
    if (isValid) {
      // Broadcast to all connected clients (including sender)
      io.emit('new_match', {
        ...data,
        server_timestamp: new Date().toISOString(),
        match_id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      });
      
      console.log(`Broadcasted match to ${connectedClients.size} clients`);
    } else {
      console.error('Invalid match data format:', data);
      socket.emit('error', {
        message: 'Invalid data format. Required fields: person_name, person_id, age, legal_case, score, node_id, timestamp',
        received_data: data
      });
    }
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
    connectedClients.delete(socket.id);
  });

  // Handle ping for connection health
  socket.on('ping', () => {
    socket.emit('pong', { timestamp: new Date().toISOString() });
  });
});

// REST API endpoint for testing (optional)
app.post('/api/new_match', (req, res) => {
  const matchData = req.body;
  
  // Broadcast to all WebSocket clients
  io.emit('new_match', {
    ...matchData,
    server_timestamp: new Date().toISOString(),
    match_id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  });
  
  console.log('Received match via REST API:', matchData);
  res.json({ 
    success: true, 
    message: 'Match broadcasted to all clients',
    match_id: matchData.match_id 
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    connected_clients: connectedClients.size,
    timestamp: new Date().toISOString()
  });
});

// Start server on port 5050
const PORT = process.env.PORT || 5050;
server.listen(PORT, () => {
  console.log(`🚀 Security System WebSocket Server running on port ${PORT}`);
  console.log(`📡 WebSocket endpoint: ws://localhost:${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  console.log(`📝 REST API: http://localhost:${PORT}/api/new_match`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🔄 Shutting down server gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
