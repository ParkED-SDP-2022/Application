import { combineReducers } from "redux";
import { reducer as registerReducer} from '../pages/register/store';
import { reducer as flashReducer } from '../pages/flash/store'

// combine all reducers

export default combineReducers({
    register: registerReducer,
    flash: flashReducer
});