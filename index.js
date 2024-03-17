const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;

var data = [];

app.use(bodyParser.json());

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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
