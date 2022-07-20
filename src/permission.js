// 全局路由守卫
import router from "./router";
import store from "./store";

// 引入进度条
import Nprogress from 'nprogress';
// 进度条样式
import'nprogress/nprogress.css'

//  定义白名单  不需要登录就可以进入的路由
const whiteList = ['/login','/404'];

// 全局前置钩子
router.beforeEach(function(to,from,next){
  // 开启进度条
  Nprogress.start();
  // 先判断哪是否有token
  if(store.getters.token){
    // 有token 继续判断是不是去登录页面
    if(to.path==='/login'){
      // 跳到主页
      next('/')
    }else {
      next()   //直接通行
    }
  } else {
    //没有token
    // 判断是否在白名单中
    if(whiteList.indexOf(to.path) > -1){
      // 存在于白名单
      next()
    }else{
      next('/login')
    }

  }
  //  结束进度条
  Nprogress.done();

})


// 全局后置钩子
router.afterEach(function(to,from){
  Nprogress.done();

})
