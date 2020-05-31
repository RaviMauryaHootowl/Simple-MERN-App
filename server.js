const path = require('path');
const express = require('express');
const colour = require('colour');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
require('dotenv/config');
const posts = require('./routes/posts');

app.use(bodyParser.json());
app.use('/api/v1/posts', posts);


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

// mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
//     console.log('DB CONNECTED!!'.cyan);
// });
mongoose.connect('mongodb+srv://ravimaurya027:ravimaurya027@postcluster-uurfm.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('DB CONNECTED!!'.cyan);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server Started at PORT ${PORT}`.blue.bold);
});