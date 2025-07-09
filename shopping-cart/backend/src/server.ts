import express from 'express'
import dotenv from 'dotenv'
import router from './routes/authRoutes' // Assuming authRoutes.ts
import mongoose from 'mongoose'
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Configure CORS for TypeScript
app.use(express.json())
app.use(
  cors({
    origin: 'https://shopping-cart-omega-silk.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'], // Specify allowed headers
  }),
)

app.use('/api', router)

mongoose
  .connect(process.env.MONGO_URI!) // The '!' asserts that MONGO_URI will not be null or undefined
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  })
  .catch((err: Error) => {
    // Type the error as an Error object
    console.error('❌ MongoDB connection error:', err.message) // Access error message
  })
