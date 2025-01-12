const express = require('express')
const app = express()
const port = 4000

app.use(express.static(__dirname + '/dist'))

// Add catch-all route that always serves index.html
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
