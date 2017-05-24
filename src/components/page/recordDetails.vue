<template>
<div class="page page-current" style="overflow:scroll;padding:0;">
  <div class="header">
    <img src="http://download.dl.quzhuan.me/image/sdk/h5/back.png" alt="" @click="back" />
    <h2>参与详情</h2>
  </div>
  <div class="content" style="padding-top:44px;">
    <div class="rdheader">
      <p>
        {{goods.goodsName}}
      </p>
      <p>
        本期参与：
        <span style="color:#008AFF">10</span>人次
      </p>
      <p>
        期号：
        <span style="color:#008AFF">{{goods.periods}}</span>
      </p>
    </div>
    <div class="rdlist">
      <p style="font-size:14px;">
        以下是我的夺宝记录
      </p>
      <p style="text-align:center;font-size:12px;overflow:hidden;line-height:28px;">
        <span style="float:left;margin-left:15px;">参与时间</span>
        <span>参与人次</span>
        <span style="float:right;margin-right:18px;">参与号码</span>
      </p>
      <p style="text-align:center;font-size:12px;overflow:hidden;line-height:30px;position:relative;" v-for="x in list" v-link="{name: 'canyuNum', params: {number: x.id}}">
        <span style="position:absolute;left:15px;">{{x.time}}</span>
        <span style="color:#008AFF;">{{x.buyCount}}</span>
        <span style="position:absolute;right:30px;color:#D43047;">查看</span>
      </p>
    </div>
  </div>
</div>
</template>

<style>
.rdheader {
  width: 100%;
  background: #F7F7F7;
  padding: 10px;
}

.rdheader p:nth-child(1) {
  width: 100%;
  font-size: 16px;
  color: #7777770;
  line-height: 26px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.rdheader p:nth-child(2) {
  font-size: 12px;
  color: #7777770;
  line-height: 24px;
}

.rdheader p:nth-child(3) {
  font-size: 12px;
  color: #7777770;
  line-height: 24px;
}

.rdlist {
  width: 100%;
}

.rdlist>p:nth-child(1) {
  color: #777777;
  text-align: center;
}
</style>

<script>
export default {
  data() {
    return {
      token: window.localStorage ? window.localStorage.getItem('token') : this.getCookie('token'),
      goods: '',
      list: ''
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
    back: function() {
      window.history.go(-1);
    }
  },
  ready() {
    var url = window.location.hash;
    this.urlNum = url.substring(url.lastIndexOf('/') + 1);
    this.$http.get('http://api.ubaytop.com/platform/api/v1/order/detail', {
      params: {
        goodsReleaseNum: this.urlNum,
        token: this.token
      }
    }).then(function(res) {
      this.goods = res.body.data.goodsRelease;
      this.list = res.body.data.orderRecordVos;
      for (var i in this.list) {
        var time = new Date(this.list[i].payTime);
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
        this.list[i].time = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
      }
    });
  }
};
</script>
