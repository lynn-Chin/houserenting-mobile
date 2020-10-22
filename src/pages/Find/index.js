import { Icon } from 'antd-mobile'
import React from 'react'
import styles from './index.module.scss'
import Search from '../../components/Search'
import HouseItem from '../../components/HouseItem'

const fakeHouseData = { houseImg: 'https://api-haoke-web.itheima.net/newImg/7bjjanc6g.jpg', title: '合租 · 鑫苑鑫都汇 4室1厅', desc: '四室/110/南/鑫苑鑫都汇', tags: ['近地铁']}

class Find extends React.Component {
    state = {
        filters: [
            { id: 1, name: '区域'},
            { id: 2, name: '方式'},
            { id: 3, name: '租金'},
            { id: 4, name: '筛选'}
        ]
    }
    render () {
        return (
            <>
                {/* 头部 */}
                <div className={styles.header}>
                    <Icon type="left"></Icon>
                    <Search className={styles.find_house}/>
                </div>

                {/* 筛选区 */}
                <div className={styles.find_filter}>
                    {
                        this.state.filters.map(item => <span className={styles.find_filter_item} key={ item.id }>{ item.name }<i className="iconfont icon-arrow"></i></span>)
                    }
                    
                </div>
                {/* 列表 */}
                {
                    [12, 34, 5, 56,78,6778, 87].map(item => <HouseItem key={item} { ...fakeHouseData }/>)
                }
            </>
        )
    }
}

export default Find