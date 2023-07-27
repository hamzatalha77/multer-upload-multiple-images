import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { createPortfolio } from '../actions/portfolioActions'
import { PORTFOLIOS_CREATE_RESET } from '../constants/portfolioConstants'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

interface RootState {
  portfolioCreate: {
    loading: boolean
    success: boolean
    error: boolean
    // ... other properties
  }
}

const PortfolioCreateScreen = () => {
  const [name, setName] = useState('')
  const [github, setGithub] = useState('')
  const [live, setLive] = useState('')
  const [images, setImages] = useState<string[]>([])
  const navigate = useNavigate()
  const dispatch = useDispatch<Dispatch<any>>()

  const portfolioCreate = useSelector(
    (state: RootState) => state.portfolioCreate
  )

  const { success: successCreate, error: errorCreate } = portfolioCreate

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PORTFOLIOS_CREATE_RESET })
      navigate('/pushme')
    }
  }, [dispatch, successCreate, errorCreate, navigate])

  const uploadFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target as HTMLInputElement
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const filesArray: File[] = Array.from(fileInput.files)
      const formData = new FormData()
      filesArray.forEach((file, index) => {
        formData.append('images', file) // Use 'images' as the field name
      })
      console.log(formData)
      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        // await axios.post('/api/upload', formData, config)
        const { data } = await axios.post('/api/upload', formData, config)

        setImages(data) // data should be an array of image file paths
      } catch (error) {
        console.error(error)
      }
    }
  }

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      createPortfolio({
        name,
        github,
        live,
        images
      })
    )
  }

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Project name..."
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Github code source..."
        name="github"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
      />
      <input
        type="text"
        placeholder="Project Url..."
        name="live"
        value={live}
        onChange={(e) => setLive(e.target.value)}
      />
      <div>
        {/* Display the selected images */}
        {images.map((imagePath) => (
          <img
            key={imagePath}
            src={imagePath}
            alt="Uploaded"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
        ))}
      </div>
      <input type="file" multiple onChange={uploadFileHandler} />
      <button type="submit">Send!</button>
    </form>
  )
}

export default PortfolioCreateScreen
