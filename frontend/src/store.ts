import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { portfolioCreateReducer } from './reducers/portfolioReducers'
const reducer = combineReducers({
  portfolioCreate: portfolioCreateReducer,
})

const initialState = {}
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
// import {
//   createStore,
//   combineReducers,
//   applyMiddleware,
//   Middleware,
// } from 'redux'
// import thunk, { ThunkMiddleware } from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'

// // define the root state type
// type RootState = {}

// const reducer = combineReducers<RootState>({})

// const initialState: RootState = {}
// const middleware: Array<Middleware<{}, RootState>> = [
//   thunk as ThunkMiddleware<RootState, any>,
// ]

// const store = createStore(
//   reducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// )
// export default store
