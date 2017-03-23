import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueLazyload from 'vue-lazyload';

import App from './App';
import home from './components/home/home';
import sort from './components/sort/sort';
import jiexiao from './components/jiexiao/jiexiao';
import mine from './components/mine/mine';
import orderPay from './components/page/orderPay';
import details from './components/details/details';
import checkPay from './components/page/checkPay';
import login from './components/page/login';
import register from './components/page/register';
/* eslint-disable no-new */

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueLazyload, {
  error: 'http://download.dl.quzhuan.me/image/sdk/h5/zw3.png',
  loading: 'http://download.dl.quzhuan.me/image/sdk/h5/zw3.png',
  try: 3 // default 1
});

let app = Vue.extend(App);

let router = new VueRouter({
  linkActiveClass: 'active',
  hashbang: true // hash路由
});
router.map({
  '/home': {
    component: home,
    subRoutes: {
      '/charge': {
        component: require('./components/page/charge.vue')
      },
      '/tenGoods': {
        component: require('./components/page/tenGoods.vue')
      },
      '/secondK': {
        component: require('./components/page/secondK.vue')
      },
      '/coming': {
        component: require('./components/page/coming.vue')
      },
      '/sortList': {
        component: require('./components/page/sortList.vue')
      }
    }
  },
  '/sort': {
    component: sort
  },
  '/jiexiao': {
    component: jiexiao
  },
  '/checkPay': {
    component: checkPay
  },
  '/mine': {
    component: mine,
    subRoutes: {
      '/charge': {  // 充值
        component: require('./components/page/charge.vue')
      },
      '/address': {   // 收货地址
        component: require('./components/mine/address.vue')
      },
      '/addAdress': {   // 添加收货地址
        component: require('./components/mine/addAddress.vue')
      },
      '/bill': {  // 账单明细
        component: require('./components/mine/bill.vue')
      },
      '/winrecord': {  // 中奖纪录
        component: require('./components/mine/winrecord.vue')
      },
      '/duobaoRecord': {  // 夺宝记录
        component: require('./components/page/duobaoRecord.vue')
      },
      '/duobaoRecord/recordDetails/:number': {
        name: 'recordDetails',
        component: require('./components/page/recordDetails.vue')
      },
      '/duobaoRecord/recordDetails/canyuNum/:number': {
        name: 'canyuNum',
        component: require('./components/page/canyuNum.vue')
      }
    }
  },
  '/mine/winrecord/winDetails/:number': {
    name: 'winDetails',
    component: require('./components/page/winDetails.vue')
  },
  '/orderPay': {
    component: orderPay,
    subRoutes: {
      '/paySuccess': {
        component: require('./components/page/paySuccess.vue')
      },
      '/duobaoRecord': {
        component: require('./components/page/duobaoRecord.vue')
      }
    }
  },
  '/details/:from/:number': {
    name: 'details',
    component: details
  },
  '/coupons/:RelNum/:count': {
    name: 'coupons',
    component: require('./components/page/coupons.vue')
  },
  '/details/calculate/:number': {
    name: 'calculate',
    component: require('./components/page/calculateDetails.vue')
  },
  '/imgDetails/:number': {
    name: 'imgDetails',
    component: require('./components/page/imgDetails.vue')
  },
  '/jiexiaoDetails/:number': {
    name: 'jiexiaoDetails',
    component: require('./components/page/jiexiaoDetails.vue')
  },
  '/login': {
    component: login
  },
  '/message': {  // 帮助中心
    component: require('./components/mine/message.vue')
  },
  '/forgetPsw': {  // 忘记密码
    component: require('./components/page/forgetPsw.vue')
  },
  '/register': {
    component: register
  }
});
// 默认/重定向到home页
router.redirect({
  '/': '/home'
});
// 注册路由切换前
// 使底部菜单栏在一级路由切换时一直保持显示
// 在二级页时隐藏
router.beforeEach(function(transition) {
  var toPath = transition.to.path;
  console.info();
  if (toPath.replace(/[^/]/g, '').length > 1) {
    router.app.isIndex = false;
  } else {
    router.app.isIndex = true;
  }
  transition.next();
});

router.start(app, '#app');
