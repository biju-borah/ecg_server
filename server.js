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
})
io.on('connection', (socket) => {
    console.log('client connected: ', socket.id)

    socket.join('clock-room')

    socket.on('disconnect', (reason) => {
        console.log(reason)
    })
})

const graphData = [
    { name: 1, x: Math.random() * 10, y: Math.random() * 10 },
    { name: 2, x: Math.random() * 10, y: Math.random() * 10 },
    { name: 3, x: Math.random() * 10, y: Math.random() * 10 },
    { name: 4, x: Math.random() * 10, y: Math.random() * 10 },
    { name: 5, x: Math.random() * 10, y: Math.random() * 10 },
]
setInterval(() => {
    if (graphData.length >= 5) {
        graphData.reverse().pop()
        graphData.reverse()
    }
    graphData.push({ name: graphData[graphData.length - 1].name + 1, x: Math.random() * 10, y: Math.random() * 10 })
    io.to('clock-room').emit('time', graphData)
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