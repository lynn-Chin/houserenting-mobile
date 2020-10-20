import React from 'react';
import { connect } from 'react-redux';
import styles from './index.module.scss';
// 引入react-virtualized需要的组件
import ReactDOM from 'react-dom';
import {List} from 'react-virtualized';
import { NavBar, Icon } from 'antd-mobile';

/**
 * 难点：将多个数据组合成适合渲染的解构
 *    expected sturcture : [
 *          { title: '当前城市', children: ['广州'] },
 *          { title: '热门城市', children: ['广州', '北京'] },
 *          { title: 'A', children: ['安庆'] },
 *          { title: 'B', children: ['北京',] },
 *    ]
 */

class CitySelect extends React.Component {
    state = {
        cityList: []
    }
    componentDidMount () {
        this.createCityList();
    };
    createCityList = async () => {
        const list = [];

        /* 当前城市 */
        list.push({ title: '当前城市', children: [
            {
                city: this.props.city,
                value: '1'
            }
        ]})
        /* 热门城市 */
        const hotcity = await this.$axios.get('/area/hot');
        list.push({ 
            title: '热门城市', 
            children: hotcity.map(item => ({ city: item.label, value: item.value}))
        })

        /* 普通城市 */
        const allCity = await this.$axios.get('/area/city?level=1');
        // 对普通城市进行排序
        allCity.sort((a, b) => a.pinyin > b.pinyin ? 1 : -1)
        // 遍历生成需要的解构并添加到list中
        allCity.forEach(item => {
            const firstLetter = item.pinyin.charAt(0).toUpperCase();
            const index = list.findIndex(item2 => firstLetter === item2.title);

            if (index === -1) {
                list.push({
                    title: firstLetter,
                    children: [{ city: item.label, value: item.value}]
                })
            } else {
                list[index].children.push({ city: item.label, value: item.value})
            }
            
        })

        this.setState({ cityList: list})

    };
    rowRenderer = (({ key, index, isScrolling, isVisible, style, }) => {
        const { cityList } = this.state;
        return (
              <div className={styles.virtList_item} key={key}>
                  <div className={styles.item_title}>
                    {cityList[index].title}
                  </div>
                  {
                      cityList[index].children.map(item =>  {
                        return <div className={styles.item_child} key={item.value} onClick={ () => { console.log(item)}}>
                            { item.city }
                        </div>
                    })
                  }
                  <div className={styles.item_child}>

                  </div>
              </div>
        )
    });
    rowHeight = ({ index }) => {
        return 36 + 50 * this.state.cityList[index].children.length;
    }
    render () {
        console.log('render函数打印citylist', this.state.cityList);
        return (
            <>
                {/* 头部组件 */}
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.go(-1) }}
                >选择城市</NavBar>

                {/* 虚拟列表 */}
                <List
                    width={window.screen.width}
                    height={window.screen.height - 45}
                    rowCount={this.state.cityList.length}
                    rowHeight={this.rowHeight}
                    rowRenderer={this.rowRenderer}
                />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state }
}

export default connect(mapStateToProps)(CitySelect);