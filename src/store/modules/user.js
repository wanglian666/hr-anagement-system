import {
  login,
  getUserInfo,
  getStaffPhoto
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken,
  setTimeStamp
} from '@/utils/auth'

// state
const getDefaultState = () => {
  return {
    // token : null     //token状态共享
    token: getToken(), //token从缓存中读取
    // 初始化用户信息
    userInfo: {} // 值不能为null

  }
}

const state = getDefaultState()

const mutations = {
  // 调用mutations方法使用commit
  // 设置token
  setToken(state, token) {
    state.token = token;
    setToken(token); // vuex变化 ==》 缓存token数据
  },
  // 删除token
  removeToken(state) {
    state.token = null;
    removeToken(); // 清除缓存
  },

  // 设置用户资料
  setUserInfo(state, userinfo) {
    // 浅拷贝
    state.userInfo = {
      ...userinfo
    }
  },
  // 删除用户资料
  removeUserInfo(state) {
    state.userInfo = {}
  }
}

const actions = {
  // 定义login action  请用登录请求，接受参数data(mobile,password)
  async login(context, data) {
    var result = await login(data);
    context.commit('setToken', result);
    setTimeStamp(); //写入时间戳
  },


  async userInfo({
    commit
  }) {
    var res = await getUserInfo(); // 发送请求获取用户信息
    console.log('res', res);
    var baseInfo = await getStaffPhoto(res.userId);
    console.log('baseInfo', baseInfo);
    //获取用户头像，借助于上面获取到的用户的id
    var baseResult = {
      ...res,
      ...baseInfo
    }; // 合并数据
    commit('setUserInfo', baseResult)
    return res
  },

  // 实现登出功能
  loginout({
    commit
  }) {
    commit('removeToken') // 删除token
    commit('removeUserInfo') // 删除用户资料

  }
}




/*

// promise写法

login(context,data){
  return new Promise(function(resolve){
    login(data).then(res =>{
      if(res.data.success){
        context.commit('setToken',result.data.data)
        resolve()  //表示执行成功
      }
    })
  })
} */
export default {
  namespaced: true, // 使其成为带命名空间的模块
  state,
  mutations,
  actions
}
