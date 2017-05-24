<template>
  <div class="page page-current content" style="overflow:scroll;padding:0;">
    <div class="header">
      <img src="http://download.dl.quzhuan.me/image/sdk/h5/back.png" alt="" @click="back" />
      <h2>中奖记录</h2>
    </div>
    <div class="none" v-show="show?false:true">
      <img src="http://download.dl.quzhuan.me/image/sdk/h5/bgNolist.png" alt="" />
      <p style="margin-top:20px;">
        您还没有中奖记录哦
      </p>
      <div v-link="{path:'/home'}" style="margin-top:20px;">
        立即夺宝
      </div>
    </div>
    <div style="height:44px;">
    </div>
    <div class="list" v-for="x in recordList" v-link="{name: 'winDetails', params: {number: x.number}}" style="display:flex;align-items:center;">
      <img src="http://download.dl.quzhuan.me/image/sdk/h5/zhongjiang.png" alt="" class="zhongjiang" v-if="x.luckStatus==1?true:false" />
      <div class="img">
        <img :src="x.goodsIcon" alt="" />
      </div>
      <div class="letter">
        <p style="margin-bottom:2px;font-size:14px;">
          {{x.goodsName}}
        </p>
        <p style="margin-bottom:2px;font-size:13px;">
          本期参与：<span style="color:#038cff">{{x.userBuyCount}}</span>次
          <span style="float:right;" v-link="{name: 'recordDetails', params: {number: x.number}}">参与详情
            <span class="iconfont" style="font-size:13px;margin-left:-7px;">&#xe621;</span>
          </span>
        </p>
        <div class="yijiexiao" style="font-size:13px;">
          <p style="margin-bottom:2px;">
            期号：{{x.period}}
          </p>
          <p style="margin-bottom:2px;">
            幸运号码：<span style="color:#038cff">{{x.treasureNo}}</span>
          </p>
          <p style="margin-bottom:2px;">
            中奖者参与：<span style="color:#038cff">{{x.userCount}}</span>次
          </p>
          <p>
            揭晓时间：{{x.time}}
          </p>
        </div>
      <span class="querendizhi" v-show="x.isDeliver==1?true:false">
        确认地址
      </span>
      <span class="querenshouhuo" v-show="x.isDeliver==2?true:false">
        待发货
      </span>
      <span class="yifahuo" v-show="x.isDeliver==3?true:false">
        确认收货
      </span>
      <span class="yiwancheng" v-show="x.isDeliver==4?true:false">
        已完成
      </span>
      <span class="yiguoqu" v-show="x.isDeliver==99?true:false">
        订单已过期
      </span>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'zepto';
export default {
  data() {
    return {
      token: window.localStorage ? window.localStorage.getItem('token') : this.getCookie('token'),
      recordList: '',
      show: true,
      lineWidth: []
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
    this.$http.post('http://api.ubaytop.com/platform/api/v1/user/lottery/list', {}, {
      params: {
        token: this.token,
        page: '1'
      }
    }).then(
      function(res) {
        console.log(res);
        this.recordList = res.body.data.list;
        if (this.recordList.length === 0) {
          this.show = false;
        };
        for (var i in this.recordList) {
          if (this.recordList[i].lotteryTime) {
            var time = new Date(this.recordList[i].lotteryTime);
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
            this.recordList[i].time = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
          };
        };
      }
    );
    var that = this;
    var page = 1;
    $('.content').on('scroll', function() {
      if (this.scrollTop >= (this.scrollHeight - this.clientHeight - 100)) {
        page++;
        that.$http.post('http://api.ubaytop.com/platform/api/v1/user/lottery/list', {}, {
          params: {
            token: this.token,
            page: page
          }
        }).then(
          function(res) {
            for (var i in res.body.data.list) {
              if (res.body.data.list[i].lotteryTime) {
                var time = new Date(res.body.data.list[i].lotteryTime);
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
                res.body.data.list[i].time = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
              };
              that.recordList.push(res.body.data.list[i]);
            };
          }
        );
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
  width: 100%;
  max-width: 650px;
  background: #FFF;
  text-align: center;
  padding: 0.1px;
  position: fixed;
  top: 0px;
  z-index: 29
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

.none {
  padding-top: 44px;
  width: 37%;
  margin: 20% auto;
}

.none img {
  width: 100%;
}

.none p {
  font-size: 12px;
  color: #999999;
  text-align: center;
}

.none div {
  width: 80%;
  margin: 0 auto;
  background: #D43047;
  border-radius: 4px;
  color: #FFF;
  font-size: 16px;
  text-align: center;
  height: 32px;
  line-height: 32px;
}

.list {
  width: 100%;
  box-shadow: 0 1px 0 0 #EEEEEE;
  overflow: hidden;
  position: relative;
}

.zhongjiang {
  position: absolute;
  width: 8%;
  top: 2%;
  left: 1%;
}

.img {
  width: 20%;
  display: flex;
  align-items: center;
  margin: 0 3%;
  float: left;
}

.img img {
  width: 100%;
}

.letter {
  font-size: 14px;
  position: relative;
  ;
  /* top: 10%;
  left: 28%; */
  width: 68%;
  float: right;
  margin: 3% 3%;
}

.letter p {
  margin: 0;
}

.letter>p:nth-child(1) {
  width: 80%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #333;
  font-size: 14px;
  line-height: 19px;
}

.letter>p:nth-child(2) {
  color: #333;
  font-size: 12px;
  line-height: 19px;
}

.weijiexiao {
  margin-top: 3%;
}

.weijiexiao>p:nth-child(1) {
  font-size: 12px;
  color: #777777;
  line-height: 17px;
}

.weijiexiao>p:nth-child(3) {
  font-size: 12px;
  color: #777777;
  line-height: 17px;
}

.querendizhi {
  border-radius: 4px;
  color: #D43047;
  position: absolute;
  bottom: 0px;
  right: 0px;
}

.querenshouhuo{
  border-radius: 4px;
  color: #D43047;
  position: absolute;
  bottom: 0px;
  right: 0px;
}

.yiwancheng{
  padding: 2px;
  color: #038AFF;
  position: absolute;
  bottom: 0px;
  right: 0px;
}

.yifahuo{
  padding: 2px;
  color: #038AFF;
  position: absolute;
  bottom: 0px;
  right: 0px;
}

.yiguoqu{
  padding: 2px;
  color: #038AFF;
  position: absolute;
  bottom: 0px;
  right: 0px;
}

.yijiexiao {
  font-size: 12px;
  color: #777777;
  line-height: 19px;
}

.jijiangjiexiao {
  font-size: 17px;
  color: #D43047;
  line-height: 19px;
  margin-top: 8%;
}
</style>
