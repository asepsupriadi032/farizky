const express = require('express')
const app = express()
const port = 3000

app.use(express.static(__dirname + '/dist-tablet-view'))

// Add catch-all route that always serves index.html
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist-tablet-view/index.html')
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
