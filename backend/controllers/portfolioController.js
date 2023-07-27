import asyncHandler from 'express-async-handler'
import Portfolio from '../model/portfolioModel.js'

const getPortfolios = asyncHandler(async (req, res) => {
  const portfolios = await Portfolio.find({})
  res.json(portfolios)
})

const createPortfolio = asyncHandler(async (req, res) => {
  try {
    const portfolio = new Portfolio({
      name: req.body.name,
      github: req.body.github,
      live: req.body.live,
      images: req.body.images // Assuming you've updated the frontend to send an array of image file paths
    })
    console.log(req.body.images)
    const createdPortfolio = await portfolio.save()
    res.status(201).json(createdPortfolio)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export { getPortfolios, createPortfolio }
