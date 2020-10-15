import { Carousel } from 'antd-mobile'
import React from 'react'
import styles from './index.module.scss'


class Home extends React.Component {
    state = {
        swiperDate: []
    }
    componentDidMount() {
        // this.$axios
        //     .get('/home/swiper')
        //     .then(res => {
        //         console.log(res);
        //         this.setState({ swiperDate: res.data.body })
        //     })
        this.$axios({
            type: 'get',
            url: '/home/swiper'
        }).then(swiperDate => {
            // 封装后的axios获取的只有数据，可以将数据直接复制给swiperDate
            this.setState({ swiperDate })
        })
    }
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
            </>
        )
    }
}

export default Home