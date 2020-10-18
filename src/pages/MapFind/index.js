import { NavBar, Icon, Toast } from 'antd-mobile'
import React from 'react'
import { connect } from 'react-redux'
import styles from './index.module.scss'

const { BMap } = window;
let map;  // 全局声明地图，方便在不同得方法中使用
let centerName = '';

class MapFind extends React.Component {
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
        /* 1. 加载提示 */
        Toast.loading('数据获取中', 0, true);
        map = new BMap.Map('container'); 
        
        setTimeout(() => {
            // 控件直接渲染，页面会发生错乱，所以将控件写如定时器解决问题
            map.addControl(new BMap.NavigationControl()); 
            map.addControl(new BMap.ScaleControl());
        }, 1000);

        /**
         * 步骤：
         *      1. 显示加载中提示，获取到房源数据后隐藏
         *      2. 发送请求，获取当前城市/区域的房源信息
         *      3. 设置地图中心为区域中心
         *      4. 遍历渲染 (addLayers)
         */

        /* 2. 请求城市：从返回值中结构除value并改名为id */
        const { value: id} = await this.$axios.get(`/area/info?name=${this.props.city}`)
        
        // 请求房源：
        const resource = await this.$axios.get(`http://157.122.54.189:9060/area/map?id=${id}`);
        console.log(resource);
        // 隐藏提示
        Toast.hide();
        /* 4. 渲染地图覆盖物 */
        this.addLayers(resource)
    };
    addLayers = (sourceList) => {
        /* 清除之前的覆盖物 */
        map.clearOverlays()

        /* 3. 将地图中心定位中当前区域 */
        centerName += this.props.city;
        map.centerAndZoom(centerName, 11);
        
        /* 遍历 */
        sourceList.forEach(item => {
            const { label: areaCenter, value: areaId, coord, count} = item;
            var opts = {
                position: new BMap.Point(coord.longitude, coord.latitude), // 指定文本标注所在的地理位置
                offset: new BMap.Size(30, -30) // 设置文本偏移量
            };
            const content = `<div class="map_circle"><span>${areaCenter}</span><span>${count}</span></div>`;
            // 创建文本标注对象
            var label = new BMap.Label(content, opts);
            // 自定义文本标注样式
            label.setStyle({
                color: '#fff',
                backgroundColor: '#23bb78',
                border: 'none',
                padding: '10px',
                fontSize: '16px',
                width: '50px',
                height: '50px',
                textAlign: 'center',
                borderRadius: '50%',
                fontFamily: '微软雅黑'
            });

            /* 添加标记的点击事件 */
            label.addEventListener('click',  () => {
                /* 重新设置地图中心 */
                centerName += areaCenter
                // ⭐百度地图内部不能使用async await
                this.$axios.get(`http://157.122.54.189:9060/area/map?id=${areaId}`).then(res => {
                    console.log('2/3级', res);
                    this.addLayers(res)
                });
                
            });

            map.addOverlay(label);
        });
        
    }
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
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state }
}

export default connect(mapStateToProps)(MapFind);