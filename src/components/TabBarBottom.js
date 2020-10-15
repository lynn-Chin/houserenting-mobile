import React from 'react';
import { TabBar } from 'antd-mobile';

class TabBarBottom extends React.Component {
  state = {
      selectedTab: 'redTab',
      hidden: false,
      fullScreen: false,
    };
  

  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        pageText: { pageText }
      </div>
    );
  }

  render() {
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#f8B500"
          barTintColor="#dffff5"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="Life"
            key="Life"
            icon={<i className="iconfont icon-ind" />
            }
            selectedIcon={<i className="iconfont icon-ind" />
            }
            selected={this.state.selectedTab === 'blueTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
            data-seed="logId"
          >
            {this.renderContent('Life')}
            {/* 这里的内容传递给了pageText */}
          </TabBar.Item>
          
          <TabBar.Item
            icon={<i className="iconfont icon-findHouse" />
            }
            selectedIcon={<i className="iconfont icon-findHouse" />
            }
            title="Friend"
            key="Friend"
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
            }}
          >
            {this.renderContent('Friend')}
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-my" />}
            selectedIcon={<i className="iconfont icon-my" />}
            title="My"
            key="my"
            dot
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              });
            }}
          >
            {this.renderContent('My')}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default TabBarBottom;