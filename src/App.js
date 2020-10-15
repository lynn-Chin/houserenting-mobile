import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Index from './pages/Index';
import MapFind from './pages/MapFind';
import CitySelect from './pages/CitySelect';
import PageNotFound from "./pages/PageNotFound";

class App extends React.Component {
  render () {
    return (
      <div className="App">
        {/* App页面设置Route，用来展示不同的页面 */}
        <HashRouter>
          {/* 
          <ul style={{ position: 'fixed', zIndex: 100, top: 50, lineHeight: 3 }}>
            <li><h2>路由测试用的链接</h2></li>
            <li><Link to="/home">----首页----</Link></li>
            <li><Link to="/home/list">----找房----</Link></li>
            <li><Link to="/home/profile">----我的----</Link></li>
            <li><Link to="/map">----地图找房----</Link></li>
            <li><Link to="/citylist">----城市列表----</Link></li>
          </ul>
          */}
          <Switch>
            <Route exact path="/" component={Index}></Route>
            <Route path="/home" component={Index}></Route>
            <Route path="/map" component={MapFind}></Route>
            <Route path="/citylist" component={CitySelect}></Route>
            <Route component={PageNotFound}></Route>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
