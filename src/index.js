import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import global style
import './styles/global.scss'
import Axios from 'axios'

React.Component.prototype.$axios = Axios.create({
  baseURL: 'http://157.122.54.189:9060'
})

ReactDOM.render(
    <App />,
  document.getElementById('root')
);


