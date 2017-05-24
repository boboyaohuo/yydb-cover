<template>
<div class="page page-current content" style="overflow:scroll;">
  <div class="header">
    <img src="http://download.dl.quzhuan.me/image/sdk/h5/back.png" alt="" @click="back" />
    <h2>订单支付</h2>
  </div>
  <div style="padding-top:44px;">
    <div>
      <div class="list-block" style="padding:0 0.35rem; margin:0 0;">
        <div class="item-content" style="padding:0 0;">
          <div class="item-title" style="font-size:15px;">应付总额:<span class="D43">{{account}}</span>夺宝币</div>
        </div>
      </div>
      <div class="space"></div>
      <div class="list-block" style="padding:0 0.35rem; margin:0 0;">
        <label class="label-checkbox item-content" style="padding:0 0;">
            <div class="item-title" style="font-size:15px;">优惠券折扣</div>
            <div class="item-after">

              <div class="item-media">
                <span v-show="payNoQ" style="font-size:14px;">无优惠券可用</span>
                <span @click='chooseQuan' class='open-services' v-show="payQ"style="font-size:14px;background:#D43047;padding:3px 6px;color:#eeeeee;border-radius:5px;">有优惠券可用</span>
                <span @click='chooseQuan' class='open-services' v-show="picedPayQ"style="font-size:14px;background:#D43047;padding:3px 6px;color:#eeeeee;border-radius:5px;">{{disAccount}}元优惠券</span>
              </div>
            </div>
          </label>
      </div>
      <div class="list-block" style="padding:0 0.35rem; margin:0 0;">
        <label class="label-checkbox item-content" style="padding:0 0;">
          <div class="item-title" style="font-size:15px;">余额支付</div>
            <div class="item-after">
              <input type="radio" name="my-radio" checked="checked" v-model="picked" value="0">
              <div class="item-media">
                <i class="icon icon-form-checkbox"></i>
              </div>
          </div>
        </label>
      </div>
      <div class="list-block" style="padding:0 0.35rem; margin:0 0;">
        <label class="label-checkbox item-content" style="padding:0 0;">
          <div class="item-title" style="font-size:15px;">金币支付</div>
            <div class="item-after">
              <input type="radio" name="my-radio" checked="checked" v-model="picked" value="-1">
              <div class="item-media">
                <i class="icon icon-form-checkbox"></i>
              </div>
          </div>
        </label>
      </div>
      <div class="space"></div>
      <div class="list-block" style="padding:0 0.35rem; margin:0 0;">
        <div class="item-content" style="padding:0 0;">
          <div class="item-inner">
            <div class="item-title" style="font-size:15px;">其他方式支付</div>
            <div class="item-after" style="font-size:15px;"><span class="D43">{{account - disAccount}}</span>夺宝币</div>
          </div>
        </div>
        <label class="label-checkbox item-content" style="padding:0 0;" v-for="x in type">
            <div class="item-title" style="font-size:15px;">
              <img src="http://download.dl.quzhuan.me/image/sdk/h5/weixin.png" style="width:30px;vertical-align:middle;margin-right:5px;" v-show="x.number==8?true:false" alt="">
              <img src="http://download.dl.quzhuan.me/image/sdk/h5/zhifubao.png" style="width:30px;vertical-align:middle;margin-right:5px;" v-show="x.number==5?true:false" alt="">
              <img src="http://download.dl.quzhuan.me/image/sdk/h5/zhifubao.png" style="width:30px;vertical-align:middle;margin-right:5px;" v-show="x.number==7?true:false" alt="">

              {{x.name}}
            </div>
            <div class="item-after">
              <input type="radio" name="my-radio" v-model="picked" checked="checked" :value="x.number">
              <div class="item-media">
                <i class="icon icon-form-checkbox"></i>
              </div>
            </div>
          </label>
      </div>
      <div class="list-block" style="padding:0 0.35rem;margin-top:147px;">
        <div class="payfooter" @click="confirmPayment">
          确认支付
        </div>
      </div>
    </div>
  </div>
