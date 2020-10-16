import React from 'react';
import { connect } from 'react-redux';
import styles from './index.module.scss';

class Search extends React.Component {
    render () {
        return (
            <div className={styles.index_swiper}>
                <div className={styles.search}>
                        <div className={styles.search_bar}>
                                <div className={styles.bar_city}>{this.props.city}<i className="iconfont icon-arrow"></i></div>
                                <div className={styles.bar_input}>
                                    <i className="iconfont icon-seach"></i>
                                    <span> 请输入区域</span>
                                </div>
                            </div>
                        <i className={`iconfont icon-map ${styles.search_map}`}></i>
                 </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state }
}

export default connect(mapStateToProps)(Search);