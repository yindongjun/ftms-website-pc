import {
  combineReducers
} from 'redux'
import { user } from './redux/user.redux'
import { login } from './redux/login.redux'
import { compare } from './redux/vsCarList.redux'
export default combineReducers({
  user,
  login,
  compare
})