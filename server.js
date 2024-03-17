const express = require('express')
const socketIo = require('socket.io')
const http = require('http')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000
const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
}) //in case server and client run on different urls
io.on('connection', (socket) => {
    console.log('client connected: ', socket.id)

    socket.join('clock-room')

    socket.on('disconnect', (reason) => {
        console.log(reason)
    })
})
setInterval(() => {
    io.to('clock-room').emit('time', new Date())
}, 1000)

data = []

app.get('/ecg', (req, res) => {
    const ecgData = req.query.data;
    data.push(ecgData);
    console.log('Received ECG data:', ecgData);
    res.send({ message: 'ECG data received successfully' });
});

app.get('/', (req, res) => {
    console.log('Received ECG data');
    res.send({ message: 'ECG data received successfully' });
});

server.listen(PORT, err => {
    if (err) console.log(err)
    console.log('Server running on Port ', PORT)
})