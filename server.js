const express = require('express')
const socketIo = require('socket.io')
const http = require('http')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000
const app = express()
const server = http.createServer(app)
const fs = require('fs');

function saveObjectToCSV(obj, filename) {
    const csvContent = Object.values(obj).join(',') + '\n';

    fs.access(filename, fs.constants.F_OK, (err) => {
        if (err) {
            // File doesn't exist, create it and append the object
            fs.writeFile(filename, csvContent, 'utf8', (err) => {
                if (err) {
                    console.error('Error creating CSV file:', err);
                    return;
                }
            });
        } else {
            // File exists, append the object
            fs.appendFile(filename, csvContent, 'utf8', (err) => {
                if (err) {
                    console.error('Error appending to CSV file:', err);
                    return;
                }
            });
        }
    });
}

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


setInterval(() => {
    if (data.length > 0) {
        if (graphData.length >= 20) {
            graphData.reverse().pop()
            graphData.reverse()
        }
        if (index < data.length) {
            graphData.push(data[index])
            saveObjectToCSV(data[index], 'output2.csv');
            index += 1;
        }
    }
    io.to('clock-room').emit('time', graphData)
}, 30)

var data = []
var index = 0
var y = 0
var graphData = []

app.get('/ecg', (req, res) => {
    const dataString = req.query.data;
    const dataArray = dataString.split(',').map(Number);
    console.log(dataArray);

    for (let i = 0; i < dataArray.length; i++) {
        const ecgData = {
            name: y++,
            x: dataArray[i],
            y: Math.random() * 10
        };
        data.push(ecgData);
    }

    console.log('Received ECG data:', data);
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