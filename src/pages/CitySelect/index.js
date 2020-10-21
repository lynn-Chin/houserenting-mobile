import React from 'react';
import { connect } from 'react-redux';
import styles from './index.module.scss';
// 引入react-virtualized需要的组件
import ReactDOM from 'react-dom';
import {List} from 'react-virtualized';
import { NavBar, Icon, Toast } from 'antd-mobile';
import { changeCityName } from '../../store/actions/actionCreator';

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
        cityList: [],
        listTitles: [],
        activeIndex: 0
    }
    componentDidMount () {
        this.createCityList();
    };
    createCityList = async () => {
        const list = [];

        /* 当前城市 */
        const { value} = await this.$axios.get(`/area/info?name=${this.props.city}`)
        list.push({ title: '当前城市', children: [
            {
                city: this.props.city,
                value
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

        this.getListTitles(list);  
        this.setState({ cityList: list})

    };
    /* 根据已经重写的城市列表，生成目录列表*/
    getListTitles = (list) => {
        const listTitles = list.map(item => item.title);
        listTitles.splice(0, 2, '#', '热');
        this.setState({ listTitles })
    };
    /* 右侧列表被点击时更改activeIndex, 虚拟列表会跳到相应位置 */
    catalogClicked = (index) => {
        console.log(index);
        this.setState({ activeIndex: index})
        this.ListRef.current.scrollToRow(index);
    };
    /* 点击列表内的城市名称，切换城市；只有热门城市里的城市可以获取到数据，其他城市提示用户没有数据 */
    changeCity = (item) => {
        
        const hotList = [ ...this.state.cityList[1].children ]
        console.log(hotList);
        const index = hotList.findIndex((ele) => ele.city == item.city);

        if (index === -1) {
            Toast.info('该城市房源获取中，请期待…')
        } else {
            this.props.changeCityName(item.city);
            this.props.history.push('/home');
        }
    };
    /* 虚拟列表的渲染函数 */
    rowRenderer = (({ key, index, isScrolling, isVisible, style, }) => {
        const { cityList } = this.state;
        return (
              <div className={styles.virtList_item} key={key} style={style}>
                  <div className={styles.item_title}>
                    {cityList[index].title}
                  </div>
                  {
                      cityList[index].children.map(item =>  {
                        return <div className={styles.item_child} key={item.value} onClick={ () => { this.changeCity(item)}}>
                            { item.city }
                        </div>
                    })
                  }
                  <div className={styles.item_child}>

                  </div>
              </div>
        )
    });
    /* 根据数据动态设置每一行的高度 */
    rowHeight = ({ index }) => {
        return 36 + 50 * this.state.cityList[index].children.length;
    };
    /* 列表滚动时动态更改activeIndex，以达到与右侧目录同步的效果 */
    onRowsRendered = ({ overscanStartIndex, overscanStopIndex, startIndex, stopIndex }) => {
        
        if (startIndex === this.state.activeIndex) {
            // console.log('startindex', startIndex);
            this.setState({ activeIndex: startIndex })
        }
    };
    /* 创建List的ref关联, 使点击目录时列表能够安全滚动到预期位置 */
    ListRef = React.createRef();
    render () {
        // console.log('rendered', this.state.activeIndex);
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
                    // scrollToIndex={this.state.activeIndex}
                    scrollToAlignment={'start'}
                    onRowsRendered={this.onRowsRendered}
                    ref={this.ListRef}
                />

                {/* 右侧目录 */}
                <div className={styles.catalog}>
                    {
                        this.state.listTitles.map((item, index) => 
                        <span 
                        key={item} 
                        onClick={() => { this.catalogClicked(index) }}
                        className={index === this.state.activeIndex ? styles.active : ''}
                        >
                            {item}
                        </span>)
                    }
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeCityName: (city) => {
            dispatch(changeCityName(city))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CitySelect);