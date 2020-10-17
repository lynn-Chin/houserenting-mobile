import { createStore, combineReducers, applyMiddleware } from 'redux'

import mapReducer from './reducers/mapReducer'
import reduxThunk from 'redux-thunk'

const store = createStore(mapReducer, applyMiddleware(reduxThunk));

export default store;