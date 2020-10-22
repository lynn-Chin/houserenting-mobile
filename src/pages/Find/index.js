import { Icon, PickerView } from 'antd-mobile'
import React from 'react'
import styles from './index.module.scss'
import Search from '../../components/Search'
import HouseItem from '../../components/HouseItem'
import { connect } from 'react-redux'

const fakeHouseData = { houseImg: 'https://api-haoke-web.itheima.net/newImg/7bjjanc6g.jpg', title: '合租 · 鑫苑鑫都汇 4室1厅', desc: '四室/110/南/鑫苑鑫都汇', tags: ['近地铁']}

class Find extends React.Component {
    state = {
        filters: [
            { index: 0, name: '区域', cols: 3},
            { index: 1, name: '方式', cols: 1},
            { index: 2, name: '租金', cols: 1},
            { index: 3, name: '筛选', cols: 0}
        ],
        pickerData: [],
        moreFilterCondition: [],
        activeFilterIndex: -1
    };
    hideFilters =() => {
        this.setState({ activeFilterIndex: -1})
    };
    changeIndex = (index) => {
        this.setState({ activeFilterIndex: index})
    };
    componentDidMount () {
        this.getHouseConditions();
        
    };
    getHouseConditions = async () => {
        /* 获取房屋的查询条件 */
        const { value: areaID } = await this.$axios.get(`/area/info?name=${this.props.city}`);
        // console.log(areaID);
        const { area, characteristic, floor, oriented, price, rentType, roomType, subway } = await this.$axios.get('/houses/condition', { params: { id: areaID }});
       
        /* 根据pickweview需要的数据重新设计筛选条件 */
        const pickerData = [[], [], []];
        pickerData[0] = [area, subway];
        pickerData[1] = rentType;
        pickerData[2] = price;
        const moreFilterCondition = [ roomType, floor, oriented, characteristic ]

        this.setState({ pickerData, moreFilterCondition })
    }
    render () {
        return (
            <>
                {/* 头部 */}
                <div className={styles.header}>
                    <Icon type="left"></Icon>
                    <Search className={styles.find_house}/>
                </div>

                {/* 遮罩层：筛选框弹出后，遮罩防止用户点击其他内容 */}
                <div 
                className={[styles.mask, this.state.activeFilterIndex === -1 ? styles.mask_hidden : ''].join(' ')}
                onClick={this.hideFilters}
                >
                </div>
                
                {/* 筛选区 */}
                <div className={[
                    styles.find_filter,
                    this.state.activeFilterIndex > -1 ? styles.filters_active : ''].join(' ')
                }>
                    {
                        this.state.filters.map(item => <span 
                            onClick={() => { this.changeIndex(item.index) }}
                            className={[
                                styles.find_filter_item, 
                                item.index === this.state.activeFilterIndex ? styles.filter_active_tab : ''].join(' ')} 
                            key={ item.id }>
                                { item.name }<i className="iconfont icon-arrow"></i>
                            </span>)
                    }
                    {/* pickerView  */}
                    {
                        this.state.activeFilterIndex > -1 && this.state.activeFilterIndex  < 3 && 
                        <div className={styles.picker_box}>
                            <PickerView 
                                data={this.state.pickerData[this.state.activeFilterIndex]}
                                cols={this.state.filters[this.state.activeFilterIndex].cols}
                                cascade
                            />
                            <div className={styles.picker_box_btn}>
                                <button className={styles.picker_cancel} onClick={this.hideFilters}>取消</button>
                                <button className={styles.picker_confirm}>确认</button>
                            </div>
                        </div>
                    }
                    
                </div>
                {/* 列表 */}
                <div className={styles.house_list}>
                    {
                        [12, 34, 5, 56,78,6778, 87].map(item => <HouseItem key={item} { ...fakeHouseData }/>)
                    }
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state }
}

export default connect(mapStateToProps)(Find);