import { Carousel } from 'antd-mobile'
import React from 'react'
import styles from './index.module.scss'
// React中的本地图片引入要通过import的方式，不能直接在img src里面写路径
import pic1 from '../../assets/images/nav-1.png'
import pic2 from '../../assets/images/nav-2.png'
import pic3 from '../../assets/images/nav-3.png'
import pic4 from '../../assets/images/nav-4.png'
import Search from '../../components/Search'



class Home extends React.Component {
    state = {
        swiperDate: [],
        group: [],
        newsList: [],
        navList: [{
            pic: pic1,
            title: '整租'
        }, {
            pic: pic2,
            title: '合租'
        }, {
            pic: pic3,
            title: '地图找房'
        }, {
            pic: pic4,
            title: '去出租'
        }]
        
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
                    {/* 搜索框 */}
                    <Search />
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
                <div className={styles.entry}>
                    {/* w: 320, h: 91 */}
                    {
                        this.state.navList.map(item => {
                            return (
                                    <a className={styles.entryItem} key={item.title}>
                                        <img src={item.pic} className={styles.entryIcon}/>
                                        <span className={styles.entryTitle}>{item.title}</span>
                                    </a>
                            )
                        })
                    }
                </div>

                {/* 租房小组部分 */}
                <div className={styles.group}>
                    <div className={styles.group_header}>
                        <h3 className={styles.group_title}>租房小组</h3>
                        <p className={styles.group_more}>更多</p>
                    </div>
                    <div className={styles.group_main}>
                        {
                            this.state.group.map(item => {
                                return (
                                    <div className={styles.group_item} key={item.id}>
                                        <div className={styles.group_info}>
                                            <h4 className={styles.item_title}>{ item.title }</h4>
                                            <p className={styles.item_desc}>{ item.desc }</p>
                                        </div>
                                        <img src={ "http://157.122.54.189:9060" + item.imgSrc } />
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                </div>

                {/* 最新资讯 */}
                <div className={styles.news}>
                    <div className={styles.news_title}>最新资讯</div>
                    <div className={styles.news_main}>
                        {
                            this.state.newsList.map(item => {
                                return (
                                    <div className={styles.news_item} key={item.id}>
                                        <img src={"http://157.122.54.189:9060" + item.imgSrc} className={styles.news_pic}/>
                                            <div className={styles.news_info}>
                                                <div className={styles.news_item_title}>{ item.title }</div>
                                                <div className={styles.news_source}>
                                                <span className={styles.news_source_name}>{ item.date }</span>
                                                <span className={styles.news_source_date}>{ item.from }</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default Home