<template>
  <div class="page page-current content">
    <div class="header">
      <img src="http://download.dl.quzhuan.me/image/sdk/h5/back.png" alt="" v-link="{path: '/home'}"/>
      <h2>支付成功</h2>
    </div>
    <div class="success">
    <span>
      恭喜您，已购买成功
    </span>
      <p style="margin:15px 0;">
        请耐心等待商品揭晓!
      </p>
    </div>
    <div class="next">
      <div v-link='jilu'>
        查看记录
      </div>
      <div v-link='shouye'>
        继续夺宝
      </div>
    </div>
    <div style="margin-top:20%;">
      <div style="border-top:1px solid #EEE;margin-bottom:20px;">
      </div>
      <!-- <p style="text-align:center;color:#777;font-size:12px;">您参与了以下商品的支付成功</p>
      <div style="width:90%;margin-left:5%;padding-top:2%;line-height:24px;color:#777;font-size:13px;">
        <span style="float:left;width:70%;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">{{name}}</span>
        <span style="float:right;"><span style="color:#D43047;">{{buyCount}}</span>次</span>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: window.localStorage.getItem('goodName'),
      buyCount: window.localStorage.getItem('renci')
      // token: window.localStorage.getItem('token')
    };
  },
  methods: {
   jilu: function() {
  window.location.href = 'http://www.ubaytop.com/shop/index.html#!/mine/duobaoRecord';
   },
   shouye: function() {
    window.location.href = 'http://www.ubaytop.com/shop/index.html';
   }
  },
  ready() {
  // http://www.ubaytop.com/shop/index.html
    // this.$http.get('http://api.ubaytop.com/platform/api/v1/order/list', {
    //   params: {
    //     token: this.token,
    //     status: '0',
    //     page: '1'
    //   }
    // }).then(function(res) {
    //   this.list = res.body.data.list;
    // });
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
