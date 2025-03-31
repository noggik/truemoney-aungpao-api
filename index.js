const express = require('express')
const app = express()
const cors = require('cors')
const AungPaoRoutes = require('./routes/wallet')
const port = process.env.PORT || 8800

const corsOptions = {
    origin: '*', // Specify allowed origin(s)
    methods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'], // Specify allowed method(s)
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Authorization'], // Specify allowed header(s)
    credentials: true
  };cors(corsOptions),

app.use(express.json())
app.use(cors(corsOptions))

app.use('/api/aungpao', AungPaoRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
