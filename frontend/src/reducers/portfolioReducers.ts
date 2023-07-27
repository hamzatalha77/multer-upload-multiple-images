import {
  PORTFOLIOS_CREATE_REQUEST,
  PORTFOLIOS_CREATE_SUCCESS,
  PORTFOLIOS_CREATE_FAIL,
  PORTFOLIOS_CREATE_RESET,
} from '../constants/portfolioConstants'

interface PortfolioAction {
  type: string
  payload?: any
}

export const portfolioCreateReducer = (state = {}, action: PortfolioAction) => {
  switch (action.type) {
    case PORTFOLIOS_CREATE_REQUEST:
      return { loading: true }
    case PORTFOLIOS_CREATE_SUCCESS:
      return { loading: false, success: true, portfolio: action.payload }
    case PORTFOLIOS_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case PORTFOLIOS_CREATE_RESET:
      return {}
    default:
      return state
  }
}
