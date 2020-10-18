
import { getCityByBaidu } from '../../utils/mapBaidu';
import { GETCITY } from './actionType';

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