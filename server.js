// const express = require('express')
// //require("./index.js")
// const app = express('./u')
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

const http = require('http')
const app = require('./index')

const port = 3000;
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Started on port ${port}`);
})