<template>
  <div class="page page-current content" style="overflow:scroll;padding:0;">
    <div class="header">
      <img src="http://download.dl.quzhuan.me/image/sdk/h5/back.png" alt="" @click="back" />
      <h2>往期揭晓</h2>
    </div>
    <div style="height:44px;">
    </div>
    <div style="width:100%;overflow:hidden;border-bottom:1px solid #EEEEEE;display:flex;align-items:center;" v-for="user in user" v-link="{name:'details', params:{number:user.number,from:from}}">
      <img :src="user.userHeading" alt="头像" style="width:60px;height:60px;float:left;margin:0 4% ;border-radius:50%;" />
      <div style="width:73%;float:left;margin:10px 0;">
        <p style="font-size: 14px;color: #D43047;line-height: 19px;">
          {{user.userName}}
          <span style="float:right;font-size:12px;color:#777;">{{user.userAddress}}</span>
        </p>
        <p style="font-size: 12px;color: #333333;line-height: 19px;">
          本期参与：
          <span style="color:#048AFF;">{{user.userBuyCount}}</span>
          人次
        </p>
        <p style="font-size: 12px;color: #333333;line-height: 19px;">
          期号：{{user.period}}
        </p>
        <p style="font-size: 12px;color: #333333;line-height: 19px;">
          幸运号码：
          <span style="color:#048AFF;">{{user.treasureNo}}</span>
        </p>
        <p style="font-size: 12px;color: #333333;line-height: 19px;">
          揭晓时间：{{user.time}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'zepto';
export default {
  data() {
    return {
      user: '',
      appNumber: this.$route.query.appNumber,
      from: 'goods_open_record'
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
    }
  },
  ready() {
    var url = window.location.hash;
    this.urlNum = url.substring(url.lastIndexOf('/') + 1);
    this.$http.get('http://api.ubaytop.com/platform/api/v1/goods/openRecord/list', {
      params: {
        goodsNum: this.urlNum,
        appNumber: this.appNumber,
        page: '1'
      }
    }).then(function(res) {
      console.log(res);
      this.user = res.body.data.openedList;
      for (var i in this.user) {
        if (this.user[i].userHeading === null) {
          this.user[i].userHeading = 'http://download.dl.quzhuan.me/image/sdk/h5/touxiang.png';
        };
        var time = new Date(this.user[i].lotteryTime);
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
        this.user[i].time = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
      };
    });
    var that = this;
    var page = 1;
    $('.content').on('scroll', function() {
      if (this.scrollTop >= (this.scrollHeight - this.clientHeight - 500)) {
        page++;
        that.$http.get('http://api.ubaytop.com/platform/api/v1/goods/openRecord/list', {
          params: {
            goodsNum: that.urlNum,
            appNumber: this.appNumber,
            page: page
          }
        }).then(function(res) {
          for (var i in res.body.data.opendeList) {
            if (res.body.data.opendeList[i].userHeading === null) {
              res.body.data.opendeList[i].userHeading = 'http://download.dl.quzhuan.me/image/sdk/h5/touxiang.png';
            };
            var time = new Date(res.body.data.opendeList[i].lotteryTime);
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
            res.body.data.opendeList[i].time = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
            that.user.push(res.body.data.opendeList[i]);
          };
        });
      }
    });
  }
};
</script>
