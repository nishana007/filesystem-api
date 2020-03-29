const express=require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('public'));
app.set('view engine','ejs');

app.get('/data', (req, res) => {
    res.render('data');

 });
 app.get('/register', (req, res) => {
    res.render('register');

 });
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
  