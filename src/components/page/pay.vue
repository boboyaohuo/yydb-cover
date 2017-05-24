<template>
<div class="page page-current content">
  <div class="header">
    <img src="http://download.dl.quzhuan.me/image/sdk/h5/back.png" alt="" v-link="{path: '/home'}" />
    <h2>支付中</h2>
  </div>
  <div id="zfbForm">

  </div>
  <div class="success">
    <span>
      正在支付，请稍后......
    </span>
    <!-- <p style="margin:15px 0;">
      请耐心等待商品揭晓!
    </p> -->
  </div>
  <div class="next">
    <!-- <div v-link="{path:'/orderPay/duobaoRecord'}">
      查看记录
    </div>
    <div v-link="{path: '/home'}">
      继续夺宝
    </div> -->
    <!-- <div class="payConfig" style="width: 74%; margin-top:30px;">
      确定
    </div> -->
  </div>
  <div style="margin-top:20%;">
    <!-- <p style="text-align:center;color:#777;font-size:12px;">您参与了以下商品的支付成功</p>
    <div style="width:90%;margin-left:5%;padding-top:2%;line-height:24px;color:#777;font-size:13px;">
      <span style="float:left;width:70%;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">{{name}}</span>
      <span style="float:right;"><span style="color:#D43047;">{{buyCount}}</span>次</span>
    </div> -->
  </div>
</div>
</template>

<script>
import $ from 'zepto';
export default {
  data() {
    return {
      appNumber: this.$route.query.appNumber,
      goodsReleaseNumber: this.$route.query.goodsReleaseNumber,
      buyCount: this.$route.query.buyCount,
      couponId: this.$route.query.couponId,
      token: this.$route.query.token,
      orderNum: '',
      name: window.localStorage.getItem('goodName')
    //  buyCount: window.localStorage.getItem('renci')
      // token: window.localStorage.getItem('token')
    };
  },
  methods: {
    back() {
      window.history.go(-1);
    }
  },
  ready() {
    document.title = '来e张';
    // this.$http.get('http://api.ubaytop.com/platform/api/v1/order/list', {
    //   params: {
    //     token: this.token,
    //     status: '0',
    //     page: '1'
    //   }
    // }).then(function(res) {
    //   this.list = res.body.data.list;
    // });
    window.localStorage.setItem('token', this.$route.query.token);
    window.localStorage.setItem('appNumber', this.$route.query.appNumber);
    this.$http.post('http://api.ubaytop.com/platform/api/v1/pay/alipay/buy/single/alipay', {}, {
      params: {
        appNumber: this.appNumber,
        goodsReleaseNumber: this.goodsReleaseNumber,
        buyCount: this.buyCount,
        couponId: this.couponId,
        token: this.token
      }
    }).then(
      function(res) {
        console.log(res);
        //  document.body.innerHTML = res.body;
        if (res.body.code === 0) {
          $.hidePreloader();
          this.$set('orderNum', res.body.data.orderNum);
          //  $.popup('.popup-services');
          window.localStorage.setItem('url', res.body.data.form);
          window.localStorage.setItem('payWay', '2');
          window.localStorage.setItem('orderNum', res.body.data.orderNum);
          // this.$route.router.go({
          //   path: '/checkPay'
          // });
         if (window.sessionStorage.getItem('switchP')) {

         } else {
           window.sessionStorage.setItem('switchP', '1');
           document.getElementById('zfbForm').innerHTML = res.body.data.form;
           document.forms[0].submit();
         }
          // window.location.href = res.body.data.codeUrl;
        } else {
        //  document.body.innerHTML = res.body;
        //  document.forms[0].submit();
          $.alert('支付宝调用失败');
        }
      });
  }
};
</script>

<style>
.content {
  background: #fff;
}

.header {
  height: 44px;
  text-align: center;
  padding: 0.1px;
}

.header img {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 8px;
  left: 10px;
}

.header h2 {
  line-height: 44px;
  font-size: 18px;
  color: #333333;
}

.success {
  padding-top: 44px;
  margin-top: 20px;
  text-align: center;
  overflow: hidden;
}

.success span:nth-child(1) {
  padding-left: 12px;
  background: url(http://download.dl.quzhuan.me/image/sdk/h5/right@3x.png) no-repeat left center;
  background-size: 12px;
  font-size: 16px;
  color: #008AFF;
}

.success p:nth-child(2) {
  font-size: 16px;
  color: #777777;
}

.next {
  margin-top: 17px;
}

.next div {
  margin-left: 13%;
}

.next div:nth-child(1) {
  display: inline-block;
  height: 32px;
  width: 29%;
  border: 1px solid #D43047;
  border-radius: 4px;
  font-size: 16px;
  color: #D43047;
  text-align: center;
  line-height: 30px;
}

.next div:nth-child(2) {
  display: inline-block;
  height: 32px;
  width: 29%;
  border: 1px solid #D43047;
  border-radius: 4px;
  background: #D43047;
  font-size: 16px;
  color: #ffffff;
  text-align: center;
  line-height: 30px;
}
</style>
