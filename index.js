const express = require('express')

// Routers
const { taskRouter } = require('./src/routes/taskRoutes')

// Constants
const PORT = 3000

// Initialize app
const app = express()

// Pre-requisites
app.use(express.json())

// Server routes
app.use('/tasks', taskRouter)

// Server running
app.listen(PORT, async () => {
  console.log(`Server is running at port: ${PORT}`)
})
