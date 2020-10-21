import { CHANGECITY, GETCITY } from '../actions/actionType'

const defaultVal = {
    city: '全国'
}

const mapReducer = ((state = defaultVal, action) => {
    switch (action.type) {
        case GETCITY:
            return { city: action.city}
        case CHANGECITY:
            return { city: action.city}
        default:
            return state;
    }
})

export default mapReducer;