import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import Portfolio from './model/portfolioModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()
