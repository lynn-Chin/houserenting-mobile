
import { getCityByBaidu } from '../../utils/mapBaidu';
import { CHANGECITY, GETCITY } from './actionType';

export const getCityName = () => {

    return (dispatch) => {
        getCityByBaidu().then(res => {
            if (res !== '定位失败') {
                 dispatch({type: GETCITY, city: res.replace('市', '')})
            } else {
                alert(res);
            }
        })
    }
}
export const changeCityName = (city) => {

    return { type: CHANGECITY, city}
}