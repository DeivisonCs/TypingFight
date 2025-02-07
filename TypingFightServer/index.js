const door = 8080;
const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: {origin: '*'}
});

matches = [];

io.on('connection', (socket) => {
    console.log("user connected");

    socket.on('message', (message) => {
        console.log(message);

        io.emit('message', `${socket.id.substr(0, 2)} said: ${message}`)
    })
    
    socket.on('createMatch', (matchName) => {
        const roomId = `match_${Date.now()}`; // ID único para a partida
        matches[roomId] = { name: matchName, players: [socket.id.substr(0, 2)] }; // Armazena a partida
    
        socket.join(roomId); // Entra na sala
        io.emit('matchCreated', "match created by: " + roomId); // Informa o criador da partida
        console.log(`Match Created: ${roomId} by user ${socket.id.substr(0, 2)}`);
        
        console.log(matches)
    });
});


http.listen(door, () => console.log('listening on door ' + door));