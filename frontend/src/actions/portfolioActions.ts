// import { Dispatch } from 'redux'
// import axios from 'axios'
// import {
//   PORTFOLIOS_CREATE_REQUEST,
//   PORTFOLIOS_CREATE_SUCCESS,
//   PORTFOLIOS_CREATE_FAIL,
// } from '../constants/portfolioConstants'

// export const createPortfolio =
//   (portfolioData: any) =>
//   async (dispatch: Dispatch): Promise<any> => {
//     try {
//       dispatch({ type: PORTFOLIOS_CREATE_REQUEST })

//       // Make API call using axios
//       const { data } = await axios.post('/api/portfolios', portfolioData)

//       dispatch({
//         type: PORTFOLIOS_CREATE_SUCCESS,
//         payload: data,
//       })

//       return { success: true } // Return an action object
//     } catch (error: any) {
//       dispatch({
//         type: PORTFOLIOS_CREATE_FAIL,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       })

//       return { success: false } // Return an action object
//     }
//   }
import axios from 'axios'
import { Dispatch } from 'redux'
import {
  PORTFOLIOS_CREATE_REQUEST,
  PORTFOLIOS_CREATE_SUCCESS,
  PORTFOLIOS_CREATE_FAIL,
} from '../constants/portfolioConstants'

export const createPortfolio =
  (portfolio: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: PORTFOLIOS_CREATE_REQUEST })

      const { data } = await axios.post(`/api/portfolios`, portfolio)

      dispatch({ type: PORTFOLIOS_CREATE_SUCCESS, payload: data })
    } catch (error: any) {
      console.error(error)
      dispatch({
        type: PORTFOLIOS_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
