
const UPDATE_DATA = 'UPDATE_DATA'
const initState = {
  testData: 'test',
  num: 0,
  // 登陆
  loginType: 'quick',// 登录方式 quick/account
  mobile: '18573453456', // 手机
  mobileVerificationCode: '1234', // 手机验证码
  password: 'a1234', // 密码
  loginErrText: 'cuowu' // 登陆错误信息
};

export function login(state = initState, action) {
  switch (action.type) {
    case UPDATE_DATA:
      return { ...state, num: state.num,};
    default:
      return state
  }
}

export const updateData = (name, value) => {
  return { type: UPDATE_DATA, payload: { name,value} }
}

export const setTimeClick = () => {
  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch(updateData())
    }, 1000)
  }
}

