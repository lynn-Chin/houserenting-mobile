import { NavBar, Icon, Toast } from 'antd-mobile'
import React from 'react'
import { connect } from 'react-redux'
import HouseItem from '../../components/HouseItem';
import styles from './index.module.scss'

const { BMap } = window;
let map;  // 全局声明地图，方便在不同得方法中使用
let centerName = '';
let level = 0;

class MapFind extends React.Component {
    state = {
        isShowList: false,
        houseList: []
    }
    componentDidMount () {
        /**
         * 这个方法只会在初始化时调用，props或state更改，这个方法不会调用
         *      1. 第一次获取城市名称，获取的是默认值：全国
         *      2. 第二次定位到具体城市后，componentDidMount不再调用
         * 解决方案：
         *   ❌1. componentDidUpdate，每次更新后都可以获取到props数据： 需要做判断， 每次更新都重新生成地图
         *   ✔ 2. 在APP.js中做判断，如果地图是定位获取的城市，才生成路由
         */
        this.newBMap();
    }
    newBMap = async () => {
        /* 加载提示 */
        Toast.loading('数据获取中', 0, true);

        /* 生成地图 */
        map = new BMap.Map('container'); 
        map.addControl(new BMap.NavigationControl()); 
        setTimeout(() => {
            // 比例尺控件直接渲染，页面会发生错乱，所以将控件写如定时器解决问题
            map.addControl(new BMap.ScaleControl());
        }, 5000);

        /* 请求城市：从返回值中结构除value并改名为id */
        const { value: id} = await this.$axios.get(`/area/info?name=${this.props.city}`)
        // 请求房源：
        const resource = await this.$axios.get(`http://157.122.54.189:9060/area/map?id=${id}`);
        console.log(resource);

        // 隐藏提示
        Toast.hide();

        /* 渲染地图覆盖物 */
        this.addLayers(resource)
    };
    addLayers = (sourceList) => {
        /* 清除之前的覆盖物 */
        map.clearOverlays()

        // 当前数据层级
        level += 1;

        /* 将地图中心定位中当前区域 */
        centerName += this.props.city;
        map.centerAndZoom(centerName, 11);
        
        /* 遍历 */
        sourceList.forEach(item => {
            const { label: areaCenter, value: areaId, coord, count} = item;

            var opts = {
                position: new BMap.Point(coord.longitude, coord.latitude), // 指定文本标注所在的地理位置
                offset: new BMap.Size(30, -30) // 设置文本偏移量
            };
            const content = `<div class="${level === 3 ? 'map_rect' : 'map_circle'}"><span>${areaCenter}</span><span>${count}</span></div>`;
            
            var label = new BMap.Label(content, opts);    // 创建文本标注对象
            label.setStyle({
                // 其他样式通过自定义类名实现
                backgroundColor: 'transparent',
                border: 'none',
            });

            /* 添加标记的点击事件 */
            // 因为数据结构只有三级，所以只有层级小于3才能继续进入下一层；到达第三级数据，再点击即获取房屋列表
            label.addEventListener('click',  (e) => {
                // ⭐百度地图内部不能使用async await
                if (level < 3 ) {
                    /* 重新设置地图中心 */
                    centerName += areaCenter
                    this.$axios.get(`http://157.122.54.189:9060/area/map?id=${areaId}`).then(res => {
                        this.addLayers(res) 
                    });
                } else {
                    console.log(areaId);
                    this.getLevel3Houses(areaId).then(res => {
                        // 存储房屋数据并显示房屋列表组件
                        this.setState({ houseList: res.list, isShowList: true })
                        
                    })
                }
            });

            map.addOverlay(label);
        });
        
    };
    getLevel3Houses = (areaID) => {
        return this.$axios.get('/houses?name=' + areaID);
    };
    render () {
        console.log(this.props);
        return (
                <div className={styles.mapfind}>
                    {/* 头部组件 */}
                    <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                    >地图找房</NavBar>

                    {/* 地图容器 */}
                    <div className={styles.map_box} id='container'>
                    </div>

                    {/* 房屋列表 */}
                    <div className={styles.house_list} hidden={!this.state.isShowList}>
                        <div className={styles.house_list_title}>
                            <h3>房屋列表</h3>
                            <span>更多房源</span>
                        </div>
                        <div className={styles.list_content}>
                            {
                                this.state.houseList.length > 0 && this.state.houseList.map(item => <HouseItem { ...item } key={item.houseCode}/>)
                            }
                        </div>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state }
}

export default connect(mapStateToProps)(MapFind);