</div>
<router-view></router-view>
</template>
<style>
.D43 {
  color: #D43047;
}

.space {
  height: 0.66rem;
  background: #eeeeee;
}
</style>
<script>
import $ from 'zepto';
export default {
  data() {
    return {
      token: window.localStorage ? window.localStorage.getItem('token') : this.getCookie('token'),
      appNumber: this.$route.query.appNumber,
      type: '',
      account: '10',
      disAccount: '',
      payAccount: '100',
      payNoQ: true,
      payQ: false,
      picedPayQ: false,
      goodsNumber: '',
      picked: '',
      orderStr: '', // 支付宝支付需要的参数
      tokenId: '', // 微信支付需要的支付参数
      coupons: window.localStorage ? window.localStorage.getItem('coupons') : this.getCookie('coupons'),
      couponId: '0',
      goodsReleaseId: '000000',
      orderNum: '' // 支付需要的订单编号
    };
  },
  methods: {
    back: function() {
      window.history.go(-1);
    },
    getCookie: function(name) {
      // (^| )name=([^;]*)(;|$),match[0]为与整个正则表达式匹配的字符串，match[i]为正则表达式捕获数组相匹配的数组；
      var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
      if (arr != null) {
        return unescape(arr[2]);
      }
      return null;
    },
    setCookie: function(key, val, time) { // 设置cookie方法
      var date = new Date(); // 获取当前时间
      var expiresDays = time; // 将date设置为n天以后的时间
      date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); // 格式化为cookie识别的时间
      document.cookie = key + '=' + val + ';expires=' + date.toGMTString(); // 设置cookie
    },
    delCookie: function(key) {
      var date = new Date();
      date.setTime(date.getTime() - 10000);
      document.cookie = key + '=v; expires =' + date.toGMTString();
    },
    chooseQuan: function() {
      // 跳转详情页面
      this.$route.router.go({
        name: 'coupons',
        params: {
          RelNum: this.goodsReleaseId,
          count: this.account
        }
      });
    },
    confirmPayment: function() {
      // $.showPreloader('正在支付,请稍后...');
      // 夺宝币/余额 支付
      if (this.picked === '0') {
        this.$http.post('http://api.ubaytop.com/platform/api/v1/pay/money/buy/single', {}, {
          params: {
            appNumber: this.appNumber,
            goodsReleaseNumber: this.goodsReleaseId,
            buyCount: this.account,
            couponId: this.couponId,
            token: this.token
          }
        }).then(
          function(res) {
            console.log(res);
            if (res.body.code === 0) {
              $.hidePreloader();
              this.$route.router.go({
                path: '/orderPay/paySuccess'
              });
            } else {
              $.hidePreloader();
              $.alert(res.body.msg);
            }
          });
      };
      if (this.picked === '-1') {
        this.$http.post('http://api.ubaytop.com/platform/api/v1/pay/credit/order/pay', {}, {
          params: {
            appNumber: this.appNumber,
            goodsReleaseNumber: this.goodsReleaseId,
            buyCount: this.account,
            token: this.token
          }
        }).then(
          function(res) {
            console.log(res);
            if (res.body.code === 0) {
              $.hidePreloader();
              this.$route.router.go({
                path: '/orderPay/paySuccess'
              });
            } else {
              $.hidePreloader();
              $.alert(res.body.msg);
            }
          });
      }
      // 威富通app微信支付购买商品
      if (this.picked === 8) {
        //  $.alert('weixin');
        this.$http.post('http://api.ubaytop.com/platform/api/v1/pay/wft/buy/single/wechatPay/app', {}, {
          params: {
            appNumber: this.appNumber,
            goodsReleaseNumber: this.goodsReleaseId,
            buyCount: this.account,
            couponId: this.couponId,
            token: this.token
          }
        }).then(
          function(res) {
            console.log(res);
            if (res.body.code === 0) {
              //  $.hidePreloader();
              this.tokenId = res.body.data.tokenId;
              this.orderNum = res.body.data.orderNum;
              // $.alert(this.tokenId + '---' + this.orderNum);
              this.nativeWXpay();
            } else {
              $.alert('微信支付调用失败');
            }
          });
        //  $.alert('该支付尚未开通,请尝试其他支付方式!');
      }
      // 汇付宝支付
      if (this.picked === 2) {
        $.hidePreloader();
        $.alert('该支付尚未开通,请尝试其他支付方式!');
      }
      // 易宝支付
      if (this.picked === 3) {
        $.hidePreloader();
        $.alert('该支付尚未开通,请尝试其他支付方式!');
      }
      // 爱贝支付
      if (this.picked === 4) {
        $.hidePreloader();
        $.alert('该支付尚未开通,请尝试其他支付方式!');
      }
      // 沃雷特微信支付
      if (this.picked === 1) {
        $.hidePreloader();
        $.alert('该支付尚未开通,请尝试其他支付方式!');
      }
      // 支付宝支付
      // if (this.picked === 5) {
      //   this.$http.post('http://api.ubaytop.com/platform/api/v1/pay/wlt/buy/single/alipay', {}, {
      //     params: {
      //       appNumber: this.appNumber,
      //       goodsReleaseNumber: this.goodsReleaseId,
      //       buyCount: this.account,
      //       couponId: this.couponId,
      //       token: this.token
      //     }
      //   }).then(
      //     function(res) {
      //       console.log(res);
      //       $.hidePreloader();
      //       if (res.body.code === 0) {
      //         this.$set('orderNum', res.body.data.orderNum);
      //         //  $.popup('.popup-services');
      //         if (window.localStorage.getItem('switchPay')) {
      //           window.localStorage.removeItem('switchPay'); // 清除打开标识
      //         }
      //         window.localStorage.setItem('url', res.body.data.codeUrl);
      //         window.localStorage.setItem('payWay', '2');
      //         window.localStorage.setItem('orderNum', res.body.data.orderNum);
      //         this.$route.router.go({
      //           path: '/checkPay'
      //         });
      //         //  window.location.href = res.body.data.codeUrl;
      //       } else {
      //         $.alert('支付宝调用失败');
      //       }
      //     });
      //   //  window.location.href = 'http://pfpay.quzhuan.net.cn/shop/index.html#!/pay?token=' + this.token + '&appNumber=' + this.appNumber + '&goodsReleaseNumber=' + this.$router.app.goodsNumber + '&buyCount=' + this.$router.app.buyCount + '&couponId=' + this.couponId;
      // }
      if (this.picked === 7) {
        if (this.appNumber === '00000001') { // 红包多应用
          // $.alert('999999');
          // 请求支付接口
          this.$http.post('http://api.ubaytop.com/platform/api/v1/pay/alipay/hongbao/buy/single/alipay', {}, {
            params: {
              appNumber: this.appNumber,
              goodsReleaseNumber: this.goodsReleaseId,
              buyCount: this.account,
              couponId: this.couponId,
              token: this.token
            }
          }).then(
            function(res) {
              console.log(res);
              if (res.body.code === 0) {
                this.orderStr = res.body.data.orderStr;
                this.orderNum = res.body.data.orderNum;
                this.nativeALpay();
              } else {
                $.alert('支付宝调用失败');
              }
            });
        } else {
          // $.alert(this.appNumber);
          // $.alert(typeof (this.appNumber));
          window.location.href = 'http://pfpay.quzhuan.net.cn/pay.html?token=' + this.token + '&appNumber=' + this.appNumber + '&goodsReleaseNumber=' + this.goodsReleaseId + '&buyCount=' + this.account + '&couponId=' + this.couponId;
        }
      }
    },
    setupWebViewJavascriptBridge: function(callback) {
      if (window.WebViewJavascriptBridge) {
        return callback(window.WebViewJavascriptBridge);
      };
      var WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function() {
        document.documentElement.removeChild(WVJBIframe);
      }, 0);
    },
    connectWebViewJavascriptBridge: function(callback) {
      if (window.WebViewJavascriptBridge) {
        return callback(window.WebViewJavascriptBridge);
      } else {
        // document.addEventListener(
        //   'WebViewJavascriptBridgeReady',
        //   function() {
        //     callback(window.WebViewJavascriptBridge);
        //   },
        //   false
        // );
      }
    },
    nativeHD: function() {
      this.$http.post('http://api.ubaytop.com/platform/api/v1/pay/alipay/hongbao/check/status', {}, {
        params: {
          orderNum: this.orderNum,
          token: this.token
        }
      }).then(
        function(res) {
          console.log(res);
          // $.alert(this.orderNum);
          // $.alert(res.body.code);
          if (res.body.code === 0) {
            if (res.body.data.payRecord.status === 3) { // 支付成功
              window.location.href = 'pages/paySuccess.html';
            }
          } else {
            window.location.href = 'pages/payError.html';
          }
        });
    },
    nativeHD2: function() {
      let that = this;
      $.showPreloader('正在查询支付结果,请稍后...');
      setTimeout(function() {
        that.$http.post('http://api.ubaytop.com/platform/api/v1/pay/wft/check/status', {}, {
          params: {
            orderNum: that.orderNum,
            token: that.token
          }
        }).then(
          function(res) {
            console.log(res);
            if (res.body.code === 0) {
              $.hidePreloader();
              if (res.body.data.payRecord.status === 3) { // 支付成功
                window.location.href = 'pages/paySuccess.html';
              }
            } else {
                $.hidePreloader();
              window.location.href = 'pages/payError.html';
            }
          });
      }, 10000);
    },
    nativeWXpay: function() {
      var ua = navigator.userAgent.toLowerCase();
      var isAndroid = /android/.test(ua);
      var isiOS = /iphone|ipad|ipod/.test(ua);
      var that = this;
      if (isiOS) {
        that.setupWebViewJavascriptBridge(function(bridge) {
          // html5创建方法，iOS进行调用
          bridge.registerHandler('iOSPayResultHandler', function(data) {
            // var responseData = {'Javascript Says': '回调成功!'}
            // responseCallback(responseData)
            that.nativeHD2();
          });
          bridge.callHandler('iOS_DuoBaoInPacket_WX_Pay_Action', {
            'tokenId': that.tokenId,
            'buyCount': that.account
          }, function(response) {});
        });
      };
      if (isAndroid) {
        window.WebViewJavascriptBridge.callHandler('submitFromWeb', {
          'code': '1006',
          'tokenId': that.tokenId,
          'buyCount': that.account
        }, function(responseData) {});
        that.connectWebViewJavascriptBridge(function(bridge) {
          //  $.alert('ldasl');
          bridge.init(function(message, responseCallback) {
            console.log('JS got a message', message);
            var data = {
              'Javascript Responds': '测试中文!'
            };
            console.log('JS responding with', data);
            responseCallback(data);
          });
          bridge.registerHandler('AndroidPayResultHandler', function(data, responseCallback) {
            console.log(data);
            console.log('=======666');
            //  $.alert('999222');
            that.nativeHD2();
          });
        });
      };
    },
    nativeALpay: function() {
      var ua = navigator.userAgent.toLowerCase();
      var isAndroid = /android/.test(ua);
      var isiOS = /iphone|ipad|ipod/.test(ua);
      var that = this;
      if (isiOS) {
        that.setupWebViewJavascriptBridge(function(bridge) {
          // html5创建方法，iOS进行调用
          bridge.registerHandler('iOSPayResultHandler', function(data) {
            // var responseData = {'Javascript Says': '回调成功!'}
            // responseCallback(responseData)
            that.nativeHD();
          });
          bridge.callHandler('iOS_DuoBaoInPacket_Pay_Action', {
            orderStr: that.orderStr
          }, function(response) {});
        });
      };
      if (isAndroid) {
        window.WebViewJavascriptBridge.callHandler('submitFromWeb', {
          'code': '1005',
          'orderStr': that.orderStr
        }, function(responseData) {});
        that.connectWebViewJavascriptBridge(function(bridge) {
          //  $.alert('ldasl');
          bridge.init(function(message, responseCallback) {
            console.log('JS got a message', message);
            var data = {
              'Javascript Responds': '测试中文!'
            };
            console.log('JS responding with', data);
            responseCallback(data);
          });
          bridge.registerHandler('AndroidPayResultHandler', function(data, responseCallback) {
            console.log(data);
            console.log('=======666');
            //  $.alert('999222');
            that.nativeHD();
          });
        });
      };
    }
  },
  ready() {
    var ua = navigator.userAgent.toLowerCase();
    var isiOS = /iphone|ipad|ipod/.test(ua);
    if (isiOS) {
      if (window.sessionStorage.getItem('bridge')) {
        console.log(1);
      } else {
        window.sessionStorage.setItem('bridge', '1');
        this.setupWebViewJavascriptBridge();
      }
    }
    if (window.localStorage) {
      if (this.$router.app.goodsNumber) {
        window.localStorage.setItem('allPay', this.$router.app.allPay);
        window.localStorage.setItem('goodsNumber', this.$router.app.goodsNumber);
        this.account = this.$router.app.allPay;
        this.goodsReleaseId = this.$router.app.goodsNumber;
      } else {
        this.account = window.localStorage.getItem('allPay');
        this.goodsReleaseId = window.localStorage.getItem('goodsNumber');
      }
    } else {
      if (this.$router.app.goodsNumber) {
        this.setCookie('allPay', this.$router.app.allPay, 24);
        this.setCookie('goodsNumber', this.$router.app.goodsNumber, 24);
        this.account = this.$router.app.allPay;
        this.goodsReleaseId = this.$router.app.goodsNumber;
      } else {
        this.account = this.getCookie('allPay');
        this.goodsReleaseId = this.getCookie('goodsNumber');
      }
    }
    if (this.token) {
      //  this.token = window.localStorage.getItem('token');
      //  this.account = this.$router.app.allPay;
      //  this.goodsReleaseId = this.$router.app.goodsNumber;
      this.$http.get('http://api.ubaytop.com/platform/api/v1/pay/way/list', {
        params: {
          appNumber: this.appNumber,
          token: this.token
        }
      }).then(
        function(res) {
          this.type = res.data.data.payWayControls;
        });
      this.$http.get('http://api.ubaytop.com/platform/api/v1/pay/get/coupons', {
        params: {
          goodsReleaseNum: this.goodsReleaseId,
          token: this.token,
          buyCount: this.account
        }
      }).then(
        function(res) {
          //  this.type = res.data.data.payWayControls;
          console.log(res);
          if (res.body.data.coupons.length === 0) {
            this.payNoQ = true;
            this.payQ = false;
            this.picedPayQ = false;
          } else if (this.coupons) {
            // 选择过优惠券的情况
            this.payNoQ = false;
            this.payQ = false;
            this.picedPayQ = true;
            this.disAccount = this.coupons.split(',')[1];
            this.couponId = this.coupons.split(',')[0];
            window.localStorage.removeItem('coupons');
            this.delCookie('coupons');
          } else {
            this.payNoQ = false;
            this.payQ = true;
            this.picedPayQ = false;
          }
        });
    } else {
      this.$route.router.go({
        path: 'login'
      });
    }
  }
};
</script>
