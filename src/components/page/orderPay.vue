<template>
<div class="page page-current content">
  <div class="header">
    <img src="../../../static/img/back.png" alt="" @click="back" />
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
              <img src="../../../static/img/weixin.png" style="width:30px;vertical-align:middle;margin-right:5px;" v-show="x.number==6?true:false" alt="">
              <img src="../../../static/img/zhifubao.png" style="width:30px;vertical-align:middle;margin-right:5px;" v-show="x.number==5?true:false" alt="">
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
      token: '',
      type: '',
      account: '10',
      disAccount: '',
      payAccount: '100',
      payNoQ: true,
      payQ: false,
      picedPayQ: false,
      goodsNumber: '',
      picked: '',
      appNumber: window.localStorage.getItem('appNumber'),
      couponId: '000000',
      goodsReleaseId: '000000',
      orderNum: ''
    };
  },
  methods: {
    back: function() {
      window.history.go(-1);
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
      $.showPreloader('正在支付,请稍后...');
      // 夺宝币/余额 支付
      if (this.picked === '0') {
        this.$http.post('http://123.59.49.17:8080/platform/api/v1/pay/money/buy/single', {}, {
          params: {
            appNumber: this.appNumber,
            goodsReleaseNumber: this.$router.app.goodsNumber,
            buyCount: this.$router.app.buyCount,
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
      }
      // 微信支付
      if (this.picked === 6) {
      //  $.alert('weixin');
        this.$http.post('http://123.59.49.17:8080/platform/api/v1/pay/ipaynow/buy/single/wechat', {}, {
          params: {
            appNumber: this.appNumber,
            goodsReleaseNumber: this.$router.app.goodsNumber,
            buyCount: this.$router.app.buyCount,
            couponId: this.couponId,
            token: this.token
          }
        }).then(
          function(res) {
            console.log(res);
            if (res.body.code === 0) {
              $.hidePreloader();
              this.$set('orderNum', res.body.data.orderNum);
              //  $.popup('.popup-services');
              if (window.localStorage.getItem('switchPay')) {
                window.localStorage.removeItem('switchPay'); // 清除打开标识
              }
              window.localStorage.setItem('url', res.body.data.tn);
              window.localStorage.setItem('payWay', '1');
              window.localStorage.setItem('orderNum', res.body.data.orderNum);
              this.$route.router.go({
                path: '/checkPay'
              });
              //  window.location.href = res.body.data.codeUrl;
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
      if (this.picked === 5) {
        this.$http.post('http://123.59.49.17:8080/platform/api/v1/pay/wlt/buy/single/alipay', {}, {
          params: {
            appNumber: this.appNumber,
            goodsReleaseNumber: this.$router.app.goodsNumber,
            buyCount: this.$router.app.buyCount,
            couponId: this.couponId,
            token: this.token
          }
        }).then(
          function(res) {
            if (res.body.code === 0) {
              $.hidePreloader();
              this.$set('orderNum', res.body.data.orderNum);
              //  $.popup('.popup-services');
              if (window.localStorage.getItem('switchPay')) {
                window.localStorage.removeItem('switchPay'); // 清除打开标识
              }
              window.localStorage.setItem('url', res.body.data.codeUrl);
              window.localStorage.setItem('payWay', '2');
              window.localStorage.setItem('orderNum', res.body.data.orderNum);
              this.$route.router.go({
                path: '/checkPay'
              });
              //  window.location.href = res.body.data.codeUrl;
            } else {
              $.alert('支付宝调用失败');
            }
          });
      }
    }
  },
  ready() {
    if (window.localStorage.getItem('token')) {
      this.token = window.localStorage.getItem('token');
      this.account = this.$router.app.allPay;
      this.goodsReleaseId = this.$router.app.goodsNumber;
      this.$http.get('http://123.59.49.17:8080/platform/api/v1/pay/way/list', {
        params: {
          appNumber: this.appNumber,
          token: this.token
        }
      }).then(
        function(res) {
          this.type = res.data.data.payWayControls;
        });
      this.$http.get('http://123.59.49.17:8080/platform/api/v1/pay/get/coupons', {
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
          } else if (window.localStorage.getItem('coupons')) {
                // 选择过优惠券的情况
                this.payNoQ = false;
                this.payQ = false;
                this.picedPayQ = true;
                this.disAccount = window.localStorage.getItem('coupons').split(',')[1];
                this.couponId = window.localStorage.getItem('coupons').split(',')[0];
                window.localStorage.removeItem('coupons');
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
