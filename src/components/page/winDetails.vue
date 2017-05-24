<template>
<div class="page page-current content" style="overflow:scroll;padding:0;">
  <div class="header">
    <img src="http://download.dl.quzhuan.me/image/sdk/h5/back.png" alt="" @click="back" />
    <h2>中奖详情</h2>
  </div>
  <div style="height:44px;">
  </div>
  <div class="list">
    <div class="img">
      <img :src="goods.goodsIcon" alt="头像" />
    </div>
    <div class="letter">
      <p style="font-size:14px;">
        {{goods.goodsName}}
      </p>
      <p style="font-size:13px;">
        本期参与：<span style="color:#038cff">{{goods.userBuyCount}}</span>次
        <span style="float:right;" v-link="{name: 'recordDetails', params: {number: urlNum}}">参与详情
          <span class="iconfont" style="font-size:12px;margin-left:-7px;">&#xe621;</span>
        </span>
      </p>
      <div class="yijiexiao" style="font-size:13px;">
        <p>
          期号：{{goods.goodsReleasePeriod}}
        </p>
        <p>
          幸运号码：<span style="color:#038cff">{{goods.treasureNo}}</span>
        </p>
        <p>
          揭晓时间：{{goods.opentime}}
        </p>
      </div>
    </div>
  </div>
  <div style="clear: both">
    <p style=" background:#f7f7f7;  padding: 10px 18px; color: #777777;font-size:14px;">商品状态</p>
  </div>
  <div style="background-color:#ffffff; padding: 7px 0 ;font-size:14px; ">
    <div style="color: #777777; height: 29px; line-height:29px;display:flex;">
      <img src="http://download.dl.quzhuan.me/image/sdk/h5/3@2x.png" style="width: 10px;height: 29px; margin-left: 20px;">商品中奖
      <span style="margin-left:10px;">{{goods.opentime}}</span></div>
    <div style="color: #777777;height: 29px; line-height:29px;display:flex;" :style="goods.isDeliver==1?{color:'#d43047'}:none">
      <img src="http://download.dl.quzhuan.me/image/sdk/h5/1@2x.png" style="width: 10px;height: 29px; margin-left: 20px;" v-if="goods.isDeliver==1?false:true">
      <img src="http://download.dl.quzhuan.me/image/sdk/h5/2@2x.png" style="width: 10px;height: 29px; margin-left: 20px;" v-if="goods.isDeliver==1?true:false"> 确认地址
      <span style="color:#d43047;margin-left:10px;" v-if="goods.isDeliver==1?true:false">待确认</span>
    </div>
    <div style="color: #777777;height: 29px; line-height:29px;display:flex;" :style="goods.isDeliver==2?{color:'#d43047'}:none">
      <img src="http://download.dl.quzhuan.me/image/sdk/h5/1@2x.png" style="width: 10px;height: 29px; margin-left: 20px;" v-if="goods.isDeliver==2?false:true">
      <img src="http://download.dl.quzhuan.me/image/sdk/h5/2@2x.png" style="width: 10px;height: 29px; margin-left: 20px;" v-if="goods.isDeliver==2?true:false"> 等待发货
    </div>
    <div style="color: #777777;height: 29px; line-height:29px;display:flex;" :style="goods.isDeliver==3?{color:'#d43047'}:none">
      <img src="http://download.dl.quzhuan.me/image/sdk/h5/1@2x.png" style="width: 10px;height: 29px; margin-left: 20px;" v-if="goods.isDeliver==3?false:true">
      <img src="http://download.dl.quzhuan.me/image/sdk/h5/2@2x.png" style="width: 10px;height: 29px; margin-left: 20px;" v-if="goods.isDeliver==3?true:false"> 等待收货
      <span style="color:#d43047;margin-left:10px;" v-if="goods.isDeliver==3?true:false">待确认</span>
    </div>
    <div style="color: #777777;height: 29px; line-height:29px;display:flex;" :style="goods.isDeliver==4?{color:'#d43047'}:none">
      <img src="http://download.dl.quzhuan.me/image/sdk/h5/5@2x.png" style="width: 10px;height: 29px; margin-left: 20px;" v-if="goods.isDeliver==4?false:true">
      <img src="http://download.dl.quzhuan.me/image/sdk/h5/6@2x.png" style="width: 10px;height: 29px; margin-left: 20px;" v-if="goods.isDeliver==4?true:false"> 已签收
    </div>
  </div>
  <div style="clear: both">
    <p style=" background:#f7f7f7;  padding: 10px 18px; color: #777777; font-size:14px;">地址信息(默认地址)
      <span style="float:right;color:#D43047;border:1px solid #D43047;border-radius:4px;" v-if="goods.isDeliver==1?true:false" @click="querendizhi">确认地址</span>
      <span style="float:right;color:#D43047;border:1px solid #D43047;border-radius:4px;" v-if="goods.isDeliver==3?true:false" @click="querenshouhuo">确认收货</span>
    </p>
  </div>
  <div id="haveAdress" style="padding: 18px 16px;background: #ffffff;font-size:14px; ">
    <p style="color: #333333;">{{goods.userName}} <span style="margin-left: 17%">{{goods.mobile}}</span></p>
    <p style="line-height: 2;color: #333333;">{{goods.address}}</p>
  </div>
