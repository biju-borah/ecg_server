const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/ecg', (req, res) => {
    const ecgData = req.body;
    console.log('Received ECG data:', ecgData);
    res.send({ message: 'ECG data received successfully' });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
