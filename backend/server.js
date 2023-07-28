import dotenv from 'dotenv'
import path from 'path'
import express from 'express'
import connectDB from './config/db.js'
import bodyParser from 'body-parser'
import colors from 'colors'
import portfolioRoutes from './routes/portfolioRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleWare.js'
import uploadRoutes from './routes/uploadRoutes.js'
import cors from 'cors'
dotenv.config()

connectDB()

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/portfolios', portfolioRoutes)
app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
