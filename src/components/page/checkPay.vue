<template>
  <div class="page page-current content" style="overflow:scroll;padding:0;">
    <div class="header">
      <img src="http://download.dl.quzhuan.me/image/sdk/h5/back.png" alt="" v-link="{path:'/home'}"/>
      <h2>支付结果</h2>
    </div>

      <div class="content-block">
        <div class="success">
    <span>
      点击按钮获取支付结果...
    </span>
          <p v-show="payS">支付成功</p>
          <p v-show="payL" style="margin:15px 0;">很遗憾,支付失败</p>
        </div>
        <div class="next">
          <div @click="havePay">
            查询结果
          </div>
          <div @click="payQues">
            遇到问题
          </div>
        </div>
      </div>
  </div>

</template>
<script>
export default {
  data() {
    return {
      url: window.localStorage.getItem('url'),
      orderNum: window.localStorage.getItem('orderNum'),
      payL: false,
      payWay: '',
      token: window.localStorage.getItem('token'),
      payS: false
    };
  },
  methods: {
  havePay: function() {
  if (this.payWay === '1') {
  // 微信支付
       this.$http.post('http://api.ubaytop.com/platform/api/v1/pay/ipaynow/check/status', {}, {
          params: {
            orderNum: this.orderNum,
            token: this.token
          }
        }).then(
          function(res) {
          console.log(res);
          if (res.body.data.payRecord.status === 3) {
                this.$route.router.go({path: '/orderPay/paySuccess'});
           } else {
                this.payL = true;
           }
          });
  }
  if (this.payWay === '2') {
  // 支付宝支付
  console.log(this.payWay);
       this.$http.post('http://api.ubaytop.com/platform/api/v1/pay/wlt/check/status', {}, {
          params: {
            orderNum: this.orderNum,
            token: this.token
          }
        }).then(
          function(res) {
          console.log(res);
          if (res.body.data.payRecord.status === 3) {
                this.$route.router.go({path: '/orderPay/paySuccess'});
           } else {
                this.payL = true;
           }
          });
  }
    },
    payQues: function() {
        this.$route.router.go({path: '/message'});
    }
  },
  ready() {
  if (window.localStorage.getItem('switchPay')) {
   this.payWay = window.localStorage.getItem('payWay');
  } else {
     window.localStorage.setItem('switchPay', '0');
      window.location.href = this.url;
      this.payWay = window.localStorage.getItem('payWay');
  }
  }
};

</script>

<style>

</style>
