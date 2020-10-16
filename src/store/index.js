import { createStore, combineReducers, applyMiddleware } from 'redux'

import mapReducer from './reducers/mapReducer'

const store = createStore(mapReducer);

export default store;