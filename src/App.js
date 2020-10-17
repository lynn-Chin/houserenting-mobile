import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Index from './pages/Index';
import MapFind from './pages/MapFind';
import CitySelect from './pages/CitySelect';
import PageNotFound from "./pages/PageNotFound";
// import { GETCITY } from './store/actions/actionType'
import { connect } from 'react-redux';
import { getCityName } from './store/actions/actionCreator';

class App extends React.Component {
  componentDidMount () {
    this.props.getCity()
  }
  render () {
    return (
      <div className="App">
        {
          this.props.city !== '全国' && 
            <HashRouter>
              <Switch>
                <Route exact path="/" component={Index}></Route>
                <Route path="/home" component={Index}></Route>
                <Route path="/map" component={MapFind}></Route>
                <Route path="/citylist" component={CitySelect}></Route>
                <Route component={PageNotFound}></Route>
              </Switch>
          </HashRouter>
        }

      </div>
        
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCity: () => {
      dispatch(getCityName())
    }
  }
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