</div>
</template>

<script>
import $ from 'zepto';
export default {
  data() {
    return {
      token: window.localStorage ? window.localStorage.getItem('token') : this.getCookie('token'),
      urlNum: '',
      goods: ''
    };
  },
  methods: {
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
    back: function() {
      window.history.go(-1);
    },
    querendizhi: function() {
      if (this.goods.address && this.goods.mobile && this.goods.userName) {
        this.$http.post('http://api.ubaytop.com/platform/api/v1/goods/openRecord/address', {}, {
          params: {
            number: this.urlNum,
            token: this.token
          }
        }).then(function(res) {
          $.toast('已确认收货地址');
          this.$http.post('http://api.ubaytop.com/platform/api/v1/goods/openRecord/detail', {}, {
            params: {
              token: this.token,
              number: this.urlNum
            }
          }).then(function(res) {
            this.goods = res.body.data.detail;
            var time = new Date(this.goods.openTime);
            var y = time.getFullYear();
            var m = time.getMonth() + 1;
            if (m < 10) {
              m = '0' + m;
            };
            var d = time.getDate();
            if (d < 10) {
              d = '0' + d;
            };
            var h = time.getHours();
            if (h < 10) {
              h = '0' + h;
            };
            var mm = time.getMinutes();
            if (mm < 10) {
              mm = '0' + mm;
            };
            var s = time.getSeconds();
            if (s < 10) {
              s = '0' + s;
            };
            this.goods.opentime = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
          });
        });
      } else {
        this.$route.router.go({path: '/mine/addAdress'});
      };
    },
    querenshouhuo: function() {
      this.$http.post('http://api.ubaytop.com/platform/api/v1/goods/receive', {}, {
        params: {
          number: this.urlNum,
          token: this.token
        }
      }).then(function(res) {
        $.toast('已确认收货');
        this.$http.post('http://api.ubaytop.com/platform/api/v1/goods/openRecord/detail', {}, {
          params: {
            token: this.token,
            number: this.urlNum
          }
        }).then(function(res) {
          this.goods = res.body.data.detail;
          var time = new Date(this.goods.openTime);
          var y = time.getFullYear();
          var m = time.getMonth() + 1;
          if (m < 10) {
            m = '0' + m;
          };
          var d = time.getDate();
          if (d < 10) {
            d = '0' + d;
          };
          var h = time.getHours();
          if (h < 10) {
            h = '0' + h;
          };
          var mm = time.getMinutes();
          if (mm < 10) {
            mm = '0' + mm;
          };
          var s = time.getSeconds();
          if (s < 10) {
            s = '0' + s;
          };
          this.goods.opentime = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
        });
      });
    }
  },
  ready() {
    var url = window.location.hash;
    this.urlNum = url.substring(url.lastIndexOf('/') + 1);
    console.log(this.urlNum);
    this.$http.post('http://api.ubaytop.com/platform/api/v1/goods/openRecord/detail', {}, {
      params: {
        token: this.token,
        number: this.urlNum
      }
    }).then(function(res) {
      console.log(res);
      this.goods = res.body.data.detail;
      var time = new Date(this.goods.openTime);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      if (m < 10) {
        m = '0' + m;
      };
      var d = time.getDate();
      if (d < 10) {
        d = '0' + d;
      };
      var h = time.getHours();
      if (h < 10) {
        h = '0' + h;
      };
      var mm = time.getMinutes();
      if (mm < 10) {
        mm = '0' + mm;
      };
      var s = time.getSeconds();
      if (s < 10) {
        s = '0' + s;
      };
      this.goods.opentime = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
    });
  }
};
</script>

<style>

</style>
