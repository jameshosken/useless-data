const express = require('express')
const app = express()
const port = 3000

// app.get('/', (req, res) => res.sendfile('index.html'))

app.get('/', (req, res) => res.redirect('https://raw.githubusercontent.com/jameshosken/useless-data/master/LICENSE'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))