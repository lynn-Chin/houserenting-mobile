import { Carousel } from 'antd-mobile'
import React from 'react'
import styles from './index.module.scss'


class Home extends React.Component {
    state = {
        swiperDate: [],
        group: [],
        newsList: []
        
    }
    componentDidMount() {
        this.getSwiper();
        this.getGroup();
        this.getNews();
        
    }
    getSwiper = () => {
        this.$axios.get('/home/swiper').then(swiperDate => {
            // 封装后的axios获取的只有数据，可以将数据直接复制给swiperDate
            this.setState({ swiperDate })
        })
    };
    getGroup = () => {
        this.$axios.get('/home/groups?area=AREA%7C88cff55c-aaa4-e2e0').then(group => {
            this.setState({ group })
        })
    };
    getNews = () => {
        this.$axios.get('/home/news?area=AREA%7C88cff55c-aaa4-e2e0').then(newsList => {
            this.setState({ newsList })
        })
    };
    render () {
        return (
            <>
                {/* 轮播图分区 */}
                <div className={styles.index_swiper}>
                {  !!this.state.swiperDate.length && 
                    <Carousel
                    autoplay
                    infinite
                    >
                    {this.state.swiperDate.map(val => (
                      <a
                        key={val.id}
                        className={styles.swiper_height}
                      >
                        <img
                          src={'http://157.122.54.189:9060' + val.imgSrc}
                          className={styles.swiper_height}
                        />
                      </a>
                    ))}
                    </Carousel>
                    }
                </div>
                {/* 首页入口 */}
            </>
        )
    }
}

export default Home