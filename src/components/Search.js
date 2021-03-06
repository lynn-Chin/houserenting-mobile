import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './index.module.scss';

class Search extends React.Component {
    render () {
        return (
                // 在父组件引入组件后，使用类名，需要在子组件内通过this.props接收，然后添加给子组件
                <div className={[styles.search, this.props.className].join(' ')}>
                        <div className={styles.search_bar}>
                                <div className={styles.bar_city} onClick={() => {this.props.history.push('/citylist')}}>{this.props.city}<i className="iconfont icon-arrow"></i></div>
                                <div className={styles.bar_input}>
                                    <i className="iconfont icon-seach"></i>
                                    <span> 请输入区域</span>
                                </div>
                            </div>
                        {/* react中只有<route component={}></route>的组件才有路由对象 */}
                        {/* 普通对象想要拥有路由对象有两个方法：1. 父组件传入， 2. withRouter */}
                        <i className={`iconfont icon-map ${styles.search_map}`} onClick={ () => this.props.history.push('/mapfind') }></i>
                 </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state }
}

export default withRouter(connect(mapStateToProps)(Search));