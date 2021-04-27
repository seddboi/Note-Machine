const express = require('express');
const api = require('./routes/api-routes');
const htmlRoutes = require('./routes/html-routes');

const app = express();
const PORT = process.env.PORT || 3008;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/api', api);
app.use('/', htmlRoutes);

app.listen(PORT, () => console.log(`The server is running on PORT ${PORT}`));

