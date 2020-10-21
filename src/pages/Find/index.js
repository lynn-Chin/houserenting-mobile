import { Icon } from 'antd-mobile'
import React from 'react'
import styles from './index.module.scss'
import Search from '../../components/Search'

class Find extends React.Component {
    render () {
        return (
            <>
                {/* 头部 */}
                <div className={styles.header}>
                    <Icon type="left"></Icon>
                    <Search className={styles.find_house}/>
                </div>

                {/* 筛选区 */}

                {/* 列表 */}
            </>
        )
    }
}

export default Find