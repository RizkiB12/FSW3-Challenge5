const express = require('express');
const route = require('./routes/index');
const app = express();
const path = require('path');
const publicPath = path.join(__dirname, 'public');
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(route);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
