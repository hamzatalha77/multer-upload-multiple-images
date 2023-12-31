import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  }
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
}).array('images', 5) // Allow up to 5 images to be uploaded

router.post('/', upload, (req, res) => {
  console.log('req.body:', req.body)
  console.log('req.files:', req.files)
  const fileUrls = req.files.map(
    (file) => `${req.protocol}://${req.get('host')}/${file.path}`
  )

  res.json(fileUrls)
})

export default router
