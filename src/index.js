import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import global style
import './styles/global.scss'
import myAxios from './utils/myAxios';


React.Component.prototype.$axios = myAxios;

ReactDOM.render(
    <App />,
  document.getElementById('root')
);


