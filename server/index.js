const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()

app.use(bodyParser.urlencoded({ extended: true })) //check
app.use(bodyParser.json()) //check
app.use(cookieParser())
app.use(cors())

app.get('/login', function(req, res) {
var scopes = 'user-read-private user-read-email';
res.redirect('https://accounts.spotify.com/authorize' +
  '?response_type=code' +
  '&client_id=' + my_client_id +
  (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
  '&redirect_uri=' + encodeURIComponent(redirect_uri));
});

app.listen(5000, () => {
    console.log("server is running on port 5000")
})