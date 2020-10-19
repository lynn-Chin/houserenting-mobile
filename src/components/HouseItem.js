import React from 'react';
import myAxios from '../utils/myAxios';
import styles from './index.module.scss'

const baseURL = myAxios.defaults.baseURL;

function HouseItem (props) {
    console.log(props);
    return (
        <div className={styles.list_item}>
            <img src={props.houseImg.indexOf('http') == -1 ? baseURL + props.houseImg : props.houseImg} alt="房屋图片" />
            <div className={styles.list_item_info}>
                <div className={styles.info_head}>{ props.title }</div>
                <div className={styles.info_subhead}>{ props.desc }</div>
                <div className={styles.info_tags}>
                    {
                        props.tags.map(item => <span className={styles.tags_item} key={ item }>{ item }</span>)
                    }
                </div>
                <div className={styles.info_price}>
                    <b>{ props.price }</b> 元/月
                </div>
            </div>
        </div>
    )
}

export default HouseItem;