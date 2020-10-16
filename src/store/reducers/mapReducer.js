import { GETCITY } from '../actions/actionType'

const defaultVal = {
    city: '北京'
}

const mapReducer = ((state = defaultVal, action) => {
    switch (action.type) {
        case GETCITY:
            return { city: action.city}
        default:
            return state;
    }
})

export default mapReducer;