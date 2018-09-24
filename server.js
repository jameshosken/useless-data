const express = require('express')
const app = express()
const port = 3000
app.use(express.static('public'))

app.get('/', (req, res) => res.sendfile('index.html'))

// app.get('/', (req, res) => res.redirect('https://raw.githubusercontent.com/jameshosken/useless-data/master/LICENSE'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


exports.logger = function(req, res) {
  var user = {
    agent: req.header('user-agent'), // User Agent we get from headers
    referrer: req.header('referrer'), //  Likewise for referrer
    ip: req.header('x-forwarded-for') || req.connection.remoteAddress, // Get IP - allow for proxy
    screen: { // Get screen info that we passed in url post data
      width: req.param('width'),
      height: req.param('height')
    }
  };
  // Store the user in your database
  // User.create(user)...
  console.log("User Data Recorded!");
  console.log(user);
  res.end();
}