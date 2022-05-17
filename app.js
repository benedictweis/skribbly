const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/src/index.html")
})

app.get('/js/:script', (req, res) => {
  let script = req.params.script;
  res.sendFile(__dirname + "/src/js/" + script);
})

app.get('/style/:sheet', (req, res) => {
  let sheet = req.params.sheet;
  res.sendFile(__dirname + "/src/style/" + sheet);
})

app.listen(port, () => {
  console.log(`Skribbly listening on port ${port}`)
})
