import React from 'react'
import { TabBar } from 'antd-mobile';
import { Route, Redirect } from "react-router-dom";

import Home from "../Home";
import Find from "../Find";
import User from "../User";


class Index extends React.Component {
    // 生命周期函数 render
    render() {
      console.log('路由对象打印测试', this.props);
      // 解构用于做路由对象的 history 和 location
      // history.push(用于跳转页面)   history.
      const { history, location } = this.props;
      return (
        <>
          {/* 路由组件 */}
          <Redirect exact path="/" to="/home"></Redirect>
          <Route exact path="/home" component={Home}></Route>
          <Route path="/home/list" component={Find}></Route>
          <Route path="/home/profile" component={User}></Route>
  
          {/* TabBar 组件 */}
          <div style={{ position: 'fixed', height: 50, width: '100%', bottom: 0 }}>
            <TabBar
              unselectedTintColor="#949494"
              tintColor="#21B97A"
              barTintColor="white"
            >
              <TabBar.Item
                title="首页"
                key="首页"
                icon={<i className="iconfont icon-ind" />}
                selectedIcon={<i className="iconfont icon-ind" />}
                selected={location.pathname === '/home'}
                onPress={() => { history.push('/home'); }}
              >
              </TabBar.Item>
              <TabBar.Item
                title="找房"
                key="找房"
                icon={<i className="iconfont icon-findHouse" />}
                selectedIcon={<i className="iconfont icon-findHouse" />}
                selected={location.pathname === '/home/list'}
                onPress={() => { history.push('/home/list'); }}
              >
              </TabBar.Item>
              <TabBar.Item
                title="我的"
                key="我的"
                icon={<i className="iconfont icon-my" />}
                selectedIcon={<i className="iconfont icon-my" />}
                selected={location.pathname === '/home/profile'}
                onPress={() => { history.push('/home/profile'); }}
              >
              </TabBar.Item>
            </TabBar>
          </div>
        </>
  
      );
    }
  }

export default Index