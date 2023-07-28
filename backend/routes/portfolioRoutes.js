import express from 'express'
import {
  createPortfolio,
  getPortfolios
} from '../controllers/portfolioController.js'
import multer from 'multer'
const router = express.Router()
const upload = multer()
router.route('/').get(getPortfolios).post(createPortfolio)
// router.route('/add').post(createPortfolio)
export default router
