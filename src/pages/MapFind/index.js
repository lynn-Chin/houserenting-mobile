import { NavBar, Icon } from 'antd-mobile'
import React from 'react'
import { connect } from 'react-redux'
import { newBMap } from '../../utils/mapBaidu'
import styles from './index.module.scss'

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
        newBMap('container', this.props.city)
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