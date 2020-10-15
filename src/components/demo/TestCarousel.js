import React from 'react'
import { Carousel } from 'antd-mobile';
import styles from './carousel.module.scss'

class TestCarousel extends React.Component {
  state = {
    // data的默认值1,2,3会报错，获取不到数据
    data: [],
    imgHeight: 212,
  }
  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
  }
  render() {
    return (
      <>
        {/* 清空了data的初始值之后，轮播图无法自动播放，所以需要做判断，等data有数据之后再渲染 */}
        {/* 判断时不能直接使用this.state.data.length，因为数字会直接显示再页面中，需要转化成布尔值 */}
        {  !!this.state.data.length && 

            <Carousel
            autoplay
            infinite
          >
            {this.state.data.map(val => (
              <a
                key={val}
                className={styles.swiper_height}
              >
                <img
                  src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                  className={styles.swiper_height}
                />
              </a>
            ))}
          </Carousel>
        }
        
      </>
    );
  }
}

export default TestCarousel