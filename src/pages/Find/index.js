import { Icon, PickerView } from 'antd-mobile'
import React, { Fragment } from 'react'
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
        activeFilterIndex: -1,
        selectedFilters: [[], [], [], []],
        cityID: '',
        houseList: []
    };
    /* 发动请求获取房屋列表 */
    getHouseList = async () => {
        const params = this.getReqParams();
        const { cityID } = this.state;
        const { list } = await this.$axios.get('/houses', { params: { cityID, ...params }});
        // console.log(houseList);
        this.setState({ houseList: list });
        this.hideFilters();
    };
    /* 根据已有的selectedFilters 数据，生成格式正确的请求参数 */
    getReqParams = () => {
        /**
         * ✨已有数据和期望数据格式
         * 1. 区域 ['area', 'xxxx', 'xxxxx]  🛠  area: xxx
         * 2. 方式 ['sss']  🛠  rentType: sss
         * 3. 价格 ['sss']  🛠  price: sss
         * 4. 更多筛选条件 ['aaa'. 'aaa', 'aaa']    🛠  more: aaa,aaa,aaa
         */
         const { selectedFilters } = this.state;

         const key = selectedFilters[0][0];
         const value = ['null', undefined].includes(selectedFilters[0][2]) ? selectedFilters[0][1] : selectedFilters[0][2];
         console.log(key, value);
        
         const params = {
             [key]: value,
             rentType: selectedFilters[1][0],
             price: selectedFilters[2][0],
             more: selectedFilters[3].join(',')
         }

         return params;
    };
    /* pickerview改变时，更新selectedFilters数据 */
    pickerViewChange = (value) => {
        const { activeFilterIndex, selectedFilters } = this.state;
        selectedFilters[activeFilterIndex] = value;

        this.setState({ selectedFilters }, () => {
            console.log(this.state);
        })
    };
    clearMoreFilters = () => {
        const selectedFilters = [ ...this.state.selectedFilters ];
        selectedFilters[3] = [];
        this.setState({ selectedFilters });
        this.hideFilters();
    };
    addMoreFilters = (val) => {
        console.log(val);
        const selectedFilters = [...this.state.selectedFilters];

        const index = selectedFilters[3].findIndex(item => item === val);

        if (index === -1) {
            // 不存在则添加
            selectedFilters[3].push(val);
        } else {
            // 存在则删除
            selectedFilters[3].splice(index, 1);
        }

        this.setState({ selectedFilters });
        
    };
    hideFilters =() => {
        this.setState({ activeFilterIndex: -1})
    };
    changeIndex = (index) => {
        this.setState({ activeFilterIndex: index})
    };
    componentDidMount () {
        this.getHouseConditions();
        this.getHouseList();
        
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
        const moreFilterCondition = [ 
            { title: '房型', children: roomType }, 
            { title: '楼层', children: floor }, 
            { title: '朝向', children: oriented }, 
            { title: '亮点', children: characteristic} 
        ]

        this.setState({ pickerData, moreFilterCondition, cityID: areaID})
    }
    renderFilterBox = () => {
        const { activeFilterIndex } = this.state;

        switch (activeFilterIndex) {
            case 0:
            case 1:
            case 2:
                return <div className={styles.picker_box}>
                            <PickerView 
                                data={this.state.pickerData[this.state.activeFilterIndex]}
                                cols={this.state.filters[this.state.activeFilterIndex].cols}
                                cascade
                                onChange={(val) => this.pickerViewChange(val)}
                                // value必写，不然添加onChange事件。滚动选中会立马退回到不限
                                value={this.state.selectedFilters[this.state.activeFilterIndex]}
                            />
                            <div className={styles.picker_box_btn}>
                                <button className={styles.picker_cancel} onClick={this.hideFilters}>取消</button>
                                <button className={styles.picker_confirm} onClick={this.getHouseList}>确认</button>
                            </div>
                        </div>
            case 3:
                return <div className={styles.more_condition}>
                            <div className={styles.condition_box}>
                                {
                                    this.state.moreFilterCondition.map(item => {
                                        return (<Fragment key={item.title}>
                                            {/* Fragment标签与<>便签的区别：Fragment标签可以设置key值 */}
                                            <div className={styles.item_header}>{ item.title }</div>
                                            <div className={styles.item_choices}>
                                                {
                                                    item.children.map(val => <span 
                                                        onClick={() => {this.addMoreFilters(val.value)}}
                                                        className={[
                                                            styles.item_choice_tag, 
                                                            this.state.selectedFilters[3].includes(val.value) ? styles.active_tag : '']
                                                            .join(' ')} 
                                                        key={val.value}>{ val.label }
                                                        </span>)
                                                }
                                            </div>
                                        </Fragment>)
                                    })
                                }
                            </div>
                            <div className={styles.more_condition_btn}>
                                <button className={styles.picker_cancel} onClick={this.clearMoreFilters}>清除</button>
                                <button className={styles.picker_confirm} onClick={this.hideFilters}>确认</button>
                            </div>
                        </div>
            default:
                return <></>
        }
    };
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
                    {/* 筛选按钮 */}
                    {
                        this.state.filters.map(item => <span 
                            onClick={() => { this.changeIndex(item.index) }}
                            className={[
                                styles.find_filter_item, 
                                item.index === this.state.activeFilterIndex ? styles.filter_active_tab : ''].join(' ')} 
                            key={ item.name }>
                                { item.name }<i className="iconfont icon-arrow"></i>
                            </span>)
                    }
                    {/* pickerView  */} {/* 更多筛选 */}
                    {this.renderFilterBox()}
                    
                </div>

                {/* 列表 */}
                {
                    this.state.houseList.length > 0 && 
                    <div className={styles.house_list}>
                        {
                            this.state.houseList.map(item => <HouseItem key={item} { ...item }/>)
                        }
                    </div>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state }
}

export default connect(mapStateToProps)(Find);