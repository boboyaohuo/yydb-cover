<style>
.ppp {
  flex: 1;
  line-height: 35px;
  text-align: center;
  font-size: 14px;
  color: #777777;
  border-bottom: 1px #f7f7f7 solid;
}

.redactive {
  color: #d43047;
  border-bottom: 1px #d43047 solid;
}

.youhuiquan {
  width: 100%;
  overflow: scroll;
  padding: 0 15px;
  font-size: 16px;
}

.quan {
  background: url('http://download.dl.quzhuan.me/image/sdk/h5/yhqbg_4.png') no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 0;
  padding-bottom: 29.13%;
  margin-top: 15px;
}

.quan1 {
  background: url('http://download.dl.quzhuan.me/image/sdk/h5/yhqbg_1.png') no-repeat;
  background-size: 100% 100%;
}

.quan2 {
  background: url('http://download.dl.quzhuan.me/image/sdk/h5/yhqbg_2.png') no-repeat;
  background-size: 100% 100%;
}

.quan3 {
  background: url('http://download.dl.quzhuan.me/image/sdk/h5/yhqbg_3.png') no-repeat;
  background-size: 100% 100%;
}

.qulef1 {
  float: left;
  margin-left: 6%;
  color: #f7f7f7;
}

.qulef1 p {
  line-height: 2;
}

.qulef2 {
  color: #848484;
}

@media only screen and (min-width:319px) and (max-width:374px) {
  .qulef1 p {
    line-height: 1.5;
  }
}

@media only screen and (min-width:415px) {
  .qulef1 p {
    line-height: 3;
  }
  .quler {
    padding: 7%;
  }
}
</style>
<template>
<div class="page page-current content" style="overflow:scroll;padding:0;">
  <div class="header">
    <img src="http://download.dl.quzhuan.me/image/sdk/h5/back.png" alt="" @click="back" />
    <h2>我的优惠券</h2>
  </div>
  <div class="quan_bar" style="margin-top:44px;background:#f7f7f7;height:35px;display:flex;">
    <p :class="{'redactive':isNouse}" class="ppp" @click='tabNuse(1)'>未使用（<span>{{num_nouse}}</span>）</p>
    <p :class="{'redactive':isUse}" class="ppp" @click='tabNuse(2)'>已使用/已过期（<span>{{num_use}}</span>）</p>
  </div>
  <div class="none" v-show="noquan">
    <img src='http://download.dl.quzhuan.me/image/sdk/h5/havenoquan.png' alt="" />
    <p style="margin-top:20px;">
      您还没有优惠券哦
    </p>
  </div>
  <div class='youhuiquan' v-show="havequan">
    <div class="quan" v-for="x in qunList" :class="{'quan1':x.isB,'quan2':x.isC,'quan3':x.isD}">
      <div class="qulef1" :class="{'qulef2':isqulef}">
        <p style="font-size:18px;">{{x.source}}</p>
        <p>{{x.remark? x.remark : '全场通用'}}</p>
        <p>{{x.startTime1+'-'+x.endTime}}</p>
      </div>
      <div class="quler" style="float:right;">
        <p>
          <span style="color:#d43047;font-size:20px;">￥<span>  <span style="color:#d43047;font-size:40px;">{{x.amount}}</span>
        </p>
        <p style="text-align:center;">
          {{x.remark? x.remark : '全场通用'}}
        </p>
      </div>

      </li>
    </div>
  </div>
</template>
<script>
// import $ from 'zepto';
export default {
  data() {
    return {
      havequan: false,
      noquan: true,
      isNouse: true,
      isUse: false,
      num_nouse: '0',
      num_use: '0',
      nowTime: '',
      isqulef: false,
      token: window.localStorage ? window.localStorage.getItem('token') : this.getCookie('token'),
      qunList: []
    };
  },
  methods: {
    back() {
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
    tabNuse(stat) {
      if (stat === 1) {
        this.isNouse = true;
        this.isUse = false;
        this.isqulef = false;
      } else {
        this.isNouse = false;
        this.isUse = true;
        this.isqulef = true;
      }
      this.$http.get('http://api.ubaytop.com/platform/api/v1/activity/user/coupon/list', {
        params: {
          // name: this.re_name,
          status: stat,
          token: this.token,
          page: '1'
        }
      }).then(
        function(res) { // 根据返回结果判断是否设置成功
          console.log(res);
          if (res.body.data.coupons.length === 0) {
            this.havequan = false;
            this.noquan = true;
          } else {
            this.nowTime = res.body.data.time;
            this.qunList = res.body.data.coupons;
            //    this.num_nouse = res.body.data.coupons.length;
            this.havequan = true;
            this.noquan = false;
            for (var i in this.qunList) {
              if (this.qunList[i].status === 2) {
                this.qunList[i].isD = true;
              } else if (this.qunList[i].status === 3) {
                this.qunList[i].isC = true;
              } else if (this.qunList[i].startTime > this.nowTime) {
                this.qunList[i].isB = true;
              }
              this.qunList[i].startTime1 = this.formTime(this.qunList[i].startTime);
              this.qunList[i].endTime = this.formTime(this.qunList[i].endTime);
            }
            // $.toast('注册失败，请稍后重试');
          }
        });
    },
    formTime(ttt) {
      var time = new Date(ttt);
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
      return y + '.' + m + '.' + d;
    }
  },
  ready() {
    this.$http.get('http://api.ubaytop.com/platform/api/v1/activity/user/coupon/list', {
      params: {
        // name: this.re_name,
        status: '1',
        token: this.token,
        page: '1'
      }
    }).then(
      function(res) { // 根据返回结果判断是否设置成功
        console.log(res);
        if (res.body.data.coupons.length === 0) {
          this.havequan = false;
          this.noquan = true;
        } else {
          this.nowTime = res.body.data.time;
          this.qunList = res.body.data.coupons;
          this.num_nouse = res.body.data.coupons.length;
          this.havequan = true;
          this.noquan = false;
          for (var i in this.qunList) {
            if (this.qunList[i].status === 2) {
              this.qunList[i].isD = true;
            } else if (this.qunList[i].status === 3) {
              this.qunList[i].isC = true;
            } else if (this.qunList[i].startTime > this.nowTime) {
              this.qunList[i].isB = true;
            }
            this.qunList[i].startTime1 = this.formTime(this.qunList[i].startTime);
            this.qunList[i].endTime = this.formTime(this.qunList[i].endTime);
          }
          // $.toast('注册失败，请稍后重试');
        }
      });
    this.$http.get('http://api.ubaytop.com/platform/api/v1/activity/user/coupon/list', {
      params: {
        // name: this.re_name,
        status: '2',
        token: this.token,
        page: '1'
      }
    }).then(
      function(res) { // 根据返回结果判断是否设置成功
        this.num_use = res.body.data.coupons.length;
      });
  }
};
</script>